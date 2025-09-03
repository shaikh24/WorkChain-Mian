import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserModel } from "./user.model";
import { env } from "../../config/env";

const router = Router();

// register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) return res.status(400).json({ ok:false, message: "Missing fields" });
    const exists = await UserModel.findOne({ email });
    if (exists) return res.status(400).json({ ok:false, message: "User exists" });
    const hashed = await bcrypt.hash(password, 10);
    const user = await UserModel.create({ name, email, password: hashed, role });
    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: env.ACCESS_EXPIRES });
    res.status(201).json({ ok:true, data: { _id: user._id, name: user.name, email: user.email, role: user.role, token } });
  } catch (err:any) {
    res.status(400).json({ ok:false, message: err.message });
  }
});

// login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ ok:false, message: "Invalid credentials" });
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ ok:false, message: "Invalid credentials" });
    const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, { expiresIn: env.ACCESS_EXPIRES });
    res.json({ ok:true, data: { _id: user._id, name: user.name, email: user.email, role: user.role, token } });
  } catch (err:any) {
    res.status(400).json({ ok:false, message: err.message });
  }
});

export default router;
