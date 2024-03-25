const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ status: "success" });
});

async function main() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("Connected to MongoDB");

  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

main().catch((err) => console.error(err));
