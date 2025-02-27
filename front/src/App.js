import React, { createContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Shop from "./pages/shop.js";
import Contact from "./pages/contact.js";
import About from "./pages/about.js";
import Faq from "./pages/faq.js";
import Occasions from "./pages/occasions.js";
import Navbar from "./components/navbar.js";
import Checkout from "./pages/checkout.js";
import axios from "axios";
export const UserContext = createContext();

axios.defaults.baseURL = "http://localhost:3001/UncleCookies";
axios.defaults.withCredentials = true;
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItem, setCartItem] = useState([]);

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  return (
    <>
      <UserContext.Provider
        value={{
          cartItems,
          setCartItems,
          openDrawer,
          showDrawer,
          closeDrawer,
          cartItem,
          setCartItem,
        }}
      >
        <BrowserRouter>
          <Routes>
            {/* Navbar wraps all pages */}
            <Route path="/" element={<Navbar />}>
              <Route index element={<Home />} />
              <Route path="shop" element={<Shop />} />
              <Route path="faq" element={<Faq />} />
              <Route path="occasions" element={<Occasions />} />
              <Route path="contact" element={<Contact />} />
              <Route path="about-us" element={<About />} />
              <Route path="/checkout" element={<Checkout />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
