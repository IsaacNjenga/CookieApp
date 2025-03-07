import React from 'react';
import { Card, Col, Row, Table, Statistic } from 'antd';

const salesData = [
  {
    date: '2023-10-01',
    totalSales: 1200,
    totalOrders: 50,
    newCustomers: 10,
  },
  {
    date: '2023-10-02',
    totalSales: 1500,
    totalOrders: 60,
    newCustomers: 15,
  },
  {
    date: '2023-10-03',
    totalSales: 900,
    totalOrders: 40,
    newCustomers: 5,
  },
  {
    date: '2023-10-04',
    totalSales: 2000,
    totalOrders: 80,
    newCustomers: 20,
  },
];

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Total Sales ($)',
    dataIndex: 'totalSales',
    key: 'totalSales',
  },
  {
    title: 'Total Orders',
    dataIndex: 'totalOrders',
    key: 'totalOrders',
  },
  {
    title: 'New Customers',
    dataIndex: 'newCustomers',
    key: 'newCustomers',
  },
];

function ReportsContent() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Reports</h1>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total Sales (Last 30 Days)" value={salesData.reduce((acc, item) => acc + item.totalSales, 0)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total Orders (Last 30 Days)" value={salesData.reduce((acc, item) => acc + item.totalOrders, 0)} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="New Customers (Last 30 Days)" value={salesData.reduce((acc, item) => acc + item.newCustomers, 0)} />
          </Card>
        </Col>
      </Row>

      <h2 style={{ marginTop: '20px' }}>Sales Report</h2>
      <Table
        dataSource={salesData}
        columns={columns}
        pagination={false}
        rowKey="date"
      />
    </div>
  );
}

export default ReportsContent;