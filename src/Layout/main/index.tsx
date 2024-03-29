import React, { useEffect, useState } from "react";

import { navigate, Redirect, Router } from "@reach/router";
import { Layout, theme, message } from "antd";

import Loading from "../../components/loading/index";
import { useLayoutModel } from "../../models/layout";
import { useUserInfoModel } from "../../models/userInfo";
import { useThemeColorModel } from "../../models/themeColor";

import HeaderArea from "../header";
import MenuSider from "../menuArea";
import { getRolesList, getUserInfo } from "../../utils/http";
import Home from "../../pages/home";
import UserList from "../../pages/manage/userList";
import General from "../../pages/general";
import Daybook from "../../pages/analysis/daybook";
import Target from "../../pages/analysis/target";
import UserCenter from "../../pages/userCenter";
import NotFound from "../../pages/NotFound";
import SystemSettings from "../../pages/systemSettings";
import ApproveManage from "../../pages/groupManage/approveManage";
import { useUserAvatarModel } from "../../models/avatar";

const { Header, Content } = Layout;

export default function MainLayout({ children }: any) {
  const localList: any = {
    "/home": <Home path="/home" key="/home" />,
    "/manage/userlist": (
      <UserList path="/manage/userlist" key="/manage/userlist" />
    ),
    "/analysis/general": (
      <General path="/analysis/general" key="/analysis/general" />
    ),
    "/analysis/daybook": (
      <Daybook path="/analysis/daybook" key="/analysis/daybook" />
    ),
    "/analysis/target": (
      <Target path="/analysis/target" key="/analysis/target" />
    ),
    "/usercenter": <UserCenter path="/usercenter" key="/usercenter" />,
    "/systemSettings": (
      <SystemSettings path="/systemSettings" key="/systemSettings" />
    ),
    "/groupManage/approveManage": (
      <ApproveManage
        path="/groupManage/approveManage"
        key="/groupManage/approveManage"
      />
    ),
  };

  const [rolesMenu, setRolesMenu] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { layoutType, setLayoutType } = useLayoutModel();
  const { setUserData } = useUserInfoModel();
  const { setThemeColor } = useThemeColorModel();
  const { setAvatarSrc } = useUserAvatarModel();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setLoading(true);
    if (!localStorage.getItem("token")) {
      message.warning("信息已过期,请重新登录");
      navigate("/login");
    }

    const userInfo = sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user") || "")
      : null;

    setUserData(userInfo);
    setThemeColor(userInfo?.themeColor || "#536DFE");
    setLayoutType(userInfo?.layout || "left");
    localStorage.setItem("themeColor", userInfo?.themeColor || "#536DFE");
    localStorage.setItem("layout", userInfo?.layout || "left");

    const init = async () => {
      const res = await getRolesList(userInfo?.username || "");
      if (res) {
        const { code, data = [] } = res;
        if (code === 200) {
          setRolesMenu(data.menu);
        }
      }

      const info = await getUserInfo({ username: userInfo?.username || "" });
      setAvatarSrc(info.data.avaterSrc);
      setLoading(false);
    };
    init();
  }, []);

  return layoutType === "up" ? (
    <Layout style={{ minHeight: "100vh" }}>
      <HeaderArea />
      <Content>
        <div
          style={{
            height: "100%",
            background: colorBgContainer,
            position: "relative",
          }}
        >
          {loading ? <Loading /> : null}

          {loading ? null : (
            <Router>
              {rolesMenu.map((item: any) => localList[item])}
              <NotFound
                //@ts-ignore
                default
              />
            </Router>
          )}
        </div>
      </Content>
    </Layout>
  ) : (
    <Layout style={{ minHeight: "100vh" }}>
      <MenuSider mode="inline" />
      <Layout className="site-layout">
        <HeaderArea />
        <Content>
          <div
            style={{
              height: "100%",
              background: colorBgContainer,
              position: "relative",
            }}
          >
            {loading ? <Loading /> : null}

            {loading ? null : (
              <Router>
                {rolesMenu.map((item: any) => localList[item])}
                <NotFound
                  //@ts-ignore
                  default
                />
              </Router>
            )}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
