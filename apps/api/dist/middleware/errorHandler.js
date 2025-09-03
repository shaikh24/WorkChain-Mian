"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
function errorHandler(err, _req, res, _next) {
    console.error(err);
    res.status(err.status || 500).json({ ok: false, message: err.message || "Internal server error" });
}
