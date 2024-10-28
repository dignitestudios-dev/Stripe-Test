const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const cors = require("cors");
const bodyParser = require("body-parser");
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const { DBConnection } = require("./db/connection");

DBConnection();
// schemas
require("./db/schema/customerSchema");
require("./db/schema/adminSchema");
require("./db/schema/employeeSchema");
require("./db/schema/adminOtpSchema");
require("./db/schema/organizationSchema");

app.get("/", (req, res, next) =>
  res.status(200).json({ message: "Welcome to me app" })
);

// admin routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/customers", require("./routes/customerRoutes"));
app.use("/api/employee", require("./routes/employeeRoutes"));
app.use("/api/admin", require("./routes/organizationRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
