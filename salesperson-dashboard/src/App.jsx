import { Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentFormPage from "./pages/PaymentForm/PaymentFormPage";
import CreateCustomerPage from "./pages/CreateCustomer/CreateCustomerPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import Layout from "./components/Global/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout children={<CustomersPage />} />} />
        <Route
          path="/create-customer"
          element={<Layout children={<CreateCustomerPage />} />}
        />
        {/* <Route
          path="/customers"
          element={<Layout children={<CustomersPage />} />}
        /> */}
      </Routes>
    </>
  );
}

export default App;
