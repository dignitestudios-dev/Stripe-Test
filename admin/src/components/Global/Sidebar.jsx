import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState("new-patients");
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("digniteToken");
    navigate("/login");
  };

  const navigateTo = (title, url) => {
    navigate(url);
    setActiveLink(title);
  };

  return (
    <div className="w-full flex flex-col items-start text-start gap-2 pt-10 px-14">
      <Link to="/" className="mx-auto mb-6">
        <img src="/logo.png" alt="logo" className="w-28" />
      </Link>

      <button
        type="button"
        onClick={() => navigateTo("new-patients", "/")}
        className={`w-full ${
          activeLink === "new-patients"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Employees
      </button>
      <button
        type="button"
        onClick={() => navigateTo("add-user", "/add-user")}
        className={`w-full ${
          activeLink === "add-user"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Add Employee
      </button>
      <button
        type="button"
        onClick={() => navigateTo("payment-links", "/payment-links")}
        className={`w-full ${
          activeLink === "payment-links"
            ? "bg-red-500 text-white"
            : "bg-white text-black"
        } py-2.5 px-4 lg:px-6 text-sm rounded-lg text-start`}
      >
        Payment Links
      </button>

      <button
        onClick={handleLogout}
        className="w-full text-black py-2.5 px-4 lg:px-6 text-sm text-start rounded-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
