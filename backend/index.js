import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cors from 'cors';
import adminRouter from "./routes/adminRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();
app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use("/api/admin",adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});