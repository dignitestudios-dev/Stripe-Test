import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/PaymentForm/PaymentForm";
import { useEffect } from "react";
const KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(KEY);

function PaymentFormPage() {
  useEffect(() => {
    document.title = "Pyament Form";
  }, []);
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
}

export default PaymentFormPage;
