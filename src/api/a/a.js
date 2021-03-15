import request from '@/utils/request'


export function findMdcCollectionObjectAll() {
  return request({
    url : '/equipment/mdcCollectionObject/All',
    method : 'post',
    params : {
    }
  })
}
export function fifteenYield(data) {
  return request({
    url : '/equipment/api/fifteenYield',
    method : 'post',
    params : data
  })
}
export function fifteenYieldByCpPid(data) {
  return request({
    url : '/equipment/api/fifteenYieldByCpPid',
    method : 'post',
    params : data
  })
}
export function OEE(data) {
  return request({
    url : '/equipment/api/getOEE',
    method : 'post',
    data : JSON.stringify(data)
  })
}
export function findTypeValues(name) {
  return request({
    url : '/equipment/mdcCollectionObjectItem/All',
    method : 'get',
    params : {
      name : name
    }
  })
}
export function oneProductNum(data) {
  return request({
    url : '/equipment/api/productNum',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function productSpectaculars() {
  return request({
    url : '/equipment/api/productSpectaculars',
    method : 'post',
    data : {}
  })
}
export function yieldSpectaculars() {
  return request({
    url : '/equipment/api/yieldSpectaculars',
    method : 'post',
    data : {}
  })
}
export function yieldSpectacularsCopy() {
  return request({
    url : '/equipment/api/yieldSpectacularsCopy',
    method : 'post',
    data : {}
  })
}
export function productSpectacularsCopy() {
  return request({
    url : '/equipment/api/productSpectacularsCopy',
    method : 'post',
    data : {}
  })
}
export function ganttChart(data) {
  return request({
    url : '/equipment/api/ganttChart',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function taskNumber(data) {
  return request({
    url : '/equipment/api/taskNumber',
    method : 'post',
    data : JSON.stringify(data)
  })
}
