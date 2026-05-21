import type { Request, Response } from "express";
import {
  createIssueIntoDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
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
  const id = Number(req.params.id);

  const issue = await getSingleIssueFromDB(id);
  if (!issue) {
    sendResponse(
      res,
      {
        message: "Issue not found!",
      },
      404
    );
    return;
  }
  sendResponse(res, {
    message: "Issue fetched successfully",
    data: issue,
  });
};

export const updateIssue = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const updatedIssue = await updateIssueIntoDB(id, req.body, req.user!);

  if (!updatedIssue) {
    sendResponse(
      res,
      {
        message: "Issue not found!",
      },
      404
    );

    return;
  }

  sendResponse(res, {
    message: "Issue updated successfully",
    data: updatedIssue,
  });
};

export const deleteIssue = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: "This is Issues delete route only for maintainor!",
  });
};
