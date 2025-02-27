import React, { useState } from "react";
import { Collapse, Space, theme, Typography } from "antd";
import { faq } from "../assets/data/data";
import { CaretRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Faq() {
  const { token } = theme.useToken();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Collapse
          accordion={true}
          collapsible="header"
          items={faq.map((f) => ({
            key: f.id,
            label: (
              <h2
                style={{
                  margin: 0,
                  fontSize: isMobile ? "0.58rem" : "1.5rem",
                }}
              >
                {f.question}
              </h2>
            ),
            children: <p style={{ margin: 0 }}>{f.answer}</p>,
          }))}
          defaultActiveKey={["1"]}
          bordered={true}
          size={isMobile ? "small" : "large"}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer, width: "100%" }}
        />
      </Space>
    </div>
  );
}

export default Faq;
