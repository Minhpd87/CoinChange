import styled, { createGlobalStyle } from "styled-components";
import { Button } from "antd";

export const BoldDiv = styled.div`
  font-weight: bold;
`;

export const TableTitle = styled.div`
  font-weight: bold;
  font-size: 12;
`;

export const StyledButton = styled(Button)`
  font-weight: bold;
  color: #1b3a57;
  font-size: 13px;
  background: #e8f0fe;
`;

export const StyledTable = styled.table`
  border: 1px solid #ccc;
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  table-layout: fixed;
  width: 100%;
`;

export const StyledTr = styled.tr`
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  padding: 0.35em;
  @media (max-width: 600px) {
    // border-bottom: 3px solid #ddd;
    display: block;
  }
`;

export const StyledTh = styled.th`
  padding: 0.625em;
  text-align: center;
  border: 1px solid #ddd;
`;

export const StyledThead = styled.thead`
  border: 1px solid #ddd;
  @media (max-width: 600px) {
    border: none;
    clip: rect(0 0 0 0);
    overflow: hidden;
    height: 1px;
    margin: 1px;
    padding: 0;
    position: absolute;
    width: 1px;
  }
`;

export const StyledTd = styled.td`
  padding: 0.625em;
  text-align: left;
  vertical-align: top;
  // border: 1px solid #ddd;
  @media (max-width: 600px) {
    // border-bottom: 1px solid #ddd;
    padding: 0;
    display: block;
    text-align: justify;
  }
`;
