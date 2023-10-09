import React, { useState, useEffect } from "react";

import { theme, Button } from "antd";

import "./index.less";

import TargetBlankSvg from "../../../components/themeSvg/targetBlank";
import { AimOutlined } from "@ant-design/icons";
import TargetModal from "./modal";

export default function Target(props: any) {
  const [open, setOpen] = useState<boolean>(false);
  const [isShowEdit, setIsShowEdit] = useState<any>({ idEdit: null });
  const [editValue, setEditValue] = useState<any>({});
  const [reflash, setReflash] = useState<boolean>(false);

  const {
    token: { colorBorderSecondary, colorTextSecondary, colorPrimary },
  } = theme.useToken();

  const changeVisible = (visible: boolean) => {
    setOpen(visible);
  };

  const addModelChange = () => {
    changeVisible(true);
    setIsShowEdit({ idEdit: null });
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
      </div>

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

          <Button type="primary" className="h-[38px]" onClick={addModelChange}>
            <AimOutlined className="mr-[8px] text-[18px] relative top-[2px]" />
            设置目标
          </Button>
        </div>
        <div className="w-[350px] h-[350px]">
          <TargetBlankSvg theme={colorPrimary} />
        </div>
      </div>

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
