module.exports.CreateCustomer = async (req, res) => {
  const {
    name,
    email,
    description,
    amount,
    salesPersonName,
    salesPersonDepartment,
  } = req.body;
  const numericAmount = parseFloat(amount);

  const unitAmount = numericAmount * 100;

  try {
    const price = await stripe.prices.create({
      product: "prod_R2k9gTnILO5u6f",
      unit_amount: unitAmount,
      currency: "usd",
      nickname: description,
      metadata: {
        title: "Demo Title",
        description,
      },
    });

    // Step 2: Create a customer in your database
    const customer = await Customers.create({
      name,
      email,
      description,
      amount,
      salesPersonName,
      salesPersonDepartment,
      // statementDescriptorSuffix: "Thank you DIGS CTS",
      priceId: price.id,
    });

    const pageUrl = `https://client-payment-form.vercel.app/${price.id}`;
    customer.pageUrl = pageUrl;
    await customer.save();

    res.status(201).json({
      message: "Customer created",
      customer,
      priceId: price.id,
      pageUrl,
    });
  } catch (error) {
    console.log("create customer err >> ", error);
    res.status(500).json({ message: "Server error" });
  }
};

// module.exports.CreatePaymentIntent = async (req, res) => {
//   const { priceId, name, email } = req.body;
//   console.log("priceId >> ", req.body);

//   try {
//     const customer = await stripe.customers.create({
//       name: name,
//       email: email,
//     });
//     console.log("Customer created >> ", customer);

//     const price = await stripe.prices.retrieve(priceId);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: price.unit_amount,
//       currency: "usd",
//       payment_method_types: ["card"],
//       customer: customer.id,
//     });

//     res.status(200).json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.log("create payment intent err >> ", error);
//     res.status(500).json({ message: "Failed to create payment intent" });
//   }
// };

module.exports.CreatePaymentIntent = async (req, res) => {
  const { priceId, name, email } = req.body;
  console.log("priceId >> ", req.body);

  try {
    // 1. Check if the customer already exists
    const customers = await stripe.customers.list({
      email: email,
      limit: 1, // We only need one customer
    });

    let customer;

    // 2. If the customer exists, use the existing customer
    if (customers.data.length > 0) {
      customer = customers.data[0];
      console.log("Existing customer found: ", customer.id);
    } else {
      // 3. If no customer exists, create a new customer
      customer = await stripe.customers.create({
        name: name,
        email: email,
      });
      console.log("New customer created: ", customer.id);
    }

    // 4. Retrieve the price details
    const price = await stripe.prices.retrieve(priceId);

    // 5. Create a payment intent for the existing or new customer
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customer.id,
    });

    // 6. Send the client secret back to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("create payment intent err >> ", error);
    res.status(500).json({ message: "Failed to create payment intent" });
  }
};
