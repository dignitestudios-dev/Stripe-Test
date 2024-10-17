import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="py-6 padding-x flex items-center justify-between">
      <h1 className="tetx-xl font-semibold text-red-500">Dignite Studios</h1>

      <div className="flex items-center justify-end gap-6">
        <Link to={"/"} className="text-sm font-medium">
          Form List
        </Link>
        <Link to={"/create-customer"} className="text-sm font-medium">
          Create Customer
        </Link>
        {/* <Link to={"/customers"} className="text-sm font-medium">
          Customers
        </Link> */}
      </div>
    </div>
  );
};

export default Navbar;
