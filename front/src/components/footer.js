import {
  FacebookFilled,
  HeartFilled,
  InstagramOutlined,
  MailOutlined,
  PhoneOutlined,
  TikTokOutlined,
  YoutubeFilled,
} from "@ant-design/icons";
import { Divider } from "antd";
import React from "react";
import logo from "../assets/icons/cookie.png";

function FooterContent() {
  const toYoutTube = () => {
    window.open("https://www.youtube.com/");
  };
  const toTikTok = () => {
    window.open("https://www.tiktok.com/");
  };
  const toFacebook = () => {
    window.open("https://www.facebook.com/");
  };
  const toInstagram = () => {
    window.open("https://www.instagram.com/");
  };
  return (
    <div
      style={{
        background: "#121212",
        color: "white",
        padding: "40px 20px",
        textAlign: "center",
      }}
    >
      {/* Logo and Title */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" style={{ width: "75px" }} />
        <h1
          style={{
            fontSize: "2.1rem",
            fontWeight: "bold",
            color: "#e3996b",
            fontFamily: "'Pacifico', cursive",
            letterSpacing: "2px",
          }}
        >
          Uncle Martin's Cookies
        </h1>
      </div>

      {/* Social Media & Contact */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "20px",
          gap: "20px",
        }}
      >
        {/* Social Media */}
        <div>
          <h2 style={{ fontSize: "18px" }}>Keep in touch with us</h2>
          <div
            style={{
              display: "flex",
              gap: "20px",
              fontSize: "38px",
              justifyContent: "center",
            }}
          >
            <TikTokOutlined
              style={{
                background: "white",
                color: "black",
                borderRadius: "50%",
                padding: "10px",
              }}
              title="TikTok"
              onClick={toTikTok}
            />
            <FacebookFilled
              style={{
                background: "white",
                color: "#0b65ff",
                borderRadius: "50%",
                padding: "10px",
              }}
              title="Facebook"
              onClick={toFacebook}
            />
            <YoutubeFilled
              style={{
                background: "white",
                color: "red",
                borderRadius: "50%",
                padding: "10px",
              }}
              title="YouTube"
              onClick={toYoutTube}
            />
            <InstagramOutlined
              style={{
                background:
                  "radial-gradient(circle at 30% 110%, #ffdb8b 0%, #ee653d 25%, #d42e81 50%, #a237b6 75%, #3e57bc 100%)",
                borderRadius: "50%",
                padding: "10px",
                color: "#fff",
              }}
              title="Instagram"
              onClick={toInstagram}
            />
          </div>
        </div>

        <div
          className="border-div"
          style={{ width: "1px", background: "white", height: "200px" }}
        ></div>

        {/* Contact Information */}
        <div>
          <h2 style={{ fontSize: "18px" }}>Contact Information</h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              fontSize: "16px",
              textAlign: "left",
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <PhoneOutlined
                  style={{
                    fontSize: "40px",
                    background: "white",
                    color: "black",
                    borderRadius: "50%",
                    padding: "10px",
                    marginRight: "10px",
                  }}
                />
                <p style={{ margin: 0 }}>+254 720 500-844</p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <MailOutlined
                  style={{
                    fontSize: "40px",
                    background: "white",
                    color: "black",
                    borderRadius: "50%",
                    padding: "10px",
                    marginRight: "10px",
                  }}
                />
                <a
                  href="mailto:tintin@gmail.com"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <p style={{ margin: 0 }}>tintin@gmail.com</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Divider
        style={{ borderColor: "white", width: "60%", margin: "20px auto" }}
      />

      {/* Footer Bottom */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          fontSize: "14px",
        }}
      >
        <p>
          Made with <HeartFilled style={{ color: "red" }} /> by Uncle Martin
        </p>
        <p>©{new Date().getFullYear()} Created by Njenga</p>
      </div>
      <style>
        {`
        @media (max-width: 768px){
            .border-div{display:none}
        }`}
      </style>
    </div>
  );
}

export default FooterContent;
