<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="量具编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="量具编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="量具名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="量具名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="规格型号" prop="model">
            <el-input v-model="dataForm.model" placeholder="规格型号" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="精度" prop="accuracy">
            <el-input v-model="dataForm.accuracy" placeholder="精度" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="量程" prop="range">
            <el-input v-model="dataForm.range" placeholder="量程" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="检定周期" prop="checkPeriod">
            <el-input v-model="dataForm.checkPeriod" placeholder="检定周期" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="note">
            <el-input type="textarea" rows="2" v-model="dataForm.note" placeholder="备注"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    saveMeasuringTool,
    updateMeasuringTool,
    findMeasuringToolById
  } from '@/api/base/measuringTool'
  export default {
    data() {
      return {
        visible: false,
        mateTypeList: [],
        mateUnitList: [],
        mateSourceList: [],
        mateWeightUnitList: [],
        titleText: '量具添加',
        workType: 1,
        dataForm: {
          id : '',
          name : '',
          code : '',
          model : '',
          type : '',
          typeName : '',
          accuracy : '',
          range : '',
          note : '',
          checkPeriod : '',
          readIdentifying : 1
        }
      }
    },
    methods: {
      init(workType, id) {
        // this.dataForm.userId = id || 0
        this.workType = workType
        this.visible = true
        if (workType == 1) {
          this.visible = true
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.code = ''
          this.dataForm.model = ''
          this.dataForm.type = ''
          this.dataForm.typeName = ''
          this.dataForm.accuacy = ''
          this.dataForm.range = ''
          this.dataForm.note = ''
          this.dataForm.readIdentifying = 1
          this.dataForm.checkPeriod = ''
        } else {
          this.titleText = '量具修改'
          findMeasuringToolById(id).then(response => {
            this.dataForm = response.data
          })
        }
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              saveMeasuringTool(this.dataForm).then(response => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              })
            } else {
              updateMeasuringTool(this.dataForm).then(response => {
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
        })
      }
    }
  }
</script>
