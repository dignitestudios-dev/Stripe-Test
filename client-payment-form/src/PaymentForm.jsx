import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import paymentServices from "./services/paymentServices";
import { BASE_URL, IMAGE_BASE_URL } from "./api";
import SocialLinks from "./SocialLinks";
import axios from "axios";

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

  useEffect(() => {
    // if (org) {
    //   document.title = org?.organizationName;
    // } else {
    //   document.title = "Authorized Billing";
    // }
    const fetchCustomerInfo = async () => {
      try {
        const res = await paymentServices.handleFetchCustomerByPriceId(priceId);
        // console.log("customer info >> ", res.data);
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

  const updatePaymentStatus = async () => {
    try {
      const res = await axios.put(
        `${BASE_URL}/customers/payment-status/${priceId}`,
        { paymentStatus: "Failed" }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

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

    try {
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
            descriptorSuffix:
              org?.organizationName === "Dignite Studios"
                ? ""
                : descriptorSuffix,
          }),
        }
      );

      const res = await response.json();
      if (!response.ok) {
        await handleFailedPayment(
          res.message || "Failed to create payment intent"
        );
        return;
      }

      const { clientSecret } = res;
      if (!clientSecret) {
        console.log("clientSecret failed >>", clientSecret);
        await handleFailedPayment("Client secret not retrieved.");
        return;
      }

      const { error: confirmError } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: cardElement },
        }
      );

      if (confirmError) {
        await handleFailedPayment(confirmError.message);
      } else {
        navigate("payment-success");
        console.log("Payment successful");
      }
    } catch (error) {
      console.error("Payment error >>", error);
      await handleFailedPayment(
        error.message || "Unknown error occurred during payment."
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFailedPayment = async (message) => {
    setErrorMessage(message);
    try {
      await updatePaymentStatus();
    } catch (error) {
      console.error("Failed to update payment status >>", error);
    }
    setIsProcessing(false);
  };

  return (
    <div className="py-12 min-h-screen w-full flex flex-col items-center justify-center bg-gray-100 relative">
      <div className="padding-x w-full z-20 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-20">
        <div className="flex flex-col items-start justify-between gap-4 w-full">
          <div className="flex flex-col items-start justify-center gap-6 w-full">
            <div className="flex justify-start">
              <img
                src={`${IMAGE_BASE_URL}/${org?.organizationLogo}`}
                alt="logo"
                className="bg-contain max-w-[50%]"
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
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Phone No: </span>{" "}
              {org?.organizationPhoneNumber}
            </p>
            <p className="text-sm text-gray-600 my-1.5">
              <span className="font-semibold">Support Email: </span>{" "}
              {org?.organizationSupportEmail}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-semibold">Address: </span>{" "}
              {org?.organizationAddress}
            </p>
          </div>
          <div></div>
        </div>
        <div className="">
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
            <div className="w-full mt-10 border-2 p-3 rounded-xl border-blue-700 text-center">
              <p className="text-sm text-gray-600 font-medium">
                Powered by{" "}
                <a
                  target="_blank"
                  href="https://stripe.com/"
                  className="font-bold text-blue-700"
                >
                  Stripe
                </a>
              </p>
            </div>
          </form>
          <div className="w-full hidden lg:block">
            <SocialLinks />
          </div>
        </div>
      </div>
      <div className="w-full lg:hidden">
        <SocialLinks org={org} />
      </div>
      <div className="w-full padding-x mt-5 lg:hidden">
        <p className="text-sm text-gray-600 my-1.5">
          <span className="font-semibold">Support Email: </span>{" "}
          {org?.organizationSupportEmail}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Phone No: </span>{" "}
          {org?.organizationPhoneNumber}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Address: </span>{" "}
          {org?.organizationAddress}
        </p>
      </div>
    </div>
  );
};

export default PaymentForm;
