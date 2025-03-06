import { EyeOutlined } from "@ant-design/icons";
import { Button, Image, Input, List, Rate, Tag, Typography } from "antd";
import React, { useState } from "react";
const { Search } = Input;
const { Text } = Typography;
function SearchComponentList({
  onSearchChange,
  dataSource,
  viewCookie,
  viewReviews,
  rateCookie,
}) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const filteredData = dataSource.filter((item) =>
    Object.values(item).some(
      (val) => typeof val === "string" && val.toLowerCase().includes(search)
    )
  );
  return (
    <>
      <Search
        placeholder="Find..."
        style={{ marginBottom: 20, width: 300 }}
        value={search}
        onChange={handleSearchChange}
      />
      {search && <h4>Results for "{search}"</h4>}
      {search ? (
        <List
          itemLayout="horizontal"
          dataSource={filteredData}
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

                  <Button
                    type="primary"
                    key="rate"
                    style={{ backgroundColor: "green" }}
                    onClick={() => rateCookie(item)}
                  >
                    Rate
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
                  </div>
                }
              />
            </List.Item>
          )}
        />
      ) : null}
    </>
  );
}

export default SearchComponentList;
