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

export const getMenuList = (): Promise<any> => {
  return axios.get(`/menu`)
}

export const getRolesList = (params:string): Promise<any> => {
  return axios.get(`/roles?user=${params}`)
}

export const userListQuery = (params: any): Promise<any> => {
  return axios.post(`/userManage/user/query`, params)
}

export const userListDelete = (params: any): Promise<any> => {
  return axios.post(`/userManage/user/delete`, params)
}

export const familyCreate = (params: any): Promise<any> => {
  return axios.post(`/family/create`, params)
}

export const systemSettingUpdate = (params: any): Promise<any> => {
  return axios.post(`/systemSetting/systemSetting`, params)
}

export const groupCreate = (params: any): Promise<any> => {
  return axios.post(`/group/create`, params)
}

export const getGroup = (params?: any): Promise<any> => {
  return axios.post(`/group/get`, params)
}

export const groupValidate = (params: any): Promise<any> => {
  return axios.post(`/group/validate`, params)
}

export const getMemberInfo = (params: any): Promise<any> => {
  return axios.post(`/member/get`, params)
}

export const getUserInfo = (params: any): Promise<any> => {
  return axios.post(`/userInfo/get`, params)
}

export const saveUserInfo = (params: any): Promise<any> => {
  return axios.post(`/userInfo/save`, params)
}

export const saveMember = (params: any): Promise<any> => {
  return axios.post(`/member/save`, params)
}

export const approveSend = (params: any): Promise<any> => {
  return axios.post(`/group/approve`, params)
}

export const getProcess = (params: any): Promise<any> => {
  return axios.post(`/process/get`, params)
}