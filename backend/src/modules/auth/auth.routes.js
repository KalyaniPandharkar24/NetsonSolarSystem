import express from "express";
import {
  loginAdmin,
  forgotPassword,
  resetPassword,
} from "./auth.controller.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;