/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-06 14:20:07
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-13 10:11:24
 * @FilePath: \MoneyManageSystem\src\pages\guidePage\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react'
 
import { theme } from 'antd'

import { createFromIconfontCN } from '@ant-design/icons';

import guideLeftImg from '../../assets/img/undraw_wishlist_re_m7tv.svg'
import guideRightImg from '../../assets/img/undraw_responsive_re_e1nn.svg'

import './index.less';

import Step1 from './step_1';
import Step2 from './step_2';
import Step3 from './step_3';
import Step4 from './step_4';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2880815_uj0g9m3dg5g.js',
});

export default function GuidePage(props: any) {

  const [step, setStep] = useState(1);
  const [barWidth, setBarWidth] = useState('25%')
  const [infoData, setInfoData] = useState({});
  
  const {
    token: { colorBorderSecondary, colorSuccess, colorText,colorTextSecondary, colorTextTertiary },
  } = theme.useToken();

  const onStepChange = (step: number) => {
    setStep(step);
  }

  const getStepContent = (step: number) => {
    switch (step) {
        case 1: return <Step1 onStepChange={onStepChange} setBarWidth={setBarWidth}/>
        case 2: return <Step2 onStepChange={onStepChange} setBarWidth={setBarWidth}/>
        case 3: return <Step3 onStepChange={onStepChange} setBarWidth={setBarWidth}/>
        case 4: return <Step4 onStepChange={onStepChange} setBarWidth={setBarWidth}/>
    }
  }

  return (
    <div className="guide-wrap">
        <div className="guide-header" style={{borderColor: colorBorderSecondary}}>
            <div className="guide-step-bar" style={{background: colorSuccess, width: barWidth }}/>
            <div className="guide-logo">
                <div><IconFont type="icon-jinqian" style={{color: colorText, fontSize: 48, position: 'relative', top: 14, right: 12}}/><span className='DingDing' style={{fontSize: 22, color: colorTextSecondary, position: 'relative', top: 6 }}>Finance</span></div>
            </div>
        </div>
        <div className="guide-content">
            {getStepContent(step)}
            <div className="left-img"><img src={guideLeftImg} style={{width: '100%'}}/></div>
            <div className='right-img'><img src={guideRightImg} style={{width: '100%'}}/></div>
        </div>
    </div>
  )
}
