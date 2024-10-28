import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import paymentServices from "./services/paymentServices";
import { BASE_URL } from "./api";
import SocialLinks from "./SocialLinks";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { priceId } = useParams();
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const [projectDescription, setProjectDescription] = useState("");
  const [descriptorSuffix, setDescriptorSuffix] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [org, setOrg] = useState(null);
  console.log("descriptorSuffix >", descriptorSuffix);

  useEffect(() => {
    const fetchCustomerInfo = async () => {
      try {
        const res = await paymentServices.handleFetchCustomerByPriceId(priceId);
        console.log("customer info >> ", res.data);
        setCustomerEmail(res?.data?.email);
        setCustomerName(res?.data?.name);
        setAmount(res?.data?.amount);
        setProjectDescription(res?.data?.description);
        setProjectTitle(res?.data?.projectTitle);
        setDescriptorSuffix(
          res?.data?.salesPerson?.organization?.organizationSuffix || ""
        );
        setOrg(res?.data?.salesPerson?.organization);
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
      `${BASE_URL}/customers/payment/create-payment-intent`,
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
    <div className="py-12 min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 relative">
      {/* <div className="w-full bg-gradient-to-r from-[#00C0FE] to-[#A6C820] h-[40vh] absolute top-0"></div> */}

      <div className="padding-x w-full z-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-20">
        <div className="flex flex-col items-start justify-between gap-4 w-full">
          <div className="flex flex-col items-start justify-center gap-6 w-full">
            <div className="flex justify-start">
              <img
                // src="/logo-1-ft.png"
                src={`http://localhost:2000/${org?.organizationLogo}`}
                alt="logo"
                className="bg-contain"
              />
            </div>
            <div className="flex items-center justify-between lg:mt-5 w-full">
              <p className="text-xl font-semibold">{projectTitle}</p>
              <p className="text-xl font-medium">${amount}.00</p>
            </div>
            <p className="text-base font-normal">{projectDescription}</p>
          </div>
          <div className="w-full flex items-center justify-between lg:mt-5 border-t-2 pt-5">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xl font-medium">${amount}.00</p>
          </div>
          <div className="w-full hidden lg:block">
            <SocialLinks />
          </div>
        </div>
        <form
          onSubmit={handlePayment}
          className="w-full px-6 lg:px-16 py-12 lg:py-20 mx-auto bg-white custom-shadow"
        >
          <div className="w-full flex flex-col gap-6 mb-6">
            {/* <h1 className="font-semibold text-xl lg:text-xl text-red-500 text-center mb-5">
              Dignite Studios <br />
              <span className="text-base text-gray-500/70 mt-2">
                Payment Link
              </span>
            </h1> */}

            <p className="text-red-500 text-center">{errorMessage}</p>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className="font-medium text-sm">
                Name on card
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full border p-3 outline-none text-[15px] text-gray-600"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="font-medium text-sm">
                Email
              </label>
              <input
                type="email"
                placeholder="Email address"
                name="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full border p-3 outline-none text-[15px] text-gray-600"
              />
            </div>
            {/* <div className="flex flex-col gap-1">
              <label htmlFor="amount" className="font-medium text-sm">
                Amount
              </label>
              <input
                type="text"
                placeholder=""
                name=""
                disabled
                value={`$${amount}`}
                className="w-full border p-3 outline-none text-[15px] text-gray-600 bg-white"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="projectTitle" className="font-medium text-sm">
                Project Title
              </label>
              <input
                type="text"
                placeholder=""
                name=""
                disabled
                value={projectDescription}
                className="w-full border p-3 outline-none text-[15px] text-gray-600 bg-white"
              />
            </div> */}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="cardInfo" className="font-medium text-sm">
              Card information
            </label>
            <CardElement />
          </div>
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
              className={`text-white px-5 py-3 w-full text-sm font-medium mt-3.5`}
              style={{ background: org?.organizationColors?.color1 }}
            >
              {isProcessing ? "Processing..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
      <div className="w-full lg:hidden">
        <SocialLinks org={org} />
      </div>
    </div>
  );
};

export default PaymentForm;
