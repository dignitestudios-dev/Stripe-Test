const mongoose = require("mongoose");
const Customers = mongoose.model("Customers");
const Employees = mongoose.model("Employees");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// https://stripe-test-pdm7.vercel.app

module.exports.CreateCustomer = async (req, res) => {
  const { name, email, salesPerson, projectTitle, description, amount } =
    req.body;
  if (!name) {
    return res.status(400).json({ message: "Client name is required" });
  }
  if (!email) {
    return res.status(400).json({ message: "Client email is required" });
  }
  if (!salesPerson) {
    return res.status(400).json({ message: "User id is required" });
  }
  if (!projectTitle) {
    return res.status(400).json({ message: "Project title is required" });
  }
  if (!description) {
    return res.status(400).json({ message: "Product description is required" });
  }
  if (!amount) {
    return res.status(400).json({ message: "Amount is required" });
  }

  const sales_person = await Employees.findById(salesPerson).populate({
    path: "organization",
    model: "Organizations",
    select:
      "organizationName organizationDomain organizationSuffix organizationPhoneNumber organizationSupportEmail organizationAddress",
  });

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
      description: description || "",
    });

    // Step 3: Create a price for the product
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: unitAmount,
      currency: "usd",
      nickname: description,
    });

    // Step 4: Store the customer in your local database
    const customer = await Customers.create({
      name,
      email,
      amount,
      salesPerson,
      projectTitle,
      description,
      productId: product.id,
      priceId: price.id,
    });

    // Step 5: Generate a payment form URL
    const pageUrl = `https://${sales_person?.organization?.organizationDomain}.authorizedbilling.com/${price.id}`;
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

    // Step 3: Create payment intent options
    const paymentIntentOptions = {
      amount: price.unit_amount,
      currency: "usd",
      payment_method_types: ["card"],
      customer: customer.id,
      setup_future_usage: "off_session",
      metadata: {
        priceId: priceId,
        productTitle: price.metadata.title,
        description: price.metadata.description,
      },
    };

    if (descriptorSuffix) {
      paymentIntentOptions.statement_descriptor_suffix = descriptorSuffix;
    }

    // Step 4: Create the payment intent with options
    const paymentIntent = await stripe.paymentIntents.create(
      paymentIntentOptions
    );

    // Step 5: Send the client secret to the client
    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.log("create payment intent err >> ", error);
    res.status(500).json({ message: "Failed to create payment intent", error });
  }
};

module.exports.TogglePaymentStatus = async (req, res) => {
  try {
    const { priceId } = req.params;
    const { paymentStatus } = req.body;

    const paymentLink = await Customers.findOne({ priceId });
    if (!paymentLink) {
      return res.status(404).json({ message: "Price not found" });
    }
    await Customers.findOneAndUpdate(
      { priceId },
      { paymentStatus: paymentStatus },
      { new: true }
    );
    res.status(200).json({ message: "Payment status updated" });
  } catch (error) {
    console.log("togglePaymentStatus error >>", error);
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports.GetCustomers = async (req, res) => {
  try {
    const customers = await Customers.find().populate({
      path: "salesPerson",
      model: "Employees",
      select: "name organization",
      populate: {
        path: "organization",
        model: "Organizations",
        select: "organizationName organizationDomain organizationSuffix",
      },
    });
    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.GetCustomerById = async (req, res) => {
  try {
    const { _id } = req.params;

    const customers = await Customers.find({ salesPerson: _id }).populate({
      path: "salesPerson",
      model: "Employees",
      select: "name organization",
      populate: {
        path: "organization",
        model: "Organizations",
        select:
          "organizationName organizationDomain organizationSuffix organizationPhoneNumber organizationSupportEmail organizationAddress",
      },
    });
    res.status(200).json({ data: customers });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

module.exports.GetCustomerInfo = async (req, res) => {
  try {
    const { priceId } = req.params;
    // console.log(priceId);

    if (!priceId || priceId == null) {
      return res.status(400).json({ message: "Price ID not found" });
    }

    const customer = await Customers.findOne({ priceId }).populate({
      path: "salesPerson",
      model: "Employees",
      select: "name organization",
      populate: {
        path: "organization",
        model: "Organizations",
        select:
          "organizationName organizationDomain organizationSuffix organizationLogo organizationColors organizationPrivacyPolicy organizationTermsOfService organizationPhoneNumber organizationSupportEmail organizationAddress",
      },
    });
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
  // console.log(priceId);
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
