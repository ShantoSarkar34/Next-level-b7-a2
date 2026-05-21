import type { Request, Response } from "express";
import {
  createIssueIntoDB,
  getAllIssuesFromDB,
} from "../services/issues.service";
import { sendResponse } from "../../utility/sendResponse";

export const createIssue = async (req: Request, res: Response) => {
  const issue = await createIssueIntoDB(req.body, req.user!.id);

  if (!issue) {
    sendResponse(res, { message: "Failed to create issue!" }, 400);
    return;
  }

  sendResponse(
    res,
    {
      message: "Issue created successfully",
      data: issue,
    },
    201
  );
};

export const getAllIssues = async (req: Request, res: Response) => {
  const issues = await getAllIssuesFromDB(req.query);

  sendResponse(res, {
    message: "Issues fetched successfully",
    data: issues,
  });
};

export const getSingleIssue = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Get single issue only loged in user.",
  });
};

export const updateIssue = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "Update issues only loged in user.",
  });
};

export const deleteIssue = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Issues delete route only for maintainor!",
  });
};
