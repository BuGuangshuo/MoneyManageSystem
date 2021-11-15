import React, { useState } from 'react'

import { Layout, Menu } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';


const { SubMenu } = Menu
const { Sider } = Layout

export default function MenuSider() {
  const [collapsed,setCollapsed] = useState<boolean>(false)
  
  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }
  
  return (
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
  )
}
