import React, { useEffect } from 'react'

import { Chart } from '@antv/g2';
import { Card, Col, Row, Tabs } from 'antd';

import styles from '../../index.module.less'

const { TabPane } = Tabs

const data = [
  { name: '年收入', 年份: '2016', 金额: 24000 },
  { name: '年收入', 年份: '2017', 金额: 24000 },
  { name: '年收入', 年份: '2018', 金额: 24000 },
  { name: '年收入', 年份: '2019', 金额: 24000 },
  { name: '年收入', 年份: '2020', 金额: 54000 },
  { name: '年收入', 年份: '2021', 金额: 288000 },
  { name: '年支出', 年份: '2016', 金额: 18200 },
  { name: '年支出', 年份: '2017', 金额: 13600 },
  { name: '年支出', 年份: '2018', 金额: 14600 },
  { name: '年支出', 年份: '2019', 金额: 12600 },
  { name: '年支出', 年份: '2020', 金额: 51200 },
  { name: '年支出', 年份: '2021', 金额: 144000},
];

export default function Histogram() {
  useEffect(() => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 300,
    });

    chart.data(data);
    chart.scale('金额', {
      nice: true,
    });
    chart.tooltip({
      showMarkers: false,
      shared: true,
    });

    chart
      .interval()
      .position('年份*金额')
      .color('name')
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ]);

    chart.interaction('element-highlight-by-x');

    chart.render();
  }, [])
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="c-mt-24">
      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="年收入/支出概览" key="1">
              <div className={styles['card-content']}>
                <div id="container" />
              </div>
            </TabPane>
          </Tabs>

        </Card>
      </Col>
    </Row>
  )
}
