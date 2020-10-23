<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="90%">
    <el-form :model="dataForm" ref="dataForm" size="small" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="工序编码" prop="procCode">
            <el-input v-model="dataForm.procCode" placeholder="物料图号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工序名称" prop="procName">
            <el-input v-model="dataForm.procName" placeholder="物料图号"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="顺序号" prop="procSequence">
            <el-input-number v-model="dataForm.procSequence" :min="1" label="顺序号" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="实际准备时间" prop="procActualPreparetime">
            <el-input v-model="dataForm.procActualPreparetime" placeholder="实际准备时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际加工时间" prop="procActualmakeTime">
            <el-input v-model="dataForm.procActualmakeTime" placeholder="实际加工时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="实际结束时间" prop="procActualEndTime">
            <el-input v-model="dataForm.procActualEndTime" placeholder="实际结束时间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="定额准备时间" prop="procQuotaPreparetime">
            <el-input v-model="dataForm.procQuotaPreparetime" placeholder="定额准备时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="定额加工时间" prop="procQuotamaketime">
            <el-input v-model="dataForm.procQuotamaketime" placeholder="定额加工时间"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="定额结束时间" prop="procQuotaendtime">
            <el-input v-model="dataForm.procQuotaendtime" placeholder="定额结束时间"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="是否重要工序" prop="procImportantStutas">
            <el-radio-group v-model="dataForm.procImportantStutas" size="mini">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="2">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="时间单位" prop="procTimeUnit">
            <el-select v-model="dataForm.procTimeUnit" style="width: 100%;" placeholder="请选择" filterable width="500" @change="((val)=>{timeUnitChange(val, index)})">
              <el-option v-for="item in timeUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="工序类型" prop="procProductionType">
            <el-select v-model="dataForm.procProductionType" style="width: 100%;" placeholder="请选择" filterable width="500" @change="((val)=>{productionTypeChange(val, index)})">
              <el-option v-for="item in processTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="加工内容" prop="procWorkcontent">
            <el-input type="textarea" rows="3" style="width: 100%;" v-model="dataForm.procWorkcontent"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" :offset="8">
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        activeNames: '2',
        visible: false,
        dataListLoading: false,
        timeUnitList: [],
        processTypeList: [],
        dataList: [],
        titleText: '工序添加',
        dataForm: {
          procId: null,
          provId: null,
          procCode: null,
          procName: null,
          procSequence: null,
          procImportantStutas: 2,
          procActualPreparetime: null,
          procActualmakeTime: null,
          procActualEndTime: null,
          procQuotaPreparetime: null,
          procQuotamaketime: null,
          procQuotaendtime: null,
          procTimeUnit: null,
          procTimeUnitName: null,
          procProductionType: null,
          procProductionTypeName: null,
          procWorkcontent: null,
        }
      }
    },
    methods: {
      init(workType, id) {
        debugger
        this.visible = true
        if (workType == 1) {
            this.dataForm.procId = null
            this.dataForm.provId = null
            this.dataForm.procCode = null
            this.dataForm.procName = null
            this.dataForm.procSequence = null
            this.dataForm.procImportantStutas = 2
            this.dataForm.procActualPreparetime = null
            this.dataForm.procActualmakeTime = null
            this.dataForm.procActualEndTime = null
            this.dataForm.procQuotaPreparetime = null
            this.dataForm.procQuotamaketime = null
            this.dataForm.procQuotaendtime = null
            this.dataForm.procTimeUnit = null
            this.dataForm.procTimeUnitName = null
            this.dataForm.procProductionType = null
            this.dataForm.procProductionTypeName = null
            this.dataForm.procWorkcontent = null
        } else {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/process/selectProcessById'),
            method: 'get',
            params: {
              procId: id
            }
          }).then(({
            data
          }) => {
            if (data) {
              debugger
              this.dataForm.procId = data.procId
              this.dataForm.provId = data.provId
              this.dataForm.procCode = data.procCode
              this.dataForm.procName = data.procName
              this.dataForm.procSequence = data.procSequence
              this.dataForm.procImportantStutas = data.procImportantStutas
              this.dataForm.procActualPreparetime = data.procActualPreparetime
              this.dataForm.procActualmakeTime = data.procActualmakeTime
              this.dataForm.procActualEndTime = data.procActualEndTime
              this.dataForm.procQuotaPreparetime = data.procQuotaPreparetime
              this.dataForm.procQuotamaketime = data.procQuotamaketime
              this.dataForm.procQuotaendtime = data.procQuotaendtime
              this.dataForm.procTimeUnit = data.procTimeUnit
              this.dataForm.procTimeUnitName = data.procTimeUnitName
              this.dataForm.procProductionType = data.procProductionType
              this.dataForm.procProductionTypeName = data.procProductionTypeName
              this.dataForm.procWorkcontent = data.procWorkcontent
            }
          })
        }
        this.initTimeUnitList()
        this.initProcessTypeList()
      },
      // 初始化物料类型可选项
      initTimeUnitList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'timeUnit'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.timeUnitList = data
          }
        })
      },
      timeUnitChange(val) {
        debugger
        let obj = {};
        obj = this.timeUnitList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.procTimeUnitName = obj.dictName
      },
      // 初始化物料类型可选项
      initProcessTypeList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'processType'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.processTypeList = data
          }
        })
      },
      productionTypeChange(val) {
        debugger
        let obj = {};
        obj = this.processTypeList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.procProductionTypeName = obj.dictName
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            debugger;
            let procId = this.dataForm.procId
            if (this.dataForm.procId == null) {
              this.$http({
                url: this.$http.adornBomUrl('/bom/v1/process/insertProcess'),
                method: 'post',
                data: this.$http.adornData({
                  procId: this.dataForm.procId,
                  provId: this.dataForm.provId,
                  procCode: this.dataForm.procCode,
                  procName: this.dataForm.procName,
                  procSequence: this.dataForm.procSequence,
                  procImportantStutas: this.dataForm.procImportantStutas,
                  procActualPreparetime: this.dataForm.procActualPreparetime,
                  procActualmakeTime: this.dataForm.procActualmakeTime,
                  procActualEndTime: this.dataForm.procActualEndTime,
                  procQuotaPreparetime: this.dataForm.procQuotaPreparetime,
                  procQuotamaketime: this.dataForm.procQuotamaketime,
                  procQuotaendtime: this.dataForm.procQuotaendtime,
                  procTimeUnit: this.dataForm.procTimeUnit,
                  procTimeUnitName: this.dataForm.procTimeUnitName,
                  procProductionType: this.dataForm.procProductionType,
                  procProductionTypeName: this.dataForm.procProductionTypeName,
                  procWorkcontent: this.dataForm.procWorkcontent
                })
              }).then(({
                data
              }) => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.dataFormReset()
                    this.getDataList(this.dataForm.provId)
                  }
                })
              })
            } else {
              this.$http({
                url: this.$http.adornBomUrl('/bom/v1/process/updateProcessById'),
                method: 'put',
                data: this.$http.adornData({
                  procId: this.dataForm.procId,
                  provId: this.dataForm.provId,
                  procCode: this.dataForm.procCode,
                  procName: this.dataForm.procName,
                  procSequence: this.dataForm.procSequence,
                  procImportantStutas: this.dataForm.procImportantStutas,
                  procActualPreparetime: this.dataForm.procActualPreparetime,
                  procActualmakeTime: this.dataForm.procActualmakeTime,
                  procActualEndTime: this.dataForm.procActualEndTime,
                  procQuotaPreparetime: this.dataForm.procQuotaPreparetime,
                  procQuotamaketime: this.dataForm.procQuotamaketime,
                  procQuotaendtime: this.dataForm.procQuotaendtime,
                  procTimeUnit: this.dataForm.procTimeUnit,
                  procTimeUnitName: this.dataForm.procTimeUnitName,
                  procProductionType: this.dataForm.procProductionType,
                  procProductionTypeName: this.dataForm.procProductionTypeName,
                  procWorkcontent: this.dataForm.procWorkcontent
                })
              }).then(({
                data
              }) => {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.dataFormReset()
                    this.getDataList(this.dataForm.provId)
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

<style>
</style>
