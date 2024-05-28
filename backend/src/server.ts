import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoute";
import AuthRoute from "./routes/AuthRoute";
import dotenv from "dotenv";
import LogRequest from "./middlewares/LogRequests";
import upload from "./middlewares/MulterMiddleware";
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
app.post("/upload", upload.single("file"), (req, res) => {
  res.json({ message: "File uploaded", url: req.body.url });
});

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
