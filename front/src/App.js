import React, { createContext, useEffect, useState } from "react";
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
import AddCookie from "./pages/admin/cookies/addCookieContent.js";
import Login from "./pages/login.js";
import Register from "./pages/register.js";
import Success from "./pages/success.js";
import Cancel from "./pages/cancel.js";
import Review from "./pages/review.js";
import Dashboard from "./pages/admin/dashboard/dashboard.js";
import AddCookiePage from "./pages/admin/cookies/addCookiePage.js";
import CookiePage from "./pages/admin/cookies/cookiePage.js";
export const UserContext = createContext();

//axios.defaults.baseURL = "http://localhost:3001/UncleCookies";
axios.defaults.baseURL = "https://cookie-app-back.vercel.app/UncleCookies";
axios.defaults.withCredentials = true;
function App() {
  const [cartItems, setCartItems] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState();

  const showDrawer = () => setOpenDrawer(true);
  const closeDrawer = () => setOpenDrawer(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("verify", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) {
            setUser(res.data.user);
            //setIsAuthenticated(true);
          }
        })
        .catch((err) => {
          console.log("Error during user verification:", err);
        });
    }
  }, []);

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
          user,
          setUser,
          collapsed,
          setCollapsed,
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
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
              <Route path="review" element={<Review />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="add-cookie" element={<AddCookiePage />} />
              <Route path="view-cookies" element={<CookiePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
