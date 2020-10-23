<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" ref="dataForm" size="small" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="物料编码" prop="mateId">
            <el-select v-model="dataForm.mateId" placeholder="请选择" filterable style="width: 100%;">
              <el-option v-for="item in materialList" :key="item.mateId" :label="item.mateCode" :value="item.mateId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="工艺路线名称" prop="provName">
            <el-input v-model="dataForm.provName" placeholder="工艺路线名称" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>

      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工艺路线编码" prop="provCode">
            <el-input v-model="dataForm.provCode" placeholder="工艺路线编码" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设计者" prop="provDesigner">
            <el-input v-model="dataForm.provDesigner" placeholder="设计者" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="定版时间" prop="provDesignDate">
            <el-date-picker v-model="dataForm.provDesignDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="审核者" prop="provRevieweder">
            <el-input v-model="dataForm.provRevieweder" placeholder="审核者" style="width: 100%;"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="审核时间" prop="provReviewedDate">
            <el-date-picker v-model="dataForm.provReviewedDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" size="small" prop="provStutas">
            <el-radio-group v-model="dataForm.provStutas" size="small">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="2">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        materialList: [],
        titleText: '工艺增加',
        workType: 1,
        dataForm: {
          provId: 0,
          mateId: null,
          provName: null,
          provCode: null,
          provDesigner: null,
          provDesignDate: null,
          provRevieweder: null,
          provReviewedDate: null,
          provStutas: 1
        }
      }
    },
    methods: {
      init(workType, id) {
        //this.dataForm.userId = id || 0
        this.workType = workType

        if (workType == 1) {
          this.visible = true
          this.dataForm.provId = 0
          this.dataForm.mateId = null
          this.dataForm.provName = null
          this.dataForm.provCode = null
          this.dataForm.provDesigner = null
          this.dataForm.provDesignDate = null
          this.dataForm.provRevieweder = null
          this.dataForm.provReviewedDate = null
          this.dataForm.provStutas = 1
        } else {
          this.titleText = '工艺修改'
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/version/selectProcessVersionById'),
            method: 'get',
            params: {
              provId: id
            }
          }).then(({
            data
          }) => {
            this.visible = true
            if (data) {
              this.dataForm.provId = data.provId
              this.dataForm.mateId = data.mateId
              this.dataForm.provName = data.provName
              this.dataForm.provCode = data.provCode
              this.dataForm.provDesigner = data.provDesigner
              this.dataForm.provDesignDate = data.provDesignDate
              this.dataForm.provRevieweder = data.provRevieweder
              this.dataForm.provReviewedDate = data.provReviewedDate
              this.dataForm.provStutas = data.provStutas
            }
          })
        }
        this.initMaterialList()
      },
      // 初始化物料类型可选项
      initMaterialList() {
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/material/selectMaterialByParam'),
          method: 'get',
          params: {
            dictCode: 'materiel_type'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.materialList = data
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              this.$http({
                url: this.$http.adornBomUrl('/bom/v1/version/insertProcessVersion'),
                method: 'post',
                data: this.$http.adornData({
                  mateId: this.dataForm.mateId,
                  provName: this.dataForm.provName,
                  provCode: this.dataForm.provCode,
                  provDesigner: this.dataForm.provDesigner,
                  provDesignDate: this.dataForm.provDesignDate,
                  provRevieweder: this.dataForm.provRevieweder,
                  provReviewedDate: this.dataForm.provReviewedDate,
                  provStutas: this.dataForm.provStutas
                })
              }).then(({
                data
              }) => {
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
              this.$http({
                url: this.$http.adornBomUrl('/bom/v1/version/updateProcessVersionById'),
                method: 'put',
                data: this.$http.adornData({
                  provId: this.dataForm.provId,
                  mateId: this.dataForm.mateId,
                  provName: this.dataForm.provName,
                  provCode: this.dataForm.provCode,
                  provDesigner: this.dataForm.provDesigner,
                  provDesignDate: this.dataForm.provDesignDate,
                  provRevieweder: this.dataForm.provRevieweder,
                  provReviewedDate: this.dataForm.provReviewedDate,
                  provStutas: this.dataForm.provStutas
                })
              }).then(({
                data
              }) => {
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
