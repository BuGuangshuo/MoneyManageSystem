/*
 * @Author: D.Y
 * @Date: 2021-05-31 10:54:48
 * @LastEditTime: 2021-06-03 17:16:22
 * @LastEditors: D.Y
 * @FilePath: /laiye-chatbot-web/src/routes/data.tsx
 * @Description:
 */
import React, { lazy, Suspense } from 'react'
import type { ComponentType } from 'react'

import { PageLoading } from '../components/PageLoading'

import type { RouteComponentProps } from '@reach/router'

function asyncRoute<T extends RouteComponentProps>(RouteComponent: ComponentType<T>) {
  return (props: T) => (
    <Suspense fallback={<PageLoading />}>
      <RouteComponent {...props} />
    </Suspense>
  )
}

export const routeMap: Record<
  string,
  (props: RouteComponentProps<Record<string, unknown>>) => JSX.Element
> = {
  // 登陆
  '/login': asyncRoute(lazy(() => import('../pages/login'))),
  '/home': asyncRoute(lazy(() => import('../pages/home'))),
}
