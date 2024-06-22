import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import RootRoute from "./routes/RootRoute";
import ChatRoute from "./routes/ChatRoute";
import StroageRoute from "./routes/StorageRoute";
import dotenv from "dotenv";
import LogRequest from "./middlewares/LogRequests";
import cookieParser from "cookie-parser";
import { AuthUser } from "./middlewares/Authenticate";
import ErrorHandler from "./middlewares/ErrorHandler";
// import { Server } from "socket.io";

// import bodyParser from "body-parser";

const app = express();
dotenv.config();
const ORIGIN_URL = process.env.ORIGIN_URL || "http://localhost:3000";

app.use(cors({ origin: ORIGIN_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

// app.use(LogRequest);

// routes
app.use("/auth", AuthRoute);
app.use("/user", UserRoute);
app.use("/uploads", express.static("public/uploads"));
app.use("/storage", AuthUser, StroageRoute);
app.use("/chat", AuthUser, ChatRoute);
app.use("/", RootRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success" });
});

app.use(ErrorHandler);

async function main() {
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  // const io = new Server(PORT);
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.DATABASE_URL as string);
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

main().catch((err) => console.error(err));

export default app;
