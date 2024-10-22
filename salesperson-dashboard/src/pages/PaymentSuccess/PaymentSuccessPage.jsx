import React from "react";

const PaymentSuccessPage = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white custom-shadow p-10 flex flex-col items-center gap-3">
        <img src="/check-image.png" alt="" className="w-32" />
        <h1 className="text-2xl font-semibold">Thank You</h1>
        <h2 className="text-gray-500/80 font-medium text-lg">
          Your payment was successful
        </h2>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
