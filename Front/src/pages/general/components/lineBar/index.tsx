import { Chart } from '@antv/g2';
import { Card, Col, Row } from 'antd'
import React, { useEffect } from 'react'

const data = [
  { year: '2016', type: '收入', money: 24000 },
  { year: '2017', type: '收入', money: 24000 },
  { year: '2018', type: '收入', money: 24000 },
  { year: '2019', type: '收入', money: 24000 },
  { year: '2020', type: '收入', money: 54000 },
  { year: '2021', type: '收入', money: 288000 },
  { year: '2016', type: '支出', money: 18200 },
  { year: '2017', type: '支出', money: 13600 },
  { year: '2018', type: '支出', money: 14600 },
  { year: '2019', type: '支出', money: 12600 },
  { year: '2020', type: '支出', money: 51200 },
  { year: '2021', type: '支出', money: 144000 },
];

export default function LineBar() {
  useEffect(() => {
    const chart = new Chart({
      container: 'lineBar',
      autoFit: true,
      height: 300,
    });
    
    chart.data(data);
    chart.scale({
      year: {
        range: [0, 1],
      },
      money: {
        nice: true,
      },
    });
    
    chart.tooltip({
      showCrosshairs: true,
      shared: true,
    });
    
    chart.axis('money', {
      label: {
        formatter: (val) => {
          return '￥'+ val;
        },
      },
    });
    
    chart
      .line()
      .position('year*money')
      .color('type')
      .shape('smooth');
    
    chart
      .point()
      .position('year*money')
      .color('type')
      .shape('circle');
    
    chart.render();
  },[])
  return (
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="c-mt-24">
      <Col span={24}>
        <Card title="年收入/支出趋势">
          <div>
            <div id="lineBar"></div>
          </div>
        </Card>
      </Col>
    </Row>
  )
}
