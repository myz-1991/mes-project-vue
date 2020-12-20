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

export function getUserDetail(id) {
  return request({
    url : '/system/v1/user/findUserById',
    method : 'get',
    params : {
      id : id
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
    data : JSON.stringify(data)
  })
}

export function updateUser(data) {
  return request({
    url : '/system/v1/user/updateUser',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function saveUserRoleRelation(data) {
  return request({
    url : '/system/v1/relation/saveUserRoleRelation',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function findUserRoleRelation(userId) {
  return request({
    url : '/system/v1/relation/findUserRoleRelationByUserId',
    method : 'get',
    params : {
      userId : userId
    }
  })
}

export function findUserList(param) {
	return request({
		url : '/system/v1/user/findUserList',
		method : 'get',
		params : {
			param : param
		}
	})
}

export function importUsers(data) {
	return request({
		url : '/system/v1/user/importUsers',
		method : 'post',
		data : data
	})
}