import React from "react";
import { Tabs, Card } from "antd";

const { TabPane } = Tabs;

const occasions = {
  Birthdays: ["Birthday Cookie Cake", "Sprinkle Cookies"],
  Weddings: ["White Chocolate Hearts", "Custom Wedding Cookies"],
  BabyShowers: ["Blueberry Bliss", "Vanilla Swirls"],
};

function Occasions() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Cookies for Every Occasion</h2>

      <Tabs defaultActiveKey="1">
        {Object.keys(occasions).map((occasion, index) => (
          <TabPane tab={occasion} key={index}>
            {occasions[occasion].map((item, i) => (
              <Card key={i} style={{ marginBottom: 10 }}>
                {item}
              </Card>
            ))}
          </TabPane>
        ))}
      </Tabs>
    </div>
  );
}

export default Occasions;
