import React from "react";
import { Table, Button } from "antd";

const newOrders = [
  {
    id: 1,
    customer: "Alice Johnson",
    cookies: "Chocolate Chip",
    quantity: 2,
    total: 25.98,
    date: "2023-10-01",
    status: "Pending",
  },
  {
    id: 2,
    customer: "Bob Smith",
    cookies: "Oatmeal Raisin",
    quantity: 1,
    total: 10.99,
    date: "2023-10-02",
    status: "Pending",
  },
  {
    id: 3,
    customer: "Charlie Brown",
    cookies: "Peanut Butter",
    quantity: 3,
    total: 35.97,
    date: "2023-10-03",
    status: "Pending",
  },
  {
    id: 4,
    customer: "Diana Prince",
    cookies: "Sugar Cookies",
    quantity: 5,
    total: 49.95,
    date: "2023-10-04",
    status: "Pending",
  },
];

function OrdersContent() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>New Orders</h1>

      <Table
        dataSource={newOrders}
        columns={[
          { title: "Order ID", dataIndex: "id", key: "id" },
          { title: "Customer", dataIndex: "customer", key: "customer" },
          { title: "Cookies", dataIndex: "cookies", key: "cookies" },
          { title: "Quantity", dataIndex: "quantity", key: "quantity" },
          { title: "Total ($)", dataIndex: "total", key: "total" },
          { title: "Date", dataIndex: "date", key: "date" },
          { title: "Status", dataIndex: "status", key: "status" },
          {
            title: "Action",
            key: "action",
            render: (_, record) => (
              <Button
                type="primary"
                onClick={() => handleOrderProcess(record.id)}
              >
                Process Order
              </Button>
            ),
          },
        ]}
        pagination={false}
        rowKey="id"
      />
    </div>
  );
}

// Function to handle order processing (placeholder)
const handleOrderProcess = (orderId) => {
  console.log(`Processing order ID: ${orderId}`);
};

export default OrdersContent;
