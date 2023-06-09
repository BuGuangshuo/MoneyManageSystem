import React, { useState, useEffect } from 'react'

import { theme, Button, Card, Table, Modal, message } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import dayjs from 'dayjs'
import _ from 'lodash'

import { } from '../../../utils/http'
import Loading from '../../../components/loading/index'

import './index.less'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_xszhvtbpy8b.js',
});

export default function ApproveManage() {

  return (
    <div className='approve-wrap'>
       approve-wrap
    </div>
  )
}
