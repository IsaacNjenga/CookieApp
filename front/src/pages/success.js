import React from "react";
import { Card, Button } from "antd";
import { Link } from "react-router-dom";
import "../assets/css/success.css";

function Success() {
  return (
    <div className="success-container">
      <Card className="success-card" title="🎉 Payment Successful! 🎉">
        <p className="success-message">
          Thank you for purchasing from Uncle Martin! We hope you enjoy your
          cookies and look forward to seeing you again!
        </p>
        <Link to="/">
          <Button type="primary" className="transaction-button">
            View Transaction Details
          </Button>
        </Link>
      </Card>
    </div>
  );
}

export default Success;
