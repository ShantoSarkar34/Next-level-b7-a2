import config from "../config";
import type { RUser } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const veryfiToken = (token: string, type: "access") => {
  const secret = type ="access"
  const decod = jwt.verify(token, secret);
  return decod as JwtPayload;
};

export const signToken = (payload: RUser ) => {
  const accessToken = jwt.sign(payload, config.jwt_secret, {
    expiresIn: "3d",
  });
  return accessToken;
};
// console.log(signToken({ id: 565, name: "shanto", email:"shanto@gmail.com", role:"contributor",password_hash:"shanto"}))

