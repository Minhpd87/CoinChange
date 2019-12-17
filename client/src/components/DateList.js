import React from "react";
import { Button, List } from "semantic-ui-react";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import PaymentUI from "./PaymentUI";

const mapStateToProps = state => {
  return {
    dateData: state.dateData
  };
};

const DateList = props => {
  /**
   * ! Redux state
   */
  const dateData = props.dateData;

  /**
   * ! The data list
   */
  const DateListData = () => {
    const data = dateData ? dateData : [];
    return (
      <List>
        {data.map(item => (
          <List.Item key={item.id} onClick={() => goToDate(item.id)}>
            <div style={{ cursor: "pointer" }}>{item.currentDate}</div>
          </List.Item>
        ))}
      </List>
    );
  };

  const goToDate = dateID => {
    console.log(dateID);
    props.history.push(`/date/${dateID}`);
  };

  return (
    <>
      <DateListData />
    </>
  );
};

const ConnectedDateList = withRouter(connect(mapStateToProps)(DateList));

export default ConnectedDateList;
