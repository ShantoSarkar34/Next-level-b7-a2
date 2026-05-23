import { Router } from "express";
import {
  createIssue,
  getAllIssues,
  getSingleIssue,
  updateIssue,
  deleteIssue,
} from "../controllers/issues.controller";

import { auth, authorizedRole } from "../../utility/auth";

const router = Router();

router.post(
  "/",
  auth,
  authorizedRole("contributor", "maintainer"),
  createIssue
);

router.get("/", getAllIssues);

router.get("/:id", getSingleIssue);

router.patch("/:id", auth, updateIssue);

router.delete("/:id", auth, authorizedRole("maintainer"), deleteIssue);

export default router;
