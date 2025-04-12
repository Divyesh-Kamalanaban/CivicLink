import express from "express";
import { 
  getCSRIssues, 
  createCSRIssue, 
  updateCSRIssue, 
  deleteCSRIssue 
} from "../controllers/csr.controllers.js";

const router = express.Router();

router.get("/issues", getCSRIssues);
router.post("/issues", createCSRIssue);
router.put("/issues/:id", updateCSRIssue);
router.delete("/issues/:id", deleteCSRIssue);

export default router; 