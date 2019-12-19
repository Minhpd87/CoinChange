import React from "react";
import { Route } from "react-router-dom";

import PaymentUI from "./PaymentUI";
import PaymentDetail from "./PaymentDetail";
import DateList from "./DateList";

import { connect } from "react-redux";
import LoginUI from "./LoginUI";
import UnAuthorized from "./UnAuthorized";

const mapStateToProps = state => {
  return {
    loginData: state.loginData
  };
};

const RouteComponent = props => {
  const loginData = props.loginData;

  return (
    <>
      {/* HomePage */}
      <Route
        exact
        path="/"
        render={() => (
          <div style={{ padding: 10 }}>
            <DateList />
          </div>
        )}
      />

      <Route
        exact
        path="/date/:id"
        render={({ match }) =>
          loginData ? <PaymentUI date={match.params.id} /> : <UnAuthorized />
        }
      />

      <Route
        exact
        path="/payment/:id"
        render={({ match }) => <PaymentDetail payID={match.params.id} />}
      />

      <Route exact path="/login" render={() => <LoginUI />} />
    </>
  );
};

const ConnectedRoute = connect(mapStateToProps)(RouteComponent);

export default ConnectedRoute;
