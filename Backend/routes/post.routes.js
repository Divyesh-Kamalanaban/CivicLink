import express from "express";
import {
  getPosts,
  getunverifiedPosts,
  post,
  verifyPost,
} from "../controllers/post.controllers.js";
import { protectRoute } from "../middleware/protectRoute.middleware.js";

const router = express.Router();

router.post("/", protectRoute, post);
router.post("/verify-post", protectRoute, verifyPost);
router.get("/getall", protectRoute, getPosts);
router.get("/unverified-posts", protectRoute, getunverifiedPosts);
export default router;
