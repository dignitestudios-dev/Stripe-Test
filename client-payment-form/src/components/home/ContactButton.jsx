import React from "react";
import { Link } from "react-router-dom";

const ContactButton = ({ title }) => {
  return (
    <Link
      to={`/`}
      className="bg-blue-600 text-white px-6 py-4 rounded-full font-semibold btn-shadow"
    >
      {title}
    </Link>
  );
};

export default ContactButton;
