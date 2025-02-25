import React from "react";
import { Card, Carousel, Divider, Rate } from "antd";
import { feedback } from "../assets/data/data";
import "../assets/css/home.css";

function Home() {
  const image = [
    "https://images.pexels.com/photos/301972/pexels-photo-301972.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3250406/pexels-photo-3250406.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/3186743/pexels-photo-3186743.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/1196301/pexels-photo-1196301.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/2126268/pexels-photo-2126268.jpeg?auto=compress&cs=tinysrgb&w=800",
  ];

  const content = [
    {
      title: "Satisfaction Guaranteed",
      text: "Our cookies are baked fresh daily, ensuring warm, gooey goodness straight from the oven to your doorstep.",
      divider: "Baked With Love, Just For You",
    },
    {
      title: "Perfect for Any Occasion",
      text: "Whether it’s a birthday, a holiday, or a treat for yourself, our cookies make every moment sweeter.",
      divider: "Discover Your New Favourite Flavour",
    },
    {
      title: "Quality Ingredients",
      text: "We use only the finest, all-natural ingredients, ensuring a delicious experience in every bite.",
      divider: "Indulge In Every Bite",
    },
    {
      title: "Homemade Goodness",
      text: "Each cookie is crafted with love and care, just like Grandma used to make, bringing a taste of home to every treat.",
      divider: "Crafted Expertly",
    },
    {
      title: "Gifts from the Heart",
      text: "Our beautifully packaged cookies make the perfect gift, spreading joy and sweetness with every box.",
      divider: "From Our Oven to Your Doorstep",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <Carousel autoplay className="carousel" dots={false} effect="fade">
        <div className="carousel-slide">
          Step into Uncle Martin’s Delicacies!
        </div>
        <div className="carousel-slide">
          Indulge in Our Freshly Baked Delights!
        </div>
        <div className="carousel-slide">
          Treat Yourself—Order Your Favorites Today!
        </div>
      </Carousel>

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
              <img
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
