import React, { useState, useRef, useEffect } from 'react'

import { Button, theme, Tour } from 'antd'

import type { TourProps } from 'antd';

import ExploreBtn from '../../../components/exploreBtn'

import Img from '../../../assets/img/undraw_experience_design_re_dmqq.svg'
import NewWelcomeSvg from '../../../components/themeSvg/newWelcome'

import './index.less'

export default function NewHomePage() {

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const {
        token: { colorTextSecondary, colorPrimary },
      } = theme.useToken();

  return (
    <div className="newHome-wrap">
        <div className="newHome-left-wrap">
            <div className="newHome-title DingDing" style={{color: colorPrimary}}>Welcome</div>
            <div className="newHome-desc DingDing" style={{color: colorTextSecondary}}>欢迎使用财政管理系统,您可以在这里详细查看您团队或个人的财政信息、分析数据等。首先您可以创建您的团队或加入已有团队。</div>

            <div className="newHome-btn-wrap">
                <div ref={ref1}><ExploreBtn name="创建团队"/></div>
                <div ref={ref2}><ExploreBtn name="加入团队"/></div>
            </div>
        </div>

        <div className='newHome-right'>
            <div>
                <NewWelcomeSvg theme={colorPrimary}/>
            </div>
        </div>
    </div>
  )
}
