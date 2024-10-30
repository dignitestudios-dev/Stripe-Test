import React from "react";

const SocialLinks = ({ org }) => {
  return (
    <div className="w-full flex items-center justify-center gap-x-6 mt-7 px-5 lg:px-0">
      <a
        target="_blank"
        href={`https://${org?.organizationPrivacyPolicy}`}
        className="text-xs text-gray-600"
      >
        Privacy Policy
      </a>
      <a
        target="_blank"
        href={`https://${org?.organizationTermsOfService}`}
        className="text-xs text-gray-600"
      >
        Terms & Conditions
      </a>
    </div>
  );
};

export default SocialLinks;
