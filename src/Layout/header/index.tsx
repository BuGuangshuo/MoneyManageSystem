import React from 'react'

import { navigate } from '@reach/router'
import { Button, message, Layout } from 'antd'

export default function HeaderArea() {

  const { Header } = Layout

  const handleLogout = () => {
    localStorage.removeItem('token')
    sessionStorage.removeItem('user')
    message.success('注销成功！')
    navigate('/login')
  }

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      <div style={{ float: "right", marginRight: "12px" }}>
        <Button type="primary" onClick={handleLogout}>注销登陆</Button>
      </div>
    </Header>
  )
}
