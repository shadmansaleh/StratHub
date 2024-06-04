import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import RootRoute from "./routes/RootRoute";
import StroageRoute from "./routes/StorageRoute";
import dotenv from "dotenv";
import LogRequest from "./middlewares/LogRequests";
import cookieParser from "cookie-parser";

// import bodyParser from "body-parser";

const app = express();

// middleware
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     // origin: "*",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

app.use(cors({ origin: true, credentials: true }));
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
app.use("/storage", StroageRoute);
app.use("/", RootRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success" });
});

async function main() {
  dotenv.config();
  const port = process.env.PORT || 5000;
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.DATABASE_URL as string);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => console.error(err));
