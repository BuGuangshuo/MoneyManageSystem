import React, { useEffect, useState } from 'react'

import { navigate, Link } from '@reach/router'
import { Button, message, Layout, Avatar, Dropdown, Menu, theme } from 'antd'

import { UserOutlined, SettingOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const { Header } = Layout

export default function HeaderArea() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
    message.success('注销成功！')
    navigate('/login')
  }

  const menu = (
    <Menu>
      
      <Menu.Item key="menu-center">
        <Link to="/usercenter">
          <UserOutlined className="c-mr-12 c-mb-8"/>个人中心
        </Link>
      </Menu.Item>
      <Menu.Item key="menu-logout" className={styles['logout-menu']} onClick={handleLogout}>
        退出登录
      </Menu.Item>
    </Menu>
  )

  return (
    <Header className="site-layout-background" style={{ padding: 0, background: colorBgContainer }}>
      <div className={styles['avatar-wrap']}>
      <span>{JSON.parse(sessionStorage.getItem('user')||"null").infoname}</span>
        <Dropdown overlay={menu} placement="bottomCenter" overlayClassName={styles['logout-wrap']} className="c-ml-8">
          <Avatar icon={<UserOutlined />} size={{ xs: 12, sm: 24, md: 18, lg: 24, xl: 28, xxl: 36 }} style={{ backgroundColor: '#536DFE' }} />
        </Dropdown>
      </div>
    </Header>
  )
}
