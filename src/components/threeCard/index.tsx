/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-12 18:35:37
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-12 18:36:56
 * @FilePath: \MoneyManageSystem\src\components\threeCard\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react'

import './index.css'

export default function ThreeCard(props: { theme: string }) {
  return (
    <div className="cards">
    <div className="card red">
        <p className="tip">Hover Me</p>
        <p className="second-text">Lorem Ipsum</p>
    </div>
    <div className="card blue">
        <p className="tip">Hover Me</p>
        <p className="second-text">Lorem Ipsum</p>
    </div>
    <div className="card green">
        <p className="tip">Hover Me</p>
        <p className="second-text">Lorem Ipsum</p>
    </div>
</div>
  )
}
