import React, { useEffect } from "react";
import CreateCustomerForm from "../../components/CreateCustomerForm/CreateCustomerForm";

const CreateCustomerPage = () => {
  useEffect(() => {
    document.title = "Cretae Payment Link";
  }, []);
  return (
    <div>
      <CreateCustomerForm />
    </div>
  );
};

export default CreateCustomerPage;
