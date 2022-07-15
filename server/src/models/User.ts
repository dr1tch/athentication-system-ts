import { DataTypes } from "sequelize";
import { sequelize } from "src/connect.db";

export const User = sequelize.define(
  "User",
  {
    _id: {
      //   type: DataTypes.UUIDV4,
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: true,
    deletedAt: true,
    updatedAt: true,
    tableName: "User",
    timestamps: true,
  }
);

// await User.sync({ force: true });
// console.log("The table for the User model was just (re)created!");
