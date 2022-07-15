import { Sequelize } from "sequelize";
import config from "./config/index";
export const sequelize = new Sequelize(
  config.dbName,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.type,
    // logging: config.debug,
    // logging: (...msg) => console.log(msg),
    sync: { force: true },
  }
);
