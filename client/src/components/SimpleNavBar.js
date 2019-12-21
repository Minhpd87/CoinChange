import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { Button } from "antd";

import { connect } from "react-redux";
import { setUser } from "../reducers/loginReducer";

const mapStateToProps = state => {
  return {
    loginData: state.loginData
  };
};

const SimpleNavBar = props => {
  const [activeItem, setActiveItem] = useState("home");
  const loginData = props.loginData;

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
        {/* {loginData ? (
          ""
        ) : (
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={() => {
              setActiveItem("login");
              props.history.push("/login");
            }}
          >
            <span>Login</span>
          </Menu.Item>
        )} */}

        {loginData ? (
          <Menu.Item>
            <Button
              type="danger"
              onClick={() => {
                props.setUser("");
                window.localStorage.removeItem("thuphiHA");
                props.history.push("/login");
              }}
            >
              Log out
            </Button>
          </Menu.Item>
        ) : (
          ""
        )}
      </Menu>
    </>
  );
};

const ConnectedNav = connect(mapStateToProps, { setUser })(SimpleNavBar);

export default withRouter(ConnectedNav);
