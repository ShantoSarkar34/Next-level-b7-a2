import config from "../config";
import type { RUser } from "../types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export const veryfiToken = (token: string) => {
  const secret = config.jwt_secret;
  const decod = jwt.verify(token, secret);
  return decod as JwtPayload;
};

export const signToken = (payload: RUser ) => {
  const accessToken = jwt.sign(payload, config.jwt_secret, {
    expiresIn: "3d",
  });
  return accessToken;
};

