import type { Response } from "express";

export function sendResponse<T>(
  res: Response,
  {
    message,
    data,
  }: {
    message: unknown;
    data?: T;
  },
  status = 200
): void {
  res.status(status).json({
    success: status < 400,
    message,
    data,
  });
}