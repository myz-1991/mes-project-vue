import request from '@/utils/request'

export function findMdcCollectionObjectAll() {
  return request({
    url: '/equipment/mdcCollectionObject/All',
    method: 'post',
    params: {
    }
  })
}
export function fifteenYield(data) {
  return request({
    url: '/equipment/api/fifteenYield',
    method: 'post',
    params: data
  })
}
export function fifteenYieldByCpPid(data) {
  return request({
    url: '/equipment/api/fifteenYieldByCpPid',
    method: 'post',
    params: data
  })
}
export function OEE(data) {
  return request({
    url: '/equipment/api/getOEE',
    method: 'post',
    data: JSON.stringify(data)
  })
}
export function findTypeValues(name) {
  return request({
    url: '/equipment/mdcCollectionObjectItem/All',
    method: 'get',
    params: {
      name: name
    }
  })
}
export function oneProductNum(data) {
  return request({
    url: '/equipment/api/productNum',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function productSpectaculars() {
  return request({
    url: '/equipment/api/productSpectaculars',
    method: 'post',
    data: {}
  })
}
export function yieldSpectaculars() {
  return request({
    url: '/equipment/api/yieldSpectaculars',
    method: 'post',
    data: {}
  })
}
export function yieldSpectacularsCopy() {
  return request({
    url: '/equipment/api/yieldSpectacularsCopy',
    method: 'post',
    data: {}
  })
}
export function productSpectacularsCopy() {
  return request({
    url: '/equipment/api/productSpectacularsCopy',
    method: 'post',
    data: {}
  })
}
export function ganttChart(data) {
  return request({
    url: '/equipment/api/ganttChart',
    method: 'post',
    data: JSON.stringify(data)
  })
}

export function taskNumber(data) {
  return request({
    url: '/equipment/api/taskNumber',
    method: 'post',
    data: JSON.stringify(data)
  })
}
export function yearTaskNumber() {
  return request({
    url: '/equipment/api/yearTaskNumber',
    method: 'get',
    params: {
    }
  })
}

export function monthTaskNumber() {
  return request({
    url: '/equipment/api/monthTaskNumber',
    method: 'get',
    params: {
    }
  })
}

export function dayTaskNumber() {
  return request({
    url: '/equipment/api/dayTaskNumber',
    method: 'get',
    params: {
    }
  })
}
export function yearTaskFailNumber() {
  return request({
    url: '/equipment/api/yearTaskFailNumber',
    method: 'get',
    params: {
    }
  })
}
export function yearTaskSucceedNumber() {
  return request({
    url: '/equipment/api/yearTaskSucceedNumber',
    method: 'get',
    params: {
    }
  })
}
export function monthSucceedTaskNumber() {
  return request({
    url: '/equipment/api/monthSucceedTaskNumber',
    method: 'get',
    params: {
    }
  })
}

export function monthSucceedTaskRate() {
  return request({
    url: '/equipment/api/monthSucceedTaskRate',
    method: 'get',
    params: {
    }
  })
}
export function monthFailTaskRate() {
  return request({
    url: '/equipment/api/monthFailTaskRate',
    method: 'get',
    params: {
    }
  })
}
export function getPlan() {
  return request({
    url: '/equipment/api/getPlan',
    method: 'get',
    params: {
    }
  })
}

export function getTask() {
  return request({
    url: '/equipment/api/getTask',
    method: 'get',
    params: {
    }
  })
}

export function equipmentStatus(name) {
  return request({
    url: '/equipment/api/equipmentStatus',
    method: 'get',
    params: {
      name: name
    }
  })
}

export function getEquipmentName(name) {
  return request({
    url: '/equipment/api/getEquipmentName',
    method: 'get',
    params: {
      name: name
    }
  })
}
export function getEquipmentCollectionPoint(name) {
  return request({
    url: '/equipment/api/getEquipmentCollectionPoint',
    method: 'get',
    params: {
      name: name
    }
  })
}

export function getCYJTableTitle() {
  return request({
    url: '/equipment/api/getCYJTableTitle',
    method: 'get',
    params: {
    }
  })
}

export function getCYJ() {
  return request({
    url: '/equipment/api/getCYJ',
    method: 'get',
    params: {
    }
  })
}
