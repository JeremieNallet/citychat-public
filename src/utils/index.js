import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const timeFromNow = (data) => {
    if (!data) {
        return;
    }
    dayjs.extend(relativeTime);
    return dayjs(data).fromNow();
};

export const debounce = (fn, delay) => {
    let timeout;
    return function (...args) {
        clearInterval(timeout);
        timeout = setTimeout(() => fn.apply(this, args), delay);
    };
};

export const reversedGeoCoding = async (long, lat) => {
    const { data } = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=${process.env.MAPBOX_KEY}`
    );

    const place = data.features.find((el) => el.id.includes("place"));
    const country = data.features.find((el) => el.id.includes("country"));
    // console.log(findPlace);
    if (!place || !place.text || !country || !country.text) {
        return {
            error: "Hm, we can't find this place",
        };
    }

    return { place: `${place.text.trim()}-${country.text.trim()}` };
};

export const defaultSpring = {
    type: "spring",
    restSpeed: 0.001,
    restDelta: 0.001,
    damping: 15,
    stiffness: 400,
    mass: 1,
};

export const softerSpring = {
    type: "spring",
    restSpeed: 0.001,
    restDelta: 0.001,
    damping: 25,
    stiffness: 400,
    mass: 1,
};

export const truncate = (text, trimAt = 10) => {
    const test = text.slice(0, trimAt);
    if (text.length > test.length) {
        return test + "...";
    } else {
        return text;
    }
};
