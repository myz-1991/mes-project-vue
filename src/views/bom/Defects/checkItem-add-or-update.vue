<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="defectsForm" size="mini" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="缺陷项名称" prop="name">
        <el-input v-model="defectsForm.name" placeholder="缺陷项名称"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="是否有效" size="mini" prop="status">
        <el-radio-group v-model="defectsForm.status" size="mini">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="2">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button size="mini" type="danger" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
      <el-button size="mini" type="primary" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    saveDefects,
    updateDefects,
    findDefectsById
  } from '@/api/bom/defects'
  export default {
    data() {
      return {
        visible: false,
        roleList: [],
        titleText: '缺陷项增加',
        workType: 1,
        defectsForm: {
          id: '',
          name: '',
          status: 1
        }
      }
    },
    methods: {
      init(workType, id) {
        //this.dataForm.userId = id || 0
        this.workType = workType
        if (workType == 1) {
          this.visible = true
          this.defectsForm.id = ''
          this.defectsForm.name = ''
          this.defectsForm.status = 1
        } else {
          this.titleText = '缺陷项修改'
          this.visible = true
          findDefectsById(id).then(response => {
            this.defectsForm = response.data
          })
        }
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              saveDefects(this.defectsForm).then(response => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              })
            } else {
              updateDefects(this.defectsForm).then(response => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1000,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              })
            }
          }
        })
      }
    }
  }
</script>
