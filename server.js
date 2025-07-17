import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from "./routes/user.route.js";
import blogRoutes from "./routes/blog.route.js";

dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


app.use(express.json());

app.use("/api/users", userRoutes);

app.use("/api/blogs", blogRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on port: http://localhost:${PORT}`);
});