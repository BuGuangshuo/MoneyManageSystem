import React from 'react'


import { Card, Col, Row, Progress } from 'antd'

import {
  CaretUpOutlined,
  CaretDownOutlined
} from '@ant-design/icons';

import styles from '../../index.module.less'

export default function TotalCard() {
  return (
    <Row gutter={16}>
          <Col span={6}>
            <Card>
              <div className={styles['card-content']}>
                <div className={styles['card-content-top']}>
                  <div className={styles['card-content-top-metaWrap']}>
                    <div className={styles['card-content-top-meta']}><span>总资产</span></div>
                    <div className={styles['card-content-top-total']}><span>¥ 126,560</span></div>
                  </div>
                </div>
                <div className={styles['card-content-center']}>
                  <div className={styles['card-content-center-contentFixed']}>
                    <div className={styles['card-content-center-trendItem']}>
                      <span>月同比<span className={styles['card-content-center-trendItem-percent']}>12%</span><span className={styles['card-content-center-trendItem-up']}><CaretUpOutlined /></span></span>
                    </div>
                  </div>
                </div>
                <div className={styles['card-content-bottom']}>
                  <div className={styles['card-content-bottom-field']}>
                    <span className={styles['card-content-bottom-field-label']}>最高资产值</span>
                    <span className={styles['card-content-bottom-field-number']}>￥12,423</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={styles['card-content']}>
                <div className={styles['card-content-top']}>
                  <div className={styles['card-content-top-metaWrap']}>
                    <div className={styles['card-content-top-meta']}><span>家庭总年收入</span></div>
                    <div className={styles['card-content-top-total']}><span>¥ 300,000</span></div>
                  </div>
                </div>
                <div className={styles['card-content-center']}>
                  <div className={styles['card-content-center-contentFixed']}>
                    <div className={styles['card-content-center-trendItem']}>
                      <span>年同比<span className={styles['card-content-center-trendItem-percent']}>20%</span><span className={styles['card-content-center-trendItem-down']}><CaretDownOutlined /></span></span>
                    </div>
                  </div>
                </div>
                <div className={styles['card-content-bottom']}>
                  <div className={styles['card-content-bottom-field']}>
                    <span className={styles['card-content-bottom-field-label']}>最高年收入</span>
                    <span className={styles['card-content-bottom-field-number']}>￥420,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={styles['card-content']}>
                <div className={styles['card-content-top']}>
                  <div className={styles['card-content-top-metaWrap']}>
                    <div className={styles['card-content-top-meta']}><span>家庭年总支出</span></div>
                    <div className={styles['card-content-top-total']}><span>¥ 210,500</span></div>
                  </div>
                </div>
                <div className={styles['card-content-center']}>
                  <div className={styles['card-content-center-contentFixed']}>
                    <div className={styles['card-content-center-trendItem']}>
                      <span>年同比<span className={styles['card-content-center-trendItem-percent']}>18%</span><span className={styles['card-content-center-trendItem-up']}><CaretUpOutlined /></span></span>
                    </div>
                  </div>
                </div>
                <div className={styles['card-content-bottom']}>
                  <div className={styles['card-content-bottom-field']}>
                    <span className={styles['card-content-bottom-field-label']}>最高年支出</span>
                    <span className={styles['card-content-bottom-field-number']}>￥120,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
          <Col span={6}>
          <Card>
              <div className={styles['card-content']}>
                <div className={styles['card-content-top']}>
                  <div className={styles['card-content-top-metaWrap']}>
                    <div className={styles['card-content-top-meta']}><span>目标完成度</span></div>
                    <div className={styles['card-content-top-total']}><span>78%</span></div>
                  </div>
                </div>
                <div className={styles['card-content-center']}>
                  <div className={styles['card-content-center-contentFixed']}>
                  <Progress percent={78} showInfo={false}/>
                  </div>
                </div>
                <div className={styles['card-content-bottom']}>
                  <div className={styles['card-content-bottom-field']}>
                    <span className={styles['card-content-bottom-field-label']}>最高年支出</span>
                    <span className={styles['card-content-bottom-field-number']}>￥120,000</span>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
  )
}
