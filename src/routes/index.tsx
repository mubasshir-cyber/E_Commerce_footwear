import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Product from "../pages/Product";
import Shop from "../pages/Shop";

import { CartDrawer } from "../components/site/CartDrawer";
import { SearchDrawer } from "../components/site/SearchDrawer";
import { MobileMenu } from "../components/site/MobileMenu";
import { Toaster } from "sonner";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/shop/:category" element={<Shop />} />
        </Routes>

        {/* Global Components */}
        <CartDrawer />
        <SearchDrawer />
        <MobileMenu />

        <Toaster
          position="bottom-right"
          theme="light"
          toastOptions={{
            className: "!font-sans",
          }}
        />
      </>
    </BrowserRouter>
  );
}