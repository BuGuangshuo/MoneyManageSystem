/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-12 18:35:37
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-05 10:17:08
 * @FilePath: \MoneyManageSystem\src\components\threeCard\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import { StarOutlined, createFromIconfontCN, AccountBookOutlined  } from '@ant-design/icons';

import './index.css'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_k27ujdzcenl.js',
});

export default function ThreeCard(props: { theme1: string, theme2: string, theme3: string }) {
  return (
    <div className="cards">
    <div className="card red" style={{backgroundColor: props.theme1}}>
        <p className="tip">
          <svg className="icon title-icon" aria-hidden="true">
             <use xlinkHref="#icon-jizhang"></use>
          </svg>开始记账</p>
        <p className="second-text">记录日常收支等开销信息</p>
    </div>
    <div className="card blue" style={{backgroundColor: props.theme2}}>
        <p className="tip">
          <svg className="icon title-icon" aria-hidden="true">
             <use xlinkHref="#icon-tuanduichengyuan"></use>
          </svg>编辑团队</p>
        <p className="second-text">编辑所在团队信息</p>
    </div>
    <div className="card green" style={{backgroundColor: props.theme3}}>
        <p className="tip">
          <svg className="icon title-icon" aria-hidden="true">
             <use xlinkHref="#icon-xiewenzhang"></use>
          </svg>文章中心</p>
        <p className="second-text">开始分享您的财政经验吧</p>
    </div>
</div>
  )
}
