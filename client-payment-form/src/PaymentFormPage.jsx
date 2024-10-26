import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { useEffect } from "react";
const KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
// fit110 pb_key
// const stripePromise = loadStripe(
//   "pk_live_51PgA9YC8RyYZZPssTu0IgALckWS1Wgm8LbvlstOxTf4okOKi60K341V3xZH1fmQKKJs1NVrL6f6bt8HmwFKVBKnB00jnGo8bZo"
// );

// Dignite pb_key
const stripePromise = loadStripe(
  "pk_live_51LFwmKA6pffrHFlzgfCnZns4MnSgd7MYsktlyadTvw5lHBwCUk8VZId2asjmXGD1wGYe4iIJpuZhFqJvNFAxc7qZ00DX3OMpir"
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
