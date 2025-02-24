import React from "react";
import { Card, Row, Col, Input, Button } from "antd";

const { Search } = Input;

const products = [
  { title: "Chocolate Chip", img: "https://via.placeholder.com/200", price: "$5" },
  { title: "Peanut Butter", img: "https://via.placeholder.com/200", price: "$4" },
  { title: "Sugar Cookies", img: "https://via.placeholder.com/200", price: "$3" },
];

function Shop() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Shop Our Cookies</h2>

      <Search placeholder="Search cookies..." style={{ marginBottom: 20, width: 300 }} />

      <Row gutter={[16, 16]}>
        {products.map((item, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card hoverable cover={<img alt={item.title} src={item.img} />}>
              <Card.Meta title={item.title} description={item.price} />
              <Button type="primary" style={{ marginTop: 10 }}>Add to Cart</Button>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Shop;
