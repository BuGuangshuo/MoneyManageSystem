import React from 'react'

import { theme, Button } from 'antd'

import styles from './index.module.less'

export default function UserList() {

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorPrimaryText, colorBgElevated, colorTextLabel },
  } = theme.useToken();

  return (
    <div className={styles['userList-wrap']}>
      <div className={styles['header-wrap']}>
        <div className={styles['title']} style={{ color: colorTextLabel }}>用户管理</div>
        <div className={styles['title']}><Button type="primary">添加用户</Button></div>
      </div>
    </div>
  )
}
