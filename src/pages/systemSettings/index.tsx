/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-05-23 16:12:39
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-24 18:27:27
 * @FilePath: \MoneyManageSystem\src\pages\systemSettings\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { theme, ColorPicker, Radio, Space } from 'antd';

import { useThemeColorModel } from '../../models/themeColor'
import { useThemeModel } from '../../models/theme'
import { useLayoutModel } from '../../models/layout'

import './index.less';

export default function SystemSettings() {
    const {
        token: { colorTextLabel, colorBorderSecondary, colorPrimary },
    } = theme.useToken();

    const [color, setColor] = useState<string>(colorPrimary);
    const [layoutVal, setLayoutVal] = useState<string>('up');

    const { setThemeColor } = useThemeColorModel();
    const { setThemeType } = useThemeModel();
    const { setLayoutType } = useLayoutModel();

    const onThemeChange = (value: any, hex: string) => {
        setThemeColor(hex);
        setColor(hex);
    }

    const onThemeTypeChange = (type: string) => {
        const themeType = localStorage.getItem('theme');
        setThemeType(type);
        localStorage.setItem('theme', type)
    }

    const onLayoutTypeChange = (type: string) => {
        setLayoutType(type)
        setLayoutVal(type)
    }   

    return (
        <div className="setting-wrap">
            <div className="setting-title" style={{ color: colorTextLabel, borderColor: colorBorderSecondary }}>系统设置</div>

            <div className="setting-content">
                <div className="LightDark-title" style={{ color: colorTextLabel }}>系统主题色</div>
                <ColorPicker
                    value={color}
                    onChange={onThemeChange}
                    presets={[
                        {
                            label: '预设颜色',
                            colors: [
                                '#536DFE',
                                '#ff6800',
                                '#1677FF',
                                '#07CE8A'
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
                <div>
                    <Radio onClick={() => onLayoutTypeChange('left')}>侧边菜单布局</Radio>
                    <Radio onClick={() => onLayoutTypeChange('up')}>顶部菜单布局</Radio>
                </div>
            </div>
        </div>
    )
}
