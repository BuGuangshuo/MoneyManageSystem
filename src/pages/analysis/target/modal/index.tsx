import React, { useState, useEffect } from "react";

import { theme, InputNumber, Modal, Input, DatePicker, Segmented } from "antd";
import type { DatePickerProps } from "antd";

import {
  AppstoreOutlined,
  FieldTimeOutlined,
  FormOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";

import { getMemberInfo, targetSave } from "../../../../utils/http";

const { RangePicker } = DatePicker;

const barEnum: any = { 1: "25%", 2: "50%", 3: "100%" };

export default function TargetModal(props: any) {
  const { open, isShowEdit, reflash, setReflash, onCancel } = props;

  const [userInfo] = useState<any>(sessionStorage.getItem("user") || "");
  const [barWidth, setBarWidth] = useState<number>(1);
  const [nameVal, setNameVal] = useState<string>("");
  const [amountVal, setAmountVal] = useState<number>(0);
  const [dateRangeVal, setDateRangeVal] = useState<any>([]);
  const [dateVal, setDateVal] = useState<any>(null);
  const [timeType, setTimeType] = useState<string>("range");
  const [value, setValue] = useState("personalTarget");
  const [targetParam, setTargetParam] = useState({});
  const [groupInfo, setGroupInfo] = useState<any>({});

  const {
    token: {
      colorBorderSecondary,
      colorSuccess,
      colorPrimary,
      colorTextSecondary,
    },
  } = theme.useToken();

  useEffect(() => {
    const init = async () => {
      const { username } = JSON.parse(userInfo);
      try {
        const res = await getMemberInfo({ username });
        if (res && res.data) {
          const { groupInfo, userInfo } = res.data;
          const { group } = groupInfo;

          setGroupInfo(group);
        }
      } catch (err) {
        console.error(err);
      }
      const res = await getMemberInfo({ username });
    };
    init();
  }, []);

  const onNameChange = (e: any) => {
    setNameVal(e.target.value);
  };

  const onAmountChange = (e: any) => {
    setAmountVal(e);
  };

  const onRangeChange = (dates: any) => {
    setDateRangeVal(dates);
  };

  const onDateChange: DatePickerProps["onChange"] = (date, dateString) => {
    setDateVal(date);
  };

  const onTargetTypeChange = (value: any) => {
    setValue(value);
  };

  const onNext = async () => {
    if (barWidth === 3) {
      const rangeTime =
        dateRangeVal && dateRangeVal.length
          ? dateRangeVal.map((item: any) => dayjs(item).format("YYYY-MM-DD"))
          : [];

      const dateTime = dateVal ? dayjs(dateVal).format("YYYY-MM-DD") : [];

      const params = {
        targetName: nameVal,
        amountVal,
        groupId:
          value === "groupTarget" ? localStorage.getItem("groupId") : undefined,
        dateValue: timeType === "range" ? rangeTime : dateTime,
        timeType,
        targetType: value,
        //@ts-ignore
        createUserName: JSON.parse(sessionStorage.getItem("user")).username,
      };

      try {
        await targetSave(params);
        setReflash(!reflash);
      } catch (err) {
        console.error(err);
      }
      setTargetParam(params);
      onClose();
    } else {
      try {
        setBarWidth(barWidth + 1);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onPre = () => {
    if (barWidth === 1) {
      onClose();
    } else {
      setBarWidth(barWidth - 1);
    }
  };

  const onClose = () => {
    setBarWidth(1);
    setAmountVal(0);
    setNameVal("");
    setDateRangeVal([]);
    setDateVal(null);
    setValue("personalTarget");
    onCancel();
  };

  const stepContentEnum: any = {
    1: (
      <div className="flex items-center flex-col">
        <FormOutlined
          className="mb-[16px] text-[24px]"
          style={{ color: colorTextSecondary }}
        />
        <div className="text-[16px] font-[600] mb-[24px]">本次目标名称</div>
        <Input
          placeholder="请输入本次目标名称"
          className="w-[400px]"
          value={nameVal}
          onChange={onNameChange}
        />
      </div>
    ),
    2: (
      <div className="flex items-center flex-col">
        <AppstoreOutlined
          className="mb-[16px] text-[24px]"
          style={{ color: colorTextSecondary }}
        />
        <div className="text-[16px] font-[600] mb-[24px]">目标金额</div>
        <InputNumber
          placeholder="请输入本次目标金额"
          step={1000}
          min={0}
          value={amountVal}
          onChange={onAmountChange}
          className="w-[400px]"
        />
      </div>
    ),
    3: (
      <div className="flex items-center flex-col">
        <FieldTimeOutlined
          className="mb-[16px] text-[24px]"
          style={{ color: colorTextSecondary }}
        />
        <div className="text-[16px] font-[600] mb-[24px]">目标期限</div>
        <div className="flex justify-between gap-x-[62px]">
          <div
            className="w-[130px] flex justify-center items-center rounded cursor-pointer flex-col p-4"
            style={{
              transition: ".5s all",
              border: `2px solid ${
                timeType === "range" ? colorPrimary : colorBorderSecondary
              }`,
            }}
            onClick={() => setTimeType("range")}
          >
            <svg
              className="icon"
              aria-hidden="true"
              style={{
                color: timeType === "range" ? colorPrimary : colorTextSecondary,
                fontSize: 28,
              }}
            >
              <use xlinkHref="#icon-countDown"></use>
            </svg>
            <div className="mt-[8px]">定期目标</div>
          </div>
          <div
            className="w-[130px] flex justify-center items-center rounded-lg cursor-pointer flex-col p-4"
            style={{
              transition: ".5s all",
              border: `2px solid ${
                timeType === "forever" ? colorPrimary : colorBorderSecondary
              }`,
            }}
            onClick={() => setTimeType("forever")}
          >
            <svg
              className="icon"
              aria-hidden="true"
              style={{
                color:
                  timeType === "forever" ? colorPrimary : colorTextSecondary,
                fontSize: 28,
              }}
            >
              <use xlinkHref="#icon-funds-box-fill"></use>
            </svg>
            <div className="mt-[8px]">长期目标</div>
          </div>
        </div>
        {timeType === "range" ? (
          <RangePicker
            value={dateRangeVal}
            onChange={onRangeChange}
            className="w-[322px] mt-[32px]"
          />
        ) : (
          <DatePicker
            onChange={onDateChange}
            value={dateVal}
            className="w-[322px] mt-[32px]"
          />
        )}
        <Segmented
          options={
            groupInfo.createUserName === JSON.parse(userInfo).username
              ? [
                  { label: "个人目标", value: "personalTarget" },
                  { label: "团队目标", value: "groupTarget" },
                ]
              : [{ label: "个人目标", value: "personalTarget" }]
          }
          block
          value={value}
          onChange={onTargetTypeChange}
          className="mt-[24px] w-[322px]"
        />
      </div>
    ),
  };

  const okDisableStaus = () => {
    if (barWidth === 1 && !nameVal && nameVal === "") {
      return true;
    } else if (barWidth === 2 && !amountVal) {
      return true;
    } else if (barWidth === 3) {
      if (timeType === "range") {
        if (!dateRangeVal || !dateRangeVal.length) {
          return true;
        }
      } else {
        if (!dateVal) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  return (
    <Modal
      open={open}
      onOk={onNext}
      onCancel={onClose}
      cancelButtonProps={{ onClick: onPre }}
      width={920}
      title={isShowEdit.idEdit ? "编辑目标" : "新建目标"}
      okText={barWidth === 3 ? "创建" : "下一步"}
      cancelText={barWidth === 1 ? "取消" : "上一步"}
      okButtonProps={{ disabled: okDisableStaus() }}
    >
      <div className="mt-[24px]">
        <div
          className="h-[3px]"
          style={{
            background: colorSuccess,
            width: barEnum[barWidth],
            transition: ".6s all",
          }}
        />
      </div>

      <div className="mt-[24px]">{stepContentEnum[barWidth]}</div>
    </Modal>
  );
}
