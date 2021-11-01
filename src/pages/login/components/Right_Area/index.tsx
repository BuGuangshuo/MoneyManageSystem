import React from 'react'

import { Button, Checkbox, Form, Input, message } from 'antd'
import { navigate } from '@reach/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../index.module.less'

export default function RightArea() {

  const onFinish = (values: any) => {
    const { username, password } = values
    if(username === "admin" && password === "123456") {
      localStorage.setItem('token',"Acess")
      localStorage.setItem('user',JSON.stringify(values))
      message.success("登陆成功！")
      navigate('/home')
    } else {
      message.error("用户名或密码错误！")
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles['right-wrap']}>
      {/* <div className={styles['theme-icon']}>
        <svg className="icon" aria-hidden="true">
          <use xlinkHref={"#icon--qianbao"}></use>
        </svg>
      </div> */}
      {/* Login Form */}
      <div className={styles['login-form-wrap']}>
        <div className={styles['form-wrap']}>
          <div className={styles['form-title']}>
            用户登录
          </div>
          <Form
            name="normal_login"
            className="login-form"
            layout = "vertical"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              label="账号"
              colon = {false}
              name="username"
              rules={[{ required: true, message: '请输入账号!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入账号" bordered = {false}/>
            </Form.Item>

            <Form.Item
              name="password"
              label="密码"
              colon = {false}
              rules={[{ required: true, message: '请输入密码!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="请输入密码"
                bordered = {false}
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>记住我</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                忘记密码
              </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div >
  )
}
