const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema(
  {
    organizationName: { type: String, required: true },
    organizationDomain: { type: String, required: true },
    organizationSuffix: { type: String, required: true },
    organizationColors: {
      color1: { type: String },
      color2: { type: String },
    },
    organizationLogo: { type: String },
    organizationPrivacyPolicy: { type: String },
    organizationTermsOfService: { type: String },
    organizationPhoneNumber: { type: String, required: true },
    organizationSupportEmail: { type: String, required: true },
    organizationAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  },
  {
    collection: "Organizations",
  }
);

module.exports = mongoose.model("Organizations", OrganizationSchema);
