import { Application, Request, Response } from "express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoutes";
require("dotenv").config();

const port = process.env.PORT || 5000;

const app: Application = express();

// middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    // origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.static("public"));
app.use(express.json());

// routes
app.use("/user", UserRoute);

app.get("/", (req: Request, res: Response) => {
  res.json({ status: "success" });
});

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.DATABASE_URL as string);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => console.error(err));
