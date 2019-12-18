import React from "react";
import { List, Divider, message, Popconfirm } from "antd";
import { Button } from "antd";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { createDate, deleteDate, getAllDate } from "../reducers/dateReducers";

import PaymentUI from "./PaymentUI";

const mapStateToProps = state => {
  return {
    dateData: state.dateData
  };
};

const mapDispatchToProps = {
  createDate,
  deleteDate,
  getAllDate
};

const DateList = props => {
  /**
   * ! Redux state
   */
  const dateData = props.dateData;
  const sortedDate = [...dateData].sort((a, b) => {
    return a - b;
  });

  /**
   * ! The data list
   */
  const DateListData = () => {
    const data = sortedDate ? sortedDate : [];

    if (data.length > 0) {
      return (
        <List
          size="small"
          dataSource={data}
          renderItem={item => (
            <List.Item>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => goToDate(item.id)}
              >
                {item.currentDate}
              </div>
              <Divider type="vertical" />
              <Popconfirm title="Xóa?" onConfirm={() => removeDate(item.id)}>
                <a>Delete</a>
              </Popconfirm>
            </List.Item>
          )}
        />
      );
    } else {
      return null;
    }
  };

  const goToDate = dateID => {
    console.log(dateID);
    props.history.push(`/date/${dateID}`);
  };

  /**
   * ! Date operation
   */
  const addDate = () => {
    const today = new Date().toDateString();
    const dateArray = sortedDate.map(i => i.currentDate);
    if (dateArray.includes(today)) {
      message.error(`Date already added`);
      return;
    }
    props.createDate();
  };

  const removeDate = id => {
    props.deleteDate(id);
  };

  return (
    <>
      <Button onClick={addDate}>New date</Button>
      <DateListData />
    </>
  );
};

const ConnectedDateList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DateList)
);

export default ConnectedDateList;
