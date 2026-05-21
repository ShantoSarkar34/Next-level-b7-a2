import type { NextFunction, Request, Response } from "express";
import { sendResponse } from "./sendResponse";
import { veryfiToken } from "./jwt";
import authService from "../api/services/auth.service";
import type { Role } from "../types";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
   console.log(token);
   
  if (!token) {
    return sendResponse(res, { message: "Token Not Found!" }, 401);
  }

  const payload = veryfiToken(token, "access");
  if (!payload) {
    return sendResponse(res, { message: "Invalid Token!" }, 401);
  }

  const user = await authService.getUserById(payload.id);
  if (!user) {
    return sendResponse(res, { message: "User not found!" }, 401);
  }

  console.log(user)
  next();
};

// export const authorizedRole = (...roles: Role[])=>{
//  return(req: Request, res: Response, next: NextFunction)=>{
//   if(!req.user){
//     return res.send("Unauthorized!")
//   }
//   if(!roles.includes(req.user.role)){
//     return res.send("You don't have permisson!")
//   }
//   return next()
//  }
// }
