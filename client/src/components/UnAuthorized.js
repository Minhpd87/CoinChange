import React from "react";

import { Row, Result } from "antd";

const UnAuthorized = () => {
  return (
    <Row>
      <Result
        status="404"
        title="400"
        subTitle="Sorry, you do not have the permission to access this page."
      />
    </Row>
  );
};

export default UnAuthorized;
