import { Button, Card, Divider, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import cookie_logo from "../assets/icons/cookie.png";
import axios from "axios";
import Swal from "sweetalert2";

function ClientInfo({ cartItems, openPaymentModal, setOpenPaymentModal }) {
  const [values, setValues] = useState({ email: "", phone: "", amount: "" });
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const items = { ...values, amount: cartTotal };
      console.log(items);
      await axios
        .post("initiate-payment", {
          email: items.email,
          amount: items.amount,
          phone: items.phone,
        })
        .then((res) => {
          const { redirectUrl } = res.data;
          Swal.fire({
            icon: "success",
            title: "Request Successfull!",
            text: "Redirecting to payment...",
          });
          window.location.href = redirectUrl;
        });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Payment failed",
        text: "Kindly refresh and try again. Contact us if the issue persists",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal
        footer={null}
        open={openPaymentModal}
        onCancel={() => setOpenPaymentModal(false)}
        width={900}
        style={{ maxWidth: "95vw" }}
      >
        <Card
          style={{
            maxWidth: 600,
            margin: "10px auto",
            background: "whitesmoke",
            padding: 0,
          }}
        >
          <Divider variant="solid" style={{ borderColor: "#854941" }}>
            <div
              style={{
                background: "white",
                margin: "1px auto",
                padding: "1px 15px",
                borderRadius: "15px",
              }}
            >
              <img
                src={cookie_logo}
                alt="logo"
                style={{ width: "30px", height: "30px", marginTop: "5px" }}
              />
            </div>
          </Divider>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label={<span style={{ fontSize: 18 }}>Email Address</span>}
              name="email"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                onChange={(e) => handleChange("email", e.target.value)}
                value={values.email}
                style={{
                  background: "whitesmoke",
                  border: "1px solid grey",
                  height: 40,
                  fontSize: 14,
                }}
              />
            </Form.Item>
            <Form.Item
              label={<span style={{ fontSize: 18 }}>Phone Number</span>}
              name="phone"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                onChange={(e) => handleChange("phone", e.target.value)}
                value={values.phone}
                style={{
                  background: "whitesmoke",
                  border: "1px solid grey",
                  height: 40,
                  fontSize: 14,
                }}
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center", marginTop: 10 }}>
              <div style={{ display: "flex", gap: "15px" }}>
                <Button
                  htmlType="submit"
                  loading={loading}
                  type="primary"
                  style={{ background: "green" }}
                >
                  Checkout
                </Button>
                <Button
                  type="primary"
                  style={{ background: "red" }}
                  onClick={() => setOpenPaymentModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Card>
      </Modal>
    </>
  );
}

export default ClientInfo;
