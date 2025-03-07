import React, { useState } from "react";
import {
  Card,
  Col,
  Row,
  Button,
  Divider,
  Carousel,
  Image,
  Badge,
  Rate,
  message,
  Tag,
  Popconfirm,
} from "antd";
import SkeletonLoader from "../../../components/skeletonLoader";
import useCookies from "../../../assets/hooks/cookieHook";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import axios from "axios";
import Swal from "sweetalert2";
import UpdateCookieModal from "../../../components/updateCookieModal";
import CookieModal from "../../../components/cookieModal";

function CookiePageContent() {
  const { cookies, cookiesLoading, refreshKey } = useCookies();
  const [openModal, setOpenModal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(null);
  const [openDelete, setOpenDelete] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
    <>
      <div>
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
                      <Carousel autoplay autoplaySpeed={2500} fade dots={false}>
                        {Array.isArray(item.img) && item.img.length > 0 ? (
                          item.img.map((imgSrc, index) => (
                            <div key={index}>
                              <Image
                                alt={`Slide ${index + 1}`}
                                src={imgSrc}
                                width="100%"
                                height={300}
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
                            height={300}
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
                    <Button
                      type="primary"
                      onClick={() => viewCookie(item)}
                      title="View this cookie"
                    >
                      <EyeOutlined />
                    </Button>
                    <Button
                      type="primary"
                      title="Edit this cookie"
                      onClick={() => editCookie(item)}
                      style={{ background: "#da8a4d" }}
                    >
                      <EditOutlined />
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
                        onClick={() => showDeleteConfirm(item._id)}
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
      </div>
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
    </>
  );
}

export default CookiePageContent;
