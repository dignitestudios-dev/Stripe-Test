import Cookies from "js-cookie";
import { Navigate, Routes, Route } from "react-router-dom";
import EmployeesListPage from "../pages/employee/EmployeesListPage";
import LoginPage from "../pages/auth/LoginPage";
import Layout from "../components/Global/Layout";
import CreateEmployeePage from "../pages/employee/CreateEmployeePage";
import UpdateEmployeePage from "../pages/employee/UpdateEmployeePage";
import PaymentLinksPage from "../pages/forms/PaymentLinksPage";
import VerifyEmailPage from "../pages/auth/VerifyEmailPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import UpdatePasswordPage from "../pages/auth/UpdatePasswordPage";

const isAuthenticated = () => {
  return Cookies.get("digniteToken") !== undefined;
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
        path="/verify-email"
        element={<PublicRoute element={<VerifyEmailPage />} redirectTo={"/"} />}
      />
      <Route
        path="/verify-otp"
        element={<PublicRoute element={<VerifyOtpPage />} redirectTo={"/"} />}
      />
      <Route
        path="/change-password"
        element={
          <PublicRoute element={<UpdatePasswordPage />} redirectTo={"/"} />
        }
      />

      <Route
        path="/"
        element={
          <AuthRoute
            element={<Layout pages={<EmployeesListPage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/update-employee/:_id"
        element={
          <AuthRoute
            element={<Layout pages={<UpdateEmployeePage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/add-user"
        element={
          <AuthRoute
            element={<Layout pages={<CreateEmployeePage />} />}
            redirectTo={"/login"}
          />
        }
      />

      <Route
        path="/payment-links"
        element={
          <AuthRoute
            element={<Layout pages={<PaymentLinksPage />} />}
            redirectTo={"/login"}
          />
        }
      />
    </Routes>
  );
};

export default AppRoutes;
