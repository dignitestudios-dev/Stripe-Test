import React from "react";

const SocialLinks = ({ org }) => {
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
        href={`https://${org?.organizationPrivacyPolicy}`}
        className="text-sm text-gray-600"
      >
        Privacy Policy
      </a>
      <div className="h-8 border border-gray-300" />
      <a
        target="_blank"
        href={`https://${org?.organizationTermsOfService}`}
        className="text-sm text-gray-600"
      >
        Terms & Conditions
      </a>
    </div>
  );
};

export default SocialLinks;
