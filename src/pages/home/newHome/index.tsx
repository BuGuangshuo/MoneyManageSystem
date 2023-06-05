import React, { useState, useRef, useEffect } from 'react'

import { Button, theme, Modal, Popover, Input, Upload, message, Form, Radio, Space } from 'antd'

import type { UploadChangeParam } from 'antd/es/upload';

import type { RadioChangeEvent } from 'antd';

import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

import { LoadingOutlined, PlusOutlined, createFromIconfontCN } from '@ant-design/icons';

import { groupCreate, groupValidate } from '../../../utils/http'

import type { TourProps } from 'antd';

import ExploreBtn from '../../../components/exploreBtn'

import { MyIcon } from '../../../utils/icon'

import Img from '../../../assets/img/undraw_experience_design_re_dmqq.svg'

import NewWelcomeSvg from '../../../components/themeSvg/newWelcome'

import './index.less'

const { TextArea } = Input;

const IconFont = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/c/font_2880815_dxlingdpb1b.js',
});

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  };
  
  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };

export default function NewHomePage(props) {
    const [addPopOpen, setAddPopOpen] = useState<boolean>(false);
    const [createOpen, setCreateOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [isPublic, setIsPublic] = useState('public');

    const ref1 = useRef(null);
    const ref2 = useRef(null);

    const [form] = Form.useForm();

    const { reload } = props;
    const {
        token: { colorTextSecondary, colorPrimary, colorTextTertiary },
      } = theme.useToken();

      const onIsPublicChange = (e: RadioChangeEvent) => {
        setIsPublic(e.target.value);
      };

    const hide = () => {
        setAddPopOpen(false);
    };
    
    const handleOpenChange = (newOpen: boolean) => {
        setAddPopOpen(newOpen);
    };

    const showCreateModal = () => {
        form.setFieldsValue({
            name: null,
            id: null,
            isPublic: 'public',
            memo: '',
        });

        setImageUrl('');
        setCreateOpen(true);
      };
    
    const submit = async () => {
        let params;
        const userInfo: any = JSON.parse(sessionStorage.getItem('user') || '');
        try {
            const formInfo = await form.validateFields();
            let { name, id, isPublic, memo } = formInfo;
            params = {
                groupName: name,
                groupId: id,
                isPublic,
                memo,
                imageUrl,
                createUserName: userInfo.username
            };
            await groupCreate(params);
            message.success('团队创建成功')
            reload()
            setCreateOpen(false);
          } catch (err) {
            console.error(err);
          }
    };

      const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        getBase64(info.file.originFileObj as RcFile, (url) => {
            setImageUrl(url);
          });
      };
    
      const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>团队头像</div>
        </div>
      );

      
    const getCreateGroupContent = () => {
        return (
            <div className="createModalContent">
                <div className="avant-wrap">
                        <Upload
                            name="avatar"
                            listType="picture-circle"
                            className="avatar-uploader"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload>

                        <div className="upload-desc" style={{ color: colorTextTertiary }}>上传图片格式JPG/PNG</div>
                </div>

                <div className="form-wrap">
                    <Form
                        layout='vertical'
                        form={form}
                        initialValues={{
                            isPublic: "public"
                        }}
                        // onValuesChange={onFormLayoutChange}
                        >
                        <Form.Item 
                            label="团队名称" 
                            name='name'
                            rules={[
                                {
                                  required: true,
                                  message: '请输入团队名称',
                                },
                                {
                                    validator: async (_: any, inputValue: any) => {
                                      try {
                                        const res = await groupValidate({ groupName: inputValue, type: 'groupName'});

                                        if(!res) {
                                            return Promise.reject(new Error('验证失败'));
                                        }

                                        if (res.code === 201) {
                                          return Promise.reject(new Error('团队名称已存在'));
                                        } else {
                                          return Promise.resolve();
                                        }
                                      } catch (error) {
                                        return Promise.reject(new Error('请求错误'));
                                      }
                                    }
                                  },
                              ]}
                        >
                            <Input placeholder="请输入团队名称" />
                        </Form.Item>
                        <Form.Item 
                            label="团队号" 
                            name='id'
                            rules={[
                                {
                                  required: true,
                                  message: '请输入团队编号',
                                },
                                {
                                    validator: async (_: any, inputValue: any) => {
                                      try {
                                        const res = await groupValidate({ groupId: inputValue, type: 'groupId'});

                                        if(!res) {
                                            return Promise.reject(new Error('验证失败'));
                                        }

                                        if (res.code === 201) {
                                          return Promise.reject(new Error('团队编号已存在'));
                                        } else {
                                          return Promise.resolve();
                                        }
                                      } catch (error) {
                                        return Promise.reject(new Error('请求错误'));
                                      }
                                    }
                                  },
                              ]}
                            >
                            <Input placeholder="请设置团队唯一号码" />
                        </Form.Item>
                        <Form.Item name="isPublic">
                            <Radio.Group onChange={onIsPublicChange} value={isPublic}>
                                <Space direction="vertical">
                                    <Radio value='public'>
                                        <div className='isPublic-wrap'>
                                            <div className='isPublic-icon'><svg className="icon" aria-hidden="true" style={{color: colorTextTertiary }}>
                                                    <use xlinkHref="#icon-gonggongchuangxinpingtai"></use>
                                                </svg></div>
                                            <div className='isPublic-content'>
                                                <div className='isPublic-title'>公开</div>
                                                <div className='isPublic-desc' style={{color: colorTextTertiary }}>所有人都可以通过搜索团队号直接加入</div>
                                            </div>
                                        </div>
                                    </Radio>
                                    <Radio value='private'>
                                            <div className='isPublic-wrap'>
                                                {/* <div className='isPublic-icon'><IconFont type='icon-suoding' style={{color: colorTextTertiary }}/></div> */}
                                                <div className='isPublic-icon'>
                                                <svg className="icon" aria-hidden="true" style={{color: colorTextTertiary }}>
                                                    <use xlinkHref="#icon-suoding"></use>
                                                </svg>
                                                </div>
                                                <div className='isPublic-content'>
                                                <div className='isPublic-title'>私有</div>
                                                <div className='isPublic-desc' style={{color: colorTextTertiary }}>需经过管理者审核通过加入团队</div>
                                            </div>
                                        </div>
                                    </Radio>
                                </Space>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item label="团队描述" name="memo">
                            <TextArea placeholder="请输入团队描述" />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }

    const getAddPopContent = () => {
        return (
            <div>
                <div className='addGroupInput'><Input placeholder="请输入团队编号"/></div>
                <div className='addGroupBtn'><Button type='primary'>申请加入</Button></div>
            </div>
        )
    }
    
  return (
    <div className="newHome-wrap">
        <div className="newHome-left-wrap">
            <div className="newHome-title DingDing" style={{color: colorPrimary}}>Welcome</div>
            <div className="newHome-desc DingDing" style={{color: colorTextSecondary}}>欢迎使用财政管理系统,您可以在这里详细查看您团队或个人的财政信息、分析数据等。</div>
            <div className="newHome-desc DingDing" style={{color: colorTextSecondary}}>首先您可以创建您的团队或加入已有团队。</div>

            <div className="newHome-btn-wrap">
                <div ref={ref1} onClick={showCreateModal}><ExploreBtn name="创建团队"/></div>
                <Popover
                    content={getAddPopContent()}
                    overlayClassName="addGroupPop"
                    title="加入团队"
                    trigger="click"
                    placement="bottomRight"
                    open={addPopOpen}
                    onOpenChange={handleOpenChange}
                >
                   <div ref={ref2}><ExploreBtn name="加入团队"/></div>
                </Popover>
            </div>
        </div>

        <div className='newHome-right'>
            <div>
                <NewWelcomeSvg theme={colorPrimary}/>
            </div>
        </div>

        <Modal
            title="创建团队"
            open={createOpen}
            onOk={submit}
            className='createModal'
            onCancel={() => setCreateOpen(false)}
            okText="创建"
            cancelText="取消"
            width={535}
            destroyOnClose={true}
        >
            {getCreateGroupContent()}
        </Modal>
    </div>
  )
}