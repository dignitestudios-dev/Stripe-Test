import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "../../components/PaymentForm/PaymentForm";

const stripePromise = loadStripe(
  "pk_test_51OyvorBEJbyBfiqfeh5m47kbjAqdhUzzkFRBNGwGMf4jHYyzlkgLmDCYsHOkP3YuAxbo9ZXJHGoBFwducz9ATi4x00rxKcBaIX"
);

const PaymentFormPage = () => {
  return (
    <div>
      <Elements stripe={stripePromise}>
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default PaymentFormPage;
