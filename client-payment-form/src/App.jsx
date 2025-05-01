import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";
import Loader from "./Loader";
const Home = lazy(() => import("./pages/HomePage"));
const PaymentFormPage = lazy(() => import("./PaymentFormPage"));
const PaymentSuccessPage = lazy(() => import("./PaymentSuccessPage"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:priceId" element={<PaymentFormPage />} />
        <Route
          path="/:priceId/payment-success"
          element={<PaymentSuccessPage />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
