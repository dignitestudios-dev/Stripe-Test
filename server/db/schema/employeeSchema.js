const mongoose = require("mongoose");

const ORGANIZATIONS = ["LB", "DS", "CTS"];
const DEPARTMENTS = ["HR", "Sales", "Production"];

const employeeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    department: {
      type: String,
      required: true,
      enum: DEPARTMENTS,
    },
    organization: {
      type: String,
      required: true,
      enum: ORGANIZATIONS,
    },
    jobPosition: { type: String, required: true },
  },
  {
    collection: "Employees",
  }
);

module.exports = mongoose.model("Employees", employeeSchema);
