import React, { useEffect, useState } from 'react'

import { navigate, Redirect, Router } from '@reach/router'
import { Layout, theme, message } from 'antd';

import Loading from '../../components/loading/index'
import { useLayoutModel } from '../../models/layout';
import { useThemeColorModel } from '../../models/themeColor';

import HeaderArea from '../header';
import MenuSider from '../menuArea';
import { getRolesList } from '../../utils/http';
import Home from '../../pages/home'
import UserList from '../../pages/manage/userList'
import General from '../../pages/general'
import Daybook from '../../pages/analysis/daybook'
import Target from '../../pages/analysis/target'
import UserCenter from '../../pages/userCenter'
import NotFound from '../../pages/NotFound'
import SystemSettings from '../../pages/systemSettings';
import ApproveManage from '../../pages/groupManage/approveManage';

const { Header, Content } = Layout

export default function MainLayout({ children }: any) {
  
  const localList: any = {
    //@ts-ignore
    "/home": <Home path="/home" key="/home" />,
    //@ts-ignore
    "/manage/userlist": <UserList path="/manage/userlist" key="/manage/userlist" />,
    //@ts-ignore
    "/general": <General path="/general" key="/general" />,
    //@ts-ignore
    "/analysis/daybook": <Daybook path="/analysis/daybook" key="/analysis/daybook" />,
    //@ts-ignore
    "/analysis/target": <Target path="/analysis/target" key="/analysis/target" />,
    //@ts-ignore
    "/usercenter": <UserCenter path="/usercenter" key="/usercenter" />,
    //@ts-ignore
    "/systemSettings": <SystemSettings path="/systemSettings" key="/systemSettings" />,
    //@ts-ignore
    "/groupManage/approveManage": <ApproveManage path="/groupManage/approveManage" key="/groupManage/approveManage" />
  }

  const [rolesMenu, setRolesMenu] = useState<string []>([])
  const [loading, setLoading] = useState<boolean>(false)

  const { layoutType, setLayoutType } = useLayoutModel();
  const { setThemeColor } = useThemeColorModel();
  
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    setLoading(true)
    if (!localStorage.getItem('token')) {
      message.warning('信息已过期,请重新登录')
      navigate("/login")
    }

    const userInfo = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || "") : null;

    setThemeColor(userInfo?.themeColor || '#536DFE');
    setLayoutType(userInfo?.layout || 'left');
    localStorage.setItem('themeColor', userInfo?.themeColor || '#536DFE');
    localStorage.setItem('layout', userInfo?.layout || 'left');

    const rolesList = async () => {
      const res = await getRolesList(userInfo?.username || '')
      if (res) {
        const { code, data = [] } = res
        if (code === 200) {
          setRolesMenu(data.menu)
        }
      }
      setLoading(false)
    }
    rolesList()
  }, [])

  return (
    layoutType === 'up' ? 
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderArea />
      <Content>
          <div style={{ height: '100%', background: colorBgContainer, position: 'relative' }}>
            {
              loading ? <Loading/> : null
            }

            {
              loading ? null : <Router>
              {
                rolesMenu.map((item: any) => localList[item])
              }
              <NotFound 
                //@ts-ignore
                default
              />
            </Router>
            } 
          </div> 
        </Content>
    </Layout> : 
    <Layout style={{ minHeight: '100vh' }}>
      <MenuSider mode="inline"/>
      <Layout className="site-layout">
        <HeaderArea />
        <Content>
          <div style={{ height: '100%', background: colorBgContainer, position: 'relative' }}>
            {
              loading ? <Loading/> : null
            }

            {
              loading ? null : <Router>
              {
                rolesMenu.map((item: any) => localList[item])
              }
              <NotFound 
                //@ts-ignore
                default
              />
            </Router>
            } 
          </div> 
        </Content>
      </Layout>
    </Layout>
  )
}
