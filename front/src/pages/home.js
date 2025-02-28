import React, { useContext, useEffect } from "react";
import { Badge, Button, Card, Divider, Image, Rate, notification } from "antd";
import { feedback, image, content } from "../assets/data/data";
import "../assets/css/home.css";
import { ShopOutlined, SmileOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

function Home() {
  const [api, contextHolder] = notification.useNotification();
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (localStorage.getItem("showLoginNotification") === "true") {
      api.success({
        message: `Welcome ${user.username}!`,
        description: "Login Successful",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      });
      localStorage.removeItem("showLoginNotification"); // Clear after showing
    }
  }, []);

  return (
    <>
      {contextHolder}
      <Badge.Ribbon
        text="Freshness Guaranteed"
        color="#f8393b"
        className="home-ribbon"
        style={{ right: "10px" }}
      >
        <div className="home-banner-container">
          <div className="home-banner-content">
            <h1>Craving Something Sweet?</h1>
            <h2>Treat Yourself — Experience Bliss</h2>
            <Button className="shop-button">
              <Link to="/shop">
                <ShopOutlined /> To Shop
              </Link>
            </Button>
          </div>
        </div>
      </Badge.Ribbon>

      {/* Image and Text Sections */}
      <div className="content-container">
        {content.map((item, index) => (
          <React.Fragment key={index}>
            <Divider
              variant="solid"
              className="home-divider"
              style={{ borderColor: "#e09b69" }}
            >
              <h2>{item.divider}</h2>
            </Divider>
            <div
              className={`section ${
                index % 2 === 0 ? "image-right" : "image-left"
              }`}
            >
              <Image
                preview={false}
                src={image[index]}
                alt={item.title}
                className="section-image"
              />
              <div className="section-text">
                <h1 style={{ color: "#f43636", fontSize: "1.8rem" }}>
                  {item.title}
                </h1>
                <h2 style={{ color: "#92544f", fontSize: "1.5rem" }}>
                  {item.text}
                </h2>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
      <Divider>
        <h2>What Our Customers Say</h2>
      </Divider>
      {/* Testimonials Section */}
      <div className="testimonials">
        <div className="feedback-cards">
          {feedback.map((f) => (
            <Card key={f.id} className="feedback-card">
              <Rate allowHalf defaultValue={f.rating} className="rating" />
              <p className="feedback-text" style={{ fontSize: "1rem" }}>
                "{f.feedback}"
              </p>
              <p className="feedback-author" style={{ fontSize: "0.9rem" }}>
                - {f.name}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
