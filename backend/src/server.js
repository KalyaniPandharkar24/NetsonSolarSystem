import dotenv from "dotenv";
dotenv.config();   // ✅ MUST BE FIRST

import app from "./app.js";
import connectDB from "./config/db.js";
import { env } from "./config/env.js";

const PORT = env.PORT || 5000;

/* Connect DB then start server */
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});