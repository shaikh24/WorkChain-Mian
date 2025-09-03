"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
exports.env = {
    PORT: process.env.PORT || 4000,
    MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/workchain",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "https://work-chain-mian-web-etov.vercel.app,http://localhost:5173",
    JWT_SECRET: process.env.JWT_SECRET || "replace_me",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "replace_me_refresh",
    ACCESS_EXPIRES: process.env.ACCESS_EXPIRES || "15m",
    REFRESH_EXPIRES: process.env.REFRESH_EXPIRES || "7d",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL || "QamarShaikh@pi.com",
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || "Admin"
};
