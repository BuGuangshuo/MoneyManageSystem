import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu

export default function Home() {
  const [userInfo,setUserInfo] = useState<string>('')
  const info:{username:string,remember:boolean} = JSON.parse(localStorage.getItem('user')|| "")

  useEffect(() => {
    console.log(info)
  },[info])
  return (
    <div>home</div>
  )
}
