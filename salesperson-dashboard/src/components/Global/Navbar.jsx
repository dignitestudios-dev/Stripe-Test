import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("dgEmployeeToken");
    navigate("/login");
  };
  return (
    <div className="py-6 padding-x flex items-center justify-between">
      <h1 className="tetx-xl font-semibold text-red-600">LaunchBox</h1>

      <div className="flex items-center justify-end gap-6">
        <Link to={"/"} className="text-sm font-medium">
          Form List
        </Link>
        <Link to={"/create-customer"} className="text-sm font-medium">
          Create Customer
        </Link>
        <button
          type="button"
          onClick={handleLogout}
          className="text-sm font-medium text-red-600"
        >
          Logout
        </button>
        {/* <Link to={"/customers"} className="text-sm font-medium">
          Customers
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
