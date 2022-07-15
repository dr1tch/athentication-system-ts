import { Dialect } from "sequelize/types";
import { __prod__ } from "../constants";

export default {
  dbName: "authSystem",
  type: "postgres" as Dialect,
  debug: !__prod__,
  username: "dr1tch",
  password: "1HRMBD99DYH",
  host: "localhost",
};
