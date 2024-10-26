const express = require("express");
const {
  createAdmin,
  loginAdmin,
  verifyEmail,
  VerifyOtp,
  ResetPassword,
} = require("../controller/adminController");
const router = express.Router();
const verifyAdmin = require("../middlewares/authMiddleware");
const {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controller/employeeController");

router.post("/create-admin", createAdmin);
router.post("/login", loginAdmin);
router.post("/verify-email", verifyEmail);
router.post("/verify-otp", VerifyOtp);
router.post("/change-password", ResetPassword);

router.post("/create-employee", createEmployee);
router.get("/get-employees", getAllEmployees);
router.get("/employees/:_id", getEmployeeById);
router.put("/update-employee/:_id", updateEmployee);
router.delete("/delete-employee/:_id", deleteEmployee);

module.exports = router;
