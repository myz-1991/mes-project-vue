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
		url: '/system/v1/user/findUserById',
		method: 'get',
		params: {
			id: id
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
