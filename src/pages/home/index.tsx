import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button, theme, Modal, message } from 'antd'

import { familyCreate } from '../../utils/http'
import introduceImg1 from '@/assets/img/undraw_xmas_surprise_-57-p1.svg'
import introduceImg2 from '@/assets/img/undraw_cabin_hkfr.svg'
import introduceImg3 from '@/assets/img/undraw_booking_re_gw4j.svg'

import styles from './index.module.less'

export default function Home() {

  const onFamilySave = async() => {
    const userId = sessionStorage.getItem('userId');
    await familyCreate({userId, familyName: 'testFamily'})
  }

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorPrimaryText, colorTextSecondary, colorTextLabel, colorWarningHover,colorErrorHover },
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
          <div className={styles['title']} style={TitleStyle}>首页概览</div>
          <div className={styles['card-content']}>
            <div className={styles['card-item']}>
              <div className={styles['avanter']} style={{background: '#FB9251'}}><img src={introduceImg1} style={{width: '100%', height: '100%', padding: 8}}/></div>
              <div className={styles['ava-title']}>UI Design</div>
              <div className={styles['desc']}>4 projects</div>
              <div className={styles['view-btn']}><button className={styles['card-btn']}>详情</button></div>
            </div>
            <div className={styles['card-item']}>
              <div className={styles['avanter']} style={{background: '#5461fa'}}><img src={introduceImg2} style={{width: '100%', height: '100%'}}/></div>
              <div className={styles['ava-title']}>UI Design</div>
              <div className={styles['desc']}>4 projects</div>
              <div className={styles['view-btn']}><button className={styles['card-btn']}>详情</button></div>
            </div>
            <div className={styles['card-item']}>
              <div className={styles['avanter']} style={{background: '#5CBEFF'}}><img src={introduceImg3} style={{width: '100%', height: '100%', padding: 6}}/></div>
              <div className={styles['ava-title']}>UI Design</div>
              <div className={styles['desc']}>4 projects</div>
              <div className={styles['view-btn']}>
                {/* <Button style={{width: 120, borderRadius: 12}}>view</Button> */}
                <button className={styles['card-btn']}>详情</button>
                </div>
            </div>
          </div>
        </div>
        <div className={styles['family-info']}></div>
      </div>
      <div className={styles['right']}></div>
    </div>
  )
}
