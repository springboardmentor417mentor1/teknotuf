const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require("cors");
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();
connectDB();

const app = express();

// Allowed frontend URLs
// const allowedOrigins = [
//   'http://localhost:4200',
//   'https://teknotuf-1.onrender.com'
// ];

// app.use(cors({
//   origin: allowedOrigins,
//   credentials: true
// }));
const allowedOrigins = [
  'http://localhost:4200',
  'https://teknotuf-1.onrender.com',         // backend
  'https://cool-maamoul-daa8f4.netlify.app'  // frontend
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to protected route!", user: req.user });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
