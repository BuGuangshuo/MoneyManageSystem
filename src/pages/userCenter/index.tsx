/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2022-11-15 14:31:52
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-05-26 18:39:00
 * @FilePath: \MoneyManageSystem\src\pages\userCenter\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import { theme, Upload, Descriptions, Avatar, Empty, message } from "antd";
import type { UploadChangeParam } from "antd/es/upload";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { DescriptionsProps } from "antd";

import { createFromIconfontCN, UserOutlined } from "@ant-design/icons";

import MessageSvg from "../../components/themeSvg/message";

import "./index.less";

const IconFont = createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/c/font_2880815_xj4hr6djr6r.js",
});

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function UserCenter() {
  const [imageUrl, setImageUrl] = useState<string>();

  const locTheme = localStorage.getItem("theme");

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "账号",
      children: "BuGuangshuo",
    },
    {
      key: "2",
      label: "昵称",
      children: "卜卜星",
    },
    {
      key: "3",
      label: "职业/专业",
      children: "前端开发工程师",
    },
    {
      key: "4",
      label: "所在团队",
      children: "攒钱小组",
    },
    {
      key: "5",
      label: "所在地区",
      children: "辽宁省-大连市",
    },
    {
      key: "6",
      label: "注册时间",
      children: "2023年8月15日",
    },
  ];

  useEffect(() => {
    console.log(locTheme);
  }, [locTheme]);

  const {
    token: {
      colorTextLabel,
      colorPrimary,
      colorBorderSecondary,
      colorText,
      colorTextDescription,
    },
  } = theme.useToken();

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    getBase64(info.file.originFileObj as RcFile, (url) => {
      setImageUrl(url);
    });
  };

  return (
    <div className="usercenter-wrap">
      <div className="usercenter-content">
        {/* <div className="setting-title" style={{ color: colorTextLabel, borderColor: colorBorderSecondary}}>个人中心</div> */}

        <div className="content-user-background-card">
          <div className="userAvaWrap">
            <ImgCrop rotationSlider>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="usercenter-avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl || ""}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  <UserOutlined style={{ color: "#fff", fontSize: 36 }} />
                )}
              </Upload>
            </ImgCrop>
            <div className="userAvaName">Alan</div>
            <div className="userAvaInfo">
              <div>前端开发工程师</div>
              <div>北京</div>
            </div>
          </div>
        </div>

        <div className="setting-wrap">
          {/* <div className="setting-menu">
            <Menu items={items} defaultSelectedKeys={['userInfo']}/>
          </div> */}
          <div className="setting-info">
            {/* <Row gutter={[24, 24]}>
              <Col span={12}>
                <div className="setting-info-Card1">Col</div>
              </Col>
              <Col span={12}>
                <div className="setting-info-Card1">Col</div>
              </Col>
            </Row> */}

            <div className="setting-info-row1">
              <div
                className="setting-info-Card1"
                style={{ border: `2px solid ${colorBorderSecondary}` }}
              >
                <div
                  className="infoCardTitle"
                  style={{ color: colorTextLabel }}
                >
                  个人信息
                </div>
                <div className="info">
                  <Descriptions items={items} layout="vertical" />
                </div>
              </div>
              <div
                className="setting-info-Card2"
                style={{ border: `2px solid ${colorBorderSecondary}` }}
              >
                <div className="achieveTitleWrap">
                  <div
                    className="infoCardTitle"
                    style={{ color: colorTextLabel }}
                  >
                    成就
                  </div>
                  <div
                    className="moreAchieve"
                    style={{ color: colorTextLabel }}
                  >
                    显示更多
                  </div>
                </div>

                <div className="userSettingAchieveWrap">
                  <div className="achieveItem">
                    <div className="achieveIcon">
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-No1"></use>
                      </svg>
                    </div>
                    <div className="achieveTitle DingDing">存款冠军</div>
                  </div>
                  <div className="achieveItem">
                    <div className="achieveIcon">
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-ewairenwuchengjiutian"></use>
                      </svg>
                    </div>
                    <div className="achieveTitle DingDing">连续30天</div>
                  </div>
                  <div className="achieveItem">
                    <div className="achieveIcon">
                      <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#icon-jiangbei-"></use>
                      </svg>
                    </div>
                    <div className="achieveTitle DingDing">最佳贡献</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="setting-info-row2">
              <div
                className="setting-info-Card3"
                style={{ border: `2px solid ${colorBorderSecondary}` }}
              >
                <div
                  className="infoCardTitle"
                  style={{ color: colorTextLabel }}
                >
                  最新动态
                </div>
                <div className="trendsWrap">
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                  <div
                    className="trendsItem"
                    style={{ borderColor: colorBorderSecondary }}
                  >
                    <div className="avatarWrap">
                      <Avatar src="" size="large" />
                    </div>
                    <div className="trendsContent">
                      <div
                        className="trendsAction"
                        style={{ color: colorTextDescription }}
                      >
                        赞了该文章
                      </div>
                      <div className="trendsNews" style={{ color: colorText }}>
                        新华网年终特别策划：《这一年，你过得怎么样？》回访那些你最熟悉的“陌生人”带你重温这难忘的2021年回顾我们共同记忆中的生动故事！
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="setting-info-Card4"
                style={{ border: `2px solid ${colorBorderSecondary}` }}
              >
                <div
                  className="infoCardTitle"
                  style={{ color: colorTextLabel }}
                >
                  通知
                </div>
                <div className="settingInfoMsgWrap">
                  <Empty
                    description="暂无通知"
                    image={<MessageSvg theme={colorPrimary} />}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
