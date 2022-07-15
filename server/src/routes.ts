import { Express } from "express";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionHandler,
} from "./controllers/sessions.controller";
import { requireUser } from "./middlewares/require-user";

function routes(app: Express) {
  // login
  app.post("/api/session", createSessionHandler);
  // get the current session
  app.get("/api/session", requireUser, getSessionHandler);
  // logout
  app.delete("/api/session", requireUser, deleteSessionHandler);
}

export default routes;

