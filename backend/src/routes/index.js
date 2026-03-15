import express from "express";

import authRoutes from "../modules/auth/auth.routes.js";
import contactRoutes from "../modules/contact/contact.routes.js";
import projectRoutes from "../modules/projects/project.routes.js";
import reviewRoutes from "../modules/reviews/review.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js"; // ⭐ ADD THIS

const router = express.Router();

/* ================= API ROUTES ================= */

router.use("/auth", authRoutes);
router.use("/contact", contactRoutes);
router.use("/projects", projectRoutes);
router.use("/reviews", reviewRoutes);

/* ⭐ DASHBOARD ROUTES */
router.use("/dashboard", dashboardRoutes);

export default router;