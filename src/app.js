const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const cors = require('cors');
const authMiddleware = require("./middlewares/authMiddleware");

dotenv.config();
connectDB();

const app = express();

// app.use(cors({
//   origin: "http://localhost:4200",  // Angular frontend
//   credentials: true                 // allow cookies
// }));

app.use(cors({
  origin: "https://teknotuf-1.onrender.com",  // Angular frontend
  credentials: true                 // allow cookies
}));

app.use(express.json());  // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for form-data
// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "Welcome to protected route!", user: req.user });
});
// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
