import React from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter,  Route, Routes } from "react-router-dom";
import { Outlet } from "react-router";
import Footer from "./pages/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/productDetails" element={<ProductDetails/>}/>
      </Routes>
      <Outlet/>
      <Footer/>
    </BrowserRouter>
  );
};

export default App;
