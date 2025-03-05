import { Button, Form, Input, Modal, Rate } from "antd";
import React, { useState } from "react";

const { TextArea } = Input;

function RateModal({ openRateModal, setOpenRateModal, loading }) {
  const [values, setValues] = useState({ rating: 0, review: "" });
  const [form] = Form.useForm();

  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("Submitted Review:", values);
    // Here you can send 'values' to your backend or handle it as needed
    form.resetFields();
    setOpenRateModal(false);
  };

  return (
    <Modal
      footer={null}
      open={openRateModal}
      onCancel={() => setOpenRateModal(false)}
      confirmLoading={loading}
      width={850}
      style={{ maxWidth: "95vw" }} // Ensure modal is not too wide on small screens
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
      >
        <Form.Item label="Rating" name="rating" rules={[{ required: true, message: "Please rate!" }]}>
          <Rate onChange={(value) => handleChange("rating", value)} value={values.rating} />
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

        <div>
          <Button htmlType="submit" type="primary" loading={loading}>
            Submit
          </Button>
        </div>
      </Form>
    </Modal>
  );
}

export default RateModal;
