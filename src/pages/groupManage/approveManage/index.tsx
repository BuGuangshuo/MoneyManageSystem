import React, { useState, useEffect } from 'react'

import { theme, Button, Segmented, Table, Modal, message, Input, Select, Popover, Space, Avatar, Tooltip, Tag, Descriptions, Spin } from 'antd'
import { createFromIconfontCN, SearchOutlined, UnorderedListOutlined } from '@ant-design/icons';
import dayjs from 'dayjs'
import _ from 'lodash'

import { approveSend, getProcess } from '../../../utils/http'
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

const userInfo = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user') || '') : null;

export default function ApproveManage() {
  const [segmentValue, setSementValue] = useState<string | number>('RUNNING');
  const [dataSource, setDataSource] = useState<any>([]);
  const [params, setParams] = useState(initParams);
  const [total, setTotal] = useState<any>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [tableItem, setTableItem] = useState<any>({});
  const [rejectVal, setRejectVal] = useState<string>('');

  const {
    token: { colorError, colorBorderSecondary, colorText, colorPrimaryText, colorTextSecondary, colorTextLabel, colorWhite, colorSuccess },
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
        dataIndex: 'career',
        key: 'career',
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
        dataIndex: 'approveTime',
        key: 'approveTime',
        width: 200,
        render: (text: string) => <div>{ text ? dayjs(text).format('YYYY-MM-DD HH:mm:ss') : '-'}</div>
    },
    {
        title: '操作',
        key: 'action',
        render: (_: any, record: any) => {
          if(segmentValue === 'RUNNING') {
            return (
                <Space size="middle">
                  <Tooltip title="通过">
                    <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 24, cursor: "pointer"}} onClick={() => onSubmit(record.userName, 'FINISH')}><use xlinkHref="#icon-shenhetongguo"></use></svg>
                  </Tooltip>
                  <Tooltip title="驳回">
                    <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 24, cursor: "pointer"}} onClick={() => onRejectModalOpen(record)}><use xlinkHref="#icon-shenhebutongguo"></use></svg>
                  </Tooltip>
                </Space>
              )
        } else if(segmentValue === 'DONE') {
            return (
                <Space size="middle">
                  {record.approveStatus === 'FINISH' ? <Tag color={colorSuccess}>已通过</Tag> : <Tag color={colorError}>已驳回</Tag>}
                </Space>
              )
        } else {
            {
                if(record.approveStatus === 'RUNNING') {
                    return (
                        <Space size="middle">
                           <Tooltip title="通过">
                            <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 24, cursor: "pointer"}} onClick={() => onSubmit(record.userName, 'FINISH')}><use xlinkHref="#icon-shenhetongguo"></use></svg>
                          </Tooltip>
                          <Tooltip title="驳回">
                            <svg className="icon" aria-hidden="true" style={{ color: colorTextSecondary, fontSize: 24, cursor: "pointer"}} onClick={() => onRejectModalOpen(record)}><use xlinkHref="#icon-shenhebutongguo"></use></svg>
                          </Tooltip>
                      </Space>
                      )
                } else {
                    return (
                        <Space size="middle">
                          {record.approveStatus === 'FINISH' ? <Tag color={colorSuccess}>已通过</Tag> : <Tag color={colorError}>已驳回</Tag>}
                        </Space>
                      )
                }
            }
        }
            
        },
        width: 200
      }
  ]

  useEffect(() => {
    const getApproveDataSource = async () => {
        setDataSource([])
        setLoading(true);
        const res = await getProcess(params);
        pagination.total = res.data.total;
        pagination.current = params.page;
        pagination.pageSize = params.size;

        setLoading(false)
        setDataSource(res.data.result)
        setTotal(res.data.total)
    }

    getApproveDataSource();
  },[params]);

    const onSementChange = (val: string | number) => {
        let _params = _.cloneDeep(params);
        if(val === 'RUNNING') {
            _params.search = initParams.search
        } else if(val === 'DONE') {
            _params.search = [
                { propetryName: 'approveName', operator: 'EQ', value: JSON.parse(sessionStorage.getItem('user') || '').username },
                { propetryName: 'approveStatus', operator: 'IN', value: ['FINISH','REJECT'] }
            ]
        } else {
            _params.search = [
                { propetryName: 'approveName', operator: 'EQ', value: JSON.parse(sessionStorage.getItem('user') || '').username }
            ]
        }
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

  const onRejectModalOpen = (record: any) => {
    onRejectModalSubmit(record)
  }

  const onRejectModalSubmit = (record: any) => {
    setRejectOpen(true);
    setTableItem(record)
  }

  const onRejectInputChange = (e: any) => {
    setRejectVal(e.target.value)
  }

  const onSubmit = async (userName: string, approveStatus: string, rejectText?: string) => {
    setLoading(true)
    const res = await approveSend({ approveUser: userInfo.username, approveStatus, userName, rejectText });
    if(res && res.code === 200) {
        setParams({...params})
        message.success('操作成功')
    }
    setLoading(false);
    setRejectOpen(false);
  }

  const content = () => {
    return (
        <div>content</div>
    )
  }

  return (
    <div className='approve-wrap'>
       <div className='header-wrap' style={{borderBottom: `1px solid ${colorBorderSecondary}`}}>
        <div className='title' style={{ color: colorTextSecondary}}>团队审批</div>
      </div>

       <div className='catgrory-wrap'>
            <Segmented options={[
                { label: '待处理', value: 'RUNNING' },
                { label: '已处理', value: 'DONE'},
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
                loading={loading}
            />
       </div>

       <Modal
          className="reject-modal"
          title="驳回确认"
          okText="驳回"
          cancelText="取消"
          open={rejectOpen}
          onOk={() => onSubmit(tableItem.userName, 'REJECT', rejectVal)}
          onCancel={() => setRejectOpen(false)}
       >
         <div className="reject-modal-content">
            <Descriptions>
                <Descriptions.Item label="申请人">{tableItem.infoName}</Descriptions.Item>
                <Descriptions.Item label="账号">{tableItem.userName}</Descriptions.Item>
            </Descriptions>
         </div>
         <Input placeholder='请输入驳回理由' value={rejectVal} onChange={onRejectInputChange}/>
       </Modal>
    </div>
  )
}
