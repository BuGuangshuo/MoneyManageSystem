import React, { useEffect, useState } from 'react'

import { navigate, Redirect, Router } from '@reach/router'
import { Layout } from 'antd';

import { DEFAULT_SETTINGS_ROUTE } from '../../utils/constants'

import HeaderArea from '../header';
import MenuSider from '../menuArea';
import { getRolesList } from '../../utils/http';
import Home from '../../pages/home'
import UserList from '../../pages/manage/userList'
import UserDel from '../../pages/manage/userDel'
import UserUpdate from '../../pages/manage/userUpdate'
import General from '../../pages/general'
import Daybook from '../../pages/analysis/daybook'
import Target from '../../pages/analysis/target'
import NotFound from '../../pages/NotFound'

const { Content } = Layout

export default function MainLayout({ children }: any) {

  const localList: any = {
    //@ts-ignore
    "/home": <Home path="/home" key="/home" />,
    //@ts-ignore
    "/manage/userlist": <UserList path="/manage/userlist" key="/manage/userlist" />,
    //@ts-ignore
    "/manage/userdel": <UserDel path="/manage/userdel" key="/manage/userdel" />,
    //@ts-ignore
    "/manage/userupdate": <UserUpdate path="/manage/userupdate" key="/manage/userupdate" />,
    //@ts-ignore
    "/general": <General path="/general" key="/general" />,
    //@ts-ignore
    "/analysis/daybook": <Daybook path="/analysis/daybook" key="/analysis/daybook" />,
    //@ts-ignore
    "/analysis/target": <Target path="/analysis/target" key="/analysis/target" />
  }

  const [rolesMenu, setRolesMenu] = useState<string []>([])

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate("/login")
    }

    const { username } = JSON.parse(sessionStorage.getItem('user') || "")

    const rolesList = async () => {
      const res = await getRolesList(username)
      if (res) {
        const { code, data = [] } = res
        if (code === 200) {
          setRolesMenu(data.menu)
        }
      }
    }
    rolesList()
  }, [])

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuSider />
      <Layout className="site-layout">
        <HeaderArea />
        <Content style={{ margin: '0 16px' }}>
          <Router>
            {
              rolesMenu.map((item: any) => localList[item])
            }
            <NotFound 
              //@ts-ignore
              default
            />
          </Router>
        </Content>
      </Layout>
    </Layout>
  )
}
