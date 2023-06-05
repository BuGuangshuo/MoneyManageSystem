/*
 * @Author: 卜广硕 guangshuo.bu@datatist.com
 * @Date: 2023-02-17 14:27:30
 * @LastEditors: 卜广硕 guangshuo.bu@datatist.com
 * @LastEditTime: 2023-06-05 17:09:50
 * @FilePath: \MoneyManageSystem\src\pages\home\index.tsx
 * @Description: 首页欢迎界面
 */
import React, { useEffect, useState } from 'react'

import { Layout, Menu, Breadcrumb, Button, theme, Modal, message, Avatar, Progress, List, Space, ColorPicker } from 'antd'

import { StarOutlined, LikeOutlined, MessageOutlined, createFromIconfontCN } from '@ant-design/icons';

import { familyCreate, getMemberInfo } from '../../utils/http'

import WelcomeUser from '@/assets/img/undraw_welcome_cats_thqn.svg'
import WelcomeSvg from '../../components/themeSvg/welecome';

import ThreeCard from '../../components/threeCard';
import NewHomePage from './newHome';

import styles from './index.module.less'

import { navigate } from '@reach/router'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_2880815_e6sdckc7orm.js',
});

const data = [
  {
    title: 'Perter Griffon',
    desc: '圆蛤镇啤酒厂职员'
  },
  {
    title: 'Lois Griffon',
    desc: '家庭主妇'
  },
  {
    title: 'Ant Design Title 3',
    desc: '圆蛤镇啤酒厂职员'
  },
  {
    title: 'Ant Design Title 4',
    desc: '圆蛤镇啤酒厂职员'
  },
  {
    title: 'Ant Design Title 3',
    desc: '圆蛤镇啤酒厂职员'
  },
  {
    title: 'Ant Design Title 4',
    desc: '圆蛤镇啤酒厂职员'
  },
];

const data2 = Array.from({ length: 23 }).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

export default function Home() {

  const [userInfo, setUserInfo] = useState<string>(sessionStorage.getItem('user') || '');
  const [memberInfo, setMemberInfo] = useState<any>();
  const [reflash, setReflash] = useState<boolean>(false)

  let getTimeState = () => {
    // 获取当前时间
    let timeNow = new Date();
    // 获取当前小时
    let hours = timeNow.getHours();
    // 设置默认文字
    let text = ``;
    // 判断当前时间段
    if (hours >= 0 && hours < 12) {
        text = `早上好`;
    } else if (hours === 12) {
        text = `中午好`;
    } else if (hours  > 12 && hours < 18) {
        text = `下午好`;
    } else {
        text = `晚上好`;
    }
    // 返回当前时间段对应的状态
    return text;
};

  const onFamilySave = async() => {
    const userId = sessionStorage.getItem('userId');
    await familyCreate({userId, familyName: 'testFamily'})
  }

  const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  const {
    token: { colorPrimaryText, colorTextLabel, colorTextSecondary, colorInfoBorderHover, colorBorder, colorWhite, colorBorderSecondary, colorError, colorInfo, colorSuccess, colorPrimary },
  } = theme.useToken();

  const TitleStyle = {
    color: colorTextLabel
  }

  useEffect(() => {
    const getMember = async () => {
      const { username } = JSON.parse(userInfo);
      const res = await getMemberInfo({username});
      if(res) {
        setMemberInfo(res.data);
      }
    }
    getMember();
  },[reflash]);
  // const cardItemStyle = {
  //   backgroundColor: `${colorWarningHover}`,
  //   backgroundImage: `linear-gradient(62deg, ${colorWarningHover} 0%, ${colorErrorHover} 100%)`
  // }

  const reload = () => {
    setReflash(!reflash)
  }

  return (
    <>
      {
        memberInfo ? <div className={styles['dashboard-wrap']}>
        <div className={styles['left']} style={{borderRight: `1px solid ${colorBorderSecondary}`}}>
          {/* <div className={styles['card-wrap']} style={{backgroundColor: 'rgb(83, 109, 254)', backgroundImage: `linear-gradient(23deg, rgb(83, 109, 254) 0%, #fafafa 100%)`}}> */}
          <div className={styles['card-wrap']} style={{borderBottom: `1px solid ${colorBorderSecondary}`}}>
            {/* <div className={styles['title']} style={TitleStyle}>首页概览</div> */}
            <div className={styles['welcome-wrap']}>
              <div className='DingDing' style={{color: colorPrimaryText, fontSize: 46}}>
                {getTimeState()}，
              </div>  
              <div className='DingDing' style={{color: colorPrimaryText, fontSize: 46, marginTop: 8}}>{JSON.parse(userInfo).infoname}</div>
              <div className='AiliFont' style={{color: colorTextSecondary, margin: '24px 0', fontSize: 12 , lineHeight: '20px'}}>
                欢迎进入财政管理系统，您可以查看您团队财政的详细概览、团队组成等基础信息。
              </div>
              <div className={styles['card-btn']}>
                  <Button type="primary" onClick={() => navigate('/general')}>查看概览</Button>
              </div>
            </div>
          
            <div className={styles['welcome-img']}>
                <WelcomeSvg theme={colorPrimary}/>
            </div>
          </div>
          <div className={styles['family-info']}>
            <div className={styles['family-title']} style={{color: colorTextSecondary}}>团队信息</div>
            <div className={styles['family-wrap']}>
              <div className={styles['info-left']}>
                <div className={styles['family-primary-person']}>
                <div className={styles.card} style={{background: colorPrimary, color: colorWhite, fontWeight: 500}}>
                  <div className={styles['card-avatar-wrap']}>
                    <div className={styles.avatar}><Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=44'/></div>
                    <div className={styles.userInfo}>
                      <div>恶搞之家</div>
                      <div>Peter Griffon</div>
                    </div>
                  </div>
  
                  <div className={styles.userInCome}>成员数：6</div>
                </div>
  
              <div className={styles['process-card']}>
                <div className={styles.card} style={{ fontWeight: 500, width: '93%', marginLeft: 38, background: colorPrimary, color: colorWhite}}>
                    <div className={styles['team-process-title']} style={{color: colorWhite}}>团队进度</div>
                    
                    <div className={styles["team-process-wrap"]}>
                      <div className={styles['team-process-target']}>目标：239000￥</div>
                      <div className={styles['team-process-now']}>当前：123500￥</div>
                    </div>
                    
                    <div className={styles['team-process-bar']}><Progress percent={50} status="active" strokeColor='#fff'/></div>
                  </div>
              </div>
                
              </div>
  
              <div className="team-user-wrap">
                  <div className={styles['team-user']} style={{border: `1px solid ${colorBorder}`}}>
                    <div>
                      <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                          <List.Item>
                            <List.Item.Meta
                              avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                              title={<a href="https://ant.design">{item.title}</a>}
                              description={item.desc}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  </div> 
              </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles['right']}>
        <div className={styles['news-wrap-title']} style={{color: colorTextLabel}}>目标详情</div>
          <div className={styles['target-list']}>
          <div className={styles['target-info']}>
                  <div className={styles['target-item']}>
                    <div className={styles['target-item-title']} style={{color: colorTextSecondary}}>总目标数</div>
                    <div className='AiliFont' style={{color: colorPrimaryText, fontSize: 34, fontWeight: 600}}>114</div>
                  </div>
                  <div className={styles['target-item']}>
                    <div className={styles['target-item-title']} style={{color: colorTextSecondary}}>已完成目标</div>
                    <div className='AiliFont' style={{color: colorPrimaryText, fontSize: 34, fontWeight: 600}}>114</div>
                  </div>
                  <div className={styles['target-item']}>
                    <div className={styles['target-item-title']} style={{color: colorTextSecondary}}>总目标时间</div>
                    <div className='AiliFont' style={{color: colorPrimaryText, fontSize: 34, fontWeight: 600}}>114</div>
                  </div>
  
                  <div className={styles['target-item']}>
                    <div className={styles['target-item-title']} style={{color: colorTextSecondary}}>完成占比</div>
                    <div className='AiliFont' style={{color: colorPrimaryText, fontSize: 34, fontWeight: 600}}>46%</div>
                  </div>
  
                  <div className={styles['target-item']}>
                    <div className={styles['target-item-title']} style={{color: colorTextSecondary}}>完成占比</div>
                    <div className='AiliFont' style={{color: colorPrimaryText, fontSize: 34, fontWeight: 600}}>46%</div>
                  </div>
                </div>
          </div>
  
          <div className={styles['entry-card']}>
            <ThreeCard theme1={colorError} theme2={colorInfo} theme3={colorSuccess}/>
          </div>
          
          <div className={styles['news-wrap-title']} style={{color: colorTextLabel}}>最新文章</div>
          <div className={styles['news-list']}>
            <List
              itemLayout="vertical"
              // size="large"
              dataSource={data2}
              renderItem={(item) => (
                <List.Item
                  key={item.title}
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                  ]}
                  extra={
                    <img
                      width={272}
                      alt="logo"
                      src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                  }
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href} className={styles['news-title']}>{item.title}</a>}
                    description={item.description}
                  />
                  <div className={styles['news-content']}>
                    {item.content}
                  </div>
                  
                </List.Item>
              )}
            />
          </div>
        </div>
      </div> : 
      <div>
        <NewHomePage reload={reload}/>
      </div>
      }
    </>
  )
}
