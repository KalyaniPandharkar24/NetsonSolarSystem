import express from "express";
import {
  submitContact,
  getContacts,
  markContacted,
  deleteContact,
} from "./contact.controller.js";

import { protect } from "../../middleware/authMiddleware.js";

const router = express.Router();

/* Public */
router.post("/", submitContact);

/* Admin (Protected) */
router.get("/", protect, getContacts);
router.put("/:id/contacted", protect, markContacted);
router.delete("/:id", protect, deleteContact);

export default router;