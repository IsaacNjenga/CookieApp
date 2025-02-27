import React from "react";
import { Collapse, Space, theme, Typography } from "antd";
import { faq } from "../assets/data/data";
import { CaretRightOutlined } from "@ant-design/icons";

const { Title } = Typography;

function Faq() {
  const { token } = theme.useToken();

  return (
    <div style={{ padding: "0px", maxWidth: "800px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "20px" }}>
        Frequently Asked Questions
      </Title>
      <Space direction="vertical" style={{ width: "100%" }}>
        <Collapse
          accordion={true}
          collapsible="header"
          items={faq.map((f) => ({
            key: f.id,
            label: <h4 style={{ margin: 0 }}>{f.question}</h4>,
            children: <p style={{ margin: 0 }}>{f.answer}</p>,
          }))}
          defaultActiveKey={["1"]}
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

export default Faq;
