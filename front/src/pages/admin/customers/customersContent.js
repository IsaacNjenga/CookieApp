import React from "react";
import { Card, Col, Row, List,  } from "antd";

const customerData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    orders: [
      {
        id: 101,
        cookies: "Chocolate Chip",
        date: "2023-10-01",
        status: "Delivered",
      },
      {
        id: 102,
        cookies: "Oatmeal Raisin",
        date: "2023-10-05",
        status: "Pending",
      },
    ],
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    orders: [
      {
        id: 103,
        cookies: "Peanut Butter",
        date: "2023-10-02",
        status: "Delivered",
      },
    ],
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    orders: [
      {
        id: 104,
        cookies: "Sugar Cookies",
        date: "2023-10-03",
        status: "Cancelled",
      },
      {
        id: 105,
        cookies: "Chocolate Chip",
        date: "2023-10-06",
        status: "Delivered",
      },
    ],
  },
];

function CustomersContent() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Customers</h1>
      <Row gutter={16}>
        {customerData.map((customer) => (
          <Col span={8} key={customer.id}>
            <Card title={customer.name} style={{ marginBottom: "20px" }}>
              <p>Email: {customer.email}</p>
              <h4>Order History:</h4>
              <List
                size="small"
                bordered
                dataSource={customer.orders}
                renderItem={(order) => (
                  <List.Item>
                    Order #{order.id}: {order.cookies} on {order.date} - Status:{" "}
                    {order.status}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default CustomersContent;
