"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const index_1 = __importDefault(require("./routes/index"));
const env_1 = require("./config/env");
const errorHandler_1 = require("./middleware/errorHandler");
exports.app = (0, express_1.default)();
const origins = (env_1.env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
exports.app.use((0, cors_1.default)({ origin: origins.length ? origins : true, credentials: true }));
exports.app.use((0, helmet_1.default)());
exports.app.use((0, morgan_1.default)("dev"));
exports.app.use(express_1.default.json({ limit: "2mb" }));
exports.app.use((0, compression_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, express_rate_limit_1.default)({ windowMs: 60000, max: 300 }));
exports.app.get("/api/health", (_req, res) => res.json({ ok: true, uptime: process.uptime(), ts: Date.now() }));
exports.app.use("/api", index_1.default);
// Error handler (must be last)
exports.app.use(errorHandler_1.errorHandler);
