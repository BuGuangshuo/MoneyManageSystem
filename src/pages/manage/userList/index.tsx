import React, { useState, useEffect } from 'react'

import { theme, Button, Card, Table } from 'antd'
import dayjs from 'dayjs'
import _ from 'lodash'

import { userListQuery } from '../../../utils/http'

import styles from './index.module.less'

import { UserListParamsType } from './userListType'

let pagination: any = {
  showTotal: (totals: any) => `共 ${totals} 条`,
  // showQuickJumper: true,
  // showSizeChanger: true,
  // pageSizeOptions: ['15', '10', '50']
};

export default function UserList() {
  const [dataSource, setDataSource] = useState([])
  const [params, setParams] = useState({
    page: 1,
    size: 5,
    sorts: [{
        direction: 'desc',
        propetryName: 'createTime'
    }]
})
  const [todayUserCount, setTodayUserCount] = useState(0)
  const [total, setTotal] = useState(0)

  const column = [
    {
      title: '用户ID',
      dataIndex: '_id',
      key: '_id'
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username'
    },
    {
      title: '昵称',
      dataIndex: 'infoname',
      key: 'infoname'
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
    const getUserList = async () => {
      const res = await userListQuery(params)
      pagination.total = res.data.total;
      pagination.current = params.page;
      pagination.pageSize = params.size;
      setDataSource(res.data.result)
      setTotal(res.data.total)
    }

    getUserList()
  },[params])

  const onUserListChange = (lastpagination: any, filtersArg: any, sorter: any) => {
    const _params = _.cloneDeep(params);
    _params.page = lastpagination.current;
    _params.size = lastpagination.pageSize;
    // if (sorter.field) {
    //   param.sorts = [{ propertyName: sorter.field, direction: sorter.order === 'ascend' ? 'asc' : 'desc' }];
    // }
    setParams({ ...params, page: _params.page, size: _params.size });
  };

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
        <Table columns={column} dataSource={dataSource} rowKey="id" style={TableStyle} pagination={pagination} onChange={onUserListChange}/>
      </div>
    </div>
  )
}
