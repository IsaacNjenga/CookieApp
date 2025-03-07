import {
  BarChartOutlined,
  CreditCardOutlined,
  DashboardOutlined,
  EyeOutlined,
  LikeOutlined,
  PlusCircleOutlined,
  ProductOutlined,
  SolutionOutlined,
  TeamOutlined,
  TruckOutlined,
  UserSwitchOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../App";

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
        key: "/view",
        label: <Link to="/view-cookies">View Cookies</Link>,
        icon: <EyeOutlined />,
      },
      {
        key: "/add",
        label: <Link to="/add-cookie">Add Cookie</Link>,
        icon: <PlusCircleOutlined />,
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
  const { collapsed, setCollapsed } = useContext(UserContext);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <Layout hasSider>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          width={260}
          style={{
            height: "120vh",
            position: "absolute",
            left: 0,
            top: 150,
            bottom: 0,
            overflowY: "auto",
            scrollbarWidth: "thin",
            zIndex: 100,
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
            {collapsed ? "JD" : "John Doe"}
          </div>
          <Menu
            mode="inline"
            theme="dark"
            onClick={handleClick}
            selectedKeys={[current]}
            items={items}
            style={{ fontSize: "16px" }}
          />
        </Sider>
        <Layout>
          <Content>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}

export default AdminNavbar;
