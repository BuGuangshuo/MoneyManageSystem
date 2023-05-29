import React from 'react'

import { Button, theme } from 'antd'

import ExploreBtn from '../../../components/exploreBtn'

import './index.less'

export default function NewHomePage() {

    const {
        token: { colorPrimaryText, colorTextLabel, colorTextSecondary, colorInfoBorderHover, colorBorder, colorWhite, colorBorderSecondary, colorError, colorInfo, colorSuccess, colorPrimary },
      } = theme.useToken();
      
  return (
    <div className="newHome-wrap">
        <div className="newHome-left-wrap">
            <div className="newHome-title DingDing" style={{color: colorPrimary}}>Welcome</div>
            <div className="newHome-desc DingDing" style={{color: colorTextSecondary}}>欢迎使用财政管理系统,您可以在这里详细查看您团队或个人的财政信息、分析数据等。首先您可以创建您的团队或加入已有团队。</div>

            <div className="newHome-btn-wrap">
                <ExploreBtn name="创建团队"/>
                <ExploreBtn name="加入团队"/>
                {/* <Button type='primary'>创建团队</Button> */}
                {/* <Button type='primary'>加入团队</Button> */}
            </div>
        </div>
    </div>
  )
}
