import react, { useState, useEffect } from 'react'
import { ConfigProvider, theme } from 'antd';
import { useThemeModel } from './models/theme'

import Routes from './routes'

import './App.css'

function App() {
  const [themeModel, setThemeModel] = useState('light');

  const loc = localStorage.getItem('theme') || 'light'

  const { themeType } = useThemeModel();

  useEffect(() => {
    setThemeModel(loc);
  },[loc]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(83, 109, 254)',
          colorError: '#f43f5e',
          colorInfo: '#3b82f6',
          colorSuccess: '#22c55e',
          motionUnit: .17
        },
        algorithm: themeModel === 'light' ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
    <Routes/> 
  </ConfigProvider>
  )
}

export default App
