import express from "express";
import { protectRoute } from "../middleware/protectRoute.middleware.js";
import {
  getunverifiedWorks,
  submitWork,
  verifyWork,
} from "../controllers/work.controllers.js";

const router = express.Router();

router.post("/submit", protectRoute, submitWork);
router.post("/verify-work", protectRoute, verifyWork);
router.get("/unverified-works", protectRoute, getunverifiedWorks);

export default router;
