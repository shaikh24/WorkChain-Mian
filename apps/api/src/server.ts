import http from "http";
import { connectDB } from "./config/db";
import { app } from "./app";
import { env } from "./config/env";

async function main() {
  try {
    await connectDB();
    const server = http.createServer(app);
    const PORT = Number(process.env.PORT || env.PORT || 4000);
    server.listen(PORT, () => console.log(`API running on port ${PORT}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
main();
