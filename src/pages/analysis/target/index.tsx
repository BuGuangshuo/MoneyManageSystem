import React, { useState, useEffect } from "react";

import type { MenuProps } from "antd";
import {
  theme,
  Button,
  Input,
  Select,
  Row,
  Col,
  Dropdown,
  Popover,
  Form,
  DatePicker,
  Slider,
  Space,
  Empty,
} from "antd";

import TargetBlankSvg from "../../../components/themeSvg/targetBlank";
import {
  AimOutlined,
  MoreOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import TargetModal from "./modal";
import Loading from "../../../components/loading";

import { targetListBy } from "../../../utils/http";
import { uniqueAfterArr } from "../../../utils/uniqueParamsArr";
import _ from "lodash";
import numConvert from "../../../utils/salayUnit";
import BulletChart from "./charts/bullet";
import dayjs from "dayjs";

const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Target(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<any>({ idEdit: null });
  const [editValue, setEditValue] = useState<any>({});
  const [params, setParams] = useState<any>([]);
  const [targetData, setTargetData] = useState<any>([]);
  const [targetList, setTargetList] = useState<any>([]);
  const [reflash, setReflash] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>("");
  const [targetType, setTargetType] = useState<string | null>(null);
  const [targetPhase, setTargetPhase] = useState<string | null>(null);
  const [editType, setEditType] = useState<string | null>(null);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [targetIsNull, setTargetIsNull] = useState<boolean>(true);

  const [form] = Form.useForm();

  const {
    token: {
      colorBorderSecondary,
      colorTextSecondary,
      colorInfoText,
      colorPrimary,
      colorText,
      colorWarningText,
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
          if (res.data.result.length) {
            setTargetIsNull(false);
          } else {
            setTargetIsNull(true);
          }
          setTargetData(res.data.result);
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
  }, [reflash]);

  useEffect(() => {
    const filterData = () => {
      const _targetList = _.cloneDeep(targetData);
      let filterRes = _.cloneDeep(_targetList);

      params.forEach((item: any) => {
        if (item.operator === "EQ") {
          if (item.value && item.value !== "") {
            if (item.propetryName === "targetPhase") {
              filterRes = phaseFun(item.value, filterRes);
            } else {
              filterRes = filterRes.filter(
                (targetItem: any) =>
                  item.value === targetItem[item.propetryName]
              );
            }
          }
        }
        if (item.operator === "BETWEEN") {
          if (item.value && item.value.length) {
            filterRes = filterRes.filter(
              (targetItem: any) =>
                dayjs(targetItem[item.propetryName][0])
                  .endOf("day")
                  .valueOf() >= item.value[0] &&
                dayjs(targetItem[item.propetryName][0])
                  .endOf("day")
                  .valueOf() <= item.value[1]
            );
          }
        }
      });

      setTargetList(filterRes);
    };

    filterData();
  }, [params]);

  const phaseFun = (val: string, targetArr: string[]) => {
    const currentDate = dayjs().valueOf();

    switch (val) {
      case "pending":
        return targetArr.filter(
          (item: any) => dayjs(item.dateValue[0]).valueOf() > currentDate
        );
      case "finish":
        return targetArr.filter(
          (item: any) => item.currentCount >= item.amountVal
        );
      case "passed":
        return targetArr.filter((item: any) => {
          const endDate: any =
            item.dateValue.length === 1 ? null : dayjs(item.dateValue[1]);
          if (
            item.currentCount < item.amountVal &&
            item.timeType === "range" &&
            currentDate.valueOf() > endDate?.valueOf() &&
            endDate?.diff(currentDate, "day") !== 0
          ) {
            return true;
          }
        });
      case "doing":
        return targetArr.filter((item: any) => {
          const endDate: any =
            item.dateValue.length === 1 ? null : dayjs(item.dateValue[1]);
          if (
            item.currentCount < item.amountVal &&
            !(
              item.timeType === "range" &&
              currentDate.valueOf() > endDate?.valueOf() &&
              endDate?.diff(currentDate, "day") !== 0
            ) &&
            dayjs(item.dateValue[0]).valueOf() < currentDate
          ) {
            return true;
          }
        });
    }
  };

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
    if (!inputVal && inputVal === "") {
      return;
    }
    _params = uniqueAfterArr(
      [
        ..._params,
        { propetryName: "targetName", operator: "LIKE", value: inputVal },
      ],
      "propetryName"
    );

    setParams(_params);
  };

  const onTargetTypeChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params = uniqueAfterArr(
        [..._params, { operator: "EQ", propetryName: "timeType", value: val }],
        "propetryName"
      );
    } else {
      _params = _params.filter((item: any) => item.propetryName !== "timeType");
    }

    setTargetType(val);
    setParams(_params);
  };

  const onTargetPhaseChange = (val: string) => {
    let _params = _.cloneDeep(params);

    if (val) {
      _params = uniqueAfterArr(
        [
          ..._params,
          { operator: "EQ", propetryName: "targetPhase", value: val },
        ],
        "propetryName"
      );
    } else {
      _params = _params.filter(
        (item: any) => item.propetryName !== "targetPhase"
      );
    }

    setTargetPhase(val);
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
      if (endDate?.diff(currentDate, "day") === 0) {
        return <span style={{ color: colorWarningText }}>今日到期</span>;
      }
      return <span style={{ color: colorErrorText }}>已到期</span>;
    } else if (type === "range") {
      const daysRemaining: any = endDate?.diff(currentDate, "day");
      return `剩余 ${daysRemaining + 1} 天`;
    } else {
      const daysRemaining = startDate?.diff(currentDate, "day");
      if (daysRemaining === 0) {
        return <span style={{ color: colorInfoText }}>今日开始</span>;
      }
      return `已开始 ${Math.abs(daysRemaining)} 天`;
    }
  };

  const onAdvancedChange = async () => {
    const paramsEnum: any = {
      dateValue: "BETWEEN",
      targetVal: "BETWEEN",
      editType: "EQ",
    };
    setLoading(true);
    let _params = _.cloneDeep(params);
    let advanceParams: any = [];
    const formInfo = form.getFieldsValue();

    const { dateValue, targetVal } = formInfo;
    const formParams = {
      ...formInfo,
      dateValue: dateValue
        ? [
            dateValue[0]?.startOf("day").valueOf("YYYY-MM-DD"),
            dateValue[1]?.endOf("day").valueOf("YYYY-MM-DD"),
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

    _params = uniqueAfterArr([..._params, ...advanceParams], "propetryName");

    setParams(_params);
    setLoading(false);
    setAdvancedOpen(false);
  };

  // const marks = {
  //   0: "0",
  //   100000: "10w",
  //   200000: "20w",
  //   300000: "30w",
  //   400000: "40w",
  //   500000: "50w",
  //   600000: "60w",
  //   700000: "70w",
  //   800000: "80w",
  //   900000: "90w",
  //   1000000: "100w+",
  // };

  const content = () => {
    return (
      <div className="advanced-filter-content">
        <div className="advanced-filter-content">
          <Form layout="vertical" form={form}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="dateValue" label="开始时间">
                  <RangePicker allowClear />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="editType" label="编辑类型">
                  <Select placeholder="编辑类型" allowClear>
                    <Option value="开放编辑">开放编辑</Option>
                    <Option value="禁止编辑">禁止编辑</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* <Row gutter={24}>
              <Col span={24}>
                <Form.Item name="targetVal" label="目标金额">
                  <Slider
                    range={{ draggableTrack: true }}
                    min={0}
                    max={1000000}
                    step={10000}
                    marks={marks}
                  />
                </Form.Item>
              </Col>
            </Row> */}
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
    <div>
      <div
        className="page-header"
        style={{ borderBottom: `1px solid ${colorBorderSecondary}` }}
      >
        <div className="page-title" style={{ color: colorTextSecondary }}>
          目标管理
        </div>
        {!targetIsNull || targetList.length ? (
          <div className="flex justify-end mr-[8px]">
            <Button type="primary" onClick={() => setOpen(true)}>
              新建目标
            </Button>
          </div>
        ) : null}
      </div>

      {loading ? (
        <Loading />
      ) : !targetIsNull || targetList.length ? (
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
                  placeholder="目标阶段"
                  style={{ width: 100 }}
                  allowClear
                  onChange={onTargetPhaseChange}
                  value={targetPhase}
                >
                  <Option value="pending">未开始</Option>
                  <Option value="doing">进行中</Option>
                  <Option value="finish">已完成</Option>
                  <Option value="passed">已到期</Option>
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
                  onOpenChange={(open) => setAdvancedOpen(open)}
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
          <div
            className="p-[24px] pt-0"
            style={{ height: "calc(100vh - 213px)", overflowY: "auto" }}
          >
            {targetList.length ? (
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
                            // background: colorPrimary,
                            borderTopLeftRadius: 4,
                            borderTopRightRadius: 4,
                          }}
                        >
                          <div
                            className="DingDing font-[18px] w-600"
                            style={{ color: colorText, fontSize: 18 }}
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
                                style={{ color: colorText }}
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
                          {item.currentCount >= item.amountVal ? (
                            <div className="absolute top-[64px] right-[46px]">
                              <svg
                                className="icon"
                                aria-hidden="true"
                                style={{
                                  color: colorTextSecondary,
                                  fontSize: 72,
                                }}
                              >
                                <use xlinkHref="#icon-importfinish"></use>
                              </svg>
                            </div>
                          ) : null}

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
            ) : (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                className=" absolute top-[40%] left-[45%]"
              />
            )}
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
