import React, { useState } from "react";
import { List, Divider, message, Popconfirm, Input, Form } from "antd";
import { Button } from "antd";

import { withRouter } from "react-router-dom";

import { connect } from "react-redux";

import { createDate, deleteDate, getAllDate } from "../reducers/dateReducers";

const mapStateToProps = state => {
  return {
    dateData: state.dateData,
    loginData: state.loginData
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

  const dateData = props.dateData.filter(
    e => e.userCreated === props.loginData.id
  );

  console.log(props.dateData);

  const sortedDate = [...dateData].sort((a, b) => {
    return a.id < b.id ? 1 : -1;
  });
  console.log(dateData);
  const loginData = props.loginData;

  const [dateName, setName] = useState("");

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

              {loginData ? (
                <Popconfirm title="Xóa?" onConfirm={() => removeDate(item.id)}>
                  <a>Delete</a>
                </Popconfirm>
              ) : (
                <span style={{ color: "#db4437" }}>Not logged in</span>
              )}
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
  const addDate = newName => {
    console.log(newName, props.loginData.id);
    const dateArray = sortedDate.map(i => i.currentDate);
    if (dateArray.includes(dateName)) {
      message.error(`Trùng tên rồi má`);
      setName("");
      return;
    }

    const nameData = {
      currentDate: newName,
      userCreated: props.loginData.id
    };
    setName("");
    props.createDate(nameData);
  };

  const removeDate = id => {
    props.deleteDate(id);
  };

  return (
    <>
      <Form>
        <Input
          onChange={event => setName(event.target.value)}
          style={{ width: 200 }}
          value={dateName}
        />
        <Divider type="vertical" />
        <Button
          onClick={() => addDate(dateName)}
          type="primary"
          htmlType="submit"
        >
          New date
        </Button>
      </Form>
      <DateListData />
    </>
  );
};

const ConnectedDateList = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DateList)
);

export default ConnectedDateList;
