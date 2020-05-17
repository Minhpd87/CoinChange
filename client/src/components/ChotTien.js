import React, { useState, useRef } from "react";

import { withRouter } from "react-router-dom";

import { PageHeader, Divider, Button, message, Popconfirm, Input } from "antd";
import {
  StyledTable,
  StyledTr,
  StyledTd,
  StyledThead,
  StyledTh,
} from "../styledcomponent";

// Doc so
var mangso = [
  "không",
  "một",
  "hai",
  "ba",
  "bốn",
  "năm",
  "sáu",
  "bảy",
  "tám",
  "chín",
];

function dochangchuc(so, daydu) {
  var chuoi = "";
  var chuc = Math.floor(so / 10);
  var donvi = so % 10;
  if (chuc > 1) {
    chuoi = " " + mangso[chuc] + " mươi";
    if (donvi == 1) {
      chuoi += " mốt";
    }
  } else if (chuc == 1) {
    chuoi = " mười";
    if (donvi == 1) {
      chuoi += " một";
    }
  } else if (daydu && donvi > 0) {
    chuoi = " lẻ";
  }

  if (donvi == 5 && chuc >= 1) {
    chuoi += " lăm";
  } else if (donvi > 1 || (donvi == 1 && chuc == 0)) {
    chuoi += " " + mangso[donvi];
  }
  return chuoi;
}

function docblock(so, daydu) {
  var chuoi = "";
  var tram = Math.floor(so / 100);
  so = so % 100;
  if (daydu || tram > 0) {
    chuoi = " " + mangso[tram] + " trăm";
    chuoi += dochangchuc(so, true);
  } else {
    chuoi = dochangchuc(so, false);
  }
  return chuoi;
}

function dochangtrieu(so, daydu) {
  var chuoi = "";
  var trieu = Math.floor(so / 1000000);
  so = so % 1000000;
  if (trieu > 0) {
    chuoi = docblock(trieu, daydu) + " triệu,";
    daydu = true;
  }
  var nghin = Math.floor(so / 1000);
  so = so % 1000;
  if (nghin > 0) {
    chuoi += docblock(nghin, daydu) + " nghìn";
    daydu = true;
  }
  if (so > 0) {
    chuoi += docblock(so, daydu);
  }
  return chuoi;
}

function docso(so) {
  if (so == 0) return mangso[0];
  var chuoi = "",
    hauto = "";
  do {
    var ty = so % 1000000000;
    so = Math.floor(so / 1000000000);
    if (so > 0) {
      chuoi = dochangtrieu(ty, true) + hauto + chuoi;
    } else {
      chuoi = dochangtrieu(ty, false) + hauto + chuoi;
    }
    hauto = " tỷ,";
  } while (so > 0);
  return chuoi;
}

//End of function

const ChotTien = (props) => {
  const componentRef = useRef();

  const [location, setLocation] = useState(10);
  const [name, setName] = useState("Nguyễn Thị Phương Anh");
  const [k500, setk500] = useState(0);
  const [k200, setk200] = useState(0);
  const [k100, setk100] = useState(0);
  const [k50, setk50] = useState(0);
  const [k20, setk20] = useState(0);
  const [k10, setk10] = useState(0);
  const [k5, setk5] = useState(0);
  const [k2, setk2] = useState(0);
  const [k1, setk1] = useState(0);

  const total =
    k1 * 1000 +
    k2 * 2000 +
    k5 * 5000 +
    k10 * 10000 +
    k20 * 20000 +
    k50 * 50000 +
    k100 * 100000 +
    k200 * 200000 +
    k500 * 500000;

  const locationChange = (e) => {
    setLocation(e.target.value);
  };

  const nameChange = (e) => {
    setName(e.target.value);
  };

  const changeK500 = (e) => {
    setk500(e.target.value);
  };

  const changeK200 = (e) => {
    setk200(e.target.value);
  };

  const changeK100 = (e) => {
    setk100(e.target.value);
  };

  const changeK50 = (e) => {
    setk50(e.target.value);
  };

  const changeK20 = (e) => {
    setk20(e.target.value);
  };

  const changeK10 = (e) => {
    setk10(e.target.value);
  };

  const changeK5 = (e) => {
    setk5(e.target.value);
  };

  const changeK2 = (e) => {
    setk2(e.target.value);
  };

  const changeK1 = (e) => {
    setk1(e.target.value);
  };

  const ComponentToPrint = () => {
    return (
      /* Print Component */

      <StyledTable
        style={{
          fontFamily: "serif",
          fontWeight: "normal",
          fontSize: "16pt",
          padding: 10,
          backgroundColor: "white",
          boder: "0px solid white",
          borderRadius: 5,
        }}
      >
        <tbody>
          <tr style={{ textAlign: "center", fontWeight: "bold" }}>
            <td colSpan={3}>BẢNG KÊ TIỀN</td>
          </tr>
          <tr style={{ textAlign: "center", fontWeight: "bold" }}>
            <td colSpan={3}> ĐIỂM THU PHÍ SỐ {location}</td>
          </tr>
          <tr
            style={{
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            <td colSpan={3}> Ngày {new Date().toLocaleString("vi")}</td>
          </tr>

          <tr
            style={{
              fontSize: "14pt",
              fontWeight: "bold",
              textAlign: "left",
              lineHeight: 2,
            }}
          >
            <td colSpan={3} style={{ paddingLeft: 50 }}>
              Họ và tên: {name}
            </td>
          </tr>

          <tr
            style={{
              fontSize: "14pt",
              fontWeight: "bold",
              textAlign: "left",
              border: "1px dotted black",
            }}
          >
            <th style={{ textAlign: "center", border: "1px solid black" }}>
              Số tờ
            </th>
            <th style={{ textAlign: "center", border: "1px solid black" }}>
              Mệnh giá
            </th>
            <th style={{ textAlign: "center", border: "1px solid black" }}>
              Thành tiền
            </th>
          </tr>
          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k500}</td>
            <td style={{ border: "1px dotted black" }}>500.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k500 * 500000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k200}</td>
            <td style={{ border: "1px dotted black" }}>200.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k200 * 200000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k100}</td>
            <td style={{ border: "1px dotted black" }}>100.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k100 * 100000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k50}</td>
            <td style={{ border: "1px dotted black" }}>50.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k50 * 50000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k20}</td>
            <td style={{ border: "1px dotted black" }}>20.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k20 * 20000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k10}</td>
            <td style={{ border: "1px dotted black" }}>10.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k10 * 10000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k5}</td>
            <td style={{ border: "1px dotted black" }}>5.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k5 * 5000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k2}</td>
            <td style={{ border: "1px dotted black" }}>2.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k2 * 2000).toLocaleString("vi")}
            </td>
          </tr>

          <tr style={{ textAlign: "center", fontSize: "14pt" }}>
            <td style={{ border: "1px dotted black" }}>{k1}</td>
            <td style={{ border: "1px dotted black" }}>1.000 đồng</td>
            <td style={{ border: "1px dotted black" }}>
              {(k1 * 1000).toLocaleString("vi")}
            </td>
          </tr>

          <tr
            style={{
              textAlign: "center",
              fontSize: "14pt",
              fontWeight: "bold",
            }}
          >
            <td colSpan={2} style={{ border: "1px solid black" }}>
              Tổng cộng:
            </td>
            <td style={{ border: "1px solid black", color: "red" }}>
              {total.toLocaleString("vi")}
            </td>
          </tr>

          <tr
            style={{
              textAlign: "center",
              fontSize: "14pt",
              color: "black",
              fontStyle: "italic",
              fontWeight: "bold",
            }}
          >
            <td colSpan={3} style={{ border: "1px solid black" }}>
              Bằng chữ: {docso(total)} đồng./.
            </td>
          </tr>
          <tr style={{ fontWeight: "bold", fontSize: "14pt" }}>
            <td>Người nộp tiền</td>
            <td></td>
            <td>Người thu tiền</td>
          </tr>
          <br />
          <br />
          <br />
          <tr style={{ fontWeight: "bold", fontSize: "14pt", color: "black" }}>
            <td>{name}</td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </StyledTable>
    );
  };

  return (
    <div>
      <PageHeader
        title={`Biểu chốt tiền`}
        onBack={() => window.history.back()}
      />
      <div
        style={{
          margin: 10,
          textAlign: "center",
          fontFamily: "arial",
          color: "black",
          padding: 10,
          borderRadius: 5,
          backgroundColor: "#dedede",
        }}
      >
        <span style={{ fontWeight: "bold" }}>Điểm thu phí: </span>
        <Input
          value={location}
          style={{ width: 100 }}
          onChange={locationChange}
          placeholder={"Điểm thu phí..."}
        />
        <span> </span>
        <span style={{ fontWeight: "bold" }}>Tên: </span>
        <Input
          value={name}
          style={{ width: 250 }}
          onChange={nameChange}
          placeholder={"Tên em nà..."}
        />

        <p />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            textAlign: "right",
            color: "black",
          }}
        >
          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            500.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK500} value={k500} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            200.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK200} value={k200} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            100.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK100} value={k100} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            50.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK50} value={k50} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            20.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK20} value={k20} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            10.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK10} value={k10} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            5.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK5} value={k5} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            2.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK2} value={k2} />
          </span>

          <span style={{ fontWeight: "bold", flexBasis: "25%", margin: 5 }}>
            1.000 đồng:{" "}
            <Input style={{ width: 100 }} onChange={changeK1} value={k1} />
          </span>

          <p />
        </div>
        {/* react to print */}

        <Button type="primary" onClick={() => window.print()}>
          In biểu
        </Button>
        <div id="section-to-print" style={{ padding: 20 }}>
          <ComponentToPrint />
        </div>
      </div>
    </div>
  );
};

export default withRouter(ChotTien);
