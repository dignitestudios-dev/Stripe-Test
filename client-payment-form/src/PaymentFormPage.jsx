import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
const KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(
  "pk_live_51PgA9YC8RyYZZPssTu0IgALckWS1Wgm8LbvlstOxTf4okOKi60K341V3xZH1fmQKKJs1NVrL6f6bt8HmwFKVBKnB00jnGo8bZo"
);

function PaymentFormPage() {
  return (
    <>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </>
  );
}

export default PaymentFormPage;
