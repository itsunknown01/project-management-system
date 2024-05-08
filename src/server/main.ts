import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth-route.js";
import dotenv from "dotenv";
dotenv.config();

declare module "express-session" {
  interface SessionData {
    token?: string
  }
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/api/auth", authRoutes);

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);