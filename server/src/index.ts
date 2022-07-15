// Third party packages
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createClient } from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
// Locals
import { sequelize } from "./connect.db";
import deserializeUser from "./middlewares/deserialize-users";
import routes from "./routes";

const app = express();

const main = async () => {
  app.use(cookieParser());
  app.use(express.static(__dirname));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  dotenv.config();
  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );
  const RedisStore = connectRedis(session);
  const redisClient = createClient({ legacyMode: true });
  redisClient.connect().catch(console.error);
  const sessionMiddleware = session({
    name: "qid",
    secret: process.env.TOKEN_SECRET! + process.env.REFRESH_TOKEN_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({
      client: redisClient as any,
      disableTouch: true,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 15, // 15 Days
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV! === "production", // cookie only works in https
    },
  });
  app.use(sessionMiddleware);
  app.use((req, _, next) => {
    // console.log("req.session", req.session);
    if (!req.session) {
      return next(new Error("oh no")); // handle error
    }
    next(); // otherwise continue
  });
  app.use(deserializeUser);
  routes(app);
  // Connecting to database
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  app.listen(4000, () => {
    console.log(`Server listening at http://localhost:4000`);
  });
};
main().catch((error) => console.log(error));
