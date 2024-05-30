import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getUserByEmail } from "../services/auth.js";
import { db } from "../services/db.js";
import dotenv from "dotenv"
dotenv.config();

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingEmail = await getUserByEmail(email);

    if (existingEmail) {
      return res
        .json({
          success: false,
          message: "Email already in use",
        })
        .status(400);
    }

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res
      .json({
        success: true,
        message: "User created successfully",
      })
      .status(201);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user || !user.password) {
      return res.status(401).json({
        success: false,
        message: "Unauthorised",
      });
    }

    const passwordMatcher = await bcrypt.compare(password, user.password);

    if (passwordMatcher) {
      const token = jwt.sign({ user }, process.env.JWT_SECRET as string, {
        expiresIn: "1h",
      });

      req.session.token = token;

      let userData = {
        userId: user.id,
        name: user.name,
        email: user.email,
        accessToken: token,
      };

      req.session.user = user;

      return res.status(200).json({
        success: true,
        message: "Logged In Successfully",
        userData,
        accessToken: token,
      });
    } else {
      return res.status(401).json({
        message: "Unauthorised",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
