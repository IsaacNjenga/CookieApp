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
      <div style={{ padding: 20 }}>
        {/* Hero Section */}
        <Carousel autoplay>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Welcome to Uncle Martin’s Cookies
            </h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Freshly Baked, Always Delicious
            </h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>Order Your Favorites Today!</h1>
          </div>
        </Carousel>

        {/* Best Sellers */}
        <h2 style={{ marginTop: 20 }}>Best Sellers</h2>
        <Row gutter={16}>
          {bestSellers.map((item, index) => (
            <Col key={index} span={6}>
              <Card hoverable cover={<Image alt={item.title} src={item.img} />}>
                <Rate allowHalf defaultValue={item.rating} />
                <Card.Meta
                  title={item.title}
                  description={`KES. ${item.price}`}
                />
                <Button
                  type="primary"
                  style={{ marginTop: 10 }}
                  onClick={() => viewCookie(item)}
                >
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
        <Divider>Made for the best😉, by the best✨</Divider>
        <Carousel autoplay>
          <div>
            <h1 style={{ textAlign: "center" }}>Crafted with Care</h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Freshly Baked, Always Delicious
            </h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>Order Your Favorites Today!</h1>
          </div>
        </Carousel>
        <h2 style={{ marginTop: 20 }}>New & Upcoming</h2>
        <Row gutter={16}>
          {newCookies.map((item, index) => (
            <Col key={index} span={6}>
              <Card hoverable cover={<Image alt={item.title} src={item.img} />}>
                <Card.Meta title={item.title} description={item.price} />
                <Button type="primary" style={{ marginTop: 10 }}>
                  Add To Cart
                </Button>
              </Card>
            </Col>
          ))}
        </Row>

        <Divider>
          Tap into greatness🙌, because you deserve nothing less!
        </Divider>
        <Carousel autoplay>
          <div>
            <h1 style={{ textAlign: "center" }}>Crafted with Care</h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>
              Freshly Baked, Always Delicious
            </h1>
          </div>
          <div>
            <h1 style={{ textAlign: "center" }}>Order Your Favorites Today!</h1>
          </div>
        </Carousel>
        <h2 style={{ marginTop: 20 }}>Hot & Fresh</h2>
        <Row gutter={16}>
          {hotCookies.map((item, index) => (
            <Col key={index} span={6}>
              <Card hoverable cover={<Image alt={item.title} src={item.img} />}>
                <Card.Meta title={item.title} description={item.price} />

                <Button type="primary" style={{ marginTop: 10 }}>
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
    </>
  );
}

export default Home;
