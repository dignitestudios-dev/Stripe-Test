import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateCustomerPage from "./pages/CreateCustomer/CreateCustomerPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import Layout from "./components/Global/Layout";
import PaymentFormPage from "./pages/PaymentForm/PaymentFormPage";
import { ToastContainer } from "react-toastify";
import PaymentSuccessPage from "./pages/PaymentSuccess/PaymentSuccessPage";

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
        {/* <Route path="/:priceId" element={<PaymentFormPage />} />
        <Route
          path="/:priceId/payment-success"
          element={<PaymentSuccessPage />}
        /> */}
        <Route
          path="/create-customer"
          element={<Layout children={<CreateCustomerPage />} />}
        />
      </Routes>
    </>
  );
}

export default App;
