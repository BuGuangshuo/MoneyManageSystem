import React from 'react'

import { Button, Checkbox, Form, Input } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import styles from '../index.module.less'

export default function RightArea() {

  const onFinish = (values: any) => {
    console.log('Success:', values);
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
            Welcome to System
          </div>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' }]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="">
                Forgot password
        </a>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
        </Button>
        Or <a href="">register now!</a>
            </Form.Item>
          </Form>
      </div>
    </div>
    </div >
  )
}
