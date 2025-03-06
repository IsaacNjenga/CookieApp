import { Modal, List, Rate, Typography, Image, Spin, Divider } from "antd";
import React, { useEffect, useState } from "react";

const { Title, Text } = Typography;

function ReviewsModal({
  openReviewModal,
  setOpenReviewModal,
  modalContent,
  reviews,
  reviewsLoading,
  reviewsRefreshKey,
}) {
  const [filteredReviews, setFilteredReviews] = useState([]);
  const cookieId = modalContent?._id;

  useEffect(() => {
    if (cookieId) {
      const matchingReviews = reviews.filter((r) => r.cookieId === cookieId);
      setFilteredReviews(matchingReviews);
    }
    //reviewsRefreshKey(); // Refresh the reviews when modal opens
  }, [cookieId, reviews]);

  return (
    <Modal
      footer={null}
      open={openReviewModal}
      onCancel={() => setOpenReviewModal(false)}
      confirmLoading={reviewsLoading}
      width={850}
      style={{ maxWidth: "95vw" }}
    >
      {/* Cookie Details */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        {modalContent?.img?.length > 0 && (
          <Image
            src={modalContent.img[0]}
            alt={modalContent.name}
            width={100}
            height={100}
            style={{ borderRadius: "8px", objectFit: "cover" }}
          />
        )}
        <div>
          <Title level={4}>{modalContent?.name}</Title>
          <Text type="secondary">{modalContent?.description}</Text>
          <div style={{ marginTop: "8px" }}>
            <Rate allowHalf defaultValue={modalContent?.rating} disabled />
            <Text style={{ marginLeft: "8px" }}>
              ({modalContent?.totalReviews || 0} reviews)
            </Text>
          </div>
        </div>
      </div>

      <Divider />

      {/* Reviews List */}
      {reviewsLoading ? (
        <Spin
          tip="Loading reviews..."
          style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
        />
      ) : filteredReviews.length === 0 ? (
        <Text
          type="secondary"
          style={{ display: "block", textAlign: "center", marginTop: "20px" }}
        >
          No reviews yet for this cookie.
        </Text>
      ) : (
        <List
          dataSource={filteredReviews}
          renderItem={(review) => (
            <List.Item>
              <div>
                <Rate allowHalf defaultValue={review.rating} disabled />
                <Text style={{ marginLeft: "8px" }}>({review.rating}/5)</Text>
                <p style={{ marginTop: "4px" }}>{review.review}</p>
                <Text type="secondary" style={{ fontSize: "12px" }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </Text>
              </div>
            </List.Item>
          )}
        />
      )}
    </Modal>
  );
}

export default ReviewsModal;
