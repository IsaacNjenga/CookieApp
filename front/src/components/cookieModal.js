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
import React, { useContext, useState } from "react";
import Cart from "../pages/cart";
import { UserContext } from "../App";

const { Title, Text } = Typography;

function CookieModal({ openModal, setOpenModal, modalContent, loading }) {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { cartItems, setCartItems, showDrawer, closeDrawer } =
    useContext(UserContext);

  const handleAddToCart = () => {
    if (quantity > 0) {
      setCartItems((prevCartItems) => {
        // Check if the item already exists in the cart
        const existingItem = prevCartItems.find(
          (item) => item.id === modalContent.id
        );

        if (existingItem) {
          // If it exists, update the quantity
          return prevCartItems.map((item) =>
            item.id === modalContent.id
              ? { ...item, quantity: item.quantity + quantity } // Add new quantity
              : item
          );
        } else {
          // Otherwise, add a new item
          return [...prevCartItems, { ...modalContent, quantity }];
        }
      });

      showDrawer();
    }
  };

  return (
    <Modal
      footer={null}
      open={openModal}
      onCancel={() => setOpenModal(false)}
      confirmLoading={loading}
      width={850}
      style={{ maxWidth: "95vw" }} // Ensure modal is not too wide on small screens
    >
      {modalContent && (
        <Row gutter={[20, 20]} align="middle">
          <Col xs={24} sm={24} md={10} lg={10} style={{ textAlign: "center" }}>
            <Image
              src={modalContent.img}
              alt={modalContent.title}
              width="100%"
              style={{
                maxWidth: "300px",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                objectFit: "contain",
              }}
            />
          </Col>

          <Col xs={24} sm={24} md={14} lg={14}>
            <Title level={3} style={{ fontSize: "1.5rem" }}>
              {modalContent.title}
            </Title>
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

            <InputNumber
              min={1}
              value={quantity}
              suffix={`${quantity > 1 ? "batches" : "batch"}`}
              onChange={(value) => setQuantity(value)}
              style={{ width: "50%", marginTop: 8 }}
            />

            <Button
              type="primary"
              size="large"
              block
              style={{
                marginTop: 16,
                fontSize: "1rem",
                padding: "10px",
              }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>

            <Drawer
              title="Your Cart"
              width={window.innerWidth < 768 ? 350 : 600} // Adjust width based on screen size
              onClose={closeDrawer}
              open={openDrawer}
              styles={{ body: { paddingBottom: 60 } }}
              extra={
                <Space>
                  <Button onClick={closeDrawer}>Cancel</Button>
                </Space>
              }
            >
              <Cart />
            </Drawer>
          </Col>
        </Row>
      )}
    </Modal>
  );
}

export default CookieModal;
