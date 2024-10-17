import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setErrorMessage(error.message);
      setIsProcessing(false);
      return;
    }

    // Call backend to create the payment intent
    const response = await fetch(
      "http://localhost:2000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: 1000,
          currency: "usd",
          paymentMethodType: "card",
        }),
      }
    );
    const { clientSecret } = await response.json();

    // Confirm the card payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setErrorMessage(confirmError.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful");
      console.log("Payment successful");
    } else {
      console.log("3D Secure authentication needed");
    }

    setIsProcessing(false);
  };

  return (
    <div className="padding-x py-6">
      <form onSubmit={handlePayment} className="">
        <CardElement />
        {errorMessage && <div>{errorMessage}</div>}
        <button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-medium mt-3"
        >
          {isProcessing ? "Processing..." : "Pay"}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
