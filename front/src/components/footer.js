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
        <img
          src={logo}
          alt="logo"
          style={{ width: "50px", marginBottom: "1px" }}
        />
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#e3996b",
            fontFamily: "'Pacifico', cursive",
          }}
        >
          Uncle Martin Cookies
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
            <TikTokOutlined />
            <FacebookFilled />
            <YoutubeFilled />
            <InstagramOutlined />
          </div>
        </div>

        <div
          className="border-div"
          style={{ width: "1px", background: "white", height: "60px" }}
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
              <PhoneOutlined
                style={{ fontSize: "40px", padding: "0px 10px" }}
              />
              0740900061
            </div>
            <div>
              <MailOutlined style={{ fontSize: "40px", padding: "0px 7px" }} />{" "}
              ayzzoh20@gmail.com
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
