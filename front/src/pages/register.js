import { Button, Card, Divider, Form, Input } from "antd";
import React, { useState } from "react";
import cookie_logo from "../assets/icons/cookie.png";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const [form] = Form.useForm();
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axios.post("register", values);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Sign up successful",
          text: "Proceed to login",
        });
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during login", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response.data.error,
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong!",
        });
      }
    } finally {
      setLoading(false);
      form.resetFields("");
      setValues({
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      });
    }
  };
  return (
    <>
      <Card
        style={{
          background: "#e39869",
          maxWidth: 600,
          margin: "10px auto",
          padding: 0,
          color: "white",
        }}
      >
        <Divider variant="solid" style={{ borderColor: "#854941" }}>
          <div
            style={{
              background: "white",
              margin: "1px auto",
              padding: "1px 15px",
              borderRadius: "15px",
            }}
          >
            <img
              src={cookie_logo}
              alt="logo"
              style={{ width: "30px", height: "30px", marginTop: "5px" }}
            />
          </div>
        </Divider>
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <div
            style={{
              display: "grid",
              gap: "5px",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
            }}
          >
            <Form.Item
              label={
                <span style={{ color: "#fff", fontSize: 18 }}>First Name</span>
              }
              name="firstname"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                onChange={(e) => handleChange("firstname", e.target.value)}
                value={values.firstname}
                placeholder="Enter your first name"
                style={{
                  background: "#e39869",
                  border: "1px solid white",
                  height: 40,
                  fontSize: 14,
                  color: "white",
                }}
              />
            </Form.Item>
            <Form.Item
              label={
                <span style={{ color: "#fff", fontSize: 18 }}>Last Name</span>
              }
              name="lastname"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input
                onChange={(e) => handleChange("lastname", e.target.value)}
                value={values.lastname}
                placeholder="Enter your last name"
                style={{
                  background: "#e39869",
                  border: "1px solid white",
                  height: 40,
                  fontSize: 14,
                  color: "white",
                }}
              />
            </Form.Item>
          </div>
          <Form.Item
            label={
              <span style={{ color: "#fff", fontSize: 18 }}>Username</span>
            }
            name="username"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              onChange={(e) => handleChange("username", e.target.value)}
              value={values.username}
              placeholder="Enter your username"
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 40,
                fontSize: 14,
                color: "white",
              }}
            />
          </Form.Item>
          <Form.Item
            label={<span style={{ color: "#fff", fontSize: 18 }}>Email</span>}
            name="email"
            rules={[{ required: true, message: "This field is required" }]}
          >
            <Input
              onChange={(e) => handleChange("email", e.target.value)}
              value={values.email}
              placeholder="Enter email"
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 40,
                fontSize: 14,
                color: "white",
              }}
            />
          </Form.Item>{" "}
          <div
            style={{
              display: "grid",
              gap: "5px",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
            }}
          >
            <Form.Item
              label={
                <span style={{ color: "#fff", fontSize: 18 }}>Password</span>
              }
              name="password"
              rules={[{ required: true, message: "This field is required" }]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                onChange={(e) => handleChange("password", e.target.value)}
                value={values.password}
                placeholder="Enter Password"
                style={{
                  background: "#e39869",
                  border: "1px solid white",
                  height: 40,
                  fontSize: 14,
                  color: "white",
                }}
              />
            </Form.Item>{" "}
            <Form.Item
              label={
                <span style={{ color: "#fff", fontSize: 18 }}>
                  Re-enter password
                </span>
              }
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match"));
                  },
                }),
              ]}
            >
              <Input.Password
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
                placeholder="Re-enter your password"
                style={{
                  background: "#e39869",
                  border: "1px solid white",
                  height: 40,
                  fontSize: 14,
                  color: "white",
                }}
              />
            </Form.Item>
          </div>
          <Form.Item style={{ textAlign: "center", marginTop: 10 }}>
            <Button
              htmlType="submit"
              type="primary"
              loading={loading}
              style={{
                background: "#e39869",
                border: "1px solid white",
                height: 40,
                fontSize: 14,
                fontWeight: "bold",
                width: "55%",
              }}
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Register;
