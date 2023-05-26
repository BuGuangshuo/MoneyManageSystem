/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:31:52
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-26 18:39:00
 * @FilePath: \MoneyManageSystem\src\pages\userCenter\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { theme, Menu, Tabs, Space } from 'antd';

import { createFromIconfontCN } from '@ant-design/icons';

import './index.less';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2880815_xj4hr6djr6r.js',
  });

export default function UserCenter() {

  const locTheme = localStorage.getItem('theme');

  const items = [
    {
      label: '个人信息',
      key: 'userInfo',
    },
    {
      label: '团队信息',
      key: 'teamInfo',
    },
  ]

  useEffect(() => {
    console.log(locTheme)
  },[locTheme]);

  const {
    token: { colorTextLabel, colorPrimary, colorBorderSecondary },
} = theme.useToken();

  return (
    <div className='usercenter-wrap'>
       <div className="usercenter-content" style={locTheme === 'light' ? { boxShadow: '0px 2px 18px rgba(0, 0, 0, 0.15)'} : { boxShadow: 'rgba(0, 0, 0, 0.4) 10px 20px 30px, rgba(0, 0, 0, 0.3) 10px 1px 53px 3px, rgba(1, 0, 0, 0.2) 0px -1px 3px inset'}}>
        <div className="setting-title" style={{ color: colorTextLabel, borderColor: colorBorderSecondary}}>个人中心</div>

        <div className="setting-wrap">
          <div className="setting-menu">
            <Menu items={items} defaultSelectedKeys={['userInfo']}/>
          </div>
          <div className='setting-info'>right</div>
        </div>
       </div>
    </div>
  )
}
