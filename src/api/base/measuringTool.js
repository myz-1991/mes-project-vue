import request from '@/utils/request'

export function saveMeasuringTool(data) {
  return request({
    url : '/base/v1/measuringTool/saveMeasuringTool',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateMeasuringTool(data) {
  return request({
    url : '/base/v1/measuringTool/updateMeasuringTool',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findMeasuringToolById(id) {
  return request({
    url : '/base/v1/measuringTool/findMeasuringToolById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findMeasuringToolPage(param, size, pageNum) {
  return request({
    url : '/base/v1/measuringTool/findMeasuringToolPage',
    method : 'get',
    params : {
      param : param,
      size : size,
      current : pageNum
    }
  })
}

export function findMeasuringToolList(param) {
  return request({
    url : '/base/v1/measuringTool/findMeasuringToolList',
    method : 'get',
    params : {
      param : param
    }
  })
}