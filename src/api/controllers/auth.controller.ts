import type { Request, Response } from "express";
import authService from "../services/auth.service";
import { sendResponse } from "../../utility/sendResponse";
import { signToken, veryfiToken } from "../../utility/jwt";

const signUp = async (req: Request, res: Response) => {
  const user = await authService.createUser(req.body);
  if (!user) {
    sendResponse(res, { message: "Faild to create user!" }, 400);
    return;
  }
  sendResponse(
    res,
    { message: "User registered successfully", data: user },
    201
  );
};
export default signUp;

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await authService.validateUser(email, password);

  if (!user) {
    sendResponse(res, { message: "Invilad Crediential!" }, 400);
    return;
  }
  const token = signToken(user);
  const result = {
    token: token,
    user: user,
  };

  sendResponse(res, { message: "Login successful", data: result }, 201);
};


