import React, { useState } from "react";
import AdminNavbar from "./adminNavbar";
import { Layout, theme } from "antd";

const { Content, Header } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false); // Sidebar state

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", transition: "margin-left 0.3s ease" }}>
      <AdminNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

      <Layout
        style={{
          marginLeft: collapsed ? 80 : 260,
          transition: "margin-left 0.3s ease",
        }}
      >
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            fontSize: "22px",
            textAlign: "center",
            fontWeight: "bold", position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          Dashboard
        </Header>
        <Content
          style={{ margin: "10px 0px", padding: "10px", overflow: "auto" }}
        >
          <div
            style={{
              padding: 10,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: "100vh",
              fontSize: "18px",
            }}
          >
            Dashboard will be here
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
