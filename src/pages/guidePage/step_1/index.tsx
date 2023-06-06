import React, { useState, useEffect } from 'react'
 
import { Button, Checkbox, Form, Input, message, theme, Select, Space } from 'antd'

import { createFromIconfontCN } from '@ant-design/icons';

import { provinceData, cityData } from '../config'

import { useGuideInfoModel } from '../../../models/guide'

import '../index.less';

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2880815_uj0g9m3dg5g.js',
});

type CityName = keyof typeof cityData;

export default function Step1(props: any) {

  const [cities, setCities] = useState(cityData[provinceData[0] as CityName]);
  const [privinceData, setPrivinceData] = useState(provinceData[0])
  const [secondCity, setSecondCity] = useState(cityData[provinceData[0] as CityName][0]);
  
  const { onStepChange } = props;
  const { guideInfo, setGuideInfo } = useGuideInfoModel();
  
  const {
    token: { colorBorderSecondary, colorSuccess, colorText,colorTextSecondary, colorTextTertiary },
  } = theme.useToken();

  useEffect(() => {
    const init = () => {
        if(guideInfo) {
            setPrivinceData(guideInfo.step1.privinceData);
            setSecondCity(guideInfo.step1.secondCity);
            setCities(cityData[guideInfo.step1.privinceData]);
        }
    }
    init();
  },[guideInfo]);

  const handleProvinceChange = (value: CityName) => {
    setPrivinceData(value)
    setCities(cityData[value]);
    setSecondCity(cityData[value][0]);
  };

  const onSecondCityChange = (value: CityName) => {
    setSecondCity(value);
  };

  const onNextStep = (step: number) => {
    setGuideInfo({...guideInfo, step1: { privinceData, secondCity }})
    onStepChange(step + 1)
  }

  return (
    <div className="guide-content-wrap">
                <div className="guide-step-icon">
                    <svg className="icon" aria-hidden="true" style={{color: colorTextSecondary}}><use xlinkHref="#icon-chengshi"></use></svg>
                </div>
                <div className="content-title" style={{color: colorText}}>您目前的所在地区是 ? </div>
                <div className="content-desc" style={{color: colorTextTertiary}}>系统可根据您提供的详细地理位置信息来提供当前地区的新闻资讯、同城好友等辅助信息。</div>
                <div className="content-place">
                    <Space wrap size='large'>
                        <Select
                            placeholder='请选择'
                            value={privinceData}
                            style={{ width: 145 }}
                            onChange={handleProvinceChange}
                            options={provinceData.map((province: string) => ({ label: province, value: province }))}
                        />
                        <Select
                            style={{ width: 145 }}
                            placeholder="请选择"
                            value={secondCity}
                            onChange={onSecondCityChange}
                            options={cities.map((city: string) => ({ label: city, value: city }))}
                        />
                    </Space>
                </div>

                <div className="content-btn">
                    <Button type="primary" style={{width: '100%', height: 44}} onClick={() => onNextStep(1)}>下一步</Button>
                </div>

                <div className="footer" style={{color: colorTextTertiary}}>您的个人信息是保密的,我们不会泄露您的个人信息,仅引用于个性化推荐等基础服务</div>
            </div>
  )
}
