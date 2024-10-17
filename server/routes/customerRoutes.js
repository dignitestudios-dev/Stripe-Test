const express = require("express");
const {
  CreateCustomer,
  GetCustomers,
  CreatePaymentIntent,
  GetCustomerInfo,
  ArchivePrice,
} = require("../controller/customerController");
const router = express.Router();

router.post("/create-customer", CreateCustomer);
router.get("/get-customers", GetCustomers);
router.post("/payment/create-payment-intent", CreatePaymentIntent);

router.get("/get-customer/:priceId", GetCustomerInfo);

router.delete("/delete-customer", ArchivePrice);

module.exports = router;
