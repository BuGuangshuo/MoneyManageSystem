import react, { useState, useEffect } from 'react'
import { ConfigProvider, theme } from 'antd';
import { useThemeModel } from './models/theme'
import { useThemeColorModel } from './models/themeColor';
import './assets/iconfont/iconfont.js';

import Routes from './routes'

import './App.css'

function App() {
  // const [themeModel, setThemeModel] = useState('light');

  const loc = localStorage.getItem('theme');

  const { themeType } = useThemeModel();
  const { themeColor } = useThemeColorModel();

  useEffect(() => {
    if(!loc) {
      localStorage.setItem('theme', themeType)
    }
  },[]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: themeColor,
          colorError: '#f43f5e',
          colorInfo: '#3b82f6',
          colorSuccess: '#22c55e',
          colorText: "rgba(0,0,0,.78)",
          motionUnit: .17
        },
        algorithm: loc === 'light' || !loc ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
    <Routes/> 
  </ConfigProvider>
  )
}

export default App
