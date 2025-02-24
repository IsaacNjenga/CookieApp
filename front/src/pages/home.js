import React, { useState } from "react";
import { Carousel, Card, Button, Row, Col, Image, Divider, Rate } from "antd";
import { bestSellers, hotCookies, newCookies } from "../assets/data/data.js";
import CookieModal from "../components/cookieModal.js";

function Home() {
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const viewCookie = (item) => {
    setOpenModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      <div style={{ padding: "10px 10px" }}>
        {/* Hero Section */}
        <Carousel autoplay>
          <div>
            <h1 className="carousel-text">Welcome to Uncle Martin’s Cookies</h1>
          </div>
          <div>
            <h1 className="carousel-text">Freshly Baked, Always Delicious</h1>
          </div>
          <div>
            <h1 className="carousel-text">Order Your Favorites Today!</h1>
          </div>
        </Carousel>

        {/* Best Sellers */}
        <h2 className="section-title">Best Sellers</h2>
        <Row gutter={[10, 10]} justify="center">
          {bestSellers.map((item, index) => (
            <Col key={index} xs={12} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<Image alt={item.title} src={item.img} />}
                className="cookie-card"
              >
                <Rate allowHalf defaultValue={item.rating} />
                <Card.Meta
                  title={item.title}
                  description={`KES. ${item.price}`}
                />
                <Button type="primary" block onClick={() => viewCookie(item)}>
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider>Made for the best😉, by the best✨</Divider>

        {/* New & Upcoming */}
        <h2 className="section-title">New & Upcoming</h2>
        <Row gutter={[10, 10]} justify="center">
          {newCookies.map((item, index) => (
            <Col key={index} xs={12} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<Image alt={item.title} src={item.img} />}
                className="cookie-card"
              >
                <Rate allowHalf defaultValue={item.rating} />
                <Card.Meta
                  title={item.title}
                  description={`KES. ${item.price}`}
                />
                <Button type="primary" block onClick={() => viewCookie(item)}>
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider>
          Tap into greatness🙌, because you deserve nothing less!
        </Divider>

        {/* Hot & Fresh */}
        <h2 className="section-title">Hot & Fresh</h2>
        <Row gutter={[10, 10]} justify="center">
          {hotCookies.map((item, index) => (
            <Col key={index} xs={12} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={<Image alt={item.title} src={item.img} />}
                className="cookie-card"
              >
                <Rate allowHalf defaultValue={item.rating} />
                <Card.Meta
                  title={item.title}
                  description={`KES. ${item.price}`}
                />
                <Button type="primary" block onClick={() => viewCookie(item)}>
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <CookieModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalContent={modalContent}
        loading={loading}
      />

      {/* Mobile Styling */}
      <style>
        {`
          .carousel-text {
            text-align: center;
            font-size: 24px;
          }
          @media (max-width: 768px) {
            .carousel-text {
              font-size: 18px;
            }
            .section-title {
              font-size: 20px;
              text-align: center;
            }
            .cookie-card {
              text-align: center;
            }
          }
        `}
      </style>
    </>
  );
}

export default Home;
