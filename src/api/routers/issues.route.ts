import { Router } from "express";
import {
//   createIssue,
  getAllIssues,
//   getSingleIssue,
//   updateIssue,
//   deleteIssue
} from "../controllers/issues.controller";

import { auth } from "../../utility/auth";

const router = Router();

// router.post("/", auth, createIssue);

router.get("/", getAllIssues);

// router.get("/:id", getSingleIssue);

// router.patch("/:id", auth, updateIssue);

// router.delete("/:id", auth, deleteIssue);

export default router;