const express = require("express");
const { register,login,forgotPassword, verifyOtp, resetPassword,forgotPasswordMobile,verifyOtpMobile, resetPasswordMobile } = require("../controllers/authController");
const router = express.Router();

router.post("/register", register);

router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

router.post("/forgot-password-mobile", forgotPasswordMobile);
router.post("/verify-otp-mobile", verifyOtpMobile);
router.post("/reset-password-mobile", resetPasswordMobile);

router.post("/login", login);

module.exports = router;
