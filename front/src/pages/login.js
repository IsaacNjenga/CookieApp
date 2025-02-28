import { Button, Card, Divider, Form, Input } from "antd";
import React from "react";
import cookie_logo from "../assets/icons/cookie.png";
function Login() {
  const [form] = Form.useForm();
  const handleChange = () => {};

  const handleSubmit = () => {};
  return (
    <>
      <Card
        style={{
          background: "#e39869",
          maxWidth: 600,
          margin: "20px auto",
          padding: 30,
          color: "white",
        }}
      >
        <Divider variant="solid" style={{ borderColor: "#854941" }}>
          <div
            style={{
              background: "white",
              margin: "1px 5px",
              padding: "3px 12px",
              borderRadius: "15px",
            }}
          >
            <img
              src={cookie_logo}
              alt="logo"
              style={{ width: "30px", height: "30px", marginRight: "10px" }}
            />
            <h1
              style={{
                color: "#e39869",
                margin: 0,
                fontSize: "1.2rem",
                letterSpacing: "1px",
                fontFamily: "'Pacifico', cursive",
              }}
            >
              Uncle Martin's Cookies
            </h1>
          </div>
        </Divider>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label={<span style={{ color: "#fff", fontSize: 20 }}>Email</span>}
            name="email"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              onChange={(value) => handleChange("email", value)}
              value=""
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 40,
                fontSize: 16,
              }}
            />
          </Form.Item>
          <Form.Item
            label={
              <span style={{ color: "#fff", fontSize: 20 }}>Password</span>
            }
            name="password"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input.Password
              onChange={(value) => handleChange("password", value)}
              value=""
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 40,
                fontSize: 16,
              }}
            />
          </Form.Item>{" "}
          <p
            style={{ color: "white", cursor: "pointer" }}
            //onClick={showDrawer}
          >
            Forgot password?
          </p>
          <Form.Item style={{ textAlign: "center", marginTop: 10 }}>
            <Button
              htmlType="submit"
              type="primary"
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 45,
                fontSize: 16,
                fontWeight: "bold",
                width: "50%",
              }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Login;
