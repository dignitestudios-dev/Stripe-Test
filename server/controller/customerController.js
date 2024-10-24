const mongoose = require("mongoose");
const Customers = mongoose.model("Customers");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// module.exports.CreateCustomer = async (req, res) => {
//   const { name, email, phone, description, amount } = req.body;

//   try {
//     const price = await stripe.prices.create({
//       product: "prod_R2ffDoIZPGrcNg",
//       unit_amount: amount * 100,
//       currency: "usd",
//       nickname: description,
//       metadata: {
//         title: "Demo Title",
//         description,
//       },
//       // statement_descriptor_suffix: "Thank you from DIGS - CTS",
//     });

//     console.log(price);

//     const customer = await Customers.create({
//       name,
//       email,
//       phone,
//       description,
//       amount,
//     });

//     const pageUrl = `https://dignite-payment-form.vercel.app/${customer._id}`;
//     customer.pageUrl = pageUrl;
//     await customer.save();

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: price.id,
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // payment_intent_data: {
//       //   statement_descriptor_suffix: "Thank you DIGS CTS",
//       // },
//       success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:5173/cancel`,
//     });

//     // Step 4: Return the session URL to the client
//     // res.status(200).json({ url: session.url });

//     res
//       .status(201)
//       .json({ message: "Customer created", customer, url: session.url });
//   } catch (error) {
//     console.log("create customer err >> ", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports.CreateCustomer = async (req, res) => {
//   const { name, email, phone, description, amount } = req.body;

//   try {
//     // Step 1: Create a price for an existing product
//     const price = await stripe.prices.create({
//       product: "prod_R2ffDoIZPGrcNg", // Your existing product ID
//       unit_amount: amount * 100, // Amount in cents
//       currency: "usd",
//       nickname: description, // Optional
//       metadata: {
//         title: "Demo Title",
//         description,
//       },
//     });

//     // Step 2: Create a customer in your database
//     const customer = await Customers.create({
//       name,
//       email,
//       phone,
//       description,
//       amount,
//     });

//     const pageUrl = `https://dignite-payment-form.vercel.app/${customer._id}`;
//     customer.pageUrl = pageUrl;
//     await customer.save();

//     // Step 3: Create a Checkout Session with a dynamic statement descriptor suffix
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: price.id, // Attach the dynamic price ID
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       payment_intent_data: {
//         // Dynamically set the statement descriptor suffix
//         statement_descriptor_suffix: "Thank you DIGS CTS", // Use the value passed from the request or a default
//       },
//       success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:5173/cancel`,
//     });

//     // Step 4: Return the session URL to the client
//     res
//       .status(201)
//       .json({ message: "Customer created", customer, url: session.url });
//   } catch (error) {
//     console.log("create customer err >> ", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// module.exports.CreateCustomer = async (req, res) => {
//   const { name, email, phone, description, amount, statementSuffix } = req.body;

//   try {
//     // Step 1: Create a price for the product
//     const price = await stripe.prices.create({
//       product: "prod_R2ffDoIZPGrcNg", // Your existing product ID
//       unit_amount: amount * 100, // Amount in cents
//       currency: "usd",
//       nickname: description, // Optional
//       metadata: {
//         title: "Demo Title",
//         description,
//       },
//     });

//     // Step 2: Create a customer in your database
//     const customer = await Customers.create({
//       name,
//       email,
//       phone,
//       description,
//       amount,
//       statementDescriptorSuffix: statementSuffix || "Thank you DIGS CTS", // Store statement descriptor in DB
//       priceId: price.id, // Store the price ID for future use
//     });

//     const pageUrl = `https://dignite-payment-form.vercel.app/${customer._id}`;
//     customer.pageUrl = pageUrl;
//     await customer.save();

//     // Step 3: Create a Checkout Session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: price.id, // Attach the dynamic price ID
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       payment_intent_data: {
//         // Dynamically set the statement descriptor suffix
//         statement_descriptor_suffix: customer.statementDescriptorSuffix,
//       },
//       success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `http://localhost:5173/cancel`,
//     });

//     // Store session details in the customer object
//     customer.sessionUrl = session.url;
//     await customer.save();

//     // Step 4: Return the session URL and customer data to the client
//     res
//       .status(201)
//       .json({ message: "Customer created", customer, url: session.url });
//   } catch (error) {
//     console.log("create customer err >> ", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

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
      statement_descriptor_suffix: descriptorSuffix || "mydescriptor",
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
