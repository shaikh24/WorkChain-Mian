import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import routes from "./routes/index";
import { env } from "./config/env";
import { errorHandler } from "./middleware/errorHandler";

export const app = express();

const origins = (env.CORS_ORIGIN || "").split(",").map(s => s.trim()).filter(Boolean);
app.use(cors({ origin: origins.length ? origins : true, credentials: true }));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json({ limit: "2mb" }));
app.use(compression());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 60_000, max: 300 }));

app.get("/api/health", (_req, res) => res.json({ ok: true, uptime: process.uptime(), ts: Date.now() }));

app.use("/api", routes);

// Error handler (must be last)
app.use(errorHandler);
