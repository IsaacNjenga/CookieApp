import React from "react";
import { Form, Input, Button, Card } from "antd";
import ClientInfo from "../components/clientInfo";

const { TextArea } = Input;

function Contact() {
  const onFinish = (values) => {
    console.log("Received values:", values);
  };

  return (
    <>
      <ClientInfo />
      <div style={{ display: "none" }}>
        <Card title="Get in Touch">
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Your Name" />
            </Form.Item>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input type="email" placeholder="Your Email" />
            </Form.Item>
            <Form.Item
              label="Message"
              name="message"
              rules={[{ required: true }]}
            >
              <TextArea rows={4} placeholder="Your Message" />
            </Form.Item>
            <Button type="primary" htmlType="submit">
              Send Message
            </Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default Contact;
