/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:31:52
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-05 10:20:27
 * @FilePath: \MoneyManageSystem\src\Layout\header\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";

import { navigate, Link } from "@reach/router";
import {
  Button,
  message,
  Layout,
  Avatar,
  Dropdown,
  Menu,
  theme,
  Input,
} from "antd";

import {
  UserOutlined,
  SearchOutlined,
  createFromIconfontCN,
  SettingOutlined,
} from "@ant-design/icons";

import { useThemeModel } from "../../models/theme";
import { useLayoutModel } from "../../models/layout";
import { useUserAvatarModel } from "../../models/avatar";

import styles from "./index.module.less";
import MenuSider from "../menuArea";
import { getUserInfo } from "../../utils/http";

const { Header } = Layout;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_2880815_4tku7m6yffb.js",
});

export default function HeaderArea() {
  const [avaSrc, setAvaSrc] = useState<any>(null);

  const { setThemeType } = useThemeModel();
  const { layoutType } = useLayoutModel();
  const { avatarSrc } = useUserAvatarModel();

  const {
    token: {
      colorBgElevated,
      colorText,
      colorBorderSecondary,
      colorErrorTextHover,
      colorPrimary,
    },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("groupId");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userData");
    message.success("注销成功！");
    navigate("/login");
  };

  const onThemeClick = () => {
    const themeType = localStorage.getItem("theme");
    setThemeType(themeType === "light" ? "dark" : "light");
    localStorage.setItem("theme", themeType === "light" ? "dark" : "light");
  };

  const items = [
    {
      key: "userCenter",
      label: (
        <div onClick={() => navigate("/usercenter")}>
          <UserOutlined className="c-mr-12 c-mb-8" />
          个人中心
        </div>
      ),
    },
    {
      key: "systemSettings",
      label: (
        <div onClick={() => navigate("/systemSettings")}>
          <SettingOutlined className="c-mr-12 c-mb-8" />
          系统设置
        </div>
      ),
    },
    {
      key: "logout",
      label: (
        <div
          className={styles["logout-menu"]}
          style={{ color: colorErrorTextHover, fontWeight: 600 }}
          onClick={handleLogout}
        >
          退出登录
        </div>
      ),
    },
  ];

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        background: colorBgElevated,
        borderBottom: `1px solid ${colorBorderSecondary}`,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {layoutType !== "up" ? null : (
        <MenuSider mode={layoutType === "up" ? "horizontal" : "inline"} />
      )}

      <div className={styles["header-search"]}>
        <Input
          placeholder="Search something..."
          className={styles["header-input"]}
          size="middle"
          bordered={false}
          prefix={<SearchOutlined style={{ color: colorText }} />}
        />
      </div>
      <div className={styles["header-wrap"]}>
        <div className={styles["theme-wrap"]} onClick={onThemeClick}>
          <svg className="icon" aria-hidden="true" style={{ color: colorText }}>
            <use
              xlinkHref={
                localStorage.getItem("theme") === "light"
                  ? "#icon-taiyang"
                  : "#icon-yueliang"
              }
            ></use>
          </svg>
        </div>

        <div className={styles["avatar-wrap"]}>
          <span>
            {sessionStorage.getItem("user")
              ? JSON.parse(sessionStorage.getItem("user") || "null").infoname
              : null}
          </span>
          <Dropdown
            menu={{ items }}
            placement="bottomLeft"
            overlayClassName={styles["logout-wrap"]}
            className="c-ml-8"
          >
            <Avatar
              icon={avatarSrc ? null : <UserOutlined />}
              size={{ xs: 12, sm: 24, md: 18, lg: 24, xl: 28, xxl: 36 }}
              style={avatarSrc ? {} : { backgroundColor: colorPrimary }}
              src={avatarSrc ? avatarSrc : ""}
            />
          </Dropdown>
        </div>
      </div>
    </Header>
  );
}
