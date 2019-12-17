import React from "react";

import { connect } from "react-redux";

import {
  getAllPayment,
  createPayment,
  deletePayment,
  updatePayment
} from "../reducers/paymentReducers";

const mapStateToProps = state => {
  return {
    paymentData: state.paymentData
  };
};

const mapDispatchToProps = {
  getAllPayment,
  createPayment,
  deletePayment,
  updatePayment
};

const PaymentUI = props => {
  return (
    <>
      <div>Test</div>
    </>
  );
};

const connectedPaymentUI = connect(
  mapStateToProps,
  mapDispatchToProps
)(PaymentUI);

export default connectedPaymentUI;
