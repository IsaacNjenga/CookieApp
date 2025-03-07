import React from "react";
import AdminNavbar from "./adminNavbar";
import { Layout, theme } from "antd";
const { Content, Sider, Header } = Layout;

function Dashboard() {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <div>
      <Layout hasSider>
        <Sider>
          <AdminNavbar />
        </Sider>
        <Layout>
          {" "}
          <Header
            style={{
              padding: 0,
              background: colorBgContainer,
              fontSize: "22px",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Dashboard
          </Header>
          <Content style={{ margin: "10px 0px", overflow: "auto" }}>
            <div
              style={{
                padding: 24,
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
                minHeight: "100vh",
                fontSize: "18px",
              }}
            >
              <div>Dashboard will be here</div>{" "}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
