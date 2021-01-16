import { useRouter } from "next/router";
import { useEffect } from "react";
import useStore from "../../lib/store";

const protectedClient = (route) => {
    const router = useRouter();
    const user = useStore((state) => state.user);
    useEffect(() => {
        if (!user.coords && !user.name && !user.emoji) router.push(route);
    }, [route, router, user.connected, user.coords, user.emoji, user.name]);
};

export default protectedClient;
