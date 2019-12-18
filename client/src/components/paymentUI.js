import React, { useState } from "react";

import { connect } from "react-redux";
import { Formik } from "formik";
import { Form, Input } from "formik-antd";
import {
  Divider,
  Row,
  Col,
  Collapse,
  BackTop,
  Button,
  Popconfirm,
  List
} from "antd";

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
  let sortedPayment = [...paymentData].sort((a, b) => {
    return a.paymentID - b.paymentID;
  });

  /**
   * ! Stateful
   */
  const [currentPaymentID, setCurrentPaymentID] = useState(
    sortedPayment.length + 1
  );

  const [documentList, setDocumentList] = useState([]);

  const [editIndex, setEditIndex] = useState(null);

  /**
   * ! Step 1 calculate the must pay amount
   */
  const deleteDocument = index => {
    const updatedDocument = [...documentList];
    updatedDocument.splice(index, 1);
    setDocumentList(updatedDocument);
    setEditIndex(null);
  };

  const editDocument = index => {
    console.log(index);
    setEditIndex(index);
  };

  const ShowDocumentList = () => {
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
              <Divider type="vertical" />
              <a onClick={() => editDocument(index)}>Sửa</a>
              <Divider type="vertical" />
              <a style={{ color: "red" }} onClick={() => deleteDocument(index)}>
                Xóa
              </a>
            </span>
          </div>
        ))}
      </>
    );
  };

  const UpdateForm = () => {
    const updateValue = values => {
      const newDoc = [...documentList];
      newDoc[editIndex] = Number(values.editValue);
      setDocumentList(newDoc);
      setEditIndex(null);
    };

    return (
      <Formik
        initialValues={{ editValue: "" }}
        onSubmit={updateValue}
        render={props => (
          <Form>
            {editIndex !== null ? (
              <div>
                <span style={{ fontWeight: "bold" }}>
                  Sửa hồ sơ {editIndex + 1} -{" "}
                  <span style={{ color: "#db4437" }}>
                    {Number(documentList[editIndex]).toLocaleString("vi")}
                  </span>
                  :
                </span>
                <Divider type="vertical" />
                <Input
                  name="editValue"
                  placeholder="số tiền mới"
                  style={{ width: 100 }}
                />
                <Divider type="vertical" />
                <Button htmlType="submit" type="primary">
                  Update
                </Button>
                <Divider type="vertical" />
                <Button onClick={() => setEditIndex(null)} type="danger">
                  Cancel
                </Button>
              </div>
            ) : (
              ""
            )}
          </Form>
        )}
      />
    );
  };

  const DocumentCountsForm = () => {
    const addDocument = values => {
      const newDocList = [...documentList].concat(Number(values.documentValue));
      setDocumentList(newDocList);
      setEditIndex(null);
    };

    const clearDocument = () => {
      setDocumentList([]);
      setEditIndex(null);
    };

    return (
      <Formik
        initialValues={{
          documentValue: ""
        }}
        onSubmit={addDocument}
        render={props => (
          <Form>
            <p />

            <div style={{ fontWeight: "bold" }}>
              Tổng tiền phải nộp ({documentList.length} hồ sơ):{" "}
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
            <Popconfirm title="Xóa hết á?" onConfirm={clearDocument}>
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
            <ShowDocumentList />
            <DocumentCountsForm />
            <hr style={{ color: "#ddeee1" }} />
            <p />
            <UpdateForm />
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
