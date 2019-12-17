import React from "react";
import { Route } from "react-router-dom";

import PaymentUI from "./PaymentUI";
import DateList from "../components/DateList";

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
    </>
  );
};

export default RouteComponent;
