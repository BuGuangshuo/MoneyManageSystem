import React, { useState } from 'react'

import { Button, Checkbox, Form, Input, message, theme, ConfigProvider, Typography  } from 'antd'
import { navigate } from '@reach/router'
import sha256 from 'sha256'
import { UserOutlined, LockOutlined, createFromIconfontCN  } from '@ant-design/icons';

import { Userlogin, UserRegister, getUserInfo } from '../../../../utils/http';
import { useThemeModel } from '../../../../models/theme'
import { useUserInfoModel } from '../../../../models/userInfo'

import styles from '../index.module.less'
import { useUserAvatarModel } from '../../../../models/avatar';

const { useToken } = theme;

const { Text } = Typography;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_k27ujdzcenl.js',
});

export default function RightArea() {

  const [registerState, setRegisterState] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)

  const [form] = Form.useForm();

  const { token } = useToken();

  const { setThemeType } = useThemeModel();
  const { setAvatarSrc } = useUserAvatarModel();

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onReset = () => {
    form.resetFields();
  }

  const onThemeClick = () => {
    const themeType = localStorage.getItem('theme');
    setThemeType(themeType === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme',themeType === 'light' ? 'dark' : 'light')
  }

  const onFinish = async (values: any) => {
    const { username, password } = values
    const res = await Userlogin({username, password:sha256(password)})
    if(res) {
      setLoading(false)
      const {code, data, msg } = res
      if(code === 200) {
        localStorage.setItem('token', "Acess")
        sessionStorage.setItem('user', JSON.stringify(data))
        sessionStorage.setItem('userId', data.id)
        message.success(msg)

        const res = await getUserInfo({ username: data.username });
        setAvatarSrc(res.data.avaterSrc)
        sessionStorage.setItem('userData', JSON.stringify(res.data))
        
        if(res.code === 201) {
          navigate('/guidePage')
        } else {
          navigate('/home')
        }
        
      } else if(code === 201) {
        message.error(msg)
      } else {
        message.error("登录失败")
      }
    } else {
      setLoading(false)
      message.error("网络错误")
    }
  };

  const onRegisterFinish = async (values: any) => {
    setLoading(true)
    const res = await UserRegister(values)
    if(res) {
      setLoading(false)
      const {code, msg } = res
      if(code === 200) {
        message.success("注册成功")
        onReset()
        setRegisterState(false)
      } else if(code === 201) {
        message.error(msg)
        onReset()
      } else {
        message.error("注册失败")
      }
    } else {
      setLoading(false)
      message.error("网络错误")
    }
  }

  return (
    <div className={styles['right-wrap']} style={{ background: token.colorBgContainer}}>
      <div className={styles['tools-wrap']}>
        <div className={styles['theme-switch']}><IconFont type={localStorage.getItem('theme') === 'light' ? 'icon-taiyang' : 'icon-yueliang'} className={styles['icon-theme']} style={{color: token.colorText}} onClick={onThemeClick}/></div>
      </div>
      {/* Login Form */}
      <div className={styles['login-form-wrap']} style={registerState ? { display: "none" } : { display: "flex" }}>
        <div className={styles['form-wrap']}>
        <ConfigProvider
          theme={{
            token: {
              colorText: '#425b6d',
            },
          }}
        >
          <Text className={styles['form-title']}>用户登录</Text>
        </ConfigProvider>
          <Form
            name="normal_login"
            className="login-form"
            layout="vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="账号"
              colon={false}
              name="username"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" bordered={false} style={{background: token.controlItemBgHover}}/>
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              colon={false}
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
                bordered={false}
                style={{background: token.controlItemBgHover}}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{color: token.colorText}}>记住我</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="" style={{ color: token.colorPrimary }}>
                忘记密码
              </a>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
            <div>如果你没有账号，在这里 <a onClick={() => setRegisterState(true)} style={{ color: token.colorPrimary }}>注册</a></div>
          </Form>
        </div>
      </div>
      {/* Register Form */}
      <div className={styles['login-form-wrap']} style={registerState ? { display: "flex" } : { display: "none" }}>
        <div className={styles['form-wrap']}>
          <ConfigProvider
          theme={{
            token: {
              colorText: '#425b6d',
            },
          }}
        >
          <Text className={styles['form-title']}>用户注册</Text>
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
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" bordered={false} style={{background: token.controlItemBgHover}}/>
            </Form.Item>

            <Form.Item
              name="password"
              colon={false}
              rules={[{ required: true, message: '请输入密码!' },{pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/,message:"密码长度为8-16位， 要同时包含字母与数组，不能有特殊符号"}]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码 (6-16个字符组成，区分大小写)"
                bordered={false}
                style={{background: token.controlItemBgHover}}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              name="confirm"
              dependencies={['password']}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: '请输入密码!',
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('两次密码不一致'));
                  },
                }),
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码 (6-16个字符组成，区分大小写)"
                bordered={false}
                style={{background: token.controlItemBgHover}}
              />
            </Form.Item>

            <Form.Item
              colon={false}
              name="infoname"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" bordered={false} style={{background: token.controlItemBgHover}}/>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                注册
              </Button>
            </Form.Item>
            <div>已有账号？，直接 <a onClick={() => setRegisterState(false)} style={{ color: token.colorPrimary }}>登录</a></div>
          </Form>
        </div>
      </div>
    </div >
  )
}
