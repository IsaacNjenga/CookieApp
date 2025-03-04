import React from "react";
import { Card, Button } from "antd";
import "../assets/css/about.css"; // Importing a CSS file for custom styles

function About() {
  return (
    <div className="about-container">
      <Card className="about-card" title="🍪 Our Story 🍪">
        <p className="about-text">
          Uncle Martin’s Cookies started in a small kitchen with a big dream.
          What began as a passion for baking has blossomed into a beloved cookie
          brand that brings joy to families and friends.
        </p>
        <p className="about-text">
          We believe that the best cookies are made with love and the finest
          ingredients. That’s why we source our ingredients from local suppliers
          and bake our cookies fresh daily. Each batch is crafted with care,
          ensuring that every bite is a delightful experience.
        </p>
        <p className="about-text">
          Our mission is to create delicious cookies that not only satisfy your
          sweet tooth but also create lasting memories. Whether it’s a special
          occasion or just a treat for yourself, Uncle Martin’s Cookies are
          perfect for any moment.
        </p>
        <p className="about-text">
          Thank you for being a part of our journey. We look forward to sharing
          our cookies with you and hope to continue spreading joy, one cookie at
          a time!
        </p>
        <Button type="primary" className="shop-button">
          <a href="/shop">Visit Our Shop</a>
        </Button>
      </Card>
    </div>
  );
}

export default About;
