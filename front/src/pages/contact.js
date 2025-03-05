import React, { useState } from "react";
import { Form, Input, Button, Card, Divider } from "antd";
import Swal from "sweetalert2";
import axios from "axios";

const { TextArea } = Input;

function Contact() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();
  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      console.log(values);
      const res = await axios.post("create-feedback", values);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Message received",
          text: "Thank you for reaching out! We truly appreciate your feedback and will make sure to take it into consideration. ",
        });
        form.resetFields();
        setValues({
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "There seems to be an issue",
        text: "Try refreshing the page and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const setClear = () => {
    form.resetFields();
    setValues({
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <>
      <div>
        <Divider
          variant="solid"
          className="home-divider"
          style={{ borderColor: "#e09b69" }}
        >
          <h2>We value your feedback.</h2>
        </Divider>
        <Card
          title={<h3 style={{ color: "white" }}>Get in Touch</h3>}
          style={{
            margin: "0px auto",
            maxWidth: 600,
            background: "linear-gradient(to left, #ecc885 0%, #da8a4d 100%)",
            color: "white",
          }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            variant="outlined"
          >
            <div>
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
                }}
              >
                {" "}
                <Form.Item
                  label={
                    <span style={{ fontSize: 18, color: "white" }}>
                      First Name
                    </span>
                  }
                  name="firstname"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input
                    placeholder="John"
                    onChange={(e) => handleChange("firstname", e.target.value)}
                    value={values.firstname}
                    style={{
                      height: 40,
                      fontSize: 16,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={{ fontSize: 18, color: "white" }}>
                      Last Name
                    </span>
                  }
                  name="lastname"
                >
                  <Input
                    placeholder="Doe"
                    onChange={(e) => handleChange("lastname", e.target.value)}
                    value={values.lastname}
                    style={{
                      height: 40,
                      fontSize: 16,
                    }}
                  />
                </Form.Item>
              </div>
              <div
                style={{
                  display: "grid",
                  gap: "15px",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
                }}
              >
                <Form.Item
                  label={
                    <span style={{ fontSize: 18, color: "white" }}>
                      {" "}
                      Your Phone Number
                    </span>
                  }
                  name="phone"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Input
                    type="tel"
                    placeholder="+254 730 900 031"
                    onChange={(e) => handleChange("phone", e.target.value)}
                    value={values.phone}
                    style={{
                      height: 40,
                      fontSize: 16,
                    }}
                  />
                </Form.Item>
                <Form.Item
                  label={
                    <span style={{ fontSize: 18, color: "white" }}>
                      Your Email Address
                    </span>
                  }
                  name="email"
                >
                  <Input
                    type="email"
                    placeholder="doejohn@email.com"
                    onChange={(e) => handleChange("email", e.target.value)}
                    value={values.email}
                    style={{
                      height: 40,
                      fontSize: 16,
                    }}
                  />
                </Form.Item>
              </div>
            </div>
            <Form.Item
              label={
                <span style={{ fontSize: 18, color: "white" }}>Message</span>
              }
              name="message"
              rules={[{ required: true }]}
            >
              <TextArea
                rows={4}
                placeholder="Your Message"
                onChange={(e) => handleChange("message", e.target.value)}
                value={values.message}
                style={{
                  fontSize: 16,
                }}
              />
            </Form.Item>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button type="primary" htmlType="submit" loading={loading}>
                Send Message
              </Button>
              <Button
                type="primary"
                style={{ background: "red" }}
                onClick={setClear}
              >
                Clear
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Contact;
