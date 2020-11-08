<template>
  <el-dialog :title="角色增加" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" size="small" :rules="dataRule" ref="dataForm" label-width="80px">
      <el-form-item label="角色编码" prop="code">
        <el-input v-model="dataForm.code" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="note">
        <el-input type="textarea" v-model="dataForm.note" placeholder="备注"></el-input>
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
    saveRole,
    updateRole,
    findRoleById
  } from '@/api/system/role'

  export default {
    data() {
      return {
        visible: false,
        dataForm: {
          id: '',
          code: '',
          name: '',
          note: ''
        },
        dataRule: {
          name: [{
            required: true,
            message: '角色名称不能为空',
            trigger: 'blur'
          }],
          code: [{
            required: true,
            message: '角色编码不能为空',
            trigger: 'blur'
          }]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
      init(id) {
        this.visible = true
        this.dataForm.code = ''
        this.dataForm.name = ''
        this.dataForm.note = ''
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            saveRole(this.dataForm).then(response => {
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
        })
      }
    }
  }
</script>
