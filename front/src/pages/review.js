import { Image, List, Button, Typography, Rate, Tag, Card } from "antd";
import React, { useState } from "react";
import useCookies from "../assets/hooks/cookieHook";

const { Text } = Typography;
function Review() {
  const { cookies, cookiesLoading } = useCookies();
  //  const [searchValue, setSearchValue] = useState("");

  return (
    <>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={cookies}
          loading={cookiesLoading}
          renderItem={(item) => (
            <List.Item
              style={{ flexWrap: "wrap" }}
              actions={[
                <div>
                  <Button type="primary" key="more">
                    View
                  </Button>
                  ,
                  <Button
                    type="primary"
                    key="edit"
                    style={{ backgroundColor: "green" }}
                  >
                    Rate
                  </Button>
                  ,
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
                      <Rate
                        allowHalf
                        defaultValue={item.rating}
                        style={{ width: "100%" }}
                        disabled
                      />
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
    </>
  );
}

export default Review;
