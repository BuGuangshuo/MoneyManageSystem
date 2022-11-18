import React from 'react'
import ReactDOM from 'react-dom'
import './styles/global.less'
import { ConfigProvider, Button } from 'antd';
import App from './App'

ReactDOM.render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
      },
    }}
  >
    <App />
  </ConfigProvider>
    ,
  document.getElementById('root')
)
