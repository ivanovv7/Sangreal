import { userDB } from "../Authentication/authInterfaces";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user: userDB) => {
  const payload = {
    email: user.username,
    permission: user.permission,
  };

  const token = jwt.sign(payload,process.env.USER_TOKEN!, { expiresIn: "35s" });

  return token
};
