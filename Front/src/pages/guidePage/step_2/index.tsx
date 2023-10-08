import React, { useState, useEffect } from 'react'

import { Button, Checkbox, Form, Input, message, theme, Select, Space } from 'antd'

import { createFromIconfontCN } from '@ant-design/icons';

import { provinceData, cityData } from '../config'

import { useGuideInfoModel } from '../../../models/guide'

import '../index.less';

export default function Step2(props: any) {
    const [status, setStatus] = useState<string>();

    const { guideInfo, setGuideInfo } = useGuideInfoModel();
    const { onStepChange, setBarWidth } = props;

    const {
        token: { colorBorderSecondary, colorPrimary, colorText, colorTextSecondary, colorTextTertiary },
    } = theme.useToken();

    const onPreStep = () => {
        setBarWidth('25%')
        onStepChange(1)
    }

    const onNextStep = (step: number) => {
        setBarWidth('75%')
        setGuideInfo({ ...guideInfo, step2: { status } })
        onStepChange(step)
    }

    return (
        <div className="guide-content-wrap">
            <div className="guide-step-icon">
                <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 38 }}><use xlinkHref="#icon-shenfenleibie"></use></svg>
            </div>
            <div className="content-title" style={{ color: colorText }}>您是学生 OR 职场人 ? </div>
            <div className="content-desc" style={{ color: colorTextTertiary, marginBottom: 14 }}>系统将根据您的身份信息向您提供行业建议、专业分析、就业形势等基础信息服务。</div>
            <div className="content-place-step2">
                <div className='student' style={status === 'student' ? { borderColor: colorPrimary } : {borderColor: colorBorderSecondary}} onClick={() => setStatus('student')}><div className='item-icon'><svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 28 }}><use xlinkHref="#icon-xuesheng"></use></svg></div><div className='item-title' style={{ color: colorText }}>学生党</div></div>
                <div className='work' style={status === 'work' ? { borderColor: colorPrimary } : {borderColor: colorBorderSecondary}} onClick={() => setStatus('work')}><div className='item-icon'><svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 38 }}><use xlinkHref="#icon-gongwenbao"></use></svg></div><div className='item-title' style={{ color: colorText }}>打工人</div></div>
            </div>

            <div className="content-btn">
                <Button type="primary" style={{ width: '100%', height: 44 }} onClick={() => onNextStep(3)} disabled={status ? false: true}>下一步</Button>
                <Button type="text" style={{ width: '100%', height: 44, marginTop: 14 }} onClick={onPreStep}>返回</Button>
            </div>

            <div className="footer" style={{ color: colorTextTertiary }}>您的个人信息是保密的,我们不会泄露您的个人信息,仅引用于个性化推荐等基础服务</div>
        </div>
    )
}
