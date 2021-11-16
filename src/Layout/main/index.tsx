import React, { useEffect, useState } from 'react'

import { navigate } from '@reach/router'
import { Layout } from 'antd';

import { DEFAULT_SETTINGS_ROUTE } from '../../utils/constants'

import HeaderArea from '../header';
import MenuSider from '../menuArea';

const { Content } = Layout;

export default function MainLayout({ children }: any) {

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
        <MenuSider/>
        <Layout className="site-layout">
          <HeaderArea/>
          <Content style={{ margin: '0 16px' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
  )
}
