import { Routes, Route } from "react-router-dom";
import "./App.css";
import PaymentFormPage from "./pages/PaymentForm/PaymentFormPage";
import CreateCustomerPage from "./pages/CreateCustomer/CreateCustomerPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import Layout from "./components/Global/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition:Bounce
      />
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
