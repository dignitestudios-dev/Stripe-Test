import React from "react";

const SocialLinks = () => {
  return (
    <div className="w-full flex items-center justify-start gap-x-6 mt-7 px-5 lg:px-0">
      <p className="text-sm text-gray-600">
        Powered by{" "}
        <a
          target="_blank"
          href="https://stripe.com/"
          className="text-gray-600 font-medium"
        >
          Stripe
        </a>
      </p>
      <div className="h-8 border border-gray-300" />
      <a
        target="_blank"
        href={`https://www.clicktapsolutions.com/assets/privacy.html`}
        className="text-sm text-gray-600"
      >
        Privacy Policy
      </a>
      <div className="h-8 border border-gray-300" />
      <a
        target="_blank"
        href={`https://www.clicktapsolutions.com/assets/condition.html`}
        className="text-sm text-gray-600"
      >
        Terms & Conditions
      </a>
    </div>
  );
};

export default SocialLinks;
