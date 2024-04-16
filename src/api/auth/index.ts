import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { LoginData, LoginResult } from './types'

/**
 * 登录API
 * @param params {LoginData}
 * @returns
 */
export function loginApi(params: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/api/v1/auth/login',
    method: 'post',
    params
  })
}