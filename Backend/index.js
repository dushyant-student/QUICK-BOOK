import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import express from "express";
import authuRoutes from "./Routes/authRoutes.js";
import { connectDB } from "./config/db.js";
import connectCloudinary from "./config/cloudinary.js";
import createShopRoutes from "./Routes/createShopeRotes.js";
import bookingRoutes from "./Routes/bookingRoutes.js";
import dashRoutes from "./Routes/dashboardRoutes.js";
import historyRoutes from "./Routes/historyRoutes.js";
import noticeRoutes from "./Routes/noticeRoutes.js";
import shopNotificationRoutes from "./Routes/genralNotification.js";
import ChangeTimeRoutes from "./Routes/changeTimeRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import { searchShops } from "./controllers/shopSearchController.js";



export const app = express();

// 1. CORS CONFIGURATION
const allowedOrigins = [
  "http://localhost:3000",
  process.env.FRONTEND_URL,
  "https://q-book-l19a.vercel.app",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


connectDB();
connectCloudinary();



app.use("/api/auth", authuRoutes);
app.use("/api", createShopRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/dashboard", dashRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/notice", noticeRoutes);
app.use("/api/genral", shopNotificationRoutes);
app.use("/api", ChangeTimeRoutes);

app.get("/api/shops/search", searchShops);

app.use("/api", contactRoutes);

// 6. SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
