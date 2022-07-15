import { NextFunction, Request, Response } from "express";

export function requireUser(req: Request, res: Response, next: NextFunction) {
  if (!req.session) return res.status(403).send("Invalid session");
  // @ts-ignore
  if (!req.session.pass!) {
    return res.status(403).send("Invalid session");
  }
  // @ts-ignore
  // console.log("req,session.pass", req.session);
  return next();
}
