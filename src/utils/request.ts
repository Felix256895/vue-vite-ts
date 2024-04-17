import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import { localStg } from '@/utils/storage'
import { useUserStoreHook } from '@/store'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 50000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' }
});

service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStg.get('accessToken');
  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config
},
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use((response: AxiosResponse) => {
  const { code, msg } = response.data
  if (code === '00000') {
    return response.data
  }

  // 响应数据为二进制流处理(Excel导出)
  if (response.data instanceof ArrayBuffer) {
    return response;
  }

  ElMessage.error(msg || '系统出错')

  return Promise.reject(new Error(msg || 'Error'))
},
  (error: any) => {

    if (error?.response?.data) {
      const { code, msg } = error?.response?.data
      // token过期
      if (code === 'A0230') {
        ElMessageBox.confirm("当前页面已失效，请重新登录", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          const userStore = useUserStoreHook();
          userStore.resetToken().then(() => {
            location.reload();
          });
        });
      } else {
        ElMessage.error(msg || '系统出错');
      }
    }

    return Promise.reject(error?.message)
  }
)

export default service