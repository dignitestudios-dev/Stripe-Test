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

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { DBConnection } = require("./db/connection");

DBConnection();
require("./db/schema/customerSchema");

app.get("/", (req, res, next) =>
  res.status(200).json({ message: "Welcome to me app" })
);

app.use("/api/customers", require("./routes/customerRoutes"));

// app.post("/create-payment-intent", async (req, res) => {
//   try {
//     const { amount, currency, paymentMethodType } = req.body;

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: currency,
//       payment_method_types: [paymentMethodType],
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
