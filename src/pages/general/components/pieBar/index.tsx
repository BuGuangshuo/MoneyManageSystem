import { Row } from 'antd'
import React from 'react'

import ExpandRadio from './components/expendRadio'
import MemberRadio from './components/memberRatio'

export default function PieBar() {
  return (
    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} className="c-mt-24">
        <MemberRadio/>
        <ExpandRadio/>
    </Row>
  )
}
