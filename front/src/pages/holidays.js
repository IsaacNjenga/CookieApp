import React from "react";
import { Collapse, Space, theme, Typography } from "antd";
import { faq } from "../assets/data/data"; // Ensure this path is correct
import { CaretRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Holidays() {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Collapse
          accordion={true}
          collapsible="header"
          items={faq.map((f) => ({
            key: f.id, // Use 'id' instead of 'key' for consistency
            label: f.question,
            children: <p style={{ margin: 0 }}>{f.answer}</p>, // Wrap answer in a paragraph
          }))}
          defaultActiveKey={["1"]} // Change default active key if needed
          bordered={true}
          size="large"
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          style={{ background: token.colorBgContainer }}
        />
      </Space>
    </div>
  );
}

export default Holidays;
