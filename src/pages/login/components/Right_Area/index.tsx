import React, { useState } from 'react'

import { Button, Checkbox, Form, Input, message, DatePicker } from 'antd'
import { navigate } from '@reach/router'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';

import { Userlogin, UserRegister } from '../../../../utils/http';

import styles from '../index.module.less'


export default function RightArea() {

  const [registerState, setRegisterState] = useState<boolean>(false)
  const [dateVal, setDateVal] = useState<any>(null)
  const [loading,setLoading] = useState<boolean>(false)

  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
  }

  const onFinish = async (values: any) => {
    const { username, password } = values
    const res = await Userlogin({username, password})
    if(res) {
      setLoading(false)
      const {code, data, msg } = res
      if(code === 200) {
        localStorage.setItem('token', "Acess")
        sessionStorage.setItem('user', JSON.stringify(data))
        message.success(msg)
        navigate('/home')
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
    <div className={styles['right-wrap']}>
      {/* Login Form */}
      <div className={styles['login-form-wrap']} style={registerState ? { display: "none" } : { display: "flex" }}>
        <div className={styles['form-wrap']}>
          <div className={styles['form-title']}>
            用户登录
          </div>
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" bordered={false} />
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
            <div>如果你没有账号，在这里 <a onClick={() => setRegisterState(true)}>注册</a></div>
          </Form>
        </div>
      </div>
      {/* Register Form */}
      <div className={styles['login-form-wrap']} style={registerState ? { display: "flex" } : { display: "none" }}>
        <div className={styles['form-wrap']}>
          <div className={styles['form-title']}>
            用户注册
          </div>
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
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入账号" bordered={false} />
            </Form.Item>

            <Form.Item
              name="password"
              colon={false}
              rules={[{ required: true, message: '请输入密码!' }]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="密码 (6-16个字符组成，区分大小写)"
                bordered={false}
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
              />
            </Form.Item>

            <Form.Item
              colon={false}
              name="infoname"
              rules={[{ required: true, message: '请输入昵称' }]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入昵称" bordered={false} />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
                注册
              </Button>
            </Form.Item>
            <div>已有账号？，直接 <a onClick={() => setRegisterState(false)}>登录</a></div>
          </Form>
        </div>
      </div>
    </div >
  )
}
