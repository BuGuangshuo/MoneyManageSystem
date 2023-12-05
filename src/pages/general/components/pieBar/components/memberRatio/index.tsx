import { Chart } from '@antv/g2';
import { Card, Col } from 'antd'
import React, { useEffect } from 'react'

const data = [
  { item: '卜子', count: 180000, percent: 0.62 },
  { item: '莹子', count: 108000, percent: 0.38 },
];

export default function MemberRadio() {

  useEffect(() => {
    const chart = new Chart({
      container: 'member',
      autoFit: true,
      height: 300,
    });

    chart.coordinate('theta', {
      radius: 0.75,
    });

    chart.data(data);

    chart.scale('percent', {
      formatter: (val:any) => {
        val = val * 100 + '%';
        return val;
      },
    });

    chart.tooltip({
      showTitle: false,
      showMarkers: false,
    });

    chart
      .interval()
      .position('percent')
      .color('item')
      .label('percent', {
        content: (data:any) => {
          return `${data.item}: ${data.percent * 100}%`;
        },
      })
      .adjust('stack');

    chart.interaction('element-active');

    chart.render();
  },[])
  
  return (
    <Col span={12}>
      <Card title="家庭成员收入占比">
        <div>
        <div id="member"/>
        </div>
      </Card>
    </Col>
  )
}
