import React, { useContext } from "react";
import AdminNavbar from "../../../components/adminNavbar";
import { Layout, theme } from "antd";
import { UserContext } from "../../../App";
import CustomersContent from "./customersContent.js";

const { Content, Header } = Layout;

function Customers() {
  const { collapsed } = useContext(UserContext);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh", transition: "margin-left 0.3s ease" }}>
      <AdminNavbar />
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
            fontWeight: "bold",
            position: "sticky",
            top: 0,
          }}
        >
          Customers
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
            <CustomersContent />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default Customers;
