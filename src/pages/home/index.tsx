/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-02-17 14:27:30
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-11 17:34:54
 * @FilePath: \MoneyManageSystem\src\pages\home\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react'
import { Layout, Menu, Breadcrumb, Button, theme, Modal, message } from 'antd'

import { familyCreate } from '../../utils/http'

import styles from './index.module.less'

export default function Home() {

  const [userInfo, setUserInfo] = useState<string>(sessionStorage.getItem('user') || '');

  let getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours < 12) {
        text = `早上好`;
    } else if (hours === 12) {
        text = `中午好`;
    } else if (hours  > 12 && hours < 18) {
        text = `下午好`;
    } else {
        text = `晚上好`;
    }
    // 返回当前时间段对应的状态
    return text;
};

  const onFamilySave = async() => {
    const userId = sessionStorage.getItem('userId');
    await familyCreate({userId, familyName: 'testFamily'})
  }

  const {
    token: { colorPrimaryText, colorTextLabel, colorTextSecondary, colorWarningTextActive, colorWarningText, colorWhite },
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
        {/* <div className={styles['card-wrap']} style={{backgroundColor: 'rgb(83, 109, 254)', backgroundImage: `linear-gradient(23deg, rgb(83, 109, 254) 0%, #fafafa 100%)`}}> */}
        <div className={styles['card-wrap']}>
          {/* <div className={styles['title']} style={TitleStyle}>首页概览</div> */}
          <div className={styles['welcome-wrap']}>
            <div className={styles['welcome-title']} style={{color: colorWarningTextActive}}>
              {getTimeState()}，
            </div>  
            <div className={styles['welcome-user-title']} style={{color: colorWarningTextActive}}>{JSON.parse(userInfo).infoname}</div>
            <div className={styles['welcome-desc']} style={{color: colorWarningTextActive}}>
              欢迎进入财政管理系统，您可以查看您家庭财政的详细概览、家庭详情等基础信息。
            </div>
            {/* <div className={styles['card-btn']}>
                <Button type="primary">查看建议</Button>
            </div> */}
          </div>
          {/* <div className={styles['welcome-animition']}>
            <div className={styles["boxes"]}>
              <div className={styles["box"]}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
              <div className={styles["box"]}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
              <div className={styles["box"]}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
              <div className={styles["box"]}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
              </div>
            </div>
          </div> */}
          
          {/* <div className={styles['welcome-img']}>
            <img src={WecomeUser} alt="---" height="100%" />
          </div> */}
        </div>
        <div className={styles['family-info']}>
          <div className={styles['family-title']} style={{color: colorTextSecondary}}>家庭信息</div>
          <div className={styles['family-wrap']}>
            <div className={styles['info-left']}>
              <div className={styles['family-primary-person']}>
              <div className={styles.card} style={{background: colorPrimaryText}}>
              </div>

              <div className={styles.card} style={{background: colorPrimaryText}}>

              </div>
            </div>
            </div>
            <div className={styles['info-right']}></div>
          </div>
        </div>
        
      </div>
      <div className={styles['right']}></div>
    </div>
  )
}
