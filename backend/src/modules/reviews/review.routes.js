import express from "express";
import upload from "../../middleware/uploadMiddleware.js";
import { protect } from "../../middleware/authMiddleware.js";
import {
  createReview,
  getApprovedReviews,
  getPendingReviews,
  approveReview,
  rejectReview,
  deleteReview,
} from "./review.controller.js";

const router = express.Router();


// Public routes
router.post("/", upload.single("image"), createReview);
router.get("/", getApprovedReviews);


// Admin routes (protected)
router.get("/pending", protect, getPendingReviews);
router.put("/approve/:id", protect, approveReview);
router.put("/reject/:id", protect, rejectReview);
router.delete("/:id", protect, deleteReview);


export default router;