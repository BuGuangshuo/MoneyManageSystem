import React, { useEffect, useState } from 'react'

import { Layout, Menu } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { getMenuList, getRolesList } from '../../utils/http';
import { navigate } from '@reach/router';


const { SubMenu } = Menu
const { Sider } = Layout

export default function MenuSider() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [rolesList,setRolesList] = useState<string []>([])
  const [menuList,setMenuList] = useState<any>([])
  const [menuSelectKeys,setMenuSelectKeys] = useState<string []>(['/home'])

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  //判断当前登录用户是否具有此权限
  const checkPermission = (item: any) => {
    return rolesList.includes(item.menu_key)
  }

  const renderMenu = (menuData: any,title?:string) => {
    return menuData.map((menuItem:any,menuIndex: any) => {
      if(menuItem.childrens?.length && checkPermission(menuItem)) {
        return (
          <SubMenu title={menuItem.title} key={menuItem.menu_key}>
            {
              renderMenu(menuItem.childrens,menuItem.title)
            }
          </SubMenu>
        )
      }

      return checkPermission(menuItem) && <Menu.Item key={menuItem.menu_key} onClick={()=>{
        setMenuSelectKeys(menuItem.menu_key)
        navigate(menuItem.menu_key)
      }}>
        {menuItem.title}
      </Menu.Item>
    })
  }

  useEffect(() => {
    const { username } = JSON.parse(sessionStorage.getItem('user') || "")

    const rolesList = async () => {
      const res = await getRolesList(username)
      if (res) {
        const { code, data = [] } = res
        if (code === 200) {
          setRolesList(data.menu)
        }
      }
    }

    const menuList = async () => {
      const res = await getMenuList()
      if (res) {
        const { code, data } = res
        if (code === 200) {
          setMenuList(data)
        }
      }
    }
    rolesList()
    menuList()
  }, [])

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" />
      <Menu theme="dark" selectedKeys={menuSelectKeys} mode="inline">
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  )
}
