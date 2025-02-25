import React, { useState } from "react";
import { Badge, Card, Col, Image, Input, Rate, Row, Button } from "antd";
const { Search } = Input;

function SearchComponent({ onSearchChange, dataSource, viewCookie }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const filteredData = dataSource.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(search)
    )
  );
  return (
    <>
      <Search
        placeholder="Find your favourite..."
        style={{ marginBottom: 20, width: 300 }}
        value={search}
        onChange={handleSearchChange}
      />

      {search && <h4>Results for "{search}"</h4>}
      {search ? (
        <div>
          {" "}
          <Row gutter={[10, 10]} justify="center">
            {filteredData.map((item, index) => (
              <Col key={index} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  cover={
                    <Badge.Ribbon
                      text={`${item.stock} available`}
                      color="orange"
                      style={{
                        display: "block",
                        right: "10px",
                      }}
                    >
                      <Image
                        alt={item.title}
                        src={item.img}
                        width="100%"
                        height={300}
                        style={{
                          objectFit: "cover",
                        }}
                        className="card-image"
                      />
                    </Badge.Ribbon>
                  }
                  className="cookie-card"
                >
                  <Rate
                    allowHalf
                    defaultValue={item.rating}
                    style={{ width: "100%" }}
                  />
                  <Card.Meta
                    title={item.title}
                    description={`KES. ${item.price}`}
                  />
                  <br />
                  <Button type="primary" block onClick={() => viewCookie(item)}>
                    Add To Cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ) : null}
    </>
  );
}

export default SearchComponent;
