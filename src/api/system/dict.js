import request from '@/utils/request'

export function findDictionaryTree(pid, param) {
  return request({
    url : '/system/v1/dictionary/findDictionaryTree',
    method : 'get',
    params : {
      pid : pid,
      param : param
    }
  })
}

export function findDictionaryById(dictId) {
  return request({
    url : '/system/v1/dictionary/findDictionaryById',
    method : 'get',
    params : {
      dictId : dictId
    }
  })
}

export function findDictionaryByCode(dictCode) {
  return request({
    url : '/system/v1/dictionary/findDictionaryByCode',
    method : 'get',
    params : {
      dictCode : dictCode
    }
  })
}

export function updateDictionary(data) {
  return request({
    url: '/system/v1/dictionary/updateDictionary',
    method: 'put',
    data: JSON.stringify(data)
  })
}

export function deleteDictionary(data) {
  return request({
    url: '/system/v1/dictionary/deleteDictionary',
    method: 'delete',
    data: JSON.stringify(data)
  })
}

export function saveDictionary(data) {
  return request({
    url: '/system/v1/dictionary/insertDictionary',
    method: 'post',
    data: JSON.stringify(data)
  })
}
