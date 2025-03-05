import { Card, Col, Rate, Row, Skeleton } from "antd";
import React from "react";

function SkeletonLoader() {
  return (
    <>
      <Row gutter={[10, 10]} justify="center">
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <div
                    style={{
                      width: "100%",
                      height: 250,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f2f2f2",
                    }}
                  >
                    <Skeleton.Image
                      style={{ width: "100%", height: "100%" }}
                      active
                    />
                  </div>
                }
                className="cookie-card"
              >
                <Rate disabled value={5} style={{ width: "100%" }} />
                <Skeleton
                  active
                  paragraph={{ rows: 1, width: ["80%"] }}
                  title={{ width: "60%" }}
                />
                <br />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Skeleton.Button
                    active
                    shape="default"
                    size="large"
                    style={{ width: "50%" }}
                  />
                  <Skeleton.Button
                    active
                    shape="default"
                    size="large"
                    style={{ width: "65%" }}
                  />
                </div>
              </Card>
            </Col>
          ))}
      </Row>
    </>
  );
}

export default SkeletonLoader;
