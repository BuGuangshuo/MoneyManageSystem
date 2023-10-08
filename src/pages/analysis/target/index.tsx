import React, { useState, useEffect } from "react";

import { theme } from "antd";

import "./index.less";

export default function Target(props: any) {
  const {
    token: {
      colorBgContainer,
      colorBorderSecondary,
      colorText,
      colorPrimaryText,
      colorTextSecondary,
      colorTextLabel,
      colorWhite,
    },
  } = theme.useToken();

  return (
    <div>
      <div
        className="page-header"
        style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="page-title" style={{ color: colorTextSecondary }}>
          用户管理
        </div>
      </div>
    </div>
  );
}
