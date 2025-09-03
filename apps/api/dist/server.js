"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const db_1 = require("./config/db");
const app_1 = require("./app");
const env_1 = require("./config/env");
async function main() {
    try {
        await (0, db_1.connectDB)();
        const server = http_1.default.createServer(app_1.app);
        const PORT = Number(process.env.PORT || env_1.env.PORT || 4000);
        server.listen(PORT, () => console.log(`API running on port ${PORT}`));
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
}
main();
