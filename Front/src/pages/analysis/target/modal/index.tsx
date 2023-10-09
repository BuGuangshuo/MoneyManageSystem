import React, { useState, useEffect } from "react";

import { theme, InputNumber, Modal, Input, Form, DatePicker } from "antd";

import "../index.less";
import {
  AppstoreOutlined,
  FieldTimeOutlined,
  FormOutlined,
} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const barEnum: any = { 1: "25%", 2: "50%", 3: "100%" };

export default function TargetModal(props: any) {
  const { open, isShowEdit, reflash, setReflash, onCancel } = props;

  const [barWidth, setBarWidth] = useState<number>(1);
  const [targetParam, setTargetParam] = useState({});

  const [nameForm] = Form.useForm();
  const [amountForm] = Form.useForm();
  const [timeForm] = Form.useForm();

  const {
    token: {
      colorBorderSecondary,
      colorSuccess,
      colorText,
      colorTextSecondary,
      colorTextTertiary,
    },
  } = theme.useToken();

  const onNext = async () => {
    console.log(nameForm.getFieldsValue());
    if (barWidth === 3) {
      onClose();
    } else {
      try {
        const nameParams = await nameForm.validateFields();
        const amountParams = await amountForm.validateFields();
        const timeParams = await timeForm.validateFields();

        setTargetParam({
          nameParams,
          amountParams,
          timeParams,
        });

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
    console.log(amountForm.getFieldsValue());

    amountForm.setFieldsValue({
      amount: 0,
    });

    nameForm.setFieldsValue({
      name: null,
    });

    timeForm.setFieldsValue({
      time: null,
    });
    setBarWidth(1);

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
        <Form
          name="nameForm"
          layout="vertical"
          form={nameForm}
          className="nameForm"
        >
          <Form.Item
            label="目标名称"
            name="name"
            rules={[{ required: true }, { max: 64 }]}
          >
            <Input placeholder="请输入本次目标名称" className="w-[400px]" />
          </Form.Item>
        </Form>
      </div>
    ),
    2: (
      <div className="flex items-center flex-col">
        <AppstoreOutlined
          className="mb-[16px] text-[24px]"
          style={{ color: colorTextSecondary }}
        />
        <div className="text-[16px] font-[600] mb-[24px]">目标金额</div>
        <Form
          name="amountForm"
          layout="vertical"
          form={amountForm}
          className="amount"
        >
          <Form.Item
            label="目标金额"
            name="amount"
            rules={[{ required: true }]}
          >
            <InputNumber
              placeholder="请输入本次目标金额"
              step={1000}
              className="w-[400px]"
            />
          </Form.Item>
        </Form>
      </div>
    ),
    3: (
      <div className="flex items-center flex-col">
        <FieldTimeOutlined
          className="mb-[16px] text-[24px]"
          style={{ color: colorTextSecondary }}
        />
        <div className="text-[16px] font-[600] mb-[24px]">目标金额</div>
        <Form
          name="timeForm"
          layout="vertical"
          form={timeForm}
          className="timeForm"
        >
          <Form.Item label="目标时间" name="time" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </div>
    ),
  };

  return (
    <Modal
      open={open}
      onOk={onNext}
      onCancel={onClose}
      cancelButtonProps={{ onClick: onPre }}
      destroyOnClose
      width={920}
      title={isShowEdit.idEdit ? "编辑目标" : "新建目标"}
      okText={barWidth === 3 ? "创建" : "下一步"}
      cancelText={barWidth === 1 ? "取消" : "上一步"}
    >
      <div className="mt-[24px]">
        <div
          className="h-[3px] transition duration-600"
          style={{ background: colorSuccess, width: barEnum[barWidth] }}
        />
      </div>

      <div className="mt-[24px]">{stepContentEnum[barWidth]}</div>
    </Modal>
  );
}
