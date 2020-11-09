import request from '@/utils/request'

export function saveMateriel(data){
  return request({
    url : '/base/v1/materiel/saveMateriel',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateMateriel(data) {
  return request({
    url : '/base/v1/materiel/updateMateriel',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function findMaterielById(id) {
  return request({
    url : '/base/v1/materiel/findMaterielById',
    method : 'get',
    params : {
      id : id
    }
  })
}

export function findMaterielPage(param, pageSize, pageIndex) {
  return request({
    url : '/base/v1/materiel/findMaterielPage',
    method : 'get',
    params : {
      param : param,
      size : pageSize,
      current : pageIndex
    }
  })
}

export function findMaterielList(param) {
  return request({
    url : '/base/v1/materiel/findMaterielList',
    method : 'get',
    params : {
      param : param
    }
  })
}