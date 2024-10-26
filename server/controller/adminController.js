const mongoose = require("mongoose");
const Admin = mongoose.model("Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const OTPModel = mongoose.model("OTP");

module.exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({ name, email, password: hashedPassword });
    res.status(201).json({ message: "Admin created" });
  } catch (error) {
    console.error("createAdmin error >>", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successfull",
      data: { id: admin._id, adminName: admin.name, adminEmail: admin.email },
      token,
    });
  } catch (error) {
    console.error("loginAdmin error >> ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

// verify email
module.exports.verifyEmail = async (req, res) => {
  const { email } = req.body;
  console.log(email);

  try {
    const userExist = await Admin.findOne({ email });

    if (!userExist) {
      return res
        .status(404)
        .json({ status: 404, message: "Email does not exist." });
    }

    const existingOtp = await OTPModel.findOne({ email });

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "professorcoding123@gmail.com",
        pass: "bhmkhbxysiztceii",
      },
    });

    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        return res.status(500).json({
          status: 500,
          message: "Failed to connect to the email server.",
        });
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    const generateOtp = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const otp = generateOtp();

    const mailOptions = {
      from: "dignitestudios.com",
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}`,
    };

    if (!existingOtp) {
      await OTPModel.create({ code: otp, email: email });
    } else {
      const filter = { email: email };
      const update = { code: otp };
      await OTPModel.findOneAndUpdate(filter, update);
    }

    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ status: 200, message: "OTP sent to your email.", otp: otp });
  } catch (error) {
    console.log("Forgot password server error >> ", error);
    res.status(500).json({
      status: 500,
      message: "Something went wrong, please try again.",
    });
  }
};

// verify otp
module.exports.VerifyOtp = async (req, res) => {
  const { email, code } = req.body;
  // console.log(req.body);

  if (!email || !code) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  try {
    const otp = await OTPModel.findOne({ email });

    if (otp && otp.code === code) {
      // OTP is correct
      await OTPModel.findOneAndUpdate({ email: email }, { isVerified: true });
      return res
        .status(200)
        .json({ message: "OTP verified successfully", status: 200 });
    } else {
      // OTP is incorrect
      return res.status(400).json({ message: "Invalid OTP", status: 400 });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};

// reset password
module.exports.ResetPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUser = await Admin.findOne({ email });
    if (isUser == null) {
      return res.status(404).send({ message: "Email does not exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.findOneAndUpdate(
      { email: email },
      { password: hashedPassword }
    );

    return res
      .status(200)
      .json({ message: "Password changed successfully", status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error, status: 500 });
  }
};
