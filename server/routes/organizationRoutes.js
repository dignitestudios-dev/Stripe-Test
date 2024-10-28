const express = require("express");
const router = express.Router();
const upload = require("../utils/multerConfig");
const {
  addOrganization,
  getAllOrganizations,
  getOrganizationById,
  deleteOrganization,
  updateOrganization,
  getOrganizationNameAndId,
} = require("../controller/organizationController");

router.post(
  "/add-organization",
  upload.single("organizationLogo"),
  addOrganization
);
router.get("/organizations", getAllOrganizations);

router.get("/organization/:_id", getOrganizationById);

router.delete("/delete-organization/:_id", deleteOrganization);

router.put(
  "/update-organization/:_id",
  upload.single("organizationLogo"),
  updateOrganization
);

router.get("/get-organizations", getOrganizationNameAndId);

module.exports = router;
