const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    mobile: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    otp: { type: String },              // store OTP
    otpExpiry: { type: Date },          // expiry time
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
