import { Request } from "express";
import { createClient } from "redis";
import session from "express-session";
import crypto from "crypto";
import uuid from "node-uuid";
import connectRedis from "connect-redis";

const RedisStore = connectRedis(session);
const redisClient = createClient({ legacyMode: true });
redisClient.connect().catch(console.error);

export const sessionConf = session({
  name: "qid",
  genid: (req: Request) => {
    return crypto
      .createHash("sha256")
      .update(uuid.v1())
      .update(crypto.randomBytes(256))
      .digest("hex");
  },
  secret: process.env.TOKEN_SECRET!,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({
    client: redisClient as any,
    disableTouch: true,
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 15, // 15 Days
    // maxAge: "1y", // 15 Days
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV! === "production", // cookie only works in https
  },
});
// app.use(function (req, res, next) {
//   console.log("req.session", req.session);
//   if (!req.session) {
//     return next(new Error("oh no")); // handle error
//   }
//   next(); // otherwise continue
// });
