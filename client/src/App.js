import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { BrowserRouter as Router } from "react-router-dom";

import { connect } from "react-redux";

import { getAllPayment } from "./reducers/paymentReducers";

import SimpleNavBar from "./components/SimpleNavBar";
import RouteComponent from "./components/RouteComponent";

const App = props => {
  //Get all payment data on load
  useEffect(() => {
    props.getAllPayment();
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

const connectedApp = connect(null, { getAllPayment })(App);

export default connectedApp;
