<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="设备编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="设备名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="设备名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="资产编码" prop="fixedCode">
            <el-input v-model="dataForm.fixedCode" placeholder="固定资产编码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="规格型号" prop="model">
            <el-input v-model="dataForm.model" placeholder="规格型号"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="设备类型" prop="type">
            <el-select v-model="dataForm.type" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateTypeChange(val, index)})">
              <el-option v-for="item in mateTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-select v-model="dataForm.status" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateUnitChange(val, index)})">
              <el-option v-for="item in mateUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="设备描述" size="mini" prop="note">
            <el-input type="textarea" rows="3" v-model="dataForm.note"></el-input>
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
  import { findEquipmentById, updateEquipment, saveEquipment } from '@/api/base/equipment'
  export default {
    data() {
      return {
        visible: false,
        mateTypeList: [],
        mateUnitList: [],
        mateSourceList: [],
        mateWeightUnitList: [],
        titleText: '设备添加',
        workType: 1,
        dataForm: {
          id: '',
          name: '',
          code: '',
          fixedCode: '',
          model: '',
          type: '',
          typeName: '',
          status: 1,
          note: '',
          orgId: '',
          orgName: ''
        }
      }
    },
    methods: {
      init(workType, id) {
        //this.dataForm.userId = id || 0
        this.workType = workType

        if (workType == 1) {
          this.visible = true
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.code = ''
          this.dataForm.fixedCode = ''
          this.dataForm.model = ''
          this.dataForm.type = ''
          this.dataForm.typeName = ''
          this.dataForm.status = 1
          this.dataForm.note = ''
          this.dataForm.orgId = ''
          this.dataForm.orgName = ''
        } else {
          this.titleText = '设备修改'
          findEquipmentById(id).then(response => {
            this.visible = true
            this.dataForm = response.data
          })
        }
      },
      initMateWeightUnitList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'BASE.WeightUnit'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.mateWeightUnitList = data
          }
        })
      },
      mateWeightUnitChange(val) {
        let obj = {};
        obj = this.mateWeightUnitList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.mateWeightUnitName = obj.dictName
      },
      // 初始化物料类型可选项
      initMateTypeList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'materiel_type'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.mateTypeList = data
          }
        })
      },
      mateTypeChange(val) {
        let obj = {};
        obj = this.mateTypeList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.mateTypeName = obj.dictName
      },
      // 初始化物料类型可选项
      initMateUnitList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'unit'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.mateUnitList = data
          }
        })
      },
      mateUnitChange(val) {
        let obj = {};
        obj = this.mateUnitList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.mateUnitName = obj.dictName
      },
      mateAuxiliaryUnitChange(val) {
        let obj = {};
        obj = this.mateUnitList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.mateAuxiliaryUnitName = obj.dictName
      },
      // 初始化物料类型可选项
      initMateSourceList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'mateSource'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.mateSourceList = data
          }
        })
      },
      mateSourceChange(val) {
        debugger
        let obj = {};
        obj = this.mateSourceList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.mateSourceName = obj.dictName
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              this.$http({
                url: this.$http.adornBomUrl('/bom/v1/material/insertMaterial'),
                method: 'post',
                data: this.$http.adornData({
                  mateName: this.dataForm.mateName,
                  mateCode: this.dataForm.mateCode,
                  mateSpecifications: this.dataForm.mateSpecifications,
                  mateDesignNumber: this.dataForm.mateDesignNumber,
                  mateType: this.dataForm.mateType,
                  mateTypeName: this.dataForm.mateTypeName,
                  mateUnit: this.dataForm.mateUnit,
                  mateUnitName: this.dataForm.mateUnitName,
                  mateSource: this.dataForm.mateSource,
                  mateSourceName: this.dataForm.mateSourceName,
                  mateNote: this.dataForm.mateNote,
                  mateSize: this.dataForm.mateSize,
                  mateBrand: this.dataForm.mateBrand,
                  mateFurnaceNumber: this.dataForm.mateFurnaceNumber,
                  mateNetWeight: this.dataForm.mateNetWeight,
                  mateGrossWeight: this.dataForm.mateGrossWeight,
                  mateWeightUnit: this.dataForm.mateWeightUnit,
                  mateWeightUnitName: this.dataForm.mateWeightUnitName,
                  mateTexture: this.dataForm.mateTexture,
                  mateAuxiliaryUnit: this.dataForm.mateAuxiliaryUnit,
                  mateAuxiliaryUnitName: this.dataForm.mateAuxiliaryUnitName
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
                url: this.$http.adornBomUrl('/bom/v1/material/updateMaterialById'),
                method: 'put',
                data: this.$http.adornData({
                  mateId: this.dataForm.mateId,
                  mateName: this.dataForm.mateName,
                  mateCode: this.dataForm.mateCode,
                  mateSpecifications: this.dataForm.mateSpecifications,
                  mateDesignNumber: this.dataForm.mateDesignNumber,
                  mateType: this.dataForm.mateType,
                  mateTypeName: this.dataForm.mateTypeName,
                  mateUnit: this.dataForm.mateUnit,
                  mateUnitName: this.dataForm.mateUnitName,
                  mateSource: this.dataForm.mateSource,
                  mateSourceName: this.dataForm.mateSourceName,
                  mateNote: this.dataForm.mateNote,
                  mateSize: this.dataForm.mateSize,
                  mateBrand: this.dataForm.mateBrand,
                  mateFurnaceNumber: this.dataForm.mateFurnaceNumber,
                  mateNetWeight: this.dataForm.mateNetWeight,
                  mateGrossWeight: this.dataForm.mateGrossWeight,
                  mateWeightUnit: this.dataForm.mateWeightUnit,
                  mateWeightUnitName: this.dataForm.mateWeightUnitName,
                  mateTexture: this.dataForm.mateTexture,
                  mateAuxiliaryUnit: this.dataForm.mateAuxiliaryUnit,
                  mateAuxiliaryUnitName: this.dataForm.mateAuxiliaryUnitName
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
