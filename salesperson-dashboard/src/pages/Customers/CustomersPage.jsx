import React, { useEffect } from "react";
import CustomersList from "../../components/Customers/CustomersList";

const CustomersPage = () => {
  useEffect(() => {
    document.title = "Payment Links";
  }, []);
  return (
    <div>
      <CustomersList />
    </div>
  );
};

export default CustomersPage;
