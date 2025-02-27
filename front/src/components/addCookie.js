import {
  Button,
  Card,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Row,
} from "antd";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";
import { DeleteOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

function AddCookie() {
  const [values, setValues] = useState({ name: "" });
  const [imageUrls, setImageUrls] = useState([]);
  const [imagePublicIds, setImagePublicIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [form] = Form.useForm();

  const handleImageUpload = (e) => {
    Swal.fire({
      title: "Uploading your image...",
      text: "Please wait",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    setImageUploading(true);
    const files = Array.from(e.target.files); // Get all selected files
    const maxSize = 10 * 1024 * 1024;

    // Check each file size
    for (let file of files) {
      if (file.size > maxSize) {
        setImageUploading(false);
        return Swal.fire({
          icon: "error",
          title: "File exceeds limit!",
          text: "Please select a file less than 10MB",
          confirmButtonText: "OK",
        });
      }
    }

    const cloud_name = "dinsdfwod";
    const preset_key = "EasyManager";
    let newImageUrls = [];
    let newImagePublicIds = [];

    const uploadPromises = files.map((file) => {
      const formImageData = new FormData();
      formImageData.append("file", file);
      formImageData.append("upload_preset", preset_key);

      return axios
        .post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formImageData,
          { withCredentials: false }
        )
        .then((res) => {
          // For each uploaded image, update the arrays setImageUploading(true);

          newImageUrls.push(res.data.secure_url);
          newImagePublicIds.push(res.data.public_id);
        })
        .catch((error) => {
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Failed to upload image",
            text: "There was an unexpected error. Please try again",
            confirmButtonText: "OK",
          });
        });
    });

    // After all uploads are done, update the state
    Promise.all(uploadPromises)
      .then(() => {
        Swal.fire({ icon: "success", title: "Images added successfully" });
        setImageUploading(false);

        setImageUrls((prevImages) => [...prevImages, ...newImageUrls]);
        setImagePublicIds((prevIds) => [...prevIds, ...newImagePublicIds]);
      })
      .catch((error) => {
        setImageUploading(false);
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Failed to upload image",
          text: "There was an unexpected error. Please try again",
          confirmButtonText: "OK",
        });
      });
  };

  const handleChange = (name, value) => {
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = () => {
    setLoading(true);
    try {
      const cookieData = { ...values, img: imageUrls, imgId: imagePublicIds };
      console.log(cookieData);
      Swal.fire({ icon: "success", title: "Success", text: "Cookie added!" });
      form.resetFields();
      setValues({ name: "" });
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Error",
        text: "There was an error adding this cookie",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    form.resetFields();
    setValues({ name: "" });
  };

  const cookieCategories = [
    { label: "Classic Cookies", value: "Classic Cookie" },
    { label: "Specialty Cookies", value: "Specialty Cookie" },
    { label: "Filled Cookies", value: "Filled Cookie" },
    { label: "Seasonal Cookies", value: "Seasonal Cookie" },
    { label: "Vegan Cookies", value: "Vegan Cookie" },
    { label: "Gluten-Free Cookies", value: "Gluten-Free Cookie" },
    { label: "Healthy Cookies", value: "Healthy Cookie" },
  ];

  const cookieAllergens = [
    { label: "Wheat", value: "Wheat" },
    { label: "Dairy", value: "Dairy" },
    { label: "Eggs", value: "Eggs" },
    { label: "Nuts", value: "Nuts" },
    { label: "Soy", value: "Soy" },
    { label: "Sesame", value: "Sesame" },
    { label: "Corn", value: "Corn" },
    { label: "Gluten", value: "gluten" },
  ];
  return (
    <>
      <div>
        <Card
          title="Add a Cookie"
          style={{ maxWidth: 1100, margin: "20px auto", padding: "20px" }}
        >
          <Form
            form={form}
            onFinish={handleSubmit}
            layout="vertical"
            variant="outlined"
          >
            <Row gutter={24}>
              <Col xs={24} md={10}>
                <Form.Item label="You can upload multiple images ">
                  <div>
                    <label
                      htmlFor="file-upload"
                      className="custom-upload-button"
                    ></label>
                    <input
                      id="file-upload"
                      accept="image/*"
                      type="file"
                      multiple
                      onChange={handleImageUpload}
                    />
                  </div>
                  {imageUrls.length > 0 ? (
                    <div
                      className="image-preview-container"
                      style={{ marginTop: 10 }}
                    >
                      {imageUrls.map((url, index) => (
                        <div
                          key={imagePublicIds[index]}
                          style={{
                            position: "relative",
                            display: "inline-block",
                            marginRight: 8,
                          }}
                        >
                          <Button
                            type="text"
                            shape="circle"
                            icon={<DeleteOutlined />}
                            // onClick={(e) =>
                            //   deletePicture(e, imagePublicIds[index])
                            // }
                            style={{
                              position: "absolute",
                              top: -10,
                              right: -10,
                              zIndex: 1,
                              background: "white",
                            }}
                          />
                          <Image
                            src={url}
                            alt="uploaded"
                            style={{
                              width: 150,
                              height: 150,
                              objectFit: "cover",
                              borderRadius: 5,
                              margin: "10px",
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="no-image-text"
                      style={{ marginTop: 10, color: "#999" }}
                    >
                      No images uploaded.
                    </p>
                  )}
                </Form.Item>
              </Col>

              <Col xs={24} md={14}>
                <div>
                  <Form.Item
                    label="Name of the Cookie"
                    name="name"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <Input
                      onChange={(e) => handleChange("name", e.target.value)}
                      value={values.name}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>{" "}
                </div>
                <Form.Item
                  label="Description"
                  name="description"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <TextArea
                    rows={3}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    value={values.description}
                  />
                </Form.Item>{" "}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "16px",
                  }}
                >
                  {" "}
                  <Form.Item
                    label="Price"
                    name="price"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <InputNumber
                      onChange={(value) => handleChange("price", value)}
                      value={values.price}
                      style={{ width: "100%" }}
                      prefix={"KES."}
                    />
                  </Form.Item>{" "}
                  <Form.Item
                    label="Stock"
                    name="stock"
                    rules={[
                      { required: true, message: "This field is required" },
                    ]}
                  >
                    <InputNumber
                      onChange={(value) => handleChange("stock", value)}
                      value={values.stock}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </div>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[
                    { required: true, message: "This field is required" },
                  ]}
                >
                  <Select
                    name="category"
                    onChange={(value) => handleChange("category", value)}
                    value={values.category}
                    options={cookieCategories.map((item) => ({
                      label: `${item.label}`,
                      value: item.label,
                    }))}
                  />
                </Form.Item>
                <Form.Item
                  label="Allergens"
                  name="allergen"
                  rules={[
                    {
                      required: false,
                      message: "This field is not required",
                    },
                  ]}
                >
                  <Select
                    name="allergen"
                    onChange={(value) => handleChange("allergen", value)}
                    value={values.allergen}
                    options={cookieAllergens.map((item) => ({
                      label: `${item.label}`,
                      value: item.label,
                    }))}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider />
            <div style={{ display: "flex", gap: "15px" }}>
              <Button
                htmlType="submit"
                type="primary"
                style={{ background: "purple" }}
              >
                Submit
              </Button>
              <Button
                type="primary"
                style={{ background: "red" }}
                onClick={handleClear}
              >
                Clear
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default AddCookie;
