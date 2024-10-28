const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: false },
    description: { type: String, required: true },
    amount: { type: String, required: true },
    pageUrl: { type: String, required: false, default: "" },
    priceId: { type: String },
    salesPerson: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    },
    projectTitle: { type: String },
  },
  { collection: "Customers" }
);

module.exports = mongoose.model("Customers", CustomerSchema);
