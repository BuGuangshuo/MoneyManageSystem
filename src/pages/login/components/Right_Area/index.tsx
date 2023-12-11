import React, { useState } from "react";

import {
  Button,
  Checkbox,
  Form,
  Input,
  message,
  theme,
  ConfigProvider,
  Select,
  Typography,
} from "antd";
import { navigate } from "@reach/router";
import sha256 from "sha256";
import {
  UserOutlined,
  LockOutlined,
  createFromIconfontCN,
} from "@ant-design/icons";

import { useTranslation } from "react-i18next";

import { Userlogin, UserRegister, getUserInfo } from "../../../../utils/http";
import { useThemeModel } from "../../../../models/theme";

import styles from "../index.module.less";
import { useUserAvatarModel } from "../../../../models/avatar";

import lngList from "./lngEnum";

const { useToken } = theme;

const { Text } = Typography;
const { Option } = Select;

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_2880815_k27ujdzcenl.js",
});

export default function RightArea() {
  const [registerState, setRegisterState] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lngVal, setLngVal] = useState<string>(
    localStorage.getItem("lang") || "zh_CN"
  );

  const [form] = Form.useForm();

  const { t, i18n } = useTranslation();

  const { token } = useToken();

  const { setThemeType } = useThemeModel();
  const { setAvatarSrc } = useUserAvatarModel();

  const onReset = () => {
    form.resetFields();
  };

  const onThemeClick = () => {
    const themeType = localStorage.getItem("theme");
    setThemeType(themeType === "light" ? "dark" : "light");
    localStorage.setItem("theme", themeType === "light" ? "dark" : "light");
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    const { username, password } = values;
    const res = await Userlogin({ username, password: sha256(password) });
    if (res) {
      setLoading(false);
      const { code, data } = res;
      if (code === 200) {
        localStorage.setItem("token", "Acess");
        sessionStorage.setItem("user", JSON.stringify(data));
        sessionStorage.setItem("userId", data.id);
        message.success(t("login-right-login-msg-success"));

        const res = await getUserInfo({ username: data.username });
        setAvatarSrc(res?.data?.avaterSrc);
        sessionStorage.setItem("userData", JSON.stringify(res.data));

        if (res.code === 201) {
          navigate("/guidePage");
        } else {
          navigate("/home");
        }
      } else if (code === 201) {
        message.error(t("login-right-login-msg-error"));
      } else {
        message.error(t("login-right-login-msg-failed"));
      }
    } else {
      setLoading(false);
      message.error(t("login-right-login-msg-netWork"));
    }
  };

  const onRegisterFinish = async (values: any) => {
    setLoading(true);
    const res = await UserRegister(values);
    if (res) {
      setLoading(false);
      const { code } = res;
      if (code === 200) {
        message.success(t("login-right-register-msg-success"));
        setRegisterState(false);
        onReset();
        setRegisterState(false);
      } else if (code === 201) {
        message.error(t("login-right-register-msg-sameUser"));
        onReset();
      } else if (code === 202) {
        message.error(t("login-right-register-msg-sameName"));
        onReset();
      } else {
        message.error(t("login-right-register-msg-failed"));
      }
    } else {
      setLoading(false);
      message.error(t("login-right-register-msg-network-error"));
    }
  };

  const onLngSelect = (val: string) => {
    setLngVal(val);
    localStorage.setItem("lang", val);
    i18n.changeLanguage(val);
  };

  return (
    <div
      className={styles["right-wrap"]}
      style={{ background: token.colorBgContainer }}
    >
      <div className={styles["tools-wrap"]}>
        <div className={styles["theme-switch"]}>
          <IconFont
            type={
              localStorage.getItem("theme") === "light"
                ? "icon-taiyang"
                : "icon-yueliang"
            }
            className={styles["icon-theme"]}
            style={{ color: token.colorText }}
            onClick={onThemeClick}
          />
          <Select
            value={lngVal}
            onChange={onLngSelect}
            className="w-[100px] ml-[16px]"
          >
            {lngList.map((item: { label: string; value: string }) => {
              return (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              );
            })}
          </Select>
        </div>
      </div>
      {/* Login Form */}
      <div
        className={styles["login-form-wrap"]}
        style={registerState ? { display: "none" } : { display: "flex" }}
      >
        <div className={styles["form-wrap"]}>
          <ConfigProvider
            theme={{
              token: {
                colorText: "#425b6d",
              },
            }}
          >
            <Text className={styles["form-title"]}>
              {t("login-right-form-title")}
            </Text>
          </ConfigProvider>
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label={t("login-right-form-account-label")}
              colon={false}
              name="username"
              rules={[
                {
                  required: true,
                  message: t("login-right-form-account-error"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("login-right-form-account-placeholder")}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("login-right-form-pwd-label")}
              colon={false}
              rules={[
                { required: true, message: t("login-right-form-pwd-error") },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("login-right-form-pwd-placeholder")}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ color: token.colorText }}>
                  {t("login-right-form-rember")}
                </Checkbox>
              </Form.Item>

              <a
                className="login-form-forgot"
                href=""
                style={{ color: token.colorPrimary }}
              >
                {t("login-right-form-forgetPwd")}
              </a>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {t("login-right-form-loginBtn")}
              </Button>
            </Form.Item>
            <div>
              {t("login-right-form-noAccountText")}{" "}
              <a
                onClick={() => setRegisterState(true)}
                style={{ color: token.colorPrimary }}
              >
                {t("login-right-form-noAccountText-a")}
              </a>
            </div>
          </Form>
        </div>
      </div>
      {/* Register Form */}
      <div
        className={styles["login-form-wrap"]}
        style={registerState ? { display: "flex" } : { display: "none" }}
      >
        <div className={styles["form-wrap"]}>
          <ConfigProvider
            theme={{
              token: {
                colorText: "#425b6d",
              },
            }}
          >
            <Text className={styles["form-title"]}>
              {t("login-right-register-form-title")}
            </Text>
          </ConfigProvider>
          <Form
            name="normal_register"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onRegisterFinish}
            form={form}
          >
            <Form.Item
              colon={false}
              name="username"
              rules={[
                {
                  required: true,
                  message: t("login-right-register-form-account-placeholder"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t("login-right-register-form-account-placeholder")}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              colon={false}
              rules={[
                {
                  required: true,
                  message: t("login-right-register-form-pwd-placeholder"),
                },
                {
                  pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,
                  message: t("login-right-register-form-pwd-error-rule"),
                },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("login-right-register-form-pwd-rule")}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: t("login-right-register-form-pwd-placeholder"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("login-right-register-form-pwd-error-same"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder={t("login-right-register-form-pwd-rule")}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              name="infoname"
              rules={[
                {
                  required: true,
                  message: t("login-right-register-form-infoname-placeholder"),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder={t(
                  "login-right-register-form-infoname-placeholder"
                )}
                bordered={false}
                style={{ background: token.controlItemBgHover }}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                {t("login-right-register-form-btn")}
              </Button>
            </Form.Item>
            <div>
              {t("login-right-register-hasAccountText")}{" "}
              <a
                onClick={() => setRegisterState(false)}
                style={{ color: token.colorPrimary }}
              >
                {t("login-right-register-hasAccountText-a")}
              </a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
