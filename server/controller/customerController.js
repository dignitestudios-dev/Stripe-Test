const mongoose = require("mongoose");
const Customers = mongoose.model("Customers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

module.exports.CreateCustomer = async (req, res) => {
  const {
    name,
    email,
    description,
    amount,
    salesPersonName,
    salesPersonDepartment,
    projectTitle,
    descriptorSuffix,
  } = req.body;

  const numericAmount = parseFloat(amount);
  const unitAmount = numericAmount * 100;

  try {
    // Step 1: Check if the customer already exists in Stripe
    let stripeCustomer;
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (customers.data.length > 0) {
      stripeCustomer = customers.data[0];
    } else {
      // If no customer exists, create a new customer in Stripe
      stripeCustomer = await stripe.customers.create({
        name,
        email,
      });
    }

    // Step 2: Create a new product on Stripe
    const product = await stripe.products.create({
      name: projectTitle || description,
      description: `Product ordered by ${name}`,
      // metadata: {
      //   salesPersonName,
      //   salesPersonDepartment,
      //   customerEmail: email,
      // },
    });

    // Step 3: Create a price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency: "usd",
      nickname: description,
      // metadata: {
      //   title: projectTitle || "Demo Title",
      //   description,
      // },
    });

    // Step 4: Store the customer in your local database
    const customer = await Customers.create({
      name,
      email,
      description,
      amount,
      salesPersonName,
      salesPersonDepartment,
      productId: product.id,
      priceId: price.id,
      projectTitle,
      descriptorSuffix,
    });

    // Step 5: Generate a payment form URL
    const pageUrl = `https://stripe-test-pdm7.vercel.app/${price.id}`;
    customer.pageUrl = pageUrl;
    await customer.save();

    res.status(201).json({
      message: "Customer and product created",
      customer,
      productId: product.id,
      priceId: price.id,
      pageUrl,
    });
  } catch (error) {
    console.log("create customer error >> ", error);
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.CreatePaymentIntent = async (req, res) => {
  const { priceId, name, email, descriptorSuffix } = req.body;

  try {
    // Step 1: Retrieve or create the customer
    const customers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    let customer;

    if (customers.data.length > 0) {
      customer = customers.data[0];
    } else {
      customer = await stripe.customers.create({
        name,
        email,
      });
    }

    // Step 2: Retrieve the price details
    const price = await stripe.prices.retrieve(priceId);

    // Step 3: Create a payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price.unit_amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customer.id,
      statement_descriptor_suffix: descriptorSuffix,
      metadata: {
        priceId: priceId,
        productTitle: price.metadata.title,
        description: price.metadata.description,
      },
    });
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: price.unit_amount,
    //   currency: "usd",
    //   payment_method_types: ["card"],
    //   customer: customer.id,
    //   metadata: {
    //     priceId: priceId,
    //     productTitle: price.metadata.title,
    //     description: price.metadata.description,
    //   },
    // });

    // Step 4: Send the client secret to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("create payment intent err >> ", error);
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

module.exports.GetCustomers = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.GetCustomerInfo = async (req, res) => {
  try {
    const { priceId } = req.params;

    if (!priceId || priceId == null) {
      return res.status(400).json({ message: "Price ID not found" });
    }

    const customer = await Customers.findOne({ priceId });
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer found", data: customer });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
};

module.exports.ArchivePrice = async (req, res) => {
  const { priceId } = req.body;
  console.log(priceId);
  try {
    if (!priceId) {
      return res.status(403).json({ message: "Please provide price id" });
    }

    const archivedPrice = await stripe.prices.update(priceId, {
      active: false,
    });

    const priceForm = await Customers.findOneAndDelete({ priceId });

    if (!priceForm) {
      return res
        .status(404)
        .json({ message: "Price not found in the database" });
    }

    res.status(200).json({
      message: "Price archived successfully from both database and Stripe",
      archivedPrice,
    });
  } catch (error) {
    console.log("Error archiving price >> ", error);
    res.status(500).json({
      message: "Failed to archive price",
      error: error.message,
    });
  }
};
