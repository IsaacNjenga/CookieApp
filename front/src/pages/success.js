import React, { useState } from "react";
import { Card, Button, Tag, Typography } from "antd";
import "../assets/css/success.css";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { format } from "date-fns";

const { Text } = Typography;

function Success() {
  const [searchParams] = useSearchParams();
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const [loading, setLoading] = useState(false);
  const [transactionData, setTransactionData] = useState(null);

  const transactionStatus = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `transaction-status?orderTrackingId=${orderTrackingId}`
      );
      const transactionStatusData = res.data;
      setTransactionData(transactionStatusData);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        Title: "Unable to fetch your transaction status",
        text: "Contact us if the issue persists",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="success-container">
      <Card className="success-card" title="🥳 Payment Successful! 🎉">
        <p className="success-message">
          Thank you for purchasing from Uncle Martin! We hope you enjoy your
          cookies and look forward to seeing you again!
        </p>
        <Button
          type="primary"
          className="transaction-button"
          loading={loading}
          onClick={() => transactionStatus()}
        >
          View Transaction Details
        </Button>
        <br />
        {transactionData
          ? transactionData && (
              <Card title="Transaction Details">
                <p>
                  <Text strong>Order ID:</Text>{" "}
                  {transactionData.order_tracking_id}
                </p>
                <p>
                  <Text strong>Payment Account:</Text>{" "}
                  {transactionData.payment_account}
                </p>
                <p>
                  <Text strong>Payment Method:</Text>{" "}
                  {transactionData.payment_method}
                </p>
                <p>
                  <Text strong>Confirmation Code:</Text>{" "}
                  {transactionData.confirmation_code}
                </p>
                <p>
                  <Text strong>Amount:</Text> KES.{transactionData.amount}{" "}
                </p>
                <p>
                  <Text strong>Message:</Text> {transactionData.message}
                </p>
                <p>
                  <Text strong>Status:</Text>{" "}
                  <Tag
                    color={
                      transactionData.payment_status_description === "Completed"
                        ? "green"
                        : "red"
                    }
                  >
                    {transactionData.payment_status_description}
                  </Tag>
                </p>
                <p>
                  <Text strong>Date of Transaction:</Text>{" "}
                  {format(
                    new Date(transactionData?.created_date),
                    "EEEE, do, MMMM yyyy"
                  )}
                </p>
              </Card>
            )
          : null}
      </Card>
    </div>
  );
}

export default Success;
