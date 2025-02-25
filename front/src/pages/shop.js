import React, { useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Divider,
  Rate,
  Input,
  Carousel,
} from "antd";
import { bestSellers, hotCookies, newCookies } from "../assets/data/data.js";
import CookieModal from "../components/cookieModal.js";

const { Search } = Input;

function Shop() {
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
    <div>
      <h2>Shop Our Cookies</h2>

      <Search
        placeholder="Find your favourite..."
        style={{ marginBottom: 20, width: 300 }}
      />
      <Carousel autoplay className="carousel" dots={false} effect="fade">
        <div className="carousel-slide">
          Step into Uncle Martin’s Delicacies!
        </div>
        <div className="carousel-slide">
          Indulge in Our Freshly Baked Delights!
        </div>
        <div className="carousel-slide">
          Treat Yourself — Order Your Favorites Today!
        </div>
      </Carousel>
      <div>
        {/* Best Sellers */}
        <h2 className="section-title">Best Sellers</h2>
        <Row gutter={[10, 10]} justify="center">
          {bestSellers.map((item, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <Image
                    alt={item.title}
                    src={item.img}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "300px",
                    }}
                    className="card-image"
                  />
                }
                className="cookie-card"
              >
                <Rate
                  allowHalf
                  defaultValue={item.rating}
                  style={{ width: "100%" }}
                />
                <Card.Meta
                  title={item.title}
                  description={`KES. ${item.price}`}
                />
                <br />
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
            <Col key={index} xs={13} sm={12} md={8} lg={6}>
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
            <Col key={index} xs={13} sm={12} md={8} lg={6}>
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
              text-align: left;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Shop;
