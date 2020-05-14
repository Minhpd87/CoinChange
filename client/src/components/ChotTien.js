import React, { useState } from "react";

import { withRouter } from "react-router-dom";

import { PageHeader, Divider, Button, message, Popconfirm } from "antd";

import { Formik } from "formik";
import { Form, Input } from "formik-antd";

const ChotTien = props => {
  return (
    <div>
      <PageHeader title={`Chốt tiền`} onBack={() => window.history.back()} />
      <div>This is Chot Tien component</div>
    </div>
  );
};

export default withRouter(ChotTien);
