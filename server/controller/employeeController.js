const mongoose = require("mongoose");
const Employees = mongoose.model("Employees");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.createEmployee = async (req, res, next) => {
  const { name, email, password, organization, department, jobPosition } =
    req.body;

  try {
    const existingEmployee = await Employees.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee = new Employees({
      name,
      email,
      password: hashedPassword,
      organization,
      department,
      jobPosition,
    });

    await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully",
      data: {
        id: newEmployee._id,
        name: newEmployee.name,
        email: newEmployee.email,
        organization: newEmployee.organization,
        department: newEmployee.department,
        jobPosition: newEmployee.jobPosition,
      },
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Employees.findOne({ email });

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
      data: { id: admin._id, name: admin.name, email: admin.email },
      token,
    });
  } catch (error) {
    console.error("loginAdmin error >> ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employees.find();
    if (employees.length > 0) {
      return res.status(200).json({ message: "success", data: employees });
    }
    res.status(404).json({ message: "You do no have added any employee." });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getEmployeeById = async (req, res) => {
  const { _id } = req.params;

  try {
    const employee = await Employees.findById(_id);

    if (employee) {
      return res
        .status(200)
        .json({ message: "Employee found", data: employee });
    }

    res.status(404).json({ message: "Employee not found" });
  } catch (error) {
    console.error("Error fetching employee by ID:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports.updateEmployee = async (req, res) => {
  try {
    const { _id } = req.params;
    const { name, email, department, organization, jobPosition } = req.body;

    const updatedData = {
      name,
      email,
      department,
      organization,
      jobPosition,
    };

    Object.keys(updatedData).forEach(
      (key) => updatedData[key] === undefined && delete updatedData[key]
    );

    const updatedEmployee = await Employees.findByIdAndUpdate(
      _id,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the employee" });
  }
};

module.exports.deleteEmployee = async (req, res) => {
  try {
    const { _id } = req.params;

    const deletedEmployee = await Employees.findByIdAndDelete(_id);

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the employee" });
  }
};
