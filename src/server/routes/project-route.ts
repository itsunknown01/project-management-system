import { Router } from "express";
import { ProjectData, getProject } from "../controllers/project-controller.js";

const router = Router();

router.get("/:userId", getProject);
router.post("/",ProjectData);

export default router;