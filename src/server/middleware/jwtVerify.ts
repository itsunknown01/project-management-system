import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();

interface JWTPayload extends JwtPayload {
  user: User;
}

function jwtVerify(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  console.log(token);
  if (token === null || token === undefined) {
    return res.status(401).json({ status: 401, message: "UnAuthorized" });
  }

  //   * Verify the JWT token
  jwt.verify(token as any, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ status: 401, message: "UnAuthorized" });
    }

    if (decoded as JWTPayload) {
      console.log(decoded.user);
      req.user = decoded.user;
    }
    next();
  });
}

export { jwtVerify };