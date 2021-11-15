import axios from 'axios';
import { message } from 'antd'

axios.defaults.baseURL = '/v1'
axios.defaults.timeout = 120000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8'

axios.interceptors.request.use((config:any) => {
  let token = window.localStorage.getItem('token')
  if(token) {
    config.headers.token = token
  }
  return config
}, (err:any) => {
  message.error(err.message)
})

axios.interceptors.response.use((response:any) => {
  if (response.status >= 500) {
    message.error(`服务器响应失败`)
  } else if (response.status >= 400 && response.status < 500) {
    message.error(`请求参数错误`)
  } else {
    return response.data
  }
  return {}
}, (err:any) => {
  message.error(`响应失败:${err.message}`)
})

export const Userlogin = (params: any): Promise<any> => {
  const { username, password } = params
  return axios.post(`/login`,{
    username,
    password
  })
}

export const UserRegister = (params: any): Promise<any> => {
  const { username, password, infoname } = params
  return axios.post(`/register`,{
    username,
    password,
    infoname
  })
}