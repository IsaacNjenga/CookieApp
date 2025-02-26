import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Divider,
  Rate,
  Carousel,
  Badge,
  Drawer,
  Space,
} from "antd";
import { bestSellers, hotCookies, newCookies } from "../assets/data/data.js";
import CookieModal from "../components/cookieModal.js";
import SearchComponent from "../components/search.js";
import { UserContext } from "../App.js";
import Cart from "./cart.js";

function Shop() {
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const { showDrawer, openDrawer, closeDrawer, setCartItems, setCartItem } =
    useContext(UserContext);

  const addToCart = (cookie) => {
    const allCookies = [...bestSellers, ...newCookies, ...hotCookies];
    const selectedCookie = allCookies.find((c) => c._id === cookie._id);

    if (!selectedCookie) {
      console.warn("Cookie not found");
      return;
    }

    setCartItem((prevCart) => {
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

      setCartItems(updatedCart);
      return updatedCart;
    });

    showDrawer();
  };

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
      <h2>Shop Our Cookies</h2>
      <SearchComponent
        onSearchChange={(value) => setSearchValue(value)}
        dataSource={bestSellers}
        viewCookie={viewCookie}
      />{" "}
      {searchValue === "" && (
        <div>
          {/* Best Sellers */}{" "}
          <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          ></Divider>
          <h2 className="section-title">Our Best Sellers</h2>
          <Row gutter={[10, 10]} justify="center">
            {bestSellers.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <Badge.Ribbon
                      text={`${item.stock} available`}
                      color="orange"
                      style={{
                        display: "block",
                        right: "10px",
                      }}
                    >
                      <Image
                        alt={item.title}
                        src={item.img}
                        width="100%"
                        height={300}
                        style={{
                          objectFit: "cover",
                        }}
                        className="card-image"
                      />
                    </Badge.Ribbon>
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
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button type="primary" onClick={() => viewCookie(item)}>
                      View
                    </Button>
                    <Button
                      style={{ backgroundColor: "green" }}
                      type="primary"
                      onClick={() => addToCart(item)}
                    >
                      Add To Cart
                    </Button>{" "}
                    <Drawer
                      title="Your Cart"
                      width={window.innerWidth < 768 ? 350 : 600}
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
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          >
            Made for the best😉, by the best✨
          </Divider>
          {/* New & Upcoming */}
          <h2 className="section-title">New & Upcoming</h2>
          <Row gutter={[10, 10]} justify="center">
            {newCookies.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <Badge.Ribbon
                      text={`${item.stock} available`}
                      color="orange"
                      style={{
                        display: "block",
                        right: "10px",
                      }}
                    >
                      <Image
                        alt={item.title}
                        src={item.img}
                        width="100%"
                        height={300}
                        style={{
                          objectFit: "cover",
                        }}
                        className="card-image"
                      />
                    </Badge.Ribbon>
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
          <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          >
            Tap into greatness! 🙌
          </Divider>
          {/* Hot & Fresh */}
          <h2 className="section-title">Hot & Fresh</h2>
          <Row gutter={[10, 10]} justify="center">
            {hotCookies.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <Badge.Ribbon
                      text={`${item.stock} available`}
                      color="orange"
                      style={{
                        display: "block",
                        right: "10px",
                      }}
                    >
                      <Image
                        alt={item.title}
                        src={item.img}
                        width="100%"
                        height={300}
                        style={{
                          objectFit: "cover",
                        }}
                        className="card-image"
                      />
                    </Badge.Ribbon>
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
        </div>
      )}
      <Divider
        variant="solid"
        className="home-divider"
        style={{ borderColor: "#e09b69" }}
      ></Divider>
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
