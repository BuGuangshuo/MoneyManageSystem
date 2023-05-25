import React, { useEffect, useState } from 'react'

import { navigate, Redirect, Router } from '@reach/router'
import { Layout, theme } from 'antd';

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
    "/systemSettings": <SystemSettings path="/systemSettings" key="/systemSettings" />
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
      navigate("/login")
    }

    const { username, themeColor, layout } = JSON.parse(sessionStorage.getItem('user') || "")

    setThemeColor(themeColor);
    setLayoutType(layout);
    localStorage.setItem('themeColor', themeColor);
    localStorage.setItem('layout', layout)
    
    const rolesList = async () => {
      const res = await getRolesList(username)
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
