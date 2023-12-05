import React, { useState, useEffect } from "react";

import { theme } from "antd";

import { Bullet } from "@ant-design/plots";

export default function BulletChart(props: any) {
  const { currentCount, targetCount } = props;

  const {
    token: {
      colorPrimaryHover,
      colorPrimaryTextActive,
      colorErrorHover,
      colorWarningHover,
      colorSuccessHover,
    },
  } = theme.useToken();

  const data = [
    {
      title: "",
      ranges: [targetCount * 0.3, targetCount * 0.7, targetCount],
      当前: [currentCount],
      预完成: targetCount * 0.9,
    },
  ];

  const config: any = {
    data,
    // theme: "dark",
    measureField: "当前",
    rangeField: "ranges",
    targetField: "预完成",
    xField: "title",
    color: {
      range: [colorErrorHover, colorWarningHover, colorSuccessHover],
      measure: colorPrimaryHover,
      target: colorPrimaryTextActive,
    },
    tooltip: {
      showTitle: false,
    },
    label: {
      measure: {
        position: "left",
        style: {
          fill: "#fff",
        },
      },
    },
    xAxis: {
      line: null,
    },
    yAxis: false,
    // 自定义 legend
    legend: {
      custom: true,
      position: "bottom",
      items: [
        {
          value: "差",
          name: "差",
          marker: {
            symbol: "square",
            style: {
              fill: colorErrorHover,
              r: 5,
            },
          },
        },
        {
          value: "良",
          name: "良",
          marker: {
            symbol: "square",
            style: {
              fill: colorWarningHover,
              r: 5,
            },
          },
        },
        {
          value: "优",
          name: "优",
          marker: {
            symbol: "square",
            style: {
              fill: colorSuccessHover,
              r: 5,
            },
          },
        },
        {
          value: "当前",
          name: "当前",
          marker: {
            symbol: "square",
            style: {
              fill: colorPrimaryHover,
              r: 5,
            },
          },
        },
        {
          value: "预完成金额",
          name: "预完成金额",
          marker: {
            symbol: "line",
            style: {
              stroke: colorPrimaryTextActive,
              r: 5,
            },
          },
        },
      ],
    },
  };

  return <Bullet {...config} />;
}
