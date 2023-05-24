import React, { useState, useEffect } from 'react'

import { theme, Button, Card, Table, Modal, message } from 'antd'
import { createFromIconfontCN  } from '@ant-design/icons';
import dayjs from 'dayjs'
import _ from 'lodash'

import { userListQuery, userListDelete } from '../../../utils/http'
import Loading from '../../../components/loading/index'

import styles from './index.module.less'

import { UserListParamsType } from './userListType'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_xszhvtbpy8b.js',
});

let pagination: any = {
  showTotal: (totals: any) => `共 ${totals} 条`,
  // showQuickJumper: true,
  // showSizeChanger: true,
  // pageSizeOptions: ['15', '10', '50']
};

export default function UserList() {
  const [dataSource, setDataSource] = useState<any>([])
  const [params, setParams] = useState<{page: number, size: number, sorts: any}>({
    page: 1,
    size: 5,
    sorts: [{
        direction: 'desc',
        propetryName: 'createTime'
    }]
})
  const [todayUserCount, setTodayUserCount] = useState<number>(0)
  const [total, setTotal] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [loading, setLoading] =useState<boolean>(false)
  const [delLoading, setDelLoading] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<any>({})

  const [messageApi, contextHolder] = message.useMessage();

  const delSuccess = () => {
    messageApi.open({
      type: 'success',
      content: '删除成功',
    });
  };

  const desError = () => {
    messageApi.open({
      type: 'error',
      content: '删除失败',
    });
  };

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
      sorter: true,
      render: (_: any, record: any) => <div>{dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss')}</div>
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: any) => {
        return !record.level ? null : <IconFont type='icon-shanchu' className={styles['del-icon']} onClick={() => showModal(record)}/>
      }
    },
  ]

  useEffect(() => {
    const getUserList = async () => {
      setLoading(true)
      const res = await userListQuery(params)
      pagination.total = res.data.total;
      pagination.current = params.page;
      pagination.pageSize = params.size;

      setTodayUserCount(res.data.todayUserCount)
      setDataSource(res.data.result)
      setTotal(res.data.total)
      setLoading(false)
    }
    getUserList()
  },[params])

  const onUserListChange = (lastpagination: any, filtersArg: any, sorter: any) => {
    const _params = _.cloneDeep(params);
    _params.page = lastpagination.current;
    _params.size = lastpagination.pageSize;
    if (sorter.field) {
      _params.sorts = [{ propetryName: sorter.field, direction: sorter.order === 'ascend' ? 'asc' : 'desc' }];
    }
    setParams({ ...params, page: _params.page, size: _params.size, sorts:  _params.sorts });
  };

  const showModal = (params: any) => {
    setUserInfo(params)
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setDelLoading(true)
    try {
      await userListDelete({ id: userInfo._id })
      setParams({ ...params});
      delSuccess()
    } catch {
      desError()
    }
    setDelLoading(false)
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorPrimaryText, colorTextSecondary, colorTextLabel, colorWhite },
  } = theme.useToken();

  const CardHeadStyle: any = {
    background: colorPrimaryText,
    color: colorWhite,
    textAlign: 'center'
  }

  const TableStyle = {
    border: `1px solid ${colorBorderSecondary}`,
    borderRadius: 8,
    color: colorTextSecondary
  }
  return (
    <div className={styles['userList-wrap']}>
       {/* { loading ? <Loading/> : null } */}
      <div className={styles['header-wrap']} style={{borderBottom: `1px solid ${colorBorderSecondary}`}}>
        <div className={styles['title']} style={{ color: colorTextSecondary}}>用户管理</div>
      </div>

      <div className={styles['preview-wrap']}>
        <Card title="今日注册用户数" style={{ width: 170, margin: '0 24px' }} headStyle={CardHeadStyle} className={styles['preivew-card']} size="small">
          <p>{todayUserCount}</p>
        </Card>
        <Card title="用户总数" style={{ width: 170 }} headStyle={CardHeadStyle} className={styles['preivew-card']} size="small">
          <p>{total}</p>
        </Card>
      </div>
      <div className={styles['userTable-wrap']}>
        <Table columns={column} dataSource={dataSource} rowKey="id" style={TableStyle} pagination={pagination} onChange={onUserListChange} loading={loading ? { indicator: <Loading/> } : false}/>
      </div>
      {contextHolder}
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} title='删除用户' okText="删除" okType='danger' cancelText="取消" width={445} confirmLoading={delLoading} okButtonProps={{type: 'primary'}}>
        <p style={{ color: colorText }}>此操作会清除该用户下所有信息，不可撤回，确认要删除吗？</p>
      </Modal>
    </div>
  )
}
