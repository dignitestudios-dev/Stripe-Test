const express = require("express");
const {
  CreateCustomer,
  GetCustomers,
  CreatePaymentIntent,
  GetCustomerInfo,
  ArchivePrice,
  GetCustomerById,
  TogglePaymentStatus,
} = require("../controller/customerController");
const router = express.Router();

router.post("/create-customer", CreateCustomer);
router.get("/get-customers", GetCustomers);
router.get("/get-customers/:_id", GetCustomerById);
router.post("/payment/create-payment-intent", CreatePaymentIntent);

router.get("/get-customer/:priceId", GetCustomerInfo);

router.delete("/delete-customer", ArchivePrice);

router.put("/payment-status/:priceId", TogglePaymentStatus);

module.exports = router;
