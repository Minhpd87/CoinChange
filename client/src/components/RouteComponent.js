import React from "react";
import { Route } from "react-router-dom";

import PaymentUI from "./PaymentUI";
import PaymentDetail from "./PaymentDetail";
import DateList from "./DateList";

const RouteComponent = () => {
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
        render={({ match }) => <PaymentUI date={match.params.id} />}
      />

      <Route
        exact
        path="/payment/:id"
        render={({ match }) => <PaymentDetail payID={match.params.id} />}
      />
    </>
  );
};

export default RouteComponent;
