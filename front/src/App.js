import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home.js";
import Shop from "./pages/shop.js";
import Contact from "./pages/contact.js";
import About from "./pages/about.js";
import Holidays from "./pages/holidays.js";
import Occasions from "./pages/occasions.js";
import Navbar from "./components/navbar.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Navbar wraps all pages */}
        <Route path="/" element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="holidays" element={<Holidays />} />
          <Route path="occasions" element={<Occasions />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about-us" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
