import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const SimpleNavBar = props => {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <>
      <Menu>
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={() => {
            setActiveItem("home");
            props.history.push("/");
          }}
        >
          Date list
        </Menu.Item>
        {/* <Menu.Item
          name="stats"
          active={activeItem === "stats"}
          onClick={() => {
            setActiveItem("stats");
            props.history.push("/stats");
          }}
        >
          Stats
        </Menu.Item> */}
      </Menu>
    </>
  );
};

export default withRouter(SimpleNavBar);
