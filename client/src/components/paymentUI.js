import React, { useState } from "react";

import { connect } from "react-redux";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import { Divider, Row, Col, Collapse, BackTop, Button, Popconfirm } from "antd";

import {
  getAllPayment,
  createPayment,
  deletePayment,
  updatePayment
} from "../reducers/paymentReducers";

const { Panel } = Collapse;

const mapStateToProps = state => {
  return {
    paymentData: state.paymentData,
    dateData: state.dateData
  };
};

const mapDispatchToProps = {
  getAllPayment,
  createPayment,
  deletePayment,
  updatePayment
};

const PaymentUI = props => {
  /**
   * ! Redux
   */
  const paymentData = props.paymentData;
  const sortedPayment = [...paymentData].sort((a, b) => {
    return a.paymentID - b.paymentID;
  });

  const [currentPaymentID, setCurrentPaymentID] = useState(
    sortedPayment.length + 1
  );

  const [documentList, setDocumentList] = useState([]);

  /**
   * ! Step 1 calculate the must pay amount
   */
  const ShowDocumentList = () => {
    const deleteDocument = index => {
      const updatedDocument = [...documentList];
      updatedDocument.splice(index, 1);
      setDocumentList(updatedDocument);
    };

    const editDocuValue = (index, newValue) => {
      console.log(index, newValue);
    };

    return (
      <>
        {documentList.map((item, index) => (
          <div
            key={Math.random(1000)}
            style={{
              border: "solid 1px #dfdfdf",
              borderRadius: 5,
              padding: 5,
              marginBottom: 5,
              lineHeight: 2
            }}
          >
            Hồ sơ số {index + 1}: {Number(item).toLocaleString("vi")}
            <Divider type="vertical" />
            <span style={{ float: "right" }}>
              <Input
                placeholder="Thay đổi số tiền"
                name="newValue"
                style={{ width: 150 }}
              />
              <Divider type="vertical" />
              <a onClick={() => editDocuValue(index, props.values.newValue)}>
                Sửa
              </a>
              <Divider type="vertical" />
              <Popconfirm
                title="Chắc chưa má?"
                onConfirm={() => deleteDocument(index)}
              >
                <a style={{ color: "red" }}>Xóa</a>
              </Popconfirm>
            </span>
          </div>
        ))}
      </>
    );
  };

  const DocumentCountsForm = () => {
    const addDocument = values => {
      const newDocList = [...documentList].concat(Number(values.documentValue));
      setDocumentList(newDocList);
    };

    const clearDocument = () => {
      setDocumentList([]);
    };

    return (
      <Formik
        initialValues={{
          documentValue: ""
        }}
        onSubmit={addDocument}
        render={props => (
          <Form>
            <ShowDocumentList />
            <p />
            <div style={{ fontWeight: "bold" }}>
              Tổng tiền phải nộp:{" "}
              <span style={{ color: "#db4437" }}>
                {Number(documentList.reduce((a, b) => a + b, 0)).toLocaleString(
                  "vi"
                )}
              </span>
            </div>
            <p />
            <span>
              Hồ sơ số {documentList.length + 1}:
              <Divider type="vertical" />
              <Input
                name="documentValue"
                style={{ width: 100 }}
                autoFocus={true}
              />
            </span>
            <Divider type="vertical" />
            <Button htmlType="submit" type="primary">
              Thêm
            </Button>
            <Divider type="vertical" />
            <Popconfirm title="Xóa hết hồ sơ?" onConfirm={clearDocument}>
              <Button type="danger">Xóa hết</Button>
            </Popconfirm>
          </Form>
        )}
      />
    );
  };

  /**
   * ! Step 2 Count money from customers
   */
  const NoteCountForm = () => {
    return (
      <>
        <Formik
          initialValues={{
            paymentID: currentPaymentID,
            note1k: [1000, "", 0],
            note2k: [2000, "", 0],
            note5k: [5000, "", 0],
            note10k: [10000, "", 0],
            note20k: [20000, "", 0],
            note50k: [50000, "", 0],
            note100k: [100000, "", 0],
            note200k: [200000, "", 0],
            note500k: [500000, "", 0]
          }}
          render={props => (
            <Form>
              <div style={{ fontWeight: "bold", fontSize: 13 }}>
                Lần thu trong ngày:{" "}
                <span style={{ color: "#db4437" }}>
                  {props.values.paymentID}
                </span>
              </div>
            </Form>
          )}
        />
      </>
    );
  };

  /**
   * ! Collapse panel
   */
  const CollapsePanel = () => {
    return (
      <>
        <Collapse defaultActiveKey={1} accordion={false}>
          <Panel
            header={
              <span style={{ fontWeight: "bold" }}>
                Bước 1: Cộng tiền phải nộp từ các hồ sơ
              </span>
            }
            key={1}
          >
            <DocumentCountsForm />
          </Panel>

          <Panel
            header={
              <span style={{ fontWeight: "bold" }}>
                Bước 2: Nhập tiền thu được từ khách hàng
              </span>
            }
            key={2}
          >
            <NoteCountForm />
          </Panel>
        </Collapse>
      </>
    );
  };

  return (
    <>
      <CollapsePanel />
      <BackTop />
    </>
  );
};

const connectedPaymentUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentUI);

export default connectedPaymentUI;
