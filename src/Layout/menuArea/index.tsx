import React, { useEffect, useState } from 'react'

import { Layout, Menu, theme } from 'antd';

import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
  LeftOutlined,
  RightOutlined,
  createFromIconfontCN
} from '@ant-design/icons';

import { getMenuList, getRolesList } from '../../utils/http';
import { navigate } from '@reach/router';

import styles from './index.module.less'

const { SubMenu } = Menu
const { Sider } = Layout

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_uj0g9m3dg5g.js',
});

const iconList: any = {"/home" : <TeamOutlined/>,"/manage/userlist": <UserOutlined/>,'/general': <PieChartOutlined/>};

export default function MenuSider({ mode }: any) {
  const [collapsed, setCollapsed] = useState<boolean>(false)
  const [siderWidth, setSiderWidth] = useState<number>(200)
  const [rolesList,setRolesList] = useState<string []>([])
  const [menuList,setMenuList] = useState<any>([])
  const [menuSelectKeys,setMenuSelectKeys] = useState<string []>(['/home'])
  const [menuOpenKeys,setMenuOpenKeys] = useState<string []>(['/manage/userlist'])

  const hrefPath = window.location.href

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorBgElevated },
  } = theme.useToken();

  const SiderStyle: any = {
    background: colorBgContainer,
    borderRight: `1px solid ${colorBorderSecondary}`
  }

  const LogoStyle: any = {
    textAlign: "center", 
    lineHeight: "32px",
    fontSize: "18px", 
    color: colorText, 
    fontWeight: 500
  }

  const MenuStyle = {
    borderTop: `1px solid ${colorBorderSecondary}`,
    borderRight: 0,
    marginTop: -1,
  }

  const MenuInStyle = {
    borderTop: `1px solid ${colorBorderSecondary}`,
    borderRight: `1px solid ${colorBorderSecondary}`,
    marginTop: -1,
  }

  const MenuHorizontalStyle = {
    // borderBottom: `1px solid ${colorBorderSecondary}`,
    paddingLeft: 42,
    background: colorBgElevated
  }

  const TriggerStyle: any = {
    borderTop: `1px solid ${colorBorderSecondary}`,
    width: `${siderWidth}px`,
    height: '48px',
    lineHeight: '48px',
    textAlign: "center",
    color: `${colorText}`,
    position: "fixed",
    bottom: 0,
    zIndex: 1,
    cursor: "pointer",
    transition: "all .2s"
  }

  const onCollapse = () => {
    setSiderWidth(collapsed ? 200 : 80)
    setCollapsed(!collapsed)
  }

  const onOpenChange = (opened: string []) => {
    setMenuOpenKeys([...opened])
  }

  //判断当前登录用户是否具有此权限
  const checkPermission = (item: any) => {
    return rolesList.includes(item.menu_key)
  }

  const renderMenu = (menuData: any, hasChildren?: boolean, title?: string) => {
    let menuList = [];
    menuList =  menuData.map((menuItem: any) => {
      if(checkPermission(menuItem)) {
        if(menuItem.childrens?.length && checkPermission(menuItem)) {
          return {
            label: <span>{menuItem.title}</span>,
            key: menuItem.menu_key,
            icon: hasChildren ? null : iconList[menuItem.menu_key],
            children: menuItem.childrens?.length ? renderMenu(menuItem.childrens, true, menuItem.title) : []
          }
        }
        
        return {
          label: <span onClick={()=>{
            setMenuSelectKeys(menuItem.menu_key)
            navigate(menuItem.menu_key)
          }}>{menuItem.title}</span>,
          key: menuItem.menu_key,
          icon: hasChildren ? null : iconList[menuItem.menu_key]
        }
      }
    });

    return menuList;
  }

  const renderLeftMenu = (menuData: any, hasChildren?: boolean, title?:string) => {
    return menuData.map((menuItem:any) => {
      if(menuItem.childrens?.length && checkPermission(menuItem)) {
        return (
          <SubMenu title={menuItem.title} key={menuItem.menu_key} icon={iconList[menuItem.menu_key]}>
            {
              renderMenu(menuItem.childrens, true, menuItem.title)
            }
          </SubMenu>
        )
      }

      return checkPermission(menuItem) && 
      <Menu.Item key={menuItem.menu_key} onClick={()=>{
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
    mode === 'inline' ? 
      <Sider collapsible collapsed={collapsed} className={styles['menu-side']} width={200} style={SiderStyle} trigger={null}>
      <div className="logo" style={LogoStyle}>{collapsed ? <IconFont type="icon-jinqian" style={{color: colorText, fontSize: 32, position: 'relative', top: 4}}/> : <div><IconFont type="icon-jinqian" style={{color: colorText, fontSize: 32, position: 'relative', top: 4, right: 12}}/><span className='DingDing'>财政管理系统</span></div>}</div>
      <Menu selectedKeys={menuSelectKeys} mode="inline" openKeys={menuOpenKeys} onOpenChange={onOpenChange} style={collapsed ? MenuInStyle : MenuStyle} items={renderMenu(menuList)}/>
      <div style={TriggerStyle} onClick={onCollapse}>{collapsed ? <RightOutlined /> : <LeftOutlined />}</div>
    </Sider> :
    <div style={{display: 'flex'}}>
      <span style={{marginRight: 12, marginLeft: 42, paddingTop: 3}}><IconFont type="icon-jinqian" style={{color: colorText, fontSize: 32, position: 'relative', top: 4, right: 12}}/><span className='DingDing'>财政管理系统</span></span>
      <Menu selectedKeys={menuSelectKeys} mode='horizontal' onOpenChange={onOpenChange} style={MenuHorizontalStyle} items={renderMenu(menuList)} />
    </div>
  )
}
