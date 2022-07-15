import { Request, Response } from "express";
import { getUser } from "../db";
import { signJWT } from "../utils/jwt.utils";
// login handler
export function createSessionHandler(req: Request, res: Response) {
  console.log("req.body", req.body);
  const { email, password } = req.body;
  const user = getUser(email);

  if (!user || user.password !== password) {
    return res.status(401).send("Invalid email or password");
  }

  //   const session = createSession(email, user.username);

  // create access token
  //   const accessToken = signJWT(
  //     { email: user.email, name: user.username, sessionId: session.sessionId },
  //     "5s"
  //   );

  //   const refreshToken = signJWT({ sessionId: session.sessionId }, "1y");
  //   console.log("req.session", req.session);
  //   console.log("sessionId", sess.id);
  const accessToken = signJWT(user, "5s", "access");
  const refreshToken = signJWT(user, "2m", "refresh");
  // set access token in cookie
  //@ts-ignore
  req.session.pass = {
    authenticated: true,
    user,
    accessToken,
    refreshToken,
  };
  console.log("req.session", req.session);
  //   res.cookie("accessToken", accessToken, {
  //     maxAge: 300000, // 5 minutes
  //     httpOnly: true,
  //   });

  //   res.cookie("refreshToken", refreshToken, {
  //     maxAge: 3.154e10, // 1 year
  //     httpOnly: true,
  //   });

  // send user back
  return res.send(user);
}

// get the session session

// log out handler
export function getSessionHandler(req: Request, res: Response) {
  // @ts-ignore
  const { user } = req.session.pass;
  // @ts-ignore
  return res.send(user);
}

export function deleteSessionHandler(req: Request, res: Response) {
  return new Promise((resolve) =>
    req.session.destroy((err) => {
      res.clearCookie("qid").send("logged out successfully...!");
      if (err) {
        console.log(err);
        resolve(false);
        return;
        // return res.send(session);
      }

      resolve(true);
    })
  );
}
