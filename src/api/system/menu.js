import request from '@/utils/request'

export function saveMenu(data) {
  return request({
    url : '/system/v1/menu/saveMenu',
    method : 'post',
    data : JSON.stringify(data)
  })
}

export function updateMenu(data) {
  return request({
    url : '/system/v1/menu/updateMenu',
    method : 'put',
    data : JSON.stringify(data)
  })
}

export function getMenuDetail(id) {
  return request({
    url : '/system/v1/menu/findMenuById',
    method : 'get',
    params : {
      menuId : id
    }
  })
}

export function deleteMenu(id) {
  return request({
    url : '/system/v1/menu/deleteMenuById',
    method : 'delete',
    params : {
      menuId : id
    }
  })
}

export function getMenuTree(pid, param) {
  return request({
    url : '/system/v1/menu/findMenuListTree',
    method : 'get',
    params : {
      pid : pid,
      param : param
    }
  })
}

export function getMenuTreeExpend() {
  return request({
    url : '/system/v1/menu/findMenuTreeExpend',
    method : 'get'
  })
}
