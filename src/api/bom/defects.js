import request from '@/utils/request'

export function saveDefects(data) {
  debugger
  return request({
    url: '/bom/v1/defects/saveDefects',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function updateDefects(data) {
  return request({
    url: '/bom/v1/defects/updateDefects',
    method: 'put',
    data: JSON.stringify(data)
  })
}

export function findDefectsById(id) {
  return request({
    url: '/bom/v1/defects/findDefectsById',
    method: 'get',
    params: {
      id: id
    }
  })
}

export function deleteDefets(id) {
  return request({
    url: '/bom/v1/defects/deleteDefets',
    method: 'delete',
    params: {
      id: id
    }
  })
}

export function findDefectsPage(param, size, pageIndex) {
  return request({
    url: '/bom/v1/defects/findDefectsPage',
    method: 'get',
    params: {
    	param: param,
    	size: size,
    	current: pageIndex
    }
  })
}

export function findDefectsList(param) {
  return request({
    url: '/bom/v1/defects/findDefectsList',
    method: 'get',
    params: {
    	param: param
    }
  })
}
