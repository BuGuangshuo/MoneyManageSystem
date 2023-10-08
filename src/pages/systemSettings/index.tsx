/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-23 16:12:39
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-26 16:55:40
 * @FilePath: \MoneyManageSystem\src\pages\systemSettings\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import { theme, ColorPicker, Tabs, Space } from "antd";
import type { TabsProps } from "antd";

import ThemeSetting from "./themeSettings";

import "./index.less";

export default function Settings(props: any) {
  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "themeSetting",
      label: `主题设置`,
      children: <ThemeSetting />,
    },
    {
      key: "messageSetting",
      label: `消息设置`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "loginSetting",
      label: `登录设置`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className="setting-wrap">
      <Tabs
        defaultActiveKey="themeSetting"
        items={items}
        onChange={onChange}
        size="middle"
      />
    </div>
  );
}
