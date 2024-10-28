import { Routes, Route } from "react-router-dom";
import "./App.css";
import CreateCustomerPage from "./pages/CreateCustomer/CreateCustomerPage";
import CustomersPage from "./pages/Customers/CustomersPage";
import Layout from "./components/Global/Layout";
import AppRoutes from "./routes/routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />

      <AppRoutes />
    </>
  );
}

export default App;
