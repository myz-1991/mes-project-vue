import request from '@/utils/request'

export function savePlan(data) {
	return request({
		url: '/plan/v1/task/savePlan',
		method: 'post',
		data: JSON.stringify(data)
	})
}

export function saveTask(data) {
	return request({
		url: '/plan/v1/task/saveTask',
		method: 'post',
		data: JSON.stringify(data)
	})
}

export function updateTask(data) {
	return request({
		url: '/plan/v1/task/updateTask',
		method: 'put',
		data: JSON.stringify(data)
	})
}

export function findTask(id) {
	return request({
		url: '/plan/v1/task/findTask',
		method: 'get',
		params: {
			id: id
		}
	})
}

export function deleteTask(id) {
	return request({
		url: '/plan/v1/task/deleteTask',
		method: 'delete',
		params: {
			id: id
		}
	})
}

export function pageTaskByParam(pid, taskType, param, mateName, mateCode, pageIndex, pageSize) {
	return request({
		url: '/plan/v1/task/pageTaskByParam',
		method: 'get',
		params: {
			pid: pid,
			taskType: taskType,
			param: param,
			mateName: mateName,
			mateCode: mateCode,
			current: pageIndex,
			size: pageSize
		}
	})
}

export function listTaskByParam(pid, taskType, param, mateName, mateCode) {
	return request({
		url: '/plan/v1/task/listTaskByParam',
		method: 'get',
		params: {
			pid: pid,
			taskType: taskType,
			param: param,
			mateName: mateName,
			mateCode: mateCode,
		}
	})
}

export function listTaskByWorkerId(workerId) {
	return request({
		url: '/plan/v1/task/listTaskByWorkerId',
		method: 'get',
		params: {
			workerId : workerId
		}
	})
}

export function importTaskData(path) {
	return request({
		url: '/plan/v1/task/importTaskData',
		method: 'post',
    data: path
		// params: {
		// 	file : path
		// }
	})
}
