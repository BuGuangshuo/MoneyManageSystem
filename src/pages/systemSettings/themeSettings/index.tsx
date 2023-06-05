/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-23 16:12:39
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-05 10:26:14
 * @FilePath: \MoneyManageSystem\src\pages\systemSettings\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from 'react';
import { theme, ColorPicker, Tabs, Space } from 'antd';
import type { TabsProps } from 'antd';

import { useThemeColorModel } from '../../../models/themeColor'
import { useThemeModel } from '../../../models/theme'
import { useLayoutModel } from '../../../models/layout'

import { createFromIconfontCN } from '@ant-design/icons';

import './index.less';
import { systemSettingUpdate } from '../../../utils/http';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2880815_xj4hr6djr6r.js',
  });

export default function SystemSettings() {
    const {
        token: { colorTextLabel, colorBorderSecondary, colorPrimary, colorBgContainer },
    } = theme.useToken();

    const [color, setColor] = useState<string>(colorPrimary);

    const { setThemeColor } = useThemeColorModel();
    const { setThemeType } = useThemeModel();
    const { layoutType ,setLayoutType } = useLayoutModel();

    const onThemeChange = async (value: any, hex: string) => {
        const userId = sessionStorage.getItem("userId");
        const systemResult = await systemSettingUpdate({
            userId,
            type: 'themeColor',
            value: hex
        });

        if(systemResult) {
            sessionStorage.setItem('user', JSON.stringify(systemResult.data));
            localStorage.setItem('themeColor', hex )
            setThemeColor(hex);
            setColor(hex);
        }  
    }

    const onThemeTypeChange = async (type: string) => {
        const themeType = localStorage.getItem('theme');
        setThemeType(type);
        localStorage.setItem('theme', type);
    }

    const onLayoutTypeChange = async (type: string) => {

        const userId = sessionStorage.getItem("userId");
        const systemResult = await systemSettingUpdate({
            userId,
            type: 'layout',
            value: type
        });

        if(systemResult) {
            sessionStorage.setItem('user', JSON.stringify(systemResult.data));
            localStorage.setItem('layout', type);
            setLayoutType(type);
        } 
    }   

    return (
        <div className="setting-wrap">
            {/* <div className="setting-title" style={{ color: colorTextLabel, borderColor: colorBorderSecondary }}>系统设置</div> */}
            <div className="setting-content">
                <div className="LightDark-title" style={{ color: colorTextLabel }}>系统主题色</div>
                <ColorPicker
                    value={color}
                    onChange={onThemeChange}
                    presets={[
                        {
                            label: '预设主题',
                            colors: [
                                '#536DFE',
                                '#ff6800',
                                '#1677FF',
                                '#00B96B',
                                "#ED4192"
                            ],
                        }
                    ]}
                />
                <div className="LightDark-title" style={{ color: colorTextLabel, marginTop: 24 }}>颜色模式</div>
                <div className='LightDark-switch'>
                    <div>
                        <input id="switch" type="checkbox" />
                        <div className="ThemeApp">
                            <div className="ThemeBody">
                                <div className="phone">
                                    <label htmlFor="switch">
                                        <div className="toggle" style={localStorage.getItem('theme') === 'dark' ? {transform: 'translateX(100%)', background: '#34323D'} : {transform: 'translateX(0%)', background: '#fff'}}></div>
                                        <div className="names">
                                            <p className="light" onClick={() => onThemeTypeChange('light')} style={localStorage.getItem('theme') === 'dark' ? {color: '#fff'} : {color: 'rgba(0, 0, 0, 0.65)'}}>明亮</p>
                                            <p className="dark" onClick={() => onThemeTypeChange('dark')} style={localStorage.getItem('theme') === 'dark' ? {color: '#fff'} : {color: 'rgba(0, 0, 0, 0.65)'}}>暗黑</p>
                                        </div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="LightDark-title" style={{ color: colorTextLabel }}>布局模式</div>
                <div className='layout-type-wrap'>
                    <div className="layout-icon-slider" onClick={() => onLayoutTypeChange('left')}>
                        <div className='layout-header' style={{background: '#fff'}}/>
                        <div className='layout-slider' style={{background: colorPrimary}}/>
                        <svg className="icon layout-checked-icon" aria-hidden="true" style={layoutType === 'up' ? {display: 'none'} : {display: 'block'}}><use xlinkHref="#icon-checkbox_sel"></use></svg>
                    </div>
                    <div className="layout-icon" onClick={() => onLayoutTypeChange('up')}>
                        <div className='layout-header' style={{background: colorPrimary}}/>
                        <svg className="icon layout-checked-icon" aria-hidden="true" style={layoutType === 'left' ? {display: 'none'} : {display: 'block'}}><use xlinkHref="#icon-checkbox_sel"></use></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}
