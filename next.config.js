module.exports = {
    env: {
        MAPBOX_KEY: process.env.MAPBOX_KEY,
        ENV: process.env.ENV,
        FIREBASE_APIKEY: process.env.FIREBASE_APIKEY,
        FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN,
        FIREBASE_DATABASEURL: process.env.FIREBASE_DATABASEURL,
        FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID,
        FIREBASE_BUCKET: process.env.FIREBASE_BUCKET,
        FIREBASE_MSGSENDERID: process.env.FIREBASE_MSGSENDERID,
        FIREBASE_APPID: process.env.FIREBASE_APPID,
        FIREBASE_MESUREMENTID: process.env.FIREBASE_MESUREMENTID,
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        return config;
    },
};
