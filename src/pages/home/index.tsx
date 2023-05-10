/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-02-17 14:27:30
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-10 17:56:18
 * @FilePath: \MoneyManageSystem\src\pages\home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button, theme, Modal, message } from 'antd'

import { familyCreate } from '../../utils/http'
import WecomeUser from '@/assets/img/undraw_small_town_re_7mcn.svg'

import styles from './index.module.less'

export default function Home() {

  const onFamilySave = async() => {
    const userId = sessionStorage.getItem('userId');
    await familyCreate({userId, familyName: 'testFamily'})
  }

  const {
    token: { colorPrimaryText, colorTextLabel, colorTextSecondary },
  } = theme.useToken();

  const TitleStyle = {
    color: colorTextLabel
  }

  // const cardItemStyle = {
  //   backgroundColor: `${colorWarningHover}`,
  //   backgroundImage: `linear-gradient(62deg, ${colorWarningHover} 0%, ${colorErrorHover} 100%)`
  // }

  return (
    <div className={styles['dashboard-wrap']}>
      <div className={styles['left']}>
        <div className={styles['card-wrap']}>
          {/* <div className={styles['title']} style={TitleStyle}>首页概览</div> */}
          <div className={styles['welcome-wrap']}>
            <div className={styles['welcome-title']} style={{color: colorPrimaryText}}>
              早上好，
            </div>  
            <div className={styles['welcome-user-title']} style={{color: colorPrimaryText}}>James Scort</div>
            <div className={styles['welcome-desc']} style={{color: colorTextSecondary}}>
              欢迎进入财政管理系统，您可以查看您家庭财政的详细概览、家庭详情等基础信息。
            </div>
            <div>
                <Button type="primary">See suggestions</Button>
            </div>
          </div>

          <div className={styles['welcome-img']}>
            <img src={WecomeUser} alt="---" height="100%" />
          </div>
        </div>
        <div className={styles['family-info']}></div>
      </div>
      <div className={styles['right']}></div>
    </div>
  )
}
