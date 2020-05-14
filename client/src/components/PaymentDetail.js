import React, { useState } from "react";

import { connect } from "react-redux";
import { PageHeader, Divider, Button, message, Popconfirm } from "antd";
import { withRouter } from "react-router-dom";

import { Formik } from "formik";
import { Form, Input } from "formik-antd";

import { updatePayment } from "../reducers/paymentReducers";

import {
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTr,
  StyledThead,
  BoldDiv,
  StyledButton,
  TableTitle
} from "../styledcomponent";

const mapStateToProps = state => {
  return {
    paymentData: state.paymentData,
    dateData: state.dateData
  };
};

const mapDispatchToProps = {
  updatePayment
};

const PaymentDetail = props => {
  const payID = props.payID;
  const paymentData = props.paymentData;
  const currentPayment = paymentData
    ? paymentData.find(item => item.id === payID)
    : {};
  const currentDate =
    currentPayment !== undefined && props.dateData
      ? props.dateData.find(item => item.id === currentPayment.dateID)
      : "";

  const currentPaymentID = currentPayment ? currentPayment.paymentID : null;

  const firstCount = currentPayment
    ? {
        paymentID: currentPaymentID,
        note1kc: currentPayment.note1k[1],
        note2kc: currentPayment.note2k[1],
        note5kc: currentPayment.note5k[1],
        note10kc: currentPayment.note10k[1],
        note20kc: currentPayment.note20k[1],
        note50kc: currentPayment.note50k[1],
        note100kc: currentPayment.note100k[1],
        note200kc: currentPayment.note200k[1],
        note500kc: currentPayment.note500k[1]
      }
    : {};

  const [documentList, setDocumentList] = useState(
    currentPayment ? currentPayment.documentList : undefined
  );
  const [initialCount, setCount] = useState(firstCount);
  const [editIndex, setEditIndex] = useState(null);
  const [lastDoc, setLastDoc] = useState();

  const mustPay = documentList ? documentList.reduce((a, b) => a + b, 0) : 0;

  console.log(currentPayment);

  const editDocument = index => {
    setEditIndex(index);
  };

  const deleteDocument = index => {
    const updatedDocument = [...documentList];
    updatedDocument.splice(index, 1);
    setDocumentList(updatedDocument);
    setEditIndex(null);
  };

  const ShowDocument = ({ docList }) => {
    if (docList) {
      return (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {docList.map((item, index) => (
            <li
              key={Math.random(1000)}
              style={{
                border: "solid 1px #dfdfdf",
                borderRadius: 5,
                padding: 5,
                margin: 5,
                lineHeight: 2,
                flexBasis: "25%"
              }}
            >
              Hồ sơ số <span style={{ color: "" }}>{index + 1}</span> -{" "}
              <span style={{ color: "blue" }}>
                {Number(item).toLocaleString("vi")}
              </span>
              <Divider type="vertical" />
              <a
                onClick={() => {
                  editDocument(index);
                  // setCurrentValue(Number(item));
                }}
              >
                Sửa
              </a>
              <Divider type="vertical" />
              <Popconfirm onConfirm={() => deleteDocument(index)} title="Xóa?">
                <a style={{ color: "red" }}>Xóa</a>
              </Popconfirm>
            </li>
          ))}
        </div>
      );
    } else {
      return null;
    }
  };

  const UpdateForm = () => {
    const updateValue = values => {
      const newDoc = [...documentList];
      newDoc[editIndex] = Number(values.editValue);
      console.log(newDoc);
      setDocumentList(newDoc);
      setEditIndex(null);
      message.success(
        `Hồ sơ ${editIndex + 1} đổi thành ${Number(
          values.editValue
        ).toLocaleString("vi")}`
      );
    };

    return (
      <Formik
        initialValues={{ editValue: "" }}
        onSubmit={updateValue}
        render={props => (
          <Form>
            <div>
              {editIndex !== null ? (
                <div
                  style={{
                    borderRadius: 5,
                    border: "solid 1px #ddeee1",
                    padding: 10,
                    background: "#dedede"
                  }}
                >
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
                    autoFocus={true}
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
            </div>
          </Form>
        )}
      />
    );
  };

  const DocumentCountsForm = () => {
    const addDocument = values => {
      console.log(values.documentValue);
      if (
        isNaN(values.documentValue) ||
        values.documentValue === "" ||
        values.documentValue === 0
      ) {
        message.error(`Not a number`);
        return;
      }
      const newDocList = [...documentList].concat(Number(values.documentValue));
      setLastDoc(values.documentValue);
      setDocumentList(newDocList);
      setEditIndex(null);
    };

    const duplicateDoc = () => {
      if (isNaN(lastDoc) || lastDoc === 0 || lastDoc === null) {
        message.error(`Chưa có hồ sơ nào!`);
        return;
      }
      console.log(lastDoc);
      const newDocList = [...documentList].concat(Number(lastDoc));
      setLastDoc(lastDoc);
      setDocumentList(newDocList);
      setEditIndex(null);
    };

    const clearDocument = () => {
      setDocumentList([]);
      setEditIndex(null);
      setLastDoc(null);
    };

    return (
      <Formik
        initialValues={{
          documentValue: ""
        }}
        onSubmit={addDocument}
        enableReinitialize={true}
        render={props => (
          <Form>
            <p />

            <div style={{ fontWeight: "bold" }}>
              Tổng tiền phải nộp ({documentList.length} hồ sơ):{" "}
              <span style={{ color: "#db4437" }}>
                {documentList.length > 0
                  ? Number(
                      documentList.reduce((a, b) => a + b, 0)
                    ).toLocaleString("vi")
                  : ""}
              </span>
            </div>
            <p />
            <div
              style={{
                display: editIndex === null ? "" : "none",
                borderRadius: 5,
                border: "solid 1px #ddeee1",
                padding: 10,
                background: "#dedede"
              }}
            >
              <span style={{ fontWeight: "bold" }}>
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
              <Button onClick={duplicateDoc}>
                Copy số ({Number(lastDoc).toLocaleString("vi")})
              </Button>
              <Divider type="vertical" />
              <Popconfirm title="Xóa hết?" onConfirm={clearDocument}>
                <Button type="danger">Xóa hết</Button>
              </Popconfirm>
            </div>
          </Form>
        )}
      />
    );
  };

  /**
   * ! Step 2 Count money from customers
   */
  const savePaymentData = values => {
    console.log(values);
    const newPaymentData = {
      dateID: currentPayment.dateID,
      documentList: documentList,
      paymentID: currentPayment.length + 1,
      note1k: [1000, values.note1kc, values.note1kc * 1000],
      note2k: [1000, values.note2kc, values.note2kc * 2000],
      note5k: [1000, values.note5kc, values.note5kc * 5000],
      note10k: [1000, values.note10kc, values.note10kc * 10000],
      note20k: [1000, values.note20kc, values.note20kc * 20000],
      note50k: [1000, values.note50kc, values.note50kc * 50000],
      note100k: [1000, values.note100kc, values.note100kc * 100000],
      note200k: [1000, values.note200kc, values.note200kc * 200000],
      note500k: [1000, values.note500kc, values.note500kc * 500000]
    };

    console.log(newPaymentData);

    props.updatePayment(payID, newPaymentData);
    message.success(`Đã lưu payment`);
    //Reset the form
    // setEditIndex(null);
    // setDocumentList([]);
    setCount({
      paymentID: currentPaymentID,
      note1kc: newPaymentData.note1k[1],
      note2kc: newPaymentData.note2k[1],
      note5kc: newPaymentData.note5k[1],
      note10kc: newPaymentData.note10k[1],
      note20kc: newPaymentData.note20k[1],
      note50kc: newPaymentData.note50k[1],
      note100kc: newPaymentData.note100k[1],
      note200kc: newPaymentData.note200k[1],
      note500kc: newPaymentData.note500k[1]
    });
    // setCurrentPaymentID(currentPaymentID + 1);
  };

  const NoteCountForm = () => {
    const savePayment = values => {
      console.log(values);
      setCount({
        ...initialCount,
        note1kc: values.note1kc,
        note2kc: values.note2kc,
        note5kc: values.note5kc,
        note10kc: values.note10kc,
        note20kc: values.note20kc,
        note50kc: values.note50kc,
        note100kc: values.note100kc,
        note200kc: values.note200kc,
        note500kc: values.note500kc
      });
    };

    return (
      <>
        <Formik
          initialValues={initialCount}
          enableReinitialize={true}
          onSubmit={savePaymentData}
          render={props => (
            <Form>
              <span style={{ fontWeight: "bold", fontSize: 13 }}>
                Lần thu trong ngày:{" "}
                <span style={{ color: "#db4437" }}>
                  {currentPayment.paymentID}
                </span>
              </span>
              <Divider type="vertical" />
              <StyledButton
                onClick={() => savePayment(props.values)}
                // type="primary"
              >
                Lưu số tờ hiện tại
              </StyledButton>
              <Divider type="vertical" />
              <span>
                Nếu thêm, sửa hồ sơ khi đã nhập số tờ tiền thì bấm nút lưu để
                lưu lại số tờ đã nhập
              </span>
              <p />
              {/* The note list */}
              <StyledTable>
                <StyledThead>
                  <StyledTr>
                    <StyledTh>Mệnh giá</StyledTh>
                    <StyledTh>Số tờ</StyledTh>
                    <StyledTh>Thành tiền</StyledTh>
                    <StyledTh colSpan={3}>Tính tiền</StyledTh>
                  </StyledTr>
                </StyledThead>
                <tbody>
                  {/* 1k and 2*/}
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      1.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note1kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note1kc * 1000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                    <StyledTd colSpan={2} rowSpan={9}>
                      <BoldDiv>Tổng tiền phải nộp:</BoldDiv>
                      <BoldDiv>Tổng tiền mặt thu vào:</BoldDiv>
                      <BoldDiv>Tiền trả lại:</BoldDiv>
                    </StyledTd>
                    <StyledTd rowSpan={9}>
                      <BoldDiv style={{ color: "#db4437" }}>
                        {mustPay.toLocaleString("vi")}
                      </BoldDiv>

                      <BoldDiv style={{ color: "#427fed" }}>
                        {Number(
                          props.values.note1kc * 1000 +
                            props.values.note2kc * 2000 +
                            props.values.note5kc * 5000 +
                            props.values.note10kc * 10000 +
                            props.values.note20kc * 20000 +
                            props.values.note50kc * 50000 +
                            props.values.note100kc * 100000 +
                            props.values.note200kc * 200000 +
                            props.values.note500kc * 500000
                        ).toLocaleString("vi")}
                      </BoldDiv>
                      <hr />
                      <BoldDiv style={{ color: "orange" }}>
                        {Number(
                          props.values.note1kc * 1000 +
                            props.values.note2kc * 2000 +
                            props.values.note5kc * 5000 +
                            props.values.note10kc * 10000 +
                            props.values.note20kc * 20000 +
                            props.values.note50kc * 50000 +
                            props.values.note100kc * 100000 +
                            props.values.note200kc * 200000 +
                            props.values.note500kc * 500000 -
                            mustPay
                        ).toLocaleString("vi")}
                      </BoldDiv>
                      <p />
                      <Button
                        type="primary"
                        onClick={() => savePaymentData(props.values)}
                        tabIndex={-1}
                      >
                        Cập nhật
                      </Button>
                    </StyledTd>
                  </StyledTr>
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      2.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note2kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note2kc * 2000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  {/* 5k and 10 */}
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      5.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note5kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note5kc * 5000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      10.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note10kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note10kc * 10000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  {/* 20k and 50k*/}
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      20.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note20kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note20kc * 20000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      50.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note50kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note50kc * 50000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  {/* 100k and 200k */}
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      100.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note100kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note100kc * 100000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      200.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note200kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note200kc * 200000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                  {/* 500k */}
                  <StyledTr>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      500.000 đồng
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <Input name="note500kc" style={{ textAlign: "right" }} />
                    </StyledTd>
                    <StyledTd style={{ textAlign: "center", color: "black" }}>
                      <span style={{ color: "#db4437" }}>
                        {Number(props.values.note500kc * 500000).toLocaleString(
                          "vi"
                        )}
                      </span>
                    </StyledTd>
                  </StyledTr>
                </tbody>
              </StyledTable>
            </Form>
          )}
        />
      </>
    );
  };

  if (
    paymentData &&
    currentDate &&
    payID &&
    documentList &&
    currentPayment !== undefined &&
    currentPayment !== {}
  ) {
    return (
      <>
        <PageHeader
          title={`Sửa Lần thu ${currentPayment.paymentID} - ${currentDate.currentDate}`}
          onBack={() => window.history.back()}
        />
        <p />
        <ShowDocument docList={documentList} />
        <DocumentCountsForm />
        <UpdateForm />
        <p />
        <NoteCountForm />
      </>
    );
  } else {
    return (
      <>
        <span>Back lại payment list để lấy data</span>
        <Divider type="vertical" />
        <Button onClick={() => window.history.back()} type="primary">
          Go back
        </Button>
      </>
    );
  }
};

const connectedPaymentDetail = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentDetail);

export default withRouter(connectedPaymentDetail);
