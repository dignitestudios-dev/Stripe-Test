import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { LuLayoutDashboard } from "react-icons/lu";
import { LuUserPlus2 } from "react-icons/lu";
import { FaLink } from "react-icons/fa6";
import { PiLinkSimpleBold } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";
import { SlOrganization } from "react-icons/sl";

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
        <img src="/launchbox-logo.png" alt="logo" className="w-44 h-auto" />
      </Link>

      <button
        type="button"
        onClick={() => navigateTo("new-patients", "/")}
        className={`w-full ${
          activeLink === "new-patients"
            ? "red-bg text-white"
            : "bg-white text-black"
        } py-3 px-4 lg:px-4 text-[15px] rounded-lg text-start font-medium flex items-center gap-2`}
      >
        <LuLayoutDashboard className="text-xl" />
        <span>Employees</span>
      </button>

      {/* <button
        type="button"
        onClick={() => navigateTo("add-user", "/add-user")}
        className={`w-full ${
          activeLink === "add-user"
            ? "red-bg text-white"
            : "bg-white text-black"
        } py-3 px-4 lg:px-4 text-[14px] rounded-lg text-start font-medium flex items-center gap-2`}
      >
        <LuUserPlus2 className="text-xl" />
        <span>Add Employee</span>
      </button> */}

      <button
        type="button"
        onClick={() => navigateTo("payment-links", "/payment-links")}
        className={`w-full ${
          activeLink === "payment-links"
            ? "red-bg text-white"
            : "bg-white text-black"
        } py-3 px-4 lg:px-4 text-[14px] rounded-lg text-start font-medium flex items-center gap-2`}
      >
        <PiLinkSimpleBold className="text-xl" />
        <span>Payment Links</span>
      </button>

      <button
        type="button"
        onClick={() => navigateTo("organizations", "/organizations")}
        className={`w-full ${
          activeLink === "organizations"
            ? "red-bg text-white"
            : "bg-white text-black"
        } py-3 px-4 lg:px-4 text-[14px] rounded-lg text-start font-medium flex items-center gap-2`}
      >
        <SlOrganization className="text-xl" />
        <span>Organizations</span>
      </button>

      <button
        onClick={handleLogout}
        className="w-full text-black py-3 px-4 lg:px-4 text-sm text-start rounded-lg font-medium flex items-center gap-2"
      >
        <FiLogOut className="text-xl" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
