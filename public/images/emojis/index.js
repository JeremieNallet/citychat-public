const req = require.context("./", true, /\.svg$/);
const emojis = req.keys().map((path) => path.replace("./", ""));
export default emojis;
