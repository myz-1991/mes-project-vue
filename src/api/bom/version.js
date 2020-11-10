import request from '@/utils/request'

export function saveProcessVersion(data) {
	return request({
		url: '/bom/v1/version/saveProcessVersion',
		method: 'post',
		data: JSON.stringify(data)
	})
}

export function updateProcessVersion(data) {
	return request({
		url: '/bom/v1/version/updateProcessVersion',
		method: 'put',
		data: JSON.stringify(data)
	})
}

export function findProcessVersionByIdd(id) {
	return request({
		url: '/bom/v1/version/findProcessVersionById',
		method: 'get',
		params: {
			id: id
		}
	})
}

export function findProcessVersionPage(id, param, size, pageIndex) {
	return request({
		url: '/bom/v1/version/findProcessVersionPage',
		method: 'get',
		params: {
			id : id,
			param: param,
			size: size,
			current: pageIndex
		}
	})
}

export function findProcessVersionList(id, param) {
	return request({
		url: '/bom/v1/version/findProcessVersionList',
		method: 'get',
		params: {
			id : id,
			param: param
		}
	})
}

export function saveProcessVersionRelation(data) {
	return request({
		url: '/bom/v1/relation/saveProcessVersionRelation',
		method: 'post',
		data: JSON.stringify(data)
	})
}

export function findProcessVersionListByMateId(mateId) {
	return request({
		url: '/bom/v1/relation/findProcessVersionListByMateId',
		method: 'get',
		params: {
			mateId: mateId
		}
	})
}
