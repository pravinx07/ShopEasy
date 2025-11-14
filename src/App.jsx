import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
const Home = lazy(() => import("./pages/Home"));

const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));

const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
import OrderSuccess from "./pages/OrderSuccess";
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AddProduct from "./pages/admin/AddProduct";
import AdminRoute from "./components/AdminRoute";
import EditProduct from "./pages/admin/EditProduct"; // We will build this next

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <CartProvider>
          <WishlistProvider>
            <Navbar />
            <div className="pt-24">
              {" "}
              {/* space for fixed navbar */}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/orders/:id" element={<OrderDetails />} />
                {/* ADMIN ROUTES */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route
                  path="/admin/dashboard"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/products"
                  element={
                    <AdminRoute>
                      <AdminProducts />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/add-product"
                  element={
                    <AdminRoute>
                      <AddProduct />
                    </AdminRoute>
                  }
                />

                <Route
                  path="/admin/edit-product/:id"
                  element={
                    <AdminRoute>
                      <EditProduct />
                    </AdminRoute>
                  }
                />
              </Routes>
            </div>
          </WishlistProvider>
        </CartProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
