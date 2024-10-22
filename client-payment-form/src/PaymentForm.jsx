import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import paymentServices from "./services/paymentServices";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { priceId } = useParams();
  console.log(priceId);
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState("");
  const [descriptorSuffix, setDescriptorSuffix] = useState("");

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const res = await paymentServices.handleFetchCustomerByPriceId(priceId);
        console.log("customer info >> ", res.data);
        setCustomerEmail(res?.data?.email);
        setCustomerName(res?.data?.name);
        setAmount(res?.data?.amount);
        setProjectDescription(res?.data?.description);
        setDescriptorSuffix(res?.data?.descriptorSuffix);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCustomerInfo();
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!customerName) {
      setErrorMessage("Name can not be empty");
      return;
    }
    if (!customerEmail) {
      setErrorMessage("Email can not be empty");
      return;
    }
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);

    // Call backend to create the payment intent
    const response = await fetch(
      "http://localhost:2000/api/customers/payment/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          priceId,
          email: customerEmail,
          name: customerName,
          descriptorSuffix,
        }), // Send the priceId to create Payment Intent
      }
    );

    // Handle any errors in the fetch call
    if (!response.ok) {
      const error = await response.json();
      setErrorMessage(error.message || "Failed to create payment intent");
      setIsProcessing(false);
      return;
    }

    const { clientSecret } = await response.json();

    // Confirm the card payment
    const { error: confirmError } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (confirmError) {
      setErrorMessage(confirmError.message);
    } else {
      navigate("payment-success");
      // alert("Payment successful");
      console.log("Payment successful");
    }

    setIsProcessing(false);
  };

  return (
    <div className="padding-x py-6 min-h-screen w-full flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handlePayment}
        className="w-full lg:w-[50%] px-6 lg:px-16 py-12 lg:py-20 mx-auto bg-white custom-shadow"
      >
        <div className="w-full flex flex-col gap-6 mb-6">
          <h1 className="font-semibold text-xl lg:text-xl text-red-500 text-center mb-5">
            Dignite Studios <br />
            <span className="text-base text-gray-500/70 mt-2">
              Payment Link
            </span>
          </h1>

          <p className="text-red-500 text-center">{errorMessage}</p>
          <div>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="w-full border p-3 outline-none text-[15px] text-gray-600"
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email address"
              name="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              className="w-full border p-3 outline-none text-[15px] text-gray-600"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder=""
              name=""
              disabled
              value={`$${amount}`}
              className="w-full border p-3 outline-none text-[15px] text-gray-600"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder=""
              name=""
              disabled
              value={projectDescription}
              className="w-full border p-3 outline-none text-[15px] text-gray-600"
            />
          </div>
        </div>
        <CardElement />
        {errorMessage && <div>{errorMessage}</div>}
        <div className="w-full flex justify-between items-center mt-3">
          {/* <div>
            <p className="font-medium text-sm text-gray-500">
              Amount: <span>${amount}</span>
            </p>
          </div> */}
          <button
            type="submit"
            disabled={!stripe || isProcessing}
            className="bg-red-500 text-white px-5 py-3 w-full text-sm font-medium mt-3.5"
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
