import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/v1/user/login',
    method: 'get',
    params: {
      account: data.account,
      password: data.password
    }
  })
}

export function getInfo(id) {
  return request({
    url: '/system/v1/user/getUserInfo',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function getUserInfoPage(params, current, size) {
  return request({
  	url: '/system/v1/user/findUserByParamsForPage',
  	method: 'get',
  	params: {
  		params: params,
      current: current,
      size: size
  	}
  })
}

export function saveUser(data) {
  return request({
    url: '/system/v1/user/insertUser',
    method: 'post',
    data
  })
}
