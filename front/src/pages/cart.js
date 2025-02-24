import { Button, List, Typography, InputNumber, Image, Divider } from "antd";
import React from "react";

const { Title, Text } = Typography;

function Cart({ cartItems, updateCart }) {
  const removeFromCart = () => {};

  return (
    <div style={{ padding: "0 10px" }}>
      <Title level={3} style={{ fontSize: "1.5rem", textAlign: "center" }}>
        Your Cart
      </Title>

      {cartItems.length === 0 ? (
        <Text
          type="secondary"
          style={{ textAlign: "center", display: "block" }}
        >
          Your cart is empty.
        </Text>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                style={{ flexWrap: "wrap" }} // Allow wrapping on small screens
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateCart(item, value)}
                    style={{ width: "80px" }}
                  />,
                  <Button
                    danger
                    onClick={() => removeFromCart(item)}
                    style={{ fontSize: "0.9rem", padding: "5px 10px" }}
                  >
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={50}
                      height={50}
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

          <Button
            type="primary"
            block
            size="large"
            style={{
              fontSize: "1rem",
              padding: "12px",
              marginTop: "10px",
            }}
          >
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
