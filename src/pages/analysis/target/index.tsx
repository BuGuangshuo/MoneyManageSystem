import React, { useState, useEffect } from "react";

import type { MenuProps } from "antd";
import { theme, Button, Input, Select, Row, Col, Dropdown, Space } from "antd";

import TargetBlankSvg from "../../../components/themeSvg/targetBlank";
import { AimOutlined, MoreOutlined, SearchOutlined } from "@ant-design/icons";
import TargetModal from "./modal";
import Loading from "../../../components/loading";

import { targetListBy } from "../../../utils/http";
import { uniqueAfterArr } from "../../../utils/uniqueParamsArr";
import _ from "lodash";
import numConvert from "../../../utils/salayUnit";
import BulletChart from "./charts/bullet";
import dayjs from "dayjs";

const { Option } = Select;

export default function Target(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<any>({ idEdit: null });
  const [editValue, setEditValue] = useState<any>({});
  const [params, setParams] = useState<any>([]);
  const [targetList, setTargetList] = useState<any>([]);
  const [reflash, setReflash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [targetType, setTargetType] = useState<string | null>(null);
  const [editType, setEditType] = useState<string | null>(null);

  const {
    token: {
      colorBorderSecondary,
      colorTextSecondary,
      colorPrimary,
      colorText,
      colorErrorText,
      colorSuccessText,
    },
  } = theme.useToken();

  useEffect(() => {
    const getTargetList = async () => {
      setLoading(true);
      try {
        const res = await targetListBy([]);
        if (res && res.code === 200) {
          setTargetList(res.data.result);
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getTargetList();
  }, [params, reflash]);

  const items: MenuProps["items"] = [
    {
      key: "view",
      label: "查看",
    },
    {
      key: "delete",
      label: "删除",
    },
  ];

  const items2: MenuProps["items"] = [
    {
      key: "view",
      label: "查看",
    },
    {
      key: "edit",
      label: "编辑",
    },
    {
      key: "delete",
      label: "删除",
    },
  ];

  const onInputChange = (e: any) => {
    setInputVal(e.target.value);
  };

  const onInputSearch = () => {
    let _params = _.cloneDeep(params);
    _params = uniqueAfterArr(
      [
        ..._params.search,
        { propetryName: "LIKE", operator: "LIKE", value: inputVal },
      ],
      "propetryName"
    );
    setParams(_params);
  };

  const onTargetTypeChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params = uniqueAfterArr(
        [
          ..._params,
          { operator: "EQ", propetryName: "targetType", value: val },
        ],
        "propetryName"
      );
    } else {
      _params = _params.filter(
        (item: any) => item.propetryName !== "targetType"
      );
    }

    setTargetType(val);
    setParams(_params);
  };

  const onEditTypeChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params = uniqueAfterArr(
        [..._params, { operator: "EQ", propetryName: "editType", value: val }],
        "propetryName"
      );
    } else {
      _params = _params.filter((item: any) => item.propetryName !== "editType");
    }

    setEditType(val);
    setParams(_params);
  };

  const changeVisible = (visible: boolean) => {
    setOpen(visible);
  };

  const addModelChange = () => {
    changeVisible(true);
    setIsShowEdit({ idEdit: null });
  };

  const remainFunc = (
    type: string,
    timeArr: string[],
    currentCount: number,
    targetCount: number
  ) => {
    const currentDate = dayjs();
    const startDate = dayjs(timeArr[0]);
    const endDate: any = timeArr.length === 1 ? null : dayjs(timeArr[1]);
    if (currentDate.valueOf() < startDate.valueOf()) {
      return "未开始";
    } else if (currentCount >= targetCount) {
      return <span style={{ color: colorSuccessText }}>目标完成</span>;
    } else if (type === "range" && currentDate.valueOf() > endDate?.valueOf()) {
      return <span style={{ color: colorErrorText }}>已到期</span>;
    } else if (type === "range") {
      const daysRemaining: any = endDate?.diff(currentDate, "day");
      return `剩余 ${daysRemaining + 1} 天`;
    } else {
      const daysRemaining = startDate?.diff(currentDate, "day");
      return `已开始 ${daysRemaining + 1} 天`;
    }
  };

  return (
    <div>
      <div
        className="page-header"
        style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="page-title" style={{ color: colorTextSecondary }}>
          目标管理
        </div>
        {targetList.length ? (
          <div className="flex justify-end mr-[8px]">
            <Button type="primary" onClick={() => setOpen(true)}>
              新建目标
            </Button>
          </div>
        ) : null}
      </div>

      {loading ? (
        <Loading />
      ) : targetList.length ? (
        <div>
          <div className="flex justify-between m-[24px] gap-[24px]">
            <div className="flex gap-[16px]">
              <div>
                <Input
                  placeholder="搜索"
                  suffix={<SearchOutlined rev={undefined} />}
                  onChange={onInputChange}
                  value={inputVal}
                />
              </div>

              <Button type="primary" onClick={onInputSearch}>
                搜索
              </Button>
            </div>

            <div className="flex gap-[16px]">
              <div>
                <Select
                  placeholder="目标类型"
                  style={{ width: 100 }}
                  allowClear
                  onChange={onTargetTypeChange}
                  value={targetType}
                >
                  <Option value="range">定期目标</Option>
                  <Option value="forever">长期目标</Option>
                </Select>
              </div>

              <div>
                <Select
                  placeholder="编辑类型"
                  style={{ width: 100 }}
                  allowClear
                  onChange={onEditTypeChange}
                  value={editType}
                >
                  <Option value="开放编辑">开放编辑</Option>
                  <Option value="禁止编辑">禁止编辑</Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="p-[24px] pt-0">
            <Row gutter={[24, 24]}>
              {targetList.map((item: any) => {
                return (
                  <Col span={8}>
                    <div
                      className="h-[310px] border-solid border-2 cursor-pointer"
                      style={{
                        borderColor: colorBorderSecondary,
                        borderRadius: 6,
                        transition: ".4s all",
                      }}
                    >
                      <div
                        className="h-[48px] flex justify-between p-[16px] pl-[24px] pr-[16px] items-center opacity-80"
                        style={{
                          borderBottom: `1px solid ${colorBorderSecondary}`,
                          background: colorPrimary,
                          borderTopLeftRadius: 4,
                          borderTopRightRadius: 4,
                        }}
                      >
                        <div
                          className="DingDing text-[18px] w-600"
                          style={{ color: "#FFF" }}
                        >
                          {item.targetName}
                        </div>
                        <div>
                          <Dropdown
                            menu={{
                              items:
                                item.editType === "开放编辑" ? items2 : items,
                            }}
                          >
                            <MoreOutlined
                              style={{ color: "#FFF" }}
                              className="text-[18px] w-[600] cursor-pointer"
                            />
                          </Dropdown>
                        </div>
                      </div>
                      <div className="h-[212px] p-[16px] pl-[24px] pr-[24px]">
                        <div className="flex relative top-[8px]">
                          <div className="mr-[16px]">
                            <div className="mb-[8px]">
                              <span
                                className="inline-block w-[3px] h-[12px] mr-[4px]"
                                style={{
                                  background: colorPrimary,
                                  borderRadius: 16,
                                }}
                              />
                              <span
                                className="DingDing"
                                style={{ color: colorTextSecondary }}
                              >
                                目标金额
                              </span>
                            </div>
                            <div
                              className="ml-[8px] !text-[21px] DingDing"
                              style={{ color: colorTextSecondary }}
                            >
                              {numConvert(item.amountVal)}
                            </div>
                          </div>

                          <div>
                            <div className="mb-[8px]">
                              <span
                                className="DingDing"
                                style={{ color: colorTextSecondary }}
                              >
                                当前金额
                              </span>
                            </div>
                            <div
                              className="ml-[8px] !text-[21px] DingDing"
                              style={{ color: colorTextSecondary }}
                            >
                              {numConvert(item.currentCount)}
                            </div>
                          </div>
                        </div>

                        <div className="h-[140px]">
                          <BulletChart
                            currentCount={item.currentCount}
                            targetCount={item.amountVal}
                          />
                        </div>
                      </div>
                      <div
                        className="p-[16px] pl-[24px] pr-[24px] flex justify-between"
                        style={{
                          borderTop: `1px solid ${colorBorderSecondary}`,
                        }}
                      >
                        <div>
                          {item.timeType === "range" ? (
                            <svg
                              className="icon"
                              aria-hidden="true"
                              style={{
                                color: colorTextSecondary,
                                fontSize: 14,
                              }}
                            >
                              <use xlinkHref="#icon-countDown"></use>
                            </svg>
                          ) : (
                            <svg
                              className="icon"
                              aria-hidden="true"
                              style={{
                                color: colorTextSecondary,
                                fontSize: 14,
                              }}
                            >
                              <use xlinkHref="#icon-funds-box-fill"></use>
                            </svg>
                          )}
                          <span
                            className="pl-[8px]"
                            style={{ color: colorTextSecondary }}
                          >
                            {item.timeType === "range"
                              ? "定期目标"
                              : "长期目标"}
                          </span>
                        </div>
                        <div
                          className="DingDing"
                          style={{ color: colorTextSecondary }}
                        >
                          {/* {item.timeType === "range" ? "剩余 " : "已开始 "}
                          {reaminDay(item.dateValue[1])} 天 */}
                          {remainFunc(
                            item.timeType,
                            item.dateValue,
                            item.currentCount,
                            item.amountVal
                          )}
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
        </div>
      ) : (
        <div
          className="flex items-center justify-evenly"
          style={{ height: "calc(100vh - 170px)" }}
        >
          <div className="flex flex-col relative bottom-4">
            <div
              className="font-[600] DingDing mb-8 !text-[32px]"
              style={{ color: colorPrimary }}
            >
              Target
            </div>
            <div
              style={{ color: colorTextSecondary }}
              className="font-[600] DingDing w-[305px] mb-8 text-base"
            >
              设置一个或多个目标，通过设定的目标来帮助您智能分析目标完成情况等详细信息。
            </div>

            <Button
              type="primary"
              className="h-[38px]"
              onClick={addModelChange}
            >
              <AimOutlined className="mr-[8px] text-[18px] relative top-[2px]" />
              设置目标
            </Button>
          </div>
          <div className="w-[350px] h-[350px]">
            <TargetBlankSvg theme={colorPrimary} />
          </div>
        </div>
      )}

      <TargetModal
        open={open}
        isShowEdit={isShowEdit}
        reflash={reflash}
        setReflash={setReflash}
        onCancel={() => {
          setOpen(false);
          setIsShowEdit({ idEdit: null });
          setEditValue({});
        }}
      />
    </div>
  );
}
