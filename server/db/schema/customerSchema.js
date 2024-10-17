const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    pageUrl: { type: String, required: false, default: "" },
    priceId: { type: String },
    salesPersonName: { type: String, required: true },
    salesPersonDepartment: { type: String, required: true },
  },
  { collection: "Customers" }
);

module.exports = mongoose.model("Customers", CustomerSchema);
