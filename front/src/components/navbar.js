import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Drawer, Button, FloatButton, Space, Badge } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HomeOutlined,
  PhoneOutlined,
  ShopOutlined,
  SmileOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
  QuestionCircleOutlined,
  StarOutlined,
} from "@ant-design/icons";
import cookie_logo from "../assets/icons/cookie.png";
import FooterContent from "./footer";
import { UserContext } from "../App";
import Cart from "../pages/cart";

const { Header, Content, Footer } = Layout;

function Navbar() {
  const location = useLocation();
  const [current, setCurrent] = useState(location.pathname);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { cartItems, showDrawer, closeDrawer, openDrawer } =
    useContext(UserContext);

  const navItems = [
    { label: "Home", icon: HomeOutlined, path: "/" },
    { label: "Shop", icon: ShopOutlined, path: "/shop" },
    { label: "Rate a Cookie", icon: StarOutlined, path: "/review" },
    { label: "Reach Out", icon: PhoneOutlined, path: "/contact" },
    //{ label: "Dashboard", icon: UserOutlined, path: "/dashboard" },
    { label: "About us", icon: SmileOutlined, path: "/about-us" },
    { label: "FAQ", icon: QuestionCircleOutlined, path: "/faq" },
  ];

  const handleClick = (e) => setCurrent(e.key);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <FloatButton.Group shape="circle" style={{ insetInlineEnd: 24 }}>
        {isMobile && (
          <Badge count={cartItems.length}>
            <FloatButton
              icon={<ShoppingCartOutlined />}
              title="View Your Cart"
              type={cartItems.length > 0 ? "primary" : ""}
              onClick={showDrawer}
              style={{ display: isMobile ? "block" : "none" }}
            />{" "}
          </Badge>
        )}
        <Drawer
          title="Your Cart"
          width={isMobile ? 350 : 600}
          onClose={closeDrawer}
          open={openDrawer}
          styles={{ body: { paddingBottom: 60 } }}
          extra={
            <Space>
              <Button onClick={closeDrawer}>Cancel</Button>
            </Space>
          }
        >
          <Cart />
        </Drawer>
        <FloatButton.BackTop title="Back to top" />
      </FloatButton.Group>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "150px",
            background: "white",
            padding: "0 15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center" }}>
            {isMobile ? (
              <>
                <img
                  src={cookie_logo}
                  alt="logo"
                  style={{ width: "55px", height: "55px", marginRight: "10px" }}
                />
                <h1
                  style={{
                    color: "#e39a67",
                    margin: 0,
                    fontSize: "1.3rem",
                    letterSpacing: "1px",
                    fontFamily: "'Pacifico', cursive",
                  }}
                >
                  Uncle Martin's Cookies
                </h1>
              </>
            ) : (
              <>
                <img
                  src={cookie_logo}
                  alt="logo"
                  style={{ width: "60px", height: "60px", marginRight: "14px" }}
                />
                <h1
                  style={{
                    color: "#e39a67",
                    margin: 0,
                    fontSize: "1.85rem",
                    letterSpacing: "2px",
                    fontFamily: "'Pacifico', cursive",
                    zIndex: 10,
                  }}
                >
                  Uncle Martin's Cookies
                </h1>
              </>
            )}
          </div>

          {/* Desktop Navigation */}
          {!isMobile ? (
            <>
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[current]}
                onClick={handleClick}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  fontSize: "16px",
                  fontWeight: "bold",
                  background: "white",
                  color: "black",
                  borderRadius: "12px",
                }}
              >
                {navItems.map((item) => (
                  <Menu.Item
                    key={item.path}
                    icon={<item.icon style={{ fontSize: "1.6rem" }} />}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
              <Badge count={cartItems.length}>
                <Button
                  type={cartItems.length > 0 ? "primary" : ""}
                  onClick={showDrawer}
                >
                  <ShoppingCartOutlined style={{ fontSize: "1.6rem" }} />
                </Button>
              </Badge>
              <Drawer
                title="Your Cart"
                width={isMobile ? 350 : 600}
                onClose={closeDrawer}
                open={openDrawer}
                styles={{ body: { paddingBottom: 60 } }}
                extra={
                  <Space>
                    <Button onClick={closeDrawer}>Cancel</Button>
                  </Space>
                }
              >
                <Cart />
              </Drawer>
            </>
          ) : (
            <Button
              type="text"
              icon={
                <MenuOutlined
                  style={{ fontSize: "1.8rem", color: "#e39a67" }}
                />
              }
              onClick={toggleDrawer}
            />
          )}
        </Header>

        {/* Mobile Drawer */}
        <Drawer
          title="Menu"
          placement="right"
          width={250}
          onClose={toggleDrawer}
          open={drawerVisible}
        >
          <Menu mode="vertical" selectedKeys={[current]} onClick={handleClick}>
            {navItems.map((item) => (
              <Menu.Item key={item.path} icon={<item.icon />}>
                <Link to={item.path}>{item.label}</Link>
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>

        {/* Main Content */}
        <Content
          style={{
            padding: "0px 0px",
            minHeight: "calc(100vh - 64px - 70px)",
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        <Footer
          style={{ padding: "0px 0px", margin: "0px 0px", background: "black" }}
        >
          <FooterContent />
        </Footer>
      </Layout>
    </>
  );
}

export default Navbar;
