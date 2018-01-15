import path from "path";

let config = {};
config.serverPort = process.env.serverPort || 3002;
config.itemsPerPage = process.env.itemsPerPage || 3;

export default config;