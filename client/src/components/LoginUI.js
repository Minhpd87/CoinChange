import React from "react";

import { Row, Button, Divider, message, notification } from "antd";

import { withRouter } from "react-router-dom";

//Login Service
import loginService from "../services/loginService";

//Formkik and Ant Design
import { Formik } from "formik";
import { Form, Input, ResetButton, Checkbox } from "formik-antd";

//Redux state management
import { connect } from "react-redux";
import { login, setUser } from "../reducers/loginReducer";

const mapStateToProps = state => {
  return {
    userData: state.userData,
    loginData: state.loginData
  };
};

const mapDispatchToProps = {
  login,
  setUser
};

const Login = props => {
  /**
   * ! Helper function
   */
  const userData = props.userData;
  const loginData = props.loginData;
  // console.log(loginData);

  /**
   * TODO Logging in handle
   */
  const handleLogin = async (values, { resetForm }) => {
    console.log(`Trying to login with:`, values);
    const remember = values.remember;
    const credentials = {
      username: values.username.toLowerCase(),
      password: values.password
    };
    // console.log(credentials)

    // props.login(values); we have set user already
    const returnData = await loginService.login(credentials);
    if (returnData === "error") {
      notification.error({
        message: "Error",
        description: "Invalid username or password!",
        duration: 2,
        placement: "topRight"
      });
      return;
    } else {
      //set the user reducer
      props.setUser(returnData);
      notification.success({
        message: "Success",
        description: "Logged in successfully!",
        duration: 2,
        placement: "topRight"
      });
      //If remember is checked we save data to local storage
      if (remember) {
        // console.log(`Saving user data to local storage`);
        window.localStorage.setItem("thuphiHA", JSON.stringify(returnData));
      }

      //redirect to home page
      props.history.push("/");
    }
  };

  /**
   * ! The login view render
   */

  if (!loginData) {
    // Not logged in yet
    return (
      <Row>
        <Formik
          initialValues={{
            username: "",
            password: "",
            remember: true
          }}
          onSubmit={handleLogin}
          render={() => (
            <Form style={{ textAlign: "center" }}>
              <div style={{ fontWeight: "bold", fontSize: 18 }}>
                Login
                <p />
              </div>
              <Input
                name="username"
                placeholder="Username..."
                style={{ width: 250 }}
                required
              />
              <p />
              <Input.Password
                name="password"
                placeholder="Password..."
                visibilityToggle
                autoComplete="false"
                style={{ width: 250 }}
                required
              />{" "}
              <p />
              <Checkbox name="remember">Nhớ tài khoản</Checkbox>
              {/* <div style={{ fontSize: "12px" }}>
                Chưa có tài khoản? Đăng ký ở{" "}
                <a onClick={() => props.history.push("/register")}>đây</a>
              </div> */}
              <p />
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
              <Divider type="vertical" />
              <ResetButton type="danger">Xóa</ResetButton>
            </Form>
          )}
        />
      </Row>
    );
  } else {
    // Logged In Render
    return (
      <Row>
        <div>Logged in</div>
        <p />
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
      </Row>
    );
  }
};

const ConnectedLogin = connect(mapStateToProps, mapDispatchToProps)(Login);

export default withRouter(ConnectedLogin);
