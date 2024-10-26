import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEmployeePage from "./pages/employee/CreateEmployeePage";
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
