import { Button, List, Typography, InputNumber, Image, Divider } from "antd";
import React from "react";

const { Title, Text } = Typography;

function Cart({ cartItems, updateCart }) {
  const removeFromCart = () => {};
  return (
    <div>
      <Title level={3}>Your Cart</Title>

      {cartItems.length === 0 ? (
        <Text type="secondary">Your cart is empty.</Text>
      ) : (
        <>
          <List
            itemLayout="horizontal"
            dataSource={cartItems}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <InputNumber
                    min={1}
                    value={item.quantity}
                    onChange={(value) => updateCart(item, value)}
                  />,
                  <Button danger onClick={() => removeFromCart(item)}>
                    Remove
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={60}
                      height={60}
                      style={{ borderRadius: "8px" }}
                    />
                  }
                  title={item.title}
                  description={
                    <Text strong>
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
            <Title level={4}>
              Total: KES.
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </Title>
          </div>

          <Button type="primary" block size="large">
            Proceed to Checkout
          </Button>
        </>
      )}
    </div>
  );
}

export default Cart;
