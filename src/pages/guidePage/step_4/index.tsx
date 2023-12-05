/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-06-07 11:56:48
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-13 10:18:33
 * @FilePath: \MoneyManageSystem\src\pages\guidePage\step_3\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState, useEffect } from 'react'

import { Button, Checkbox, Form, Input, message, theme, Select, InputNumber } from 'antd'

import { createFromIconfontCN } from '@ant-design/icons';

import { provinceData, cityData } from '../config'

import { useGuideInfoModel } from '../../../models/guide'

import { saveUserInfo } from '../../../utils/http';

import '../index.less';
import { navigate } from '@reach/router';

export default function Step4(props: any) {
    const [salary, setSalary] = useState<number>(0);

    const { guideInfo, setGuideInfo } = useGuideInfoModel();
    const { onStepChange, setBarWidth } = props;

    const { username, infoname } = JSON.parse(sessionStorage.getItem('user') || '')

    const {
        token: { colorText, colorTextSecondary, colorTextTertiary },
    } = theme.useToken();

    const onPreStep = () => {
        setBarWidth('75%')
        onStepChange(3)
    }

    const onInputNumberChange = (value: any) => {
        setGuideInfo({ ...guideInfo, step4: { salary: value} })
        setSalary(value)
    };

    const onSubmit = async () => {
        const params = {
            ...guideInfo,
            username,
            infoname
        }

        const res = await saveUserInfo({params});

        if(res.code === 200) {
            message.success('用户信息保存成功')
            navigate('/home')
        }
    }

    return (
        <div className="guide-content-wrap">
            <div className="guide-step-icon">
                <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 38 }}><use xlinkHref="#icon-shenfenleibie"></use></svg>
            </div>
            <div className="content-title" style={{ color: colorText }}>您目前的月收入是 ? </div>
            <div className="content-desc" style={{ color: colorTextTertiary, marginBottom: 36 }}>系统将根据您的收入信息来评估您的财政能力来为您提供收入信息、完成率进度等基本信息服务。</div>
            <div className="content-place-step3">
            <InputNumber
                value={salary}
                min={0}
                step={100}
                formatter={(value) => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                onChange={onInputNumberChange}
                className="salary-input"
                />
            </div>

            <div className="content-btn">
                <Button type="primary" style={{ width: '100%', height: 44 }} onClick={onSubmit}>完成</Button>
                <Button type="text" style={{ width: '100%', height: 44, marginTop: 14 }} onClick={onPreStep}>返回</Button>
            </div>

            <div className="footer" style={{ color: colorTextTertiary }}>您的个人信息是保密的,我们不会泄露您的个人信息,仅引用于个性化推荐等基础服务</div>
        </div>
    )
}
