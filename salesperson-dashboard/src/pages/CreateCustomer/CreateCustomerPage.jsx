import React, { useEffect } from "react";
import CreateCustomerForm from "../../components/CreateCustomerForm/CreateCustomerForm";
import Cookies from "js-cookie";

const CreateCustomerPage = () => {
  useEffect(() => {
    document.title = "Create Payment Link";
  }, []);
  return (
    <div>
      <CreateCustomerForm />
    </div>
  );
};

export default CreateCustomerPage;
