import React, { useEffect, useState } from 'react'

import { navigate } from '@reach/router'
import { Layout, Menu, Breadcrumb, Button, message } from 'antd';

import { DEFAULT_SETTINGS_ROUTE } from '../../utils/constants'

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export default function MainLayout({ children }: any) {

  const [collapsed,setCollapsed] = useState<boolean>(false)
  
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    message.success('注销成功！')
    navigate('/login')
  }

  useEffect(() => {
    const loginState: string = localStorage.getItem('token') || "login"
    if(loginState === "Acess") {
      const url = DEFAULT_SETTINGS_ROUTE
      navigate(url)
    } else {
      navigate("/login")
    }
  },[])

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<PieChartOutlined />}>
              首页
            </Menu.Item>
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              Option 2
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9" icon={<FileOutlined />}>
              Files
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div style={{float:"right",marginRight:"12px"}}>
              <Button type = "primary" onClick={handleLogout}>注销登陆</Button>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
  )
}
