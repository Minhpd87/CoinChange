import React from "react";

import { connect } from "react-redux";
import { PageHeader } from "antd";
import { withRouter } from "react-router-dom";

const mapStateToProps = state => {
  return {
    paymentData: state.paymentData,
    dateData: state.dateData
  };
};

const PaymentDetail = props => {
  const payID = props.payID;
  const paymentData = props.paymentData;
  const currentPayment = paymentData.find(item => item.id === payID);
  const currentDate = props.dateData.find(
    item => item.id === currentPayment.dateID
  );
  console.log(currentDate);

  const ShowDocument = ({ docList }) => {
    return (
      <>
        {docList.map((item, index) => (
          <li key={Math.random(1000)}>
            {index + 1} - {Number(item).toLocaleString("vi")}
          </li>
        ))}
      </>
    );
  };

  if (paymentData.length > 0 && currentDate) {
    return (
      <>
        <PageHeader
          title={`Lần thu ${currentPayment.paymentID} - ${currentDate.currentDate}`}
          onBack={() => window.history.back()}
        />
        <ShowDocument docList={currentPayment.documentList} />
      </>
    );
  } else {
    return null;
  }
};

const connectedPaymentDetail = connect(mapStateToProps)(PaymentDetail);

export default withRouter(connectedPaymentDetail);
