import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";

const stripePromise = loadStripe(
  "pk_test_51PiQ2kRv1Ud7Q4L2gaztmYGBANqXoUjX6VPvEffqs2AExjN0wcRK8pxRuS1DZ15B2CaRm7gEJ6YDt3eGyDSoJF9X00AxzW8Bxr"
);

const CheckoutForm = ({ clientSecret }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:2000/api/customers/get-customers`
        );
        const data = await res.json();
        console.log("data >> ", data.data[0]);
        setProduct(data.data[0]);
      } catch (error) {
        console.log("error >> ", error);
      }
    };

    fetchItemDetails();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: "John Doe", // Use customer details dynamically here
          },
        },
      }
    );

    if (error) {
      setError(`Payment failed: ${error.message}`);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment succeeded!");
    }

    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Pay for {product?.name}</h3>
      <p>{product?.description}</p>
      <p>Amount: ${(product?.amount / 100).toFixed(2)}</p>
      <CardElement />
      <button disabled={isProcessing || !stripe}>Pay</button>
      {error && <div>{error}</div>}
    </form>
  );
};

const PaymentPage = ({ clientSecret }) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm clientSecret={clientSecret} />
    </Elements>
  );
};

export default PaymentPage;
