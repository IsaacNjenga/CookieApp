import {
  Button,
  Col,
  Image,
  Modal,
  Row,
  Typography,
  Divider,
  Rate,
  Drawer,
  Space,
  InputNumber,
} from "antd";
import React, { useState } from "react";
import Cart from "../pages/cart";

const { Title, Text } = Typography;

function CookieModal({ openModal, setOpenModal, modalContent, loading }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleAddToCart = () => {
    if (quantity > 0) {
      setCartItems((prevCartItems) => {
        const existingItemIndex = prevCartItems.findIndex(
          (item) => item.id === modalContent.id
        );

        if (existingItemIndex !== -1) {
          // If item exists, update its quantity
          const updatedCart = [...prevCartItems];
          updatedCart[existingItemIndex].quantity += quantity;
          return updatedCart;
        } else {
          // Otherwise, add a new item
          return [...prevCartItems, { ...modalContent, quantity }];
        }
      });

      showDrawer(); // Open the cart drawer
    }
  };

  return (
    <Modal
      title={modalContent ? modalContent.title : ""}
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={950}
    >
      {modalContent && (
        <Row gutter={[24, 24]} align="middle">
          <Col span={10} style={{ textAlign: "center" }}>
            <Image
              src={modalContent.img}
              alt={modalContent.title}
              width={350}
              height={350}
              style={{
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                objectFit: "contain",
              }}
            />
          </Col>

          <Col span={14}>
            <Title level={3}>{modalContent.title}</Title>
            <Rate allowHalf defaultValue={modalContent.rating || 4.5} />
            <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
              {modalContent.category}
            </Text>

            <Divider />

            <Text>{modalContent.description}</Text>

            <Divider />

            <Title level={4} style={{ color: "#4bbe11" }}>
              KES.{modalContent.price}
            </Title>

            {/* Quantity Input */}
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value)}
              style={{ width: "100%", marginTop: 8 }}
            />

            <Button
              type="primary"
              size="large"
              block
              style={{ marginTop: 16 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Drawer
              title="Your Cart"
              width={600}
              onClose={closeDrawer}
              open={openDrawer}
              styles={{ body: { paddingBottom: 60 } }}
              extra={
                <Space>
                  <Button onClick={closeDrawer}>Cancel</Button>
                </Space>
              }
            >
              <Cart cartItems={cartItems} />
            </Drawer>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

export default CookieModal;
