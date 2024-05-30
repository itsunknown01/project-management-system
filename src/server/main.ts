import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import ViteExpress from "vite-express";
dotenv.config();

import { jwtVerify } from "./middleware/jwtVerify.js";
import authRoutes from "./routes/auth-route.js";
import projectRoutes from "./routes/project-route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  session({
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    },
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: true,
  })
);

// app.get("/profile",(req: Request, res: Response, next: NextFunction) => {
//   const token = req.session.token;

//   console.log("The token is", token);
//   console.log("The sessionID is", req.sessionID);

//   if (token === null || token === undefined) {
//     return res.status(401).json({ status: 401, message: "UnAuthorized" });
//   }

//   //   * Verify the JWT token
//   jwt.verify(token, "ashkdhsdadkhfa", (err, user) => {
//     if (err)
//       return res.status(401).json({ status: 401, message: "UnAuthorized" });
//     console.log(user);
//     req.user = JSON.parse(user as string);
//     next();
//   });
// });

app.use("/api/auth", authRoutes);
app.use("/api/project", jwtVerify, projectRoutes);

app.get("/api/session", (req, res) => {
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).send("No session available");
  }
});

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
