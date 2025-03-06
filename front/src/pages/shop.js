import React, { useContext, useState } from "react";
import {
  Card,
  Button,
  Row,
  Col,
  Image,
  Divider,
  Rate,
  Carousel,
  Badge,
  Drawer,
  Space,
  Popconfirm,
  message,
  Tag,
} from "antd";
import CookieModal from "../components/cookieModal.js";
import SearchComponent from "../components/search.js";
import { UserContext } from "../App.js";
import Cart from "./cart.js";
import UpdateCookieModal from "../components/updateCookieModal.js";
import useCookies from "../assets/hooks/cookieHook.js";
import { DeleteOutlined } from "@ant-design/icons";
import Swal from "sweetalert2";
import axios from "axios";
import SkeletonLoader from "../components/skeletonLoader.js";

function Shop() {
  const { cookies, cookiesLoading, refreshKey } = useCookies();
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [openDelete, setOpenDelete] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { showDrawer, openDrawer, closeDrawer, setCartItems, setCartItem } =
    useContext(UserContext);

  const allCookies = [...cookies];

  const addToCart = (cookie) => {
    const selectedCookie = allCookies.find((c) => c._id === cookie._id);

    if (!selectedCookie) {
      console.warn("Cookie not found");
      return;
    }

    setCartItem((prevCart) => {
      const updatedCart = [
        ...prevCart,
        {
          _id: selectedCookie._id,
          name: selectedCookie.name,
          category: selectedCookie.category,
          description: selectedCookie.description,
          img: selectedCookie.img[0],
          price: selectedCookie.price,
          rating: selectedCookie.rating,
          stock: selectedCookie.stock,
          allergen: selectedCookie.allergen,
          totalReviews: selectedCookie.totalReviews,
          quantity: 1,
        },
      ];

      setCartItems(updatedCart);
      return updatedCart;
    });

    showDrawer();
  };

  const viewCookie = (item) => {
    setOpenModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const editCookie = (item) => {
    setOpenEditModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const showDeleteConfirm = (item) => {
    setOpenDelete(item._id);
  };

  const handleDelete = async (id) => {
    setConfirmLoading(true);
    try {
      await axios.delete(`delete-cookie?id=${id}`);
      Swal.fire({
        icon: "success",
        title: "Deleted",
      });
      refreshKey();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "Cookie could not be deleted",
        text: "Refresh and try again",
      });
    } finally {
      setConfirmLoading(false);
    }
  };

  const handleDeleteCancel = () => {
    message.error("Canceled");
    setOpenDelete(null);
  };

  return (
    <div>
      <Carousel autoplay className="carousel" dots={false} effect="fade">
        <div className="carousel-slide">
          Step into Uncle Martin’s Delicacies!
        </div>
        <div className="carousel-slide">
          Indulge in Our Freshly Baked Delights!
        </div>
        <div className="carousel-slide">
          Treat Yourself — Order Your Favorites Today!
        </div>
      </Carousel>
      <h2>Shop Our Cookies</h2>
      <SearchComponent
        onSearchChange={(value) => setSearchValue(value)}
        dataSource={allCookies}
        viewCookie={viewCookie}
      />{" "}
      {searchValue === "" && (
        <div>
          {" "}
          <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          >
            Made with ❤️
          </Divider>
          {cookiesLoading ? (
            <SkeletonLoader />
          ) : (
            <Row gutter={[10, 10]} justify="center">
              {cookies.map((item, index) => (
                <Col key={index} xs={24} sm={12} md={8} lg={6}>
                  <Card
                    hoverable
                    cover={
                      <Badge.Ribbon
                        text={`${item.category}`}
                        color="orange"
                        style={{
                          display: "block",
                          right: "10px",
                        }}
                      >
                        <Carousel
                          autoplay
                          autoplaySpeed={2500}
                          fade
                          dots={false}
                        >
                          {Array.isArray(item.img) && item.img.length > 0 ? (
                            item.img.map((imgSrc, index) => (
                              <div key={index}>
                                <Image
                                  alt={`Slide ${index + 1}`}
                                  src={imgSrc}
                                  width="100%"
                                  height={350}
                                  style={{
                                    objectFit: "cover",
                                  }}
                                  className="card-image"
                                />
                              </div>
                            ))
                          ) : (
                            <Image
                              alt={item.name}
                              src={item.img}
                              width="100%"
                              height={350}
                              style={{
                                objectFit: "cover",
                              }}
                              className="card-image"
                            />
                          )}
                        </Carousel>
                      </Badge.Ribbon>
                    }
                    className="cookie-card"
                  >
                    {item.rating > 0 ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Rate
                          allowHalf
                          defaultValue={item.rating}
                          style={{ flex: "0 0 auto" }}
                          disabled
                        />
                        <span
                          style={{
                            marginLeft: "8px",
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          ({item.totalReviews ? item.totalReviews : 3})
                        </span>
                      </div>
                    ) : (
                      <Tag
                        style={{
                          display: "inline-block",
                          backgroundColor: "#f0f0f0",
                          color: "grey",
                          marginBottom: "3px",
                        }}
                      >
                        Not Yet Rated
                      </Tag>
                    )}
                    <Card.Meta
                      title={item.name}
                      description={`KES. ${item.price} | ${
                        item.allergen ? `Contains ${item.allergen}` : null
                      }`}
                    />
                    <br />
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Button type="primary" onClick={() => viewCookie(item)}>
                        View
                      </Button>
                      <Button
                        style={{ backgroundColor: "green" }}
                        type="primary"
                        onClick={() => addToCart(item)}
                      >
                        Add To Cart
                      </Button>{" "}
                      <Drawer
                        title="Your Cart"
                        width={window.innerWidth < 768 ? 350 : 600}
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
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        margin: "10px 0px",
                      }}
                    >
                      <Button
                        type="primary"
                        onClick={() => editCookie(item)}
                        style={{ background: "#da8a4d" }}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure?"
                        description="This action cannot be undone!"
                        open={openDelete}
                        onConfirm={() => handleDelete(item._id)}
                        okButtonProps={{ loading: confirmLoading }}
                        onCancel={handleDeleteCancel}
                      >
                        <Button
                          type="primary"
                          style={{ background: "red" }}
                          danger
                          title="Delete this cookie"
                          onClick={() => showDeleteConfirm(item)}
                        >
                          <DeleteOutlined />
                        </Button>
                      </Popconfirm>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
          {/* <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          >
            Made for the best😉, by the best✨
          </Divider>
          <Divider
            variant="solid"
            className="home-divider"
            style={{ borderColor: "#e09b69" }}
          >
            Tap into greatness! 🙌
          </Divider> */}
        </div>
      )}
      <CookieModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalContent={modalContent}
        loading={loading}
      />
      <UpdateCookieModal
        openEditModal={openEditModal}
        setOpenEditModal={setOpenEditModal}
        modalContent={modalContent}
        loading={loading}
      />
      {/* Mobile Styling */}
      <style>
        {`
          .carousel-text {
            text-align: center;
            font-size: 24px;
          }
          @media (max-width: 768px) {


            .carousel-text {
              font-size: 18px;
            }
            .section-title {
              font-size: 20px;
              text-align: center;
            }
            .cookie-card {
              text-align: left;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Shop;
