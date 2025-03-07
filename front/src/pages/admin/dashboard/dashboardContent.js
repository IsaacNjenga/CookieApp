import React from "react";
import { Card, Col, Row, Statistic, List } from "antd";

function DashboardContent() {
  const salesData = [
    { title: "Total Sales", value: 1200 },
    { title: "Total Orders", value: 300 },
    { title: "New Customers", value: 50 },
    { title: "Cookies Sold", value: 5000 },
  ];

  const recentOrders = [
    { id: 1, customer: "Alice", cookies: "Chocolate Chip", date: "2023-10-01" },
    { id: 2, customer: "Bob", cookies: "Oatmeal Raisin", date: "2023-10-02" },
    { id: 3, customer: "Charlie", cookies: "Peanut Butter", date: "2023-10-03" },
    { id: 4, customer: "Diana", cookies: "Sugar Cookies", date: "2023-10-04" },
  ];

  const customerFeedback = [
    { name: "Alice", feedback: "Delicious cookies! Will order again." },
    { name: "Bob", feedback: "Great service and fast delivery." },
    { name: "Charlie", feedback: "Loved the variety of flavors!" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>
      <Row gutter={16}>
        {salesData.map((data) => (
          <Col span={6} key={data.title}>
            <Card>
              <Statistic title={data.title} value={data.value} />
            </Card>
          </Col>
        ))}
      </Row>

      <h2 style={{ marginTop: "20px" }}>Recent Orders</h2>
      <List
        bordered
        dataSource={recentOrders}
        renderItem={(item) => (
          <List.Item>
            Order #{item.id}: {item.cookies} by {item.customer} on {item.date}
          </List.Item>
        )}
      />

      <h2 style={{ marginTop: "20px" }}>Customer Feedback</h2>
      <List
        bordered
        dataSource={customerFeedback}
        renderItem={(item) => (
          <List.Item>
            <strong>{item.name}:</strong> {item.feedback}
          </List.Item>
        )}
      />
    </div>
  );
}

export default DashboardContent;