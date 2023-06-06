/*
 * @Author: G.S
 * @Date: 2021-10-19 18:38:11
 * @LastEditTime: 2023-06-06 14:21:08
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @FilePath: /moneyWeb/src/routes/index.tsx
 * @Description: 路由管理
 */

import React,{ createElement } from 'react'
import { Router, Redirect } from '@reach/router'

import MainLayout from '../Layout/main'
import { routeMap } from './data'
import { LOGIN_ROUTE } from '../utils/constants'
import GuidePage from '../pages/guidePage'

type RouteProps = {
  key: string
  path: string
}

export default function Routes() {

  const authRoutes = Object.keys(routeMap).map((path) =>
    createElement<RouteProps>(routeMap[path], { key: path, path }),
  )

  return (
    <Router className="c-router">
      {createElement(routeMap[LOGIN_ROUTE], { path: LOGIN_ROUTE })}

      <GuidePage path='/guidePage'/>
      <MainLayout path="/">{authRoutes}</MainLayout>
      
      <Redirect from="/" to={ LOGIN_ROUTE } />
    </Router>
  )
}
