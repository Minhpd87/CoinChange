import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";

import { getAllPayment } from "./reducers/paymentReducers";
import { getAllDate } from "./reducers/dateReducers";
import { userInitializer } from "./reducers/userReducer";
import { setUser } from "./reducers/loginReducer";

import SimpleNavBar from "./components/SimpleNavBar";
import RouteComponent from "./components/RouteComponent";

const mapStateToProps = state => {
  return {
    userData: state.userData,
    loginData: state.loginData
  };
};

const mapDispatchToProps = {
  userInitializer,
  setUser,
  getAllPayment,
  getAllDate
};

const App = props => {
  //Get all payment data on load
  useEffect(() => {
    props.getAllPayment();
    props.getAllDate();
    props.userInitializer();
    //Check local storage to see if user is logged in
    const loggedInUserJSON = window.localStorage.getItem("thuphiHA");
    if (loggedInUserJSON) {
      const user = JSON.parse(loggedInUserJSON);
      // console.log(`Found logged in:`, user);
      props.setUser(user);
    }
  }, []);

  return (
    <Container>
      <Router>
        <div style={{ padding: 10 }}>
          <SimpleNavBar />
          <RouteComponent />
        </div>
      </Router>
    </Container>
  );
};

const connectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default connectedApp;
