import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Drawer, Button, FloatButton, Space } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  HeartOutlined,
  HomeOutlined,
  PhoneOutlined,
  ShopOutlined,
  SmileOutlined,
  MenuOutlined,
  ShoppingCartOutlined,
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
  const [openDrawer, setOpenDrawer] = useState(false);
  const { cartItems } = useContext(UserContext);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  console.log(cartItems);

  const navItems = [
    { label: "Home", icon: HomeOutlined, path: "/" },
    { label: "Shop", icon: ShopOutlined, path: "/shop" },
    { label: "About us", icon: SmileOutlined, path: "/about-us" },
    { label: "Contact", icon: PhoneOutlined, path: "/contact" },
    { label: "Occasions", icon: HeartOutlined, path: "/occasions" },
    { label: "Holidays", icon: SmileOutlined, path: "/holidays" },
  ];

  const handleClick = (e) => setCurrent(e.key);

  const toggleDrawer = () => setDrawerVisible(!drawerVisible);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <FloatButton.BackTop title="Back to top" />
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 1,
            width: "100%",
            height: "150px",
            background: "white",
            padding: "0 20px",
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
                    letterSpacing: "0px",
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
                  style={{ width: "60px", height: "60px", marginRight: "10px" }}
                />
                <h1
                  style={{
                    color: "#e39a67",
                    margin: 0,
                    fontSize: "1.8rem",
                    letterSpacing: "2px",
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
                }}
              >
                {navItems.map((item) => (
                  <Menu.Item
                    key={item.path}
                    icon={<item.icon style={{ fontSize: "1.5rem" }} />}
                  >
                    <Link to={item.path}>{item.label}</Link>
                  </Menu.Item>
                ))}
              </Menu>
              <Button
                title="View Cart"
                type={cartItems.length > 0 ? "primary" : ""}
                onClick={showDrawer}
              >
                <ShoppingCartOutlined style={{ fontSize: "1.5rem" }} />
              </Button>

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
            padding: "20px 48px",
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
