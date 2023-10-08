import { Chart } from '@antv/g2';
import { Card, Col } from 'antd'
import React, { useEffect } from 'react'

const data = [
  { item: '租房', count: 43200, percent: 0.3 },
  { item: '吃饭', count: 43200, percent: 0.3 },
  { item: '购物', count: 28800, percent: 0.2 },
  { item: '娱乐', count: 28800, percent: 0.2 },
];

export default function ExpendRadio() {

  useEffect(() => {
    const chart = new Chart({
      container: 'expend',
      autoFit: true,
      height: 300,
    });
    chart.data(data);
    chart.scale('percent', {
      formatter: (val) => {
        val = val * 100 + '%';
        return val;
      },
    });
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.6,
    });
    chart.tooltip({
      showTitle: false,
      showMarkers: false,
      itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
    });
    // 辅助文本
    chart
      .annotation()
      .text({
        position: ['50%', '50%'],
        content: '总支出',
        style: {
          fontSize: 14,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetY: -20,
      })
      .text({
        position: ['50%', '50%'],
        content: '144,000',
        style: {
          fontSize: 20,
          fill: '#8c8c8c',
          textAlign: 'center',
        },
        offsetX: 0,
        offsetY: 20,
      })
    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('item')
      .label('percent', (percent) => {
        return {
          content: (data) => {
            return `${data.item}: ${percent * 100}%`;
          },
        };
      })
      .tooltip('item*percent', (item, percent) => {
        percent = percent * 100 + '%';
        return {
          name: item,
          value: percent,
        };
      });

    chart.interaction('element-active');

    chart.render();
  }, [])
  return (
    <Col span={12}>
      <Card title="全年总支出分布">
        <div>
          <div id="expend"/>
        </div>
      </Card>
    </Col>

  )
}
