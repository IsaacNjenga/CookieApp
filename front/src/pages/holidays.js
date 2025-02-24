import React from "react";
import { List, Card } from "antd";

const holidayCookies = [
  { name: "Christmas Sugar Cookies", description: "Festive and colorful treats." },
  { name: "Valentine’s Heart Cookies", description: "Made with love and chocolate." },
  { name: "Halloween Spooky Bites", description: "Pumpkin spice and everything nice." },
];

function Holidays() {
  return (
    <div style={{ padding: 20 }}>
      <h2>Holiday Specials</h2>

      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={holidayCookies}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.name}>{item.description}</Card>
          </List.Item>
        )}
      />
    </div>
  );
}

export default Holidays;
