import { NextFunction, Request, Response } from "express";
import { getUser } from "../db";
import { signJWT, verifyJWT } from "../utils/jwt.utils";

function deserializeUser(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.session.pass) {
    return next();
  }

  //@ts-ignore
  const { accessToken, refreshToken } = req.session.pass;
  // console.log("accessToken", accessToken);
  // console.log("refreshToken", refreshToken);
  const { payload, expired } = verifyJWT(accessToken, "access");
  // console.log("payload", payload);
  // console.log("expired", expired);

  // For a valid access token
  if (payload) {
    // @ts-ignore
    req.user = payload;
    return next();
  }

  // expired but valid access token

  const { payload: refresh } =
    expired && refreshToken
      ? verifyJWT(refreshToken, "refresh")
      : { payload: null };
  // console.log("refresh", refresh);
  if (!refresh) {
    return next();
  }

  // @ts-ignore
  // const session = getSession(refresh.sessionId);

  // if (!session) {
  //   return next();
  // }
  const user = getUser(refresh.email);
  const newAccessToken = signJWT(user as object, "5s", "access");
  // @ts-ignore
  req.session.pass.accessToken = newAccessToken;

  // res.cookie("accessToken", newAccessToken, {
  //   maxAge: 300000, // 5 minutes
  //   httpOnly: true,
  // });
  // req.user = verifyJWT(newAccessToken).payload;

  return next();
}
// io.emit("");
export default deserializeUser;
