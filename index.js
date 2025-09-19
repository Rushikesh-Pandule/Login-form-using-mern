import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
// Enable CORS for the frontend
app.use(cors({
  origin: 'http://localhost:5173', // React's default port
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { 
    type: String, 
    enum: ['super_admin', 'employer', 'recruiter', 'hr', 'candidate'], 
    default: "candidate" 
  }
});
const User = mongoose.model("User", userSchema);

// JWT Middleware
const authenticate = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send("Unauthorized");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError' && req.cookies.refreshToken) {
      try {
        const decodedRefresh = jwt.verify(req.cookies.refreshToken, process.env.JWT_SECRET);
        const newAccessToken = jwt.sign({ id: decodedRefresh.id, role: decodedRefresh.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
        res.cookie("accessToken", newAccessToken, { httpOnly: true, sameSite: "strict" });
        req.user = decodedRefresh;
        return next();
      } catch (refreshErr) {
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        return res.status(401).send("Session expired. Please sign in again.");
      }
    }
    return res.status(401).send("Token invalid or missing");
  }
};

// Sign Up
app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) return res.status(400).json({ message: "All fields required" });

  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword, role });

  res.status(201).json({ message: "User registered successfully" });
});

// Sign In
app.post("/api/auth/signin", async (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) return res.status(400).json({ message: "All fields required" });

  const user = await User.findOne({ email });
  if (!user || user.role !== role) return res.status(400).json({ message: "Invalid credentials or role" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

  res.cookie("accessToken", accessToken, { httpOnly: true, sameSite: "strict" });
  res.cookie("refreshToken", refreshToken, { httpOnly: true, sameSite: "strict" });

  res.json({ message: "Login successful" });
});

// Logout
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.send("Logged out successfully");
});

// Protected Dashboard
app.get("/api/dashboard", authenticate, async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) return res.status(404).send("User not found");
  res.json({ name: user.name, role: req.user.role });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));