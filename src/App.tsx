import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Product from "./pages/Product"; // Make sure to use your Product component
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Layout from "./components/Layout";
import CartDrawer from "./components/CartDrawer"; // Import CartDrawer
import "react-toastify/dist/ReactToastify.css"; // Import toast CSS
import { ToastContainer } from "react-toastify";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute"; // You'll create this
import LoginSignup from "./pages/LoginSignup";
import AddPet from "./pages/AddPet";

function App() {
  return (
    <>
      <ToastContainer />
      <CartDrawer /> {/* Add the CartDrawer component here */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:id" element={<Product />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<LoginSignup />} /> {/* 🔐 add this */}
          <Route path="addpet" element={<AddPet />} />
        </Route>

        {/* DASHBOARDS */}
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute allowedRoles={["seller"]}>
              <SellerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/buyer/dashboard"
          element={
            <ProtectedRoute allowedRoles={["buyer"]}>
              <BuyerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
