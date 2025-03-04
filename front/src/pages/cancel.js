import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import "../assets/css/cancel.css"; // Importing a CSS file for custom styles

function Cancel() {
  return (
    <div className="cancel-container">
      <Card className="cancel-card" title="❌ Transaction Cancelled ❌">
        <p className="cancel-message">
          Oops! It looks like your transaction did not go through. Don't worry,
          you can always try again. We look forward to serving you!
        </p>
        <Link to="/shop">
          <Button type="primary" className="shop-button">
            Go to Shop
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default Cancel;
