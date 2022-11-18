import React from 'react'

import { Carousel, theme } from 'antd'
import introduceImg from '@/assets/img/undraw_Customer_survey_re_v9cj.svg'
import introduceImg2 from '@/assets/img/undraw_Statistics_re_kox4.svg'
import introduceImg3 from '@/assets/img/undraw_spread_love_r9jb.svg'
import styles from '../index.module.less'

const { useToken } = theme;

export default function LeftArea() {
  const { token } = useToken();
  return (
    <div className={styles['left-wrap']} style={{ backgroundColor: token.colorPrimary }}>
      <Carousel className = {styles['carouse-wrap']} autoplay>
        <div className = {styles['introduce-wrap']}>
            <div className={styles['introduce-img-wrap']}>
              <img src={introduceImg} alt="" height="100%" />
            </div>
            <div className={styles['introduce-text-wrap']}>
              <div className={styles['introduce-text-context']}>
                <div className={styles['introduce-title']}>数据可视化</div>
                <div className={styles['introduce-desc']}>将繁杂的数据转化为图表，把数据以可视化的方式呈现给您，更加直观的观察您的财政状态。</div>
              </div>
            </div>
          </div> 

          <div className = {styles['introduce-wrap']}>
            <div className={styles['introduce-img-wrap']}>
              <img src={introduceImg2} alt="" height="100%" />
            </div>
            <div className={styles['introduce-text-wrap']}>
              <div className={styles['introduce-text-context']}>
                <div className={styles['introduce-title']}>和您爱的人共同分析</div>
                <div className={styles['introduce-desc']}>更加直观的数据与您爱的人共同分享，携手共进。</div>
              </div>
            </div>
          </div> 
    
          <div className = {styles['introduce-wrap']}>
            <div className={styles['introduce-img-wrap']}>
              <img src={introduceImg3} alt="" height="100%" />
            </div>
            <div className={styles['introduce-text-wrap']}>
              <div className={styles['introduce-text-context']}>
                <div className={styles['introduce-title']}>放飞自由</div>
                <div className={styles['introduce-desc']}>将家庭的财政数据化后尽情的放飞自由，让家庭实现财富管理自由。</div>
              </div>
            </div>
          </div>
      </Carousel>
      
    </div>
  )
}
