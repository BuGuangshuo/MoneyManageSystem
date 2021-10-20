import React from 'react'

import { Carousel } from 'antd'
import introduceImg from '@/assets/img/undraw_Customer_survey_re_v9cj.svg'
import introduceImg2 from '@/assets/img/undraw_Statistics_re_kox4.svg'
import styles from '../index.module.less'

export default function LeftArea() {
  return (
    <div className={styles['left-wrap']}>
      <Carousel className = {styles['carouse-wrap']} autoplay>
        <div className = {styles['introduce-wrap']}>
            <div className={styles['introduce-img-wrap']}>
              <img src={introduceImg} alt="" height="100%" />
            </div>
            <div className={styles['introduce-text-wrap']}>
              <div className={styles['introduce-text-context']}>
                <div className={styles['introduce-title']}>Turn your ideas into reality</div>
                <div className={styles['introduce-desc']}>Consist quality and experience across all platforms and device</div>
              </div>
            </div>
          </div> 

          <div className = {styles['introduce-wrap']}>
            <div className={styles['introduce-img-wrap']}>
              <img src={introduceImg2} alt="" height="100%" />
            </div>
            <div className={styles['introduce-text-wrap']}>
              <div className={styles['introduce-text-context']}>
                <div className={styles['introduce-title']}>Turn your ideas into reality</div>
                <div className={styles['introduce-desc']}>quality and experience across all platforms and device</div>
              </div>
            </div>
          </div>  
      </Carousel>
      
    </div>
  )
}
