import request from '@/utils/request'

export function saveRelation(data) {
  return request({
    url : '/bom/v1/relation/saveRelation',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateRelation(data) {
  return request({
    url : '/bom/v1/relation/updateRelation',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findRelationById(id) {
  return request({
    url : '/bom/v1/relation/findRelationById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function deleteRelation(id) {
  return request({
    url: '/bom/v1/relation/deleteRelation',
    method: 'delete',
    params : {
		id : id
	}
  })
}

export function findRelationTree(pid, param) {
  return request({
    url: '/bom/v1/relation/findRelationTree',
    method: 'get',
    params : {
		pid : pid,
		param : param
	}
  })
}
