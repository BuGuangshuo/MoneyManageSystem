import React, { useState, useEffect } from 'react'

import { theme, Button, Segmented, Table, Modal, message, Input, Select, Popover, Space, Avatar, Tooltip } from 'antd'
import { createFromIconfontCN, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import _ from 'lodash'

import { getProcess } from '../../../utils/http'
import { initParams } from './config'
import Loading from '../../../components/loading'

import './index.less'

const { Option } = Select;

let pagination: any = {
    showTotal: (totals: any) => `共 ${totals} 条`
};

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_xszhvtbpy8b.js',
});

export default function ApproveManage() {
  const [segmentValue, setSementValue] = useState<string | number>('RUNNING');
  const [dataSource, setDataSource] = useState<any>([]);
  const [params, setParams] = useState(initParams);
  const [total, setTotal] = useState<any>(0)
  const [loading, setLoading] = useState<boolean>(false);

  const {
    token: { colorBgContainer, colorBorderSecondary, colorText, colorPrimaryText, colorTextSecondary, colorTextLabel, colorWhite, colorSuccess },
  } = theme.useToken();

  const TableStyle = {
    margin: 24,
    border: `1px solid ${colorBorderSecondary}`,
    borderRadius: 8,
    color: colorTextSecondary
  }

  const column = [
    {
        title: '用户名',
        dataIndex: 'userName',
        key: 'userName',
        width: 180
    },
    {
        title: '昵称',
        dataIndex: 'infoName',
        key: 'infoName',
        width: 200,
        render: (text: string) => <div className="table-infoName-wrap"><Avatar src=""/><div className="ava-title"><Tooltip title={text} placement="topLeft">{text}</Tooltip></div></div>
    },
    {
        title: '身份',
        dataIndex: 'status',
        key: 'status',
        width: 80,
        render: (text: string) => <div>{text === 'work' ? '职场人' : '学生'}</div>
    },
    {
        title: '职业/专业',
        dataIndex: 'carceer',
        key: 'carceer',
        width: 150
    },
    {
        title: '薪水(月)',
        dataIndex: 'salary',
        key: 'salary',
        width: 150
    },
    {
        title: '申请时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (text: number) => <div>{ dayjs(text).format('YYYY-MM-DD HH:mm:ss')}</div>,
        width: 200
    },
    {
        title: '通过时间',
        dataIndex: 'submitTime',
        key: 'submitTime',
        width: 200,
        render: (text: string) => <div>{text || '-'}</div>
    },
    {
        title: '操作',
        key: 'action',
        render: (_: any, record: any) => (
          <Space size="middle">
            <Button type='primary'>通过</Button>
            <Button danger type='primary'>驳回</Button>
          </Space>
        ),
        width: 200
      }
  ]

  useEffect(() => {
    const getApproveDataSource = async () => {
        setLoading(true);
        const res = await getProcess(params);
        pagination.total = res.data.total;
        pagination.current = params.page;
        pagination.pageSize = params.size;

        setDataSource(res.data.result)
        setTotal(res.data.total)
        setLoading(false)
    }

    getApproveDataSource();
  },[params]);

  const onSementChange = (val: string | number) => {
    let _params = _.cloneDeep(params);
    _params.search.forEach((item: any, index: number) => {
        if(item.propetryName === 'approveStatus') {
            item.value = val
        }
    })

    setParams(_params);
    setSementValue(val)
  }

  const onUserListChange = (lastpagination: any, filtersArg: any, sorter: any) => {
    const _params = _.cloneDeep(params);
    _params.page = lastpagination.current;
    _params.size = lastpagination.pageSize;
    if (sorter.field) {
      _params.sorts = [{ propetryName: sorter.field, direction: sorter.order === 'ascend' ? 'asc' : 'desc' }];
    }
    setParams({ ...params, page: _params.page, size: _params.size, sorts:  _params.sorts });
  };

  const content = () => {
    return (
        <div>content</div>
    )
  }

  return (
    <div className='approve-wrap'>
       <div className='header-wrap' style={{borderBottom: `1px solid ${colorBorderSecondary}`}}>
        <div className='title' style={{ color: colorTextSecondary}}>用户管理</div>
      </div>

       <div className='catgrory-wrap'>
            <Segmented options={[
                { label: '待处理', value: 'RUNNING' },
                { label: '已处理', value: 'FINISH'},
                { label: '我收到的', value: 'ALL' }
            ]} 
            // size="large"
            value={segmentValue} 
            onChange={onSementChange} />
       </div>

       <div className='filter-wrap'>
            <div className='search-wrap'><Input placeholder="搜索" suffix={<SearchOutlined />}/><Button type="primary">搜索</Button></div>
            <div className='filter-bar'>
                {
                    segmentValue === 'RUNNING' ? null :
                        <div>
                            <Select placeholder='审批状态' style={{width: 100}}>
                                <Option value="FINISH">已通过</Option>
                                <Option value="REJECT">已驳回</Option>
                                <Option value="ALL">全部</Option>
                            </Select>
                        </div> 
                }
                
                <div>
                    <Popover placement="bottomRight" title='高级筛选' content={content} trigger="click">
                        <Button icon={<UnorderedListOutlined />}>高级筛选</Button>
                    </Popover>
                </div>
            </div>
       </div>

       <div className="process-table-wrap">
            <Table
                columns={column}
                dataSource={dataSource}
                rowKey="userName" 
                style={TableStyle} 
                pagination={pagination} 
                onChange={onUserListChange} 
                loading={loading ? { indicator: <Loading/> } : false}
            />
       </div>
    </div>
  )
}
