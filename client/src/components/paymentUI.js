import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
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
  List,
  PageHeader,
  message,
  Table
} from "antd";

import {
  getAllPayment,
  createPayment,
  deletePayment,
  updatePayment
} from "../reducers/paymentReducers";

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
  const dateData = props.dateData;
  const dateID = props.date;
  const currentPayment = paymentData.filter(i => i.dateID === dateID);
  const currentDate = dateData ? dateData.find(item => item.id === dateID) : "";

  let sortedPayment = [...currentPayment].sort((a, b) => {
    return -a.paymentID + b.paymentID;
  });

  /**
   * ! Stateful
   */
  console.log(currentPayment);

  const [currentPaymentID, setCurrentPaymentID] = useState(
    currentPayment ? currentPayment.length + 1 : 1
  );

  const firstCount = {
    paymentID: currentPaymentID,
    note1kc: "",
    note2kc: "",
    note5kc: "",
    note10kc: "",
    note20kc: "",
    note50kc: "",
    note100kc: "",
    note200kc: "",
    note500kc: ""
  };

  const [documentList, setDocumentList] = useState([]);
  const [initialCount, setCount] = useState(firstCount);
  const [editIndex, setEditIndex] = useState(null);
  const [lastDoc, setLastDoc] = useState();

  const mustPay = documentList.reduce((a, b) => a + b, 0);

  // useEffect(() => {
  //   props.getAllPayment();
  //   setCount({ ...firstCount, paymentID: currentPayment.length + 1 });
  // }, []);

  /**
   * ! Show Current Payment in current day
   */
  const PaymentList = () => {
    const dataSource = sortedPayment;
    const columns = [
      {
        title: <TableTitle>Lần thu</TableTitle>,
        dataIndex: "paymentID"
      },
      {
        title: <TableTitle>Hồ sơ</TableTitle>,
        render: (text, record) => (
          <>
            <span>{record.documentList.length}</span>
          </>
        )
      },
      {
        title: <TableTitle>Phải nộp</TableTitle>,
        render: (text, record) => (
          <>
            <span style={{ color: "#db4437", textAlign: "right" }}>
              {Number(
                record.documentList.reduce((a, b) => a + b, 0)
              ).toLocaleString("vi")}
            </span>
          </>
        )
      },
      {
        title: <TableTitle>Đã thu</TableTitle>,
        render: (text, record) => (
          <>
            <span style={{ color: "#427fed", textAlign: "right" }}>
              {Number(
                record.note1k[2] +
                  record.note2k[2] +
                  record.note5k[2] +
                  record.note10k[2] +
                  record.note20k[2] +
                  record.note50k[2] +
                  record.note100k[2] +
                  record.note200k[2] +
                  record.note500k[2]
              ).toLocaleString("vi")}
            </span>
          </>
        )
      },
      {
        title: <TableTitle>Trả lại</TableTitle>,
        render: (text, record) => (
          <>
            <span style={{ color: "orange", textAlign: "right" }}>
              {Number(
                record.note1k[2] +
                  record.note2k[2] +
                  record.note5k[2] +
                  record.note10k[2] +
                  record.note20k[2] +
                  record.note50k[2] +
                  record.note100k[2] +
                  record.note200k[2] +
                  record.note500k[2] -
                  record.documentList.reduce((a, b) => a + b, 0)
              ).toLocaleString("vi")}
            </span>
          </>
        )
      },
      {
        title: <TableTitle>Edit</TableTitle>,
        render: (text, record) => (
          <>
            <a
              onClick={() => {
                props.history.push(`/payment/${record.id}`);
              }}
            >
              Xem
            </a>
            <Divider type="vertical" />
            <Popconfirm
              onConfirm={() => {
                props.deletePayment(record.id);
                setCount({
                  ...firstCount,
                  paymentID:
                    currentPayment.length >= 2 ? currentPayment.length - 1 : 1
                });
              }}
              title="Xóa thật á?"
            >
              <a style={{ color: "red" }}>Xóa</a>
            </Popconfirm>
          </>
        )
      }
    ];

    return (
      <Table
        dataSource={dataSource}
        columns={columns}
        rowKey={record => record.id}
        size="small"
      />
    );
  };

  const Stats = () => {
    return (
      <>
        <div
          style={{
            border: "1px solid #ddeeee",
            padding: 5,
            borderRadius: 5,
            background: "#f8f8f8",
            fontWeight: "bold",
            fontFamily: "Arial",
            textAlign: "center"
          }}
        >
          <span>
            Số lần thu:{" "}
            <span style={{ color: "#db4437" }}>{sortedPayment.length}</span>
          </span>
          <Divider type="vertical" />
          <span>
            Tổng hồ sơ:{" "}
            <span style={{ color: "#db4437" }}>{getTotalDoc()}</span>
          </span>
          <Divider type="vertical" />
          <span>
            Tổng phải nộp:{" "}
            <span style={{ color: "#db4437" }}>
              {getTotalMustPay().toLocaleString("vi")}
            </span>
          </span>
          <Divider type="vertical" />
          <span>
            Tổng đã thu:{" "}
            <span style={{ color: "#47fe" }}>
              {getTotalReceived().toLocaleString("vi")}
            </span>
          </span>
          <Divider type="vertical" />
          <span>
            Tổng đã trả:{" "}
            <span style={{ color: "orange" }}>
              {(getTotalReceived() - getTotalMustPay()).toLocaleString("vi")}
            </span>
          </span>
        </div>
      </>
    );
  };

  const getTotalDoc = () => {
    let docArray = sortedPayment.map(item => item.documentList.length);
    console.log(docArray);
    return Number(docArray.reduce((a, b) => a + b, 0));
  };

  const getTotalMustPay = () => {
    let mustPayArray = sortedPayment.map(item =>
      item.documentList.reduce((a, b) => a + b, 0)
    );

    console.log(mustPayArray);
    return Number(mustPayArray.reduce((a, b) => a + b, 0));
  };

  const getTotalReceived = () => {
    let mustPayArray = sortedPayment.map(
      item =>
        item.note1k[1] * 1000 +
        item.note2k[1] * 2000 +
        item.note5k[1] * 5000 +
        item.note10k[1] * 10000 +
        item.note20k[1] * 20000 +
        item.note50k[1] * 50000 +
        item.note100k[1] * 100000 +
        item.note200k[1] * 200000 +
        item.note500k[1] * 500000
    );
    console.log(mustPayArray);
    return Number(mustPayArray.reduce((a, b) => a + b, 0));
  };

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
    setEditIndex(index);
  };

  const ShowDocumentList = () => {
    return (
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {documentList.map((item, index) => (
          <div
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
            Hồ sơ {index + 1}: &nbsp;&nbsp;
            <span style={{ color: "blue" }}>
              {Number(item).toLocaleString("vi")}
            </span>
            <Divider type="vertical" />
            <span style={{ textAlign: "right" }}>
              <a onClick={() => editDocument(index)}>Sửa</a>
              <Divider type="vertical" />
              <Popconfirm
                onConfirm={() => deleteDocument(index)}
                title="Xóa nhé?"
              >
                <a style={{ color: "red" }}>Xóa</a>
              </Popconfirm>
            </span>
          </div>
        ))}
      </div>
    );
  };

  const UpdateForm = () => {
    const updateValue = values => {
      const newDoc = [...documentList];
      newDoc[editIndex] = Number(values.editValue);
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
                {Number(documentList.reduce((a, b) => a + b, 0)).toLocaleString(
                  "vi"
                )}
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
              <Popconfirm title="Xóa hết á?" onConfirm={clearDocument}>
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
      dateID,
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

    props.createPayment(newPaymentData);
    message.success(`Đã lưu payment`);
    //Reset the form
    setEditIndex(null);
    setDocumentList([]);
    setCount({ ...firstCount, paymentID: currentPaymentID + 1 });
    setCurrentPaymentID(currentPaymentID + 1);
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
                  {currentPayment.length + 1}
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
                      >
                        Lưu lần thu này
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

  /**
   * ! Collapse panel
   */
  const CollapsePanel = () => {
    return (
      <>
        <Collapse activeKey={[1, 2]} accordion={false}>
          <Panel
            header={<span style={{ fontWeight: "bold" }}>Phải nộp</span>}
            key={1}
          >
            <ShowDocumentList />
            <DocumentCountsForm />
            <p />
            <UpdateForm />
          </Panel>

          <Panel
            header={<span style={{ fontWeight: "bold" }}>Tiền thu được</span>}
            key={2}
          >
            <NoteCountForm />
          </Panel>
        </Collapse>
      </>
    );
  };

  /**
   * ! The view render
   */

  return (
    <div style={{ minHeight: "100vh" }}>
      <PageHeader
        title={currentDate ? currentDate.currentDate : ""}
        onBack={() => props.history.push("/")}
      />
      <PaymentList />
      <Stats />
      <p />
      <CollapsePanel />
      <BackTop />
    </div>
  );
};

const connectedPaymentUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentUI);

export default withRouter(connectedPaymentUI);
