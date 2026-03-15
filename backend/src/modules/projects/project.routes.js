import express from "express";
import {
  createProject,
  getProjects,
  updateProject,
  deleteProject,
} from "./project.controller.js";

import { protect } from "../../middleware/authMiddleware.js";
import upload from "../../middleware/uploadMiddleware.js";
import { validate } from "../../middleware/validateMiddleware.js";
import { projectSchema } from "../../validations/project.validation.js";

const router = express.Router();
router.post("/", validate(projectSchema), createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get all projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get("/", getProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create project (Admin)
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               location:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Project created
 */
router.post("/", protect, upload.single("image"), createProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   put:
 *     summary: Update project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *     responses:
 *       200:
 *         description: Project updated
 */
router.put("/:id", protect, upload.single("image"), updateProject);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted
 */
router.delete("/:id", protect, deleteProject);

export default router;
