import React, { useState } from "react";
import SearchComponentList from "../../../components/searchComponentList";
import { Image, List, Button, Typography, Rate, Tag, Card } from "antd";
import useCookies from "../../../assets/hooks/cookieHook";
import useReviews from "../../../assets/hooks/reviewsHook";
import { EyeOutlined } from "@ant-design/icons";
import CookieModal from "../../../components/cookieModal";
import ReviewsModal from "../../../components/reviewsModal";

const { Text } = Typography;
function ReviewsContent() {
  const { cookies, cookiesLoading } = useCookies();
  const { reviews, reviewsLoading, reviewsRefreshKey } = useReviews();
  const [openModal, setOpenModal] = useState(null);
  const [openReviewModal, setOpenReviewModal] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);

  const viewCookie = (item) => {
    setOpenModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const viewReviews = (item) => {
    setOpenReviewModal(true);
    setLoading(true);
    setModalContent(item);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  
  return (
    <>
      <div
        style={{
          padding: "10px 8px",
          minHeight: "calc(100vh - 64px - 70px)",
        }}
      >
        <SearchComponentList
          onSearchChange={(value) => setSearchValue(value)}
          dataSource={cookies}
          viewCookie={viewCookie}
          viewReviews={viewReviews}
        />
        {searchValue === "" && (
          <Card title="User reviews">
            <List
              itemLayout="horizontal"
              dataSource={cookies}
              loading={cookiesLoading}
              renderItem={(item) => (
                <List.Item
                  style={{ flexWrap: "wrap" }}
                  actions={[
                    <div style={{ display: "flex", gap: "15px" }}>
                      <Button
                        type="primary"
                        key="view"
                        title="View"
                        onClick={() => viewCookie(item)}
                      >
                        <EyeOutlined />
                      </Button>

                      <Button
                        type="primary"
                        key="reviews"
                        style={{
                          backgroundColor: "yellow",
                          color: "black",
                        }}
                        onClick={() => viewReviews(item)}
                      >
                        <strong>Reviews</strong>
                      </Button>
                    </div>,
                  ]}
                >
                  <List.Item.Meta
                    avatar={
                      <Image
                        src={item.img[0]}
                        alt={item.name}
                        width={100}
                        height={100}
                        style={{
                          borderRadius: "8px",
                          objectFit: "cover",
                          maxWidth: "100%",
                        }}
                      />
                    }
                    title={
                      <Text style={{ fontSize: "16px" }}>
                        {item.name} | {item.category}
                      </Text>
                    }
                    description={
                      <div>
                        <p
                          style={{
                            fontSize: "14px",
                            color: "#666",
                          }}
                        >
                          {item.description}
                        </p>{" "}
                        {item.rating > 0 ? (
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
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
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>
      <CookieModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        modalContent={modalContent}
        loading={loading}
      />

      <ReviewsModal
        openReviewModal={openReviewModal}
        setOpenReviewModal={setOpenReviewModal}
        modalContent={modalContent}
        reviews={reviews}
        reviewsLoading={reviewsLoading}
        reviewsRefreshKey={reviewsRefreshKey}
      />
    </>
  );
}

export default ReviewsContent;
