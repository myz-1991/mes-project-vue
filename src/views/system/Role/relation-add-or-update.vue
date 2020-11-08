<template>
  <el-dialog title="权限分配" :close-on-click-modal="false" :visible.sync="visible" width="30%">
    <el-form ref="dataForm" size="small" label-width="80px">
      <el-form-item size="mini" label="授权">
        <el-tree :data="menuList" :default-checked-keys="defaultChecked" :props="menuListTreeProps" node-key="menuId"
          ref="menuListTree" :default-expand-all="true" :check-strictly="true" show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    treeDataTranslate
  } from '@/utils'
  import {
    getMenuTreeExpend
  } from '@/api/system/menu'
  import {
    saveRoleResourceRelation,
    findRoleResourceRelationByRoleId
  } from '@/api/system/role'

  export default {
    data() {
      return {
        visible: false,
        menuList: [],
        roleId: null,
        menuListTreeProps: {
          label: 'menuName',
          children: 'list'
        },
        defaultChecked: []
      }
    },
    methods: {
      init(id) {
        this.menuList = []
        this.visible = true
        this.roleId = id
        getMenuTreeExpend().then(response => {
          debugger
          this.menuList = response.data
          findRoleResourceRelationByRoleId(this.roleId).then(respond => {
            let checkedArray = this.defaultCheckedTree(this.menuList, respond.data)
            this.defaultChecked = checkedArray
          })
        })
      },
      // 递归查看已选择的节点信息
      defaultCheckedTree(data, selectData) {
        let checkArray = []
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < selectData.length; j++) {
            if (data[i].menuId == selectData[j].menuId) {
              checkArray.push(data[i].menuId)
            }
          }
          if (data[i].leaf > 0) {
            let cArray = this.defaultCheckedTree(data[i].list, selectData)
            checkArray = checkArray.concat(cArray)
          }
        }
        return checkArray;
      },
      // 表单提交
      dataFormSubmit() {
        debugger
        let _selection = this.$refs.menuListTree.getCheckedKeys()
        let relation = []
        for (let i = 0; i < _selection.length; i++) {
          let _model = {
            roleId : this.roleId,
            menuId : _selection[i]
          }
          relation.push(_model)
        }
        saveRoleResourceRelation(relation).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose: () => {
              this.visible = false
              this.$emit('refreshDataList')
            }
          })
        })
      }
    }
  }
</script>
