// index.js
import express from "express";
import "dotenv/config";
import connectDB from "./utils/db.js";
import cors from "cors";
import authRouter from "./router/auth-router.js";
import mutualfundRouter from "./router/mutualfund-router.js"

const app = express();
const port =  8080;

app.use(cors());

app.use(express.json());


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });

app.use("/api/v1", authRouter);
app.use("/api/v1", mutualfundRouter)
