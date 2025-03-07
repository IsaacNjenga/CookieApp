import {
    BarChartOutlined,
    CreditCardOutlined,
    DashboardOutlined,
    LikeOutlined,
    ProductOutlined,
    SolutionOutlined,
    TeamOutlined,
    TruckOutlined,
    UserSwitchOutlined,
  } from "@ant-design/icons";
  import { Layout, Menu } from "antd";
  import React, { useState } from "react";
  import { Link, Outlet, useLocation } from "react-router-dom";
  
  const { Content, Sider } = Layout;
  
  const items = [
    {
      key: "/dashboard",
      label: <Link to="/dashboard">Dashboard</Link>,
      icon: <DashboardOutlined />,
    },
    {
      key: "orders",
      label: "Orders",
      icon: <TruckOutlined />,
      children: [
        {
          key: "/orders/track",
          label: <Link to="/orders/track">Track Orders</Link>,
        },
        {
          key: "/orders/new",
          label: <Link to="/orders/new">New Orders</Link>,
        },
      ],
    },
    {
      key: "/customers",
      label: <Link to="/customers">Customers</Link>,
      icon: <TeamOutlined />,
    },
    {
      key: "products",
      label: "Products",
      icon: <ProductOutlined />,
      children: [
        {
          key: "/products/add",
          label: <Link to="/products/add">Add Cookie</Link>,
        },
      ],
    },
    {
      key: "/reports",
      label: <Link to="/reports">Reports</Link>,
      icon: <BarChartOutlined />,
    },
    {
      key: "/payments",
      label: <Link to="/payments">Payments</Link>,
      icon: <CreditCardOutlined />,
    },
    {
      key: "users",
      label: "User Management",
      icon: <UserSwitchOutlined />,
      children: [
        {
          key: "/users/roles",
          label: <Link to="/users/roles">Users & Roles</Link>,
        },
      ],
    },
    {
      key: "feedback",
      label: "Feedback & Reviews",
      icon: <LikeOutlined />,
      children: [
        {
          key: "/feedback",
          label: <Link to="/feedback">Feedback</Link>,
        },
        {
          key: "/reviews",
          label: <Link to="/reviews">Reviews</Link>,
        },
      ],
    },
    {
      key: "resources",
      label: "Resources",
      icon: <SolutionOutlined />,
      children: [
        {
          key: "/notifications",
          label: <Link to="/notifications">Notifications</Link>,
        },
        {
          key: "/support",
          label: <Link to="/support">Help & Support</Link>,
        },
      ],
    },
  ];
  
  function AdminNavbar() {
    const location = useLocation();
    const [current, setCurrent] = useState(location.pathname);
  
    const handleClick = (e) => {
      setCurrent(e.key);
    };
  
    return (
      <Layout hasSider>
        <Sider
          style={{
            height: "100vh",
            position: "sticky",
            left: 0,
            top: 0,
            bottom: 0,
            overflowY: "auto",
          }}
        >
          <div
            style={{
              padding: "16px",
              fontSize: "22px",
              fontWeight: "bold",
              color: "white",
              textAlign: "center",
            }}
          >
            John Doe
          </div>
          <Menu
            theme="dark"
            mode="inline"
            onClick={handleClick}
            selectedKeys={[current]}
            items={items}
            style={{ fontSize: "16px" }}
          />
        </Sider>
        <Layout>
          <Content style={{ margin: "10px", padding: "10px", overflow: "auto" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    );
  }
  
  export default AdminNavbar;
  