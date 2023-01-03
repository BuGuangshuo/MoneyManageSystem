import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.less'
import { ConfigProvider, theme } from 'antd';
import App from './App'

ReactDOM.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: 'rgb(83, 109, 254)'
      },
      algorithm: theme.darkAlgorithm,
    }}
  >
    <App />
  </ConfigProvider>
    ,
  document.getElementById('root')
)
