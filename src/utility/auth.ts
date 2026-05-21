import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";
import { veryfiToken } from "./jwt";
import authService from "../api/services/auth.service";
import type { Role } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;

  if (!token) {
    return sendResponse(res, { message: "Token Not Found!" }, 401);
  }

  const payload = veryfiToken(token);

  if (!payload) {
    return sendResponse(res, { message: "Invalid Token!" }, 401);
  }

  const user = await authService.getUserById(payload.id);

  if (!user) {
    return sendResponse(res, { message: "User not found!" }, 401);
  }

  req.user = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  next();
};

export const authorizedRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return sendResponse(res, { message: "Unauthorized!" }, 401);
    }
    if (!roles.includes(req.user.role)) {
      return sendResponse(res, { message: "You don't have permission!" }, 403);
    }
    next();
  };
};
