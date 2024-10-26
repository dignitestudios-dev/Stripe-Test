import { Navigate, Route, Routes } from "react-router-dom";
import CustomersPage from "../pages/Customers/CustomersPage";
import CreateCustomerPage from "../pages/CreateCustomer/CreateCustomerPage";
import Layout from "../components/Global/Layout";
import Cookies from "js-cookie";
import LoginPage from "../pages/auth/LoginPage";

const isAuthenticated = () => {
  return Cookies.get("dgEmployeeToken") !== undefined;
};

const AuthRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? element : <Navigate to={redirectTo} />;
};

const PublicRoute = ({ element, redirectTo }) => {
  return isAuthenticated() ? <Navigate to={redirectTo} /> : element;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<PublicRoute element={<LoginPage />} redirectTo={"/"} />}
      />

      <Route
        path="/"
        element={
          <AuthRoute
            element={<Layout children={<CustomersPage />} />}
            redirectTo={"/login"}
          />
        }
      />
      <Route
        path="/create-customer"
        element={
          <AuthRoute
            element={<Layout children={<CreateCustomerPage />} />}
            redirectTo={"/login"}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
