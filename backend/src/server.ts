import { Request, Response } from "express";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import UserRoute from "./routes/UserRoutes";
import dotenv from "dotenv";
import LogRequest from "./middlewares/LogRequests";
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
app.use(express.static("public"));
app.use(express.json());

// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
// app.use(bodyParser.json());

// app.use(LogRequest);

// routes
app.use("/user", UserRoute);

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
