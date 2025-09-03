"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("./user.model");
const env_1 = require("../../config/env");
const router = (0, express_1.Router)();
// register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        if (!email || !password || !name)
            return res.status(400).json({ ok: false, message: "Missing fields" });
        const exists = await user_model_1.UserModel.findOne({ email });
        if (exists)
            return res.status(400).json({ ok: false, message: "User exists" });
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await user_model_1.UserModel.create({ name, email, password: hashed, role });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.ACCESS_EXPIRES });
        res.status(201).json({ ok: true, data: { _id: user._id, name: user.name, email: user.email, role: user.role, token } });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
// login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.UserModel.findOne({ email });
        if (!user)
            return res.status(401).json({ ok: false, message: "Invalid credentials" });
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match)
            return res.status(401).json({ ok: false, message: "Invalid credentials" });
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.ACCESS_EXPIRES });
        res.json({ ok: true, data: { _id: user._id, name: user.name, email: user.email, role: user.role, token } });
    }
    catch (err) {
        res.status(400).json({ ok: false, message: err.message });
    }
});
exports.default = router;
