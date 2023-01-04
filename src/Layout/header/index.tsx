import React, { useEffect, useState } from 'react'

import { navigate, Link } from '@reach/router'
import { Button, message, Layout, Avatar, Dropdown, Menu, theme } from 'antd'

import { UserOutlined, SettingOutlined, createFromIconfontCN } from '@ant-design/icons'

import { useThemeModel } from '../../models/theme'

import styles from './index.module.less'

const { Header } = Layout

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_4tku7m6yffb.js',
});

export default function HeaderArea() {

  const { setThemeType } = useThemeModel();

  const {
    token: { colorBgElevated, colorText, colorBorderSecondary, colorErrorTextHover },
  } = theme.useToken();

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
    message.success('注销成功！')
    navigate('/login')
  }

  const onThemeClick = () => {
    const themeType = localStorage.getItem('theme');
    setThemeType(themeType === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme',themeType === 'light' ? 'dark' : 'light')
  }

  const items = [
    {
      key: 'userCenter',
      label: <div><UserOutlined className="c-mr-12 c-mb-8"/>个人中心</div>
    },
    {
      key: 'logout',
      label: <div className={styles['logout-menu']} style={{color: colorErrorTextHover, fontWeight: 600}} onClick={handleLogout}>退出登录</div>
    }
  ]

  return (
    <Header className="site-layout-background" style={{ padding: 0, background: colorBgElevated, borderBottom: `1px solid ${colorBorderSecondary}` }}>
      <div className={styles['header-wrap']}>
        <div className={styles['theme-wrap']}><IconFont type={localStorage.getItem('theme') === 'light' ? 'icon-taiyang' : 'icon-yueliang'} className={styles['icon-theme']} style={{color: colorText}} onClick={onThemeClick}/></div>
        
        <div className={styles['avatar-wrap']}>
        <span>{JSON.parse(sessionStorage.getItem('user')||"null").infoname}</span>
          <Dropdown menu={{items}} placement="bottomCenter" overlayClassName={styles['logout-wrap']} className="c-ml-8">
            <Avatar icon={<UserOutlined />} size={{ xs: 12, sm: 24, md: 18, lg: 24, xl: 28, xxl: 36 }} style={{ backgroundColor: '#536DFE' }} />
          </Dropdown>
        </div>
      </div>
      
    </Header>
  )
}
