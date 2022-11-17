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

const iconList: any = {"/home" : <TeamOutlined/>,"/manage/userlist": <UserOutlined/>,'/general': <PieChartOutlined/>};

export default function MenuSider() {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [rolesList,setRolesList] = useState<string []>([])
  const [menuList,setMenuList] = useState<any>([])
  const [menuSelectKeys,setMenuSelectKeys] = useState<string []>(['/home'])
  const [menuOpenKeys,setMenuOpenKeys] = useState<string []>(['/manage/userlist'])

  const hrefPath = window.location.href

  const onCollapse = (collapsed: boolean) => {
    setCollapsed(collapsed)
  }

  const onOpenChange = (opened: string []) => {
    setMenuOpenKeys([...opened])
  }

  //判断当前登录用户是否具有此权限
  const checkPermission = (item: any) => {
    return rolesList.includes(item.menu_key)
  }

  const renderMenu = (menuData: any,title?:string, hasChildren: boolean) => {
    return menuData.map((menuItem:any) => {
      if(menuItem.childrens?.length && checkPermission(menuItem)) {
        return (
          <SubMenu title={menuItem.title} key={menuItem.menu_key} icon={iconList[menuItem.menu_key]}>
            {
              renderMenu(menuItem.childrens,menuItem.title,true)
            }
          </SubMenu>
        )
      }

      return checkPermission(menuItem) && <Menu.Item key={menuItem.menu_key} onClick={()=>{
        setMenuSelectKeys(menuItem.menu_key)
        navigate(menuItem.menu_key)
      }} icon={hasChildren ? null : iconList[menuItem.menu_key]}>
        {menuItem.title}
      </Menu.Item>
    })
  }

  useEffect(() => {
    const { username } = JSON.parse(sessionStorage.getItem('user') || "")
    const currentPathName = hrefPath.split(/\d/)[hrefPath.split(/\d/).length - 1].split(':')[0]
    setMenuSelectKeys([currentPathName])
    // setMenuOpenKeys([currentPathName])
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
  }, [hrefPath.split(/\d/)[hrefPath.split(/\d/).length - 1]])

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <div className="logo" style={{color:"white", textAlign:"center", lineHeight:"32px", backgroundColor:"transparent",fontSize:"16px"}}>财政后台系统</div>
      <Menu theme="dark" selectedKeys={menuSelectKeys} mode="inline" openKeys={menuOpenKeys} onOpenChange={onOpenChange}>
        {renderMenu(menuList)}
      </Menu>
    </Sider>
  )
}
