import React from 'react';
import { Card, Col, Row, Table, List, Statistic } from 'antd';

const paymentMethods = [
  { id: 1, method: 'Credit Card', status: 'Active' },
  { id: 2, method: 'PayPal', status: 'Active' },
  { id: 3, method: 'Bank Transfer', status: 'Inactive' },
];

const recentTransactions = [
  { id: 1, amount: 30.99, date: '2023-10-01', status: 'Completed' },
  { id: 2, amount: 19.50, date: '2023-10-02', status: 'Pending' },
  { id: 3, amount: 46.00, date: '2023-10-03', status: 'Completed' },
  { id: 4, amount: 27.75, date: '2023-10-04', status: 'Failed' },
];

const totalAmount = recentTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

function PaymentsContent() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Payments</h1>

      <Row gutter={16}>
        <Col span={8}>
          <Card title="Payment Methods">
            <List
              bordered
              dataSource={paymentMethods}
              renderItem={(item) => (
                <List.Item>
                  {item.method} - {item.status}
                </List.Item>
              )}
            />
          </Card>
        </Col>

        <Col span={16}>
          <Card title="Recent Transactions">
            <Table
              dataSource={recentTransactions}
              columns={[
                { title: 'Transaction ID', dataIndex: 'id', key: 'id' },
                { title: 'Amount ($)', dataIndex: 'amount', key: 'amount' },
                { title: 'Date', dataIndex: 'date', key: 'date' },
                { title: 'Status', dataIndex: 'status', key: 'status' },
              ]}
              pagination={false}
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      <h2 style={{ marginTop: '20px' }}>Payment Summary</h2>
      <Card>
        <Statistic title="Total Amount Processed ($)" value={totalAmount.toFixed(2)} />
      </Card>
    </div>
  );
}

export default PaymentsContent;