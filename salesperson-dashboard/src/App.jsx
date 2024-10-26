import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateCustomerPage from "./pages/CreateCustomer/CreateCustomerPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import Layout from "./components/Global/Layout";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/routes";

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

      <AppRoutes />
    </>
  );
}

export default App;
