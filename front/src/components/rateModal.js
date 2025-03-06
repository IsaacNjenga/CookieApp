import { Button, Divider, Form, Input, Modal, Rate } from "antd";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

const { TextArea } = Input;

function RateModal({ openRateModal, setOpenRateModal, modalContent }) {
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({ rating: 0, review: "" });
  const [form] = Form.useForm();

  const cookieId = modalContent?._id;
  const cookieName = modalContent?.name;

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const valuesData = { ...values, cookieId: cookieId };
      const res = await axios.post("create-review", valuesData);
      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Rating successful",
          text: "We really appreciate your feedback.",
        });
        form.resetFields();
        setOpenRateModal(false);
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "warning",
        title: "There seems to be an error",
        text: "Kindly refresh the page and try again",
      });
    } finally {
      setLoading(false);
    }
  };

  const closeRateModal = () => {
    setOpenRateModal(false);
  };
  return (
    <Modal
      footer={null}
      open={openRateModal}
      onCancel={() => setOpenRateModal(false)}
      confirmLoading={loading}
      width={850}
      style={{ maxWidth: "95vw" }}
    >
      <Divider
        variant="solid"
        className="home-divider"
        style={{ borderColor: "#e09b69" }}
      >
        {`Rating ${cookieName}`}
      </Divider>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: "Please rate!" }]}
        >
          <Rate
            onChange={(value) => handleChange("rating", value)}
            value={values.rating}
          />
        </Form.Item>

        <Form.Item
          label="Review"
          name="review"
          rules={[{ required: true, message: "Please enter a review!" }]}
        >
          <TextArea
            rows={4}
            placeholder="Write your review here..."
            onChange={(e) => handleChange("review", e.target.value)}
            value={values.review}
          />
        </Form.Item>

        <div style={{ display: "flex", gap: "15px" }}>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
          <Button
            type="primary"
            onClick={closeRateModal}
            style={{ background: "red" }}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default RateModal;
