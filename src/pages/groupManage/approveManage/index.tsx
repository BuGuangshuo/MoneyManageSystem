import React, { useState, useEffect } from "react";

import {
  theme,
  Button,
  Segmented,
  Table,
  Modal,
  message,
  Input,
  Select,
  Popover,
  Space,
  Avatar,
  Tooltip,
  Tag,
  Descriptions,
  Row,
  Col,
  Form,
  DatePicker,
  Slider,
} from "antd";
import { SearchOutlined, UnorderedListOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";
import _ from "lodash";

import { approveSend, getProcess } from "../../../utils/http";
import { initParams } from "./config";

import "./index.less";
import { uniqueAfterArr } from "../../../utils/uniqueParamsArr";

const { Option } = Select;
const { RangePicker } = DatePicker;

let pagination: any = {
  showTotal: (totals: any) => `共 ${totals} 条`,
};

const userInfo = sessionStorage.getItem("user")
  ? JSON.parse(sessionStorage.getItem("user") || "")
  : null;

export default function ApproveManage() {
  const [segmentValue, setSementValue] = useState<string | number>("RUNNING");
  const [statusValue, setStatusValue] = useState<any>("");
  const [status, setStatus] = useState<any>(undefined);
  const [dataSource, setDataSource] = useState<any>([]);
  const [params, setParams] = useState<paramsTs>(initParams);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [rejectOpen, setRejectOpen] = useState<boolean>(false);
  const [tableItem, setTableItem] = useState<TableItem>();
  const [rejectVal, setRejectVal] = useState<string>("");
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");

  const {
    token: {
      colorError,
      colorBorderSecondary,
      colorTextSecondary,
      colorSuccess,
    },
  } = theme.useToken();

  const [form] = Form.useForm();

  const TableStyle = {
    margin: 24,
    border: `1px solid ${colorBorderSecondary}`,
    borderRadius: 8,
    color: colorTextSecondary,
  };

  const column = [
    {
      title: "用户名",
      dataIndex: "userName",
      key: "userName",
      width: 180,
    },
    {
      title: "昵称",
      dataIndex: "infoName",
      key: "infoName",
      width: 200,
      render: (text: string) => (
        <div className="table-infoName-wrap">
          <Avatar src="" />
          <div className="ava-title">
            <Tooltip title={text} placement="topLeft">
              {text}
            </Tooltip>
          </div>
        </div>
      ),
    },
    {
      title: "身份",
      dataIndex: "status",
      key: "status",
      width: 80,
      render: (text: string) => (
        <div>{text === "work" ? "职场人" : "学生"}</div>
      ),
    },
    {
      title: "职业/专业",
      dataIndex: "career",
      key: "career",
      width: 150,
    },
    {
      title: "薪水(月)",
      dataIndex: "salary",
      key: "salary",
      width: 150,
    },
    {
      title: "申请时间",
      dataIndex: "createTime",
      key: "createTime",
      render: (text: number) => (
        <div>{dayjs(text).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
      width: 200,
    },
    {
      title: "通过时间",
      dataIndex: "approveTime",
      key: "approveTime",
      width: 200,
      render: (text: string) => (
        <div>{text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "-"}</div>
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (_: any, record: any) => {
        if (segmentValue === "RUNNING") {
          return (
            <Space size="middle">
              <Tooltip title="通过">
                <svg
                  className="icon"
                  aria-hidden="true"
                  style={{
                    color: colorTextSecondary,
                    fontSize: 24,
                    cursor: "pointer",
                  }}
                  onClick={() => onSubmit(record.userName, "FINISH")}
                >
                  <use xlinkHref="#icon-shenhetongguo"></use>
                </svg>
              </Tooltip>
              <Tooltip title="驳回">
                <svg
                  className="icon"
                  aria-hidden="true"
                  style={{
                    color: colorTextSecondary,
                    fontSize: 24,
                    cursor: "pointer",
                  }}
                  onClick={() => onRejectModalOpen(record)}
                >
                  <use xlinkHref="#icon-shenhebutongguo"></use>
                </svg>
              </Tooltip>
            </Space>
          );
        } else if (segmentValue === "DONE") {
          return (
            <Space size="middle">
              {record.approveStatus === "FINISH" ? (
                <Tag color={colorSuccess}>已通过</Tag>
              ) : (
                <Tag color={colorError}>已驳回</Tag>
              )}
            </Space>
          );
        } else {
          {
            if (record.approveStatus === "RUNNING") {
              return (
                <Space size="middle">
                  <Tooltip title="通过">
                    <svg
                      className="icon"
                      aria-hidden="true"
                      style={{
                        color: colorTextSecondary,
                        fontSize: 24,
                        cursor: "pointer",
                      }}
                      onClick={() => onSubmit(record.userName, "FINISH")}
                    >
                      <use xlinkHref="#icon-shenhetongguo"></use>
                    </svg>
                  </Tooltip>
                  <Tooltip title="驳回">
                    <svg
                      className="icon"
                      aria-hidden="true"
                      style={{
                        color: colorTextSecondary,
                        fontSize: 24,
                        cursor: "pointer",
                      }}
                      onClick={() => onRejectModalOpen(record)}
                    >
                      <use xlinkHref="#icon-shenhebutongguo"></use>
                    </svg>
                  </Tooltip>
                </Space>
              );
            } else {
              return (
                <Space size="middle">
                  {record.approveStatus === "FINISH" ? (
                    <Tag color={colorSuccess}>已通过</Tag>
                  ) : (
                    <Tag color={colorError}>已驳回</Tag>
                  )}
                </Space>
              );
            }
          }
        }
      },
      width: 200,
    },
  ];

  useEffect(() => {
    const getApproveDataSource = async () => {
      setDataSource([]);
      setLoading(true);
      const res = await getProcess(params);
      pagination.total = res.data.total;
      pagination.current = params.page;
      pagination.pageSize = params.size;

      setLoading(false);
      setDataSource(res.data.result);
      setTotal(res.data.total);
    };

    getApproveDataSource();
  }, [params]);

  const onSementChange = (val: string | number) => {
    let _params = _.cloneDeep(params);

    if (val === "RUNNING") {
      _params.search = initParams.search;
    } else if (val === "DONE") {
      _params.search = [
        {
          propetryName: "approveName",
          operator: "EQ",
          value: JSON.parse(sessionStorage.getItem("user") || "").username,
        },
        {
          propetryName: "approveType",
          operator: "IN",
          value: ["FINISH", "REJECT"],
        },
      ];
    } else {
      _params.search = [
        {
          propetryName: "approveName",
          operator: "EQ",
          value: JSON.parse(sessionStorage.getItem("user") || "").username,
        },
      ];
    }
    setParams(_params);
    setAdvancedOpen(false);
    setStatusValue(null);
    form.setFieldsValue({
      status: null,
      career: null,
      createTime: null,
      approveTime: null,
      salary: null,
    });
    setSementValue(val);
  };

  const onUserListChange = (
    lastpagination: any,
    filtersArg: any,
    sorter: any
  ) => {
    const _params = _.cloneDeep(params);
    _params.page = lastpagination.current;
    _params.size = lastpagination.pageSize;
    if (sorter.field) {
      _params.sorts = [
        {
          propetryName: sorter.field,
          direction: sorter.order === "ascend" ? "asc" : "desc",
        },
      ];
    }
    setParams({
      ...params,
      page: _params.page,
      size: _params.size,
      sorts: _params.sorts,
    });
  };

  const onRejectModalOpen = (record: any) => {
    onRejectModalSubmit(record);
  };

  const onRejectModalSubmit = (record: any) => {
    setRejectOpen(true);
    setTableItem(record);
  };

  const onRejectInputChange = (e: any) => {
    setRejectVal(e.target.value);
  };

  const onSubmit = async (
    userName: string = "",
    approveStatus: string,
    rejectText?: string
  ) => {
    setLoading(true);
    const res = await approveSend({
      approveUser: userInfo.username,
      approveStatus,
      userName,
      rejectText,
    });
    if (res && res.code === 200) {
      setParams({ ...params });
      message.success("操作成功");
    }
    setLoading(false);
    setRejectOpen(false);
  };

  const onSelectChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params.search = uniqueAfterArr(
        [
          ..._params.search,
          { operator: "EQ", propetryName: "approveStatus", value: val },
        ],
        "propetryName"
      );
    } else {
      _params.search = _params.search.filter(
        (item) => item.propetryName !== "approveStatus"
      );
    }

    setStatusValue(val);
    setParams(_params);
  };

  const onStatusSelectChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params.search = uniqueAfterArr(
        [
          ..._params.search,
          { operator: "EQ", propetryName: "status", value: val },
        ],
        "propetryName"
      );
    } else {
      _params.search = _params.search.filter(
        (item) => item.propetryName !== "status"
      );
    }

    setStatus(val);
    setParams(_params);
  };

  const rangePresets: {
    label: string;
    value: [Dayjs, Dayjs];
  }[] = [
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 14 Days", value: [dayjs().add(-14, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
    { label: "Last 90 Days", value: [dayjs().add(-90, "d"), dayjs()] },
  ];

  const onAdvancedChange = async () => {
    const paramsEnum: any = {
      createTime: "BETWEEN",
      approveTime: "BETWEEN",
      status: "EQ",
      career: "LIKE",
      salary: "BETWEEN",
    };
    setLoading(true);
    let _params = _.cloneDeep(params);
    let advanceParams: any = [];
    const formInfo = form.getFieldsValue();

    const { createTime, approveTime } = formInfo;
    const formParams = {
      ...formInfo,
      createTime: createTime
        ? [
            createTime[0]?.valueOf("YYYY-MM-DD"),
            createTime[1]?.valueOf("YYYY-MM-DD"),
          ]
        : null,
      approveTime: approveTime
        ? [
            approveTime[0]?.valueOf("YYYY-MM-DD"),
            approveTime[1]?.valueOf("YYYY-MM-DD"),
          ]
        : null,
    };

    _.map(formParams, (item, key) => {
      advanceParams.push({
        propetryName: key,
        operator: paramsEnum[key],
        value: item,
      });
    });

    _params.search = uniqueAfterArr(
      [..._params.search, ...advanceParams],
      "propetryName"
    );

    setParams(_params);
    setLoading(false);
    setAdvancedOpen(false);
  };

  const marks = {
    0: "0",
    5000: "5k",
    10000: "10k",
    15000: "15k",
    20000: "20k",
    25000: "25k",
    30000: "30k",
    35000: "50k+",
  };

  const onInputChange = (e: any) => {
    setInputVal(e.target.value);
  };

  const onInputSearch = () => {
    let _params = _.cloneDeep(params);
    _params.search = uniqueAfterArr(
      [
        ..._params.search,
        { propetryName: "LIKE", operator: "LIKE", value: inputVal },
      ],
      "propetryName"
    );
    setParams(_params);
  };

  const content = () => {
    return (
      <div className="advanced-filter-content">
        <div className="advanced-filter-content">
          <Form layout="vertical" form={form}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="createTime" label="申请时间">
                  <RangePicker presets={rangePresets} allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="approveTime" label="通过时间">
                  <RangePicker presets={rangePresets} allowClear />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="salary" label="薪资范围">
                  <Slider
                    range={{ draggableTrack: true }}
                    min={0}
                    max={35000}
                    step={1000}
                    marks={marks}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>

        <div className="advanced-footer">
          <Button onClick={() => setAdvancedOpen(false)}>取消</Button>
          <Button type="primary" onClick={onAdvancedChange}>
            确定
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="approve-wrap">
      <div
        className="header-wrap"
        style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="title" style={{ color: colorTextSecondary }}>
          团队审批
        </div>
      </div>

      <div className="catgrory-wrap">
        <Segmented
          options={[
            { label: "待处理", value: "RUNNING" },
            { label: "已处理", value: "DONE" },
            { label: "我收到的", value: "ALL" },
          ]}
          // size="large"
          value={segmentValue}
          onChange={onSementChange}
        />
      </div>

      <div className="filter-wrap">
        <div className="search-wrap">
          <Input
            placeholder="搜索"
            suffix={<SearchOutlined rev={undefined} />}
            onChange={onInputChange}
            value={inputVal}
          />
          <Button type="primary" onClick={onInputSearch}>
            搜索
          </Button>
        </div>
        <div className="filter-bar">
          {segmentValue === "RUNNING" ? null : (
            <div>
              <Select
                placeholder="审批状态"
                style={{ width: 100 }}
                allowClear
                onChange={onSelectChange}
                value={statusValue}
              >
                <Option value="FINISH">已通过</Option>
                <Option value="REJECT">已驳回</Option>
              </Select>
            </div>
          )}

          <div>
            <Select
              placeholder="身份"
              style={{ width: 80 }}
              allowClear
              onChange={onStatusSelectChange}
              value={status}
            >
              <Option value="student">学生</Option>
              <Option value="work">职场人</Option>
            </Select>
          </div>

          <div>
            <Popover
              placement="bottomRight"
              title="高级筛选"
              content={content}
              trigger="click"
              overlayClassName="advanced-pop-wrap"
              overlayStyle={{ width: 600 }}
              open={advancedOpen}
            >
              <Button
                icon={<UnorderedListOutlined rev={undefined} />}
                onClick={() => setAdvancedOpen(true)}
              >
                高级筛选
              </Button>
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
        onOk={() => onSubmit(tableItem?.userName, "REJECT", rejectVal)}
        onCancel={() => setRejectOpen(false)}
      >
        <div className="reject-modal-content">
          <Descriptions>
            <Descriptions.Item label="申请人">
              {tableItem?.infoName}
            </Descriptions.Item>
            <Descriptions.Item label="账号">
              {tableItem?.userName}
            </Descriptions.Item>
          </Descriptions>
        </div>
        <Input
          placeholder="请输入驳回理由"
          value={rejectVal}
          onChange={onRejectInputChange}
        />
      </Modal>
    </div>
  );
}
