import react, { useState, useEffect } from "react";
import { ConfigProvider, theme } from "antd";
import { useThemeModel } from "./models/theme";
import { useThemeColorModel } from "./models/themeColor";
import "./assets/iconfont/iconfont.js";

import dayjs from "dayjs";

import zh_CN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

import Routes from "./routes";

import "./App.css";

dayjs.locale("zh-cn");

function App() {
  // const [themeModel, setThemeModel] = useState('light');

  const loc = localStorage.getItem("theme");

  const { themeType } = useThemeModel();
  const { themeColor } = useThemeColorModel();

  useEffect(() => {
    if (!loc) {
      localStorage.setItem("theme", themeType);
    }
  }, []);

  return (
    <ConfigProvider
      locale={zh_CN}
      theme={{
        token: {
          colorPrimary: themeColor,
          colorError: "#f43f5e",
          colorInfo: "#3b82f6",
          colorSuccess: "#22c55e",
          motionUnit: 0.17,
        },
        algorithm:
          loc === "light" || !loc
            ? theme.defaultAlgorithm
            : theme.darkAlgorithm,
        cssVar: { key: "app" },
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;
