import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";

//routes
import authRoutes from "./routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3010;

//connect to the mongoDB
connectDB();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Server is running 👌");
});

app.use("/api/user", authRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
