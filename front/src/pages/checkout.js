import React, { useContext } from "react";
import { UserContext } from "../App";
import { Button, List, Typography, InputNumber, Image, Divider } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

function Checkout() {
  const { cartItems, setCartItems } = useContext(UserContext);
  const removeFromCart = (id) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item._id !== id)
    );
  };

  const updateCart = (item, newQuantity) => {
    if (newQuantity < 1) return;

    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: newQuantity }
          : cartItem
      )
    );
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={(item) => (
          <List.Item
            style={{ flexWrap: "wrap" }}
            actions={[
              <InputNumber
                min={1}
                value={item.quantity}
                onChange={(value) => updateCart(item, value)}
                style={{ width: "115px" }}
                suffix={item.quantity > 1 ? "batches" : "batch"}
              />,
              <Button
                danger
                onClick={() => removeFromCart(item._id)}
                style={{ fontSize: "0.9rem", padding: "5px 10px" }}
              >
                Remove Item
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image
                  src={item.img}
                  alt={item.title}
                  width={100}
                  height={100}
                  style={{
                    borderRadius: "8px",
                    objectFit: "cover",
                    maxWidth: "100%",
                  }}
                />
              }
              title={
                <Text style={{ fontSize: "1rem", fontWeight: 500 }}>
                  {item.title}
                </Text>
              }
              description={
                <Text strong style={{ fontSize: "0.9rem" }}>
                  KES.{item.price} x {item.quantity} = KES.
                  {item.price * item.quantity}
                </Text>
              }
            />
          </List.Item>
        )}
      />

      <Divider />

      <div style={{ textAlign: "right", marginBottom: 16 }}>
        <Title level={4} style={{ fontSize: "1.3rem" }}>
          Total: KES.
          {cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          )}
        </Title>
      </div>

      <div>
        <Button
          type="primary"
          size="large"
          style={{
            fontSize: "1rem",
            padding: "12px",
            margin: "0px 10px",
          }}
        >
          <Link to="/shop">Add another Item</Link>
        </Button>
        <Button
          type="primary"
          size="large"
          style={{
            fontSize: "1rem",
            padding: "12px",
            margin: "10px 10px",
            background: "green",
          }}
        >
          Checkout
        </Button>
      </div>
    </>
  );
}

export default Checkout;
