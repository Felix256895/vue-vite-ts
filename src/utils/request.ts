import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
})

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  return config
},
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use((response: AxiosResponse) => {
  const { code, msg } = response.data
  if (code === '000000') {
    return response.data
  }
  ElMessage.error(msg || '系统出错')

  return Promise.reject(new Error(msg || 'Error'))
},
  (error: any) => {

    if (error?.response?.data) {
      const { code, msg } = error?.response?.data
      if (code === 'A0230') {

      } else {
        ElMessage.error(msg || '系统出错');
      }
    }

    return Promise.reject(error?.message)
  }
)

export default service