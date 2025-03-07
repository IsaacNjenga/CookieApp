import React from "react";
import { Card, List, Typography } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  MessageOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const feedbackData = [
  {
    id: 1,
    firstname: "Cole",
    lastname: "Ward",
    phone: "+1 (102) 573-9915",
    email: "vyzowi@mailinator.com",
    message: "Quam molestiae magna",
    createdAt: "2025-03-05T09:07:53.733+00:00",
    updatedAt: "2025-03-05T09:07:53.733+00:00",
  },
  {
    id: 2,
    firstname: "Alice",
    lastname: "Johnson",
    phone: "+1 (555) 123-4567",
    email: "alice@example.com",
    message: "Great cookies! Will order again.",
    createdAt: "2025-03-06T10:15:30.733+00:00",
    updatedAt: "2025-03-06T10:15:30.733+00:00",
  },
];

const formatDate = (dateString) => new Date(dateString).toLocaleString();

function FeedbackContent() {
  return (
    <div style={{ padding: "24px", maxWidth: "900px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Customer Feedback
      </Title>

      <List
        dataSource={feedbackData}
        renderItem={(item) => (
          <List.Item>
            <Card
              style={{
                width: "100%",
                borderRadius: "10px",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title
                level={4}
                style={{ marginBottom: "5px", color: "#1890ff" }}
              >
                {item.firstname} {item.lastname}
              </Title>

              <Paragraph>
                <PhoneOutlined
                  style={{ color: "#52c41a", marginRight: "8px" }}
                />
                <strong>Phone:</strong> {item.phone}
              </Paragraph>

              <Paragraph>
                <MailOutlined
                  style={{ color: "#faad14", marginRight: "8px" }}
                />
                <strong>Email:</strong> {item.email}
              </Paragraph>

              <Paragraph>
                <MessageOutlined
                  style={{ color: "#722ed1", marginRight: "8px" }}
                />
                <strong>Message:</strong>{" "}
                <Text type="secondary">{item.message}</Text>
              </Paragraph>

              <Paragraph>
                <ClockCircleOutlined
                  style={{ color: "#ff4d4f", marginRight: "8px" }}
                />
                <strong>Submitted on:</strong>{" "}
                <Text>{formatDate(item.createdAt)}</Text>
              </Paragraph>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default FeedbackContent;
