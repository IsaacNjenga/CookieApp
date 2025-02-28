import { Button, Card, Divider, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import cookie_logo from "../assets/icons/cookie.png";
import Swal from "sweetalert2";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import axios from "axios";
import { UserContext } from "../App";
function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { setUser } = useContext(UserContext);

  const [form] = Form.useForm();
  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async () => {
    const { email, password } = values;
    setLoading(true);
    try {
      const response = await axios.post(
        `login`,
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      const { success, user, token } = response.data;
      if (success) {
        localStorage.setItem("token", token);
        setUser(user);
        localStorage.setItem("showLoginNotification", "true");
        //navigate("/");
      } else {
        Swal.fire({
          icon: "error",
          title: "Login failed",
          text: "Please enter the correct details",
        });
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
      form.resetFields();
      setValues({ email: "", password: "" });
      setLoading(false);
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
          </Form.Item>
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
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}

export default Login;
