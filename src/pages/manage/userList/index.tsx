import React, { useState, useEffect } from 'react'

import { theme, Button, Card, Table } from 'antd'
import dayjs from 'dayjs'

import styles from './index.module.less'

import { UserListParamsType } from './userListType'

const mockData: any = [
  {
    id: 1,
    userName: 'buguangshuo',
    infoName: '卜卜星',
    level: 0,
    createTime: 1672889973980
  },
  {
    id: 2,
    userName: 'lixuexing',
    infoName: '莹莹星',
    level: 1,
    createTime: 1672889973980
  }
]
export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [params, setParams] = useState({
    page: 0,
    size: 10,
    sorts: [{
        direction: 'desc',
        propetryName: 'updateTime'
    }]
})
  const [todayUserCount, setTodayUserCount] = useState(0)
  const [total, setTotal] = useState(0)

  const column = [
    {
      title: '用户ID',
      dataIndex: 'id',
      key: 'id'
    },
    {
      title: '账号',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '昵称',
      dataIndex: 'infoName',
      key: 'infoName'
    },
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (_: any, render: any) => <div>{render.level ? '普通用户' : '系统管理员'}</div>
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_: any, record: any) => <div>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button danger type="primary">删除</Button>
      ),
    },
  ]
  useEffect(() => {
    setDataSource(mockData)
    setTotal(100)
  },[params])

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorPrimaryText, colorBgElevated, colorTextLabel, colorWhite },
  } = theme.useToken();

  const CardHeadStyle: any = {
    background: colorPrimaryText,
    color: colorWhite,
    textAlign: 'center'
  }

  const TableStyle = {
    border: `1px solid ${colorBorderSecondary}`,
    borderRadius: 8
  }
  return (
    <div className={styles['userList-wrap']}>
      <div className={styles['header-wrap']}>
        <div className={styles['title']} style={{ color: colorTextLabel }}>用户管理</div>
      </div>

      <div className={styles['preview-wrap']}>
        <Card title="今日注册用户数" style={{ width: 170, margin: '0 24px' }} headStyle={CardHeadStyle} className={styles['preivew-card']} size="small">
          <p>89</p>
        </Card>
        <Card title="用户总数" style={{ width: 170 }} headStyle={CardHeadStyle} className={styles['preivew-card']} size="small">
          <p>{total}</p>
        </Card>
      </div>

      <div className={styles['userTable-wrap']}>
        <Table columns={column} dataSource={dataSource} rowKey="id" style={TableStyle}/>
      </div>
    </div>
  )
}
