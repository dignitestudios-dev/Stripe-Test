const express = require("express");
const {
  createEmployee,
  loginEmployee,
} = require("../controller/employeeController");
const router = express.Router();

router.post("/login", loginEmployee);

module.exports = router;
