import { User } from "@prisma/client";

declare module "express-session" {
  interface SessionData {
    token?: string;
    user?: User;
  }
}

declare module "express" {
  interface Request {
    user?: User;
  }
}
