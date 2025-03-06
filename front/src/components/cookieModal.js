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
  Carousel,
  Tag,
} from "antd";
import React, { useContext } from "react";
import Cart from "../pages/cart";
import { UserContext } from "../App";
import { bestSellers, hotCookies, newCookies } from "../assets/data/data";

const { Title, Text } = Typography;

function CookieModal({ openModal, setOpenModal, modalContent, loading }) {
  const {
    showDrawer,
    closeDrawer,
    openDrawer,
    setCartmodalContents,
    setCartmodalContent,
  } = useContext(UserContext);

  const addToCart = (cookie) => {
    const allCookies = [...bestSellers, ...newCookies, ...hotCookies];
    const selectedCookie = allCookies.find((c) => c._id === cookie._id);

    if (!selectedCookie) {
      console.warn("Cookie not found");
      return;
    }

    setCartmodalContent((prevCart) => {
      const updatedCart = [
        ...prevCart,
        {
          _id: selectedCookie._id,
          title: selectedCookie.title,
          category: selectedCookie.category,
          description: selectedCookie.description,
          img: selectedCookie.img,
          price: selectedCookie.price,
          rating: selectedCookie.rating,
          stock: selectedCookie.stock,
          quantity: 1,
        },
      ];

      setCartmodalContents(updatedCart);
      return updatedCart;
    });

    showDrawer();
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
            <Carousel autoplay autoplaySpeed={2500} fade dots={false}>
              {Array.isArray(modalContent.img) &&
              modalContent.img.length > 0 ? (
                modalContent.img.map((imgSrc, index) => (
                  <div key={index}>
                    <Image
                      alt={`Slide ${index + 1}`}
                      src={imgSrc}
                      width="100%"
                      height={350}
                      style={{
                        borderRadius: "10px",
                        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                        objectFit: "cover",
                      }}
                      className="card-image"
                    />
                  </div>
                ))
              ) : (
                <Image
                  alt={modalContent.name}
                  src={modalContent.img}
                  width="100%"
                  height={350}
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    objectFit: "cover",
                  }}
                  className="card-image"
                />
              )}
            </Carousel>
          </Col>

          <Col xs={24} sm={24} md={14} lg={14}>
            <Title level={3} style={{ fontSize: "1.5rem" }}>
              {modalContent.name}
            </Title>{" "}
            {modalContent.rating > 0 ? (
              <div style={{ display: "flex", alignItems: "center" }}>
                <Rate
                  allowHalf
                  defaultValue={modalContent.rating}
                  style={{ flex: "0 0 auto" }}
                  disabled
                />
                <span
                  style={{
                    marginLeft: "8px",
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  ({modalContent.totalReviews ? modalContent.totalReviews : 3})
                </span>
              </div>
            ) : (
              <Tag
                style={{
                  display: "inline-block",
                  backgroundColor: "#f0f0f0",
                  color: "grey",
                  marginBottom: "3px",
                }}
              >
                Not Yet Rated
              </Tag>
            )}
            <Text type="secondary" style={{ display: "block", marginTop: 8 }}>
              {modalContent.category}
            </Text>
            <Divider />
            <Text>{modalContent.description}</Text>
            <Divider />
            <Title level={4} style={{ color: "#4bbe11" }}>
              KES.{modalContent.price}
            </Title>
            <Button
              type="primary"
              size="large"
              block
              style={{
                marginTop: 16,
                fontSize: "1rem",
                padding: "10px",
              }}
              onClick={() => addToCart(modalContent)}
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
