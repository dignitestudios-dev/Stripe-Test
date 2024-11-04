const mongoose = require("mongoose");
const Organizations = mongoose.model("Organizations");
const fs = require("fs");
const path = require("path");

module.exports.addOrganization = async (req, res) => {
  try {
    const {
      organizationName,
      organizationDomain,
      organizationSuffix,
      organizationColor1,
      organizationColor2,
      organizationPrivacyPolicy,
      organizationTermsOfService,
      organizationPhoneNumber,
      organizationSupportEmail,
      organizationAddress,
    } = req.body;
    // console.log("Org data >>", req.body);

    const alreadyExist = await Organizations.findOne({ organizationName });
    if (alreadyExist) {
      return res.status(400).json({ message: "Organization is already added" });
    }

    const organizationLogo = req.file
      ? `uploads/${req.file.filename.replace(/\\/g, "/")}`
      : null;

    const newOrganization = new Organizations({
      organizationName,
      organizationDomain,
      organizationSuffix,
      organizationColors: {
        color1: organizationColor1,
        color2: organizationColor2,
      },
      organizationLogo,
      organizationPrivacyPolicy,
      organizationTermsOfService,
      organizationPhoneNumber,
      organizationSupportEmail,
      organizationAddress,
    });

    await newOrganization.save();
    res.status(201).json({
      message: "Organization added successfully",
      organization: newOrganization,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add organization", error: error.message });
  }
};

module.exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organizations.find();
    res.status(200).json(organizations);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch organizations", error: error.message });
  }
};

module.exports.getOrganizationById = async (req, res) => {
  try {
    const { _id } = req.params;
    const organization = await Organizations.findById(_id);

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    res.status(200).json(organization);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch organization", error: error.message });
  }
};

module.exports.deleteOrganization = async (req, res) => {
  try {
    const { _id } = req.params;
    const organization = await Organizations.findById({ _id });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (organization.organizationLogo) {
      fs.unlink(organization.organizationLogo, (err) => {
        if (err) console.log("Error deleting logo file:", err);
      });
    }

    await Organizations.findByIdAndDelete({ _id });
    res.status(200).json({ message: "Organization deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while deleting organization" });
  }
};

module.exports.updateOrganization = async (req, res) => {
  try {
    const { _id } = req.params;
    const updates = {
      organizationName: req.body.organizationName,
      organizationDomain: req.body.organizationDomain,
      organizationSuffix: req.body.organizationSuffix,
      // organizationColor1: req.body.organizationColor1,
      // organizationColor2: req.body.organizationColor2,
      organizationPrivacyPolicy: req.body.organizationPrivacyPolicy,
      organizationTermsOfService: req.body.organizationTermsOfService,
      organizationSupportEmail: req.body.organizationSupportEmail,
      organizationPhoneNumber: req.body.organizationPhoneNumber,
      organizationAddress: req.body.organizationAddress,
      organizationColors: {
        color1: req.body.organizationColors.color1,
        color2: req.body.organizationColors.color2,
      },
    };

    const organization = await Organizations.findById(_id);
    if (!organization) {
      return res.status(404).json({ message: "Organization not found" });
    }

    if (req.file) {
      if (organization.organizationLogo) {
        fs.unlink(organization.organizationLogo, (err) => {
          if (err) console.log("Error deleting old logo file:", err);
        });
      }
      updates.organizationLogo = req.file.path;
    }

    const updatedOrganization = await Organizations.findByIdAndUpdate(
      _id,
      updates,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Organization updated successfully",
      data: updatedOrganization,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while updating organization" });
  }
};

module.exports.getOrganizationNameAndId = async (req, res) => {
  try {
    const organizations = await Organizations.find();
    if (organizations.length > 0) {
      let data = organizations.map((org) => {
        return { organizationName: org.organizationName, _id: org._id };
      });

      return res.status(200).json({ data });
    }
    res.status(400).json({ message: "Organizations not found" });
  } catch (error) {
    console.log("getOrganizationNameAndId >>", error);
    res.status(500).json({ message: "Server error", error });
  }
};
