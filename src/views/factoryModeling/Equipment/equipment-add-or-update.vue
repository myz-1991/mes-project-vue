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
            <el-select v-model="dataForm.type" placeholder="请选择" style="width: 100%;" @change="((val)=>{typeChange(val, index)})">
              <el-option v-for="item in typeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="供应商" prop="supplierId">
            <el-select v-model="dataForm.supplierId" placeholder="请选择" style="width: 100%;" @change="((val)=>{supplierChange(val, index)})">
              <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="生产厂商" prop="productionName">
            <el-input v-model="dataForm.productionName" placeholder="生产厂商">></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="出厂日期" prop="productionDate">
            <el-date-picker v-model="dataForm.productionDate" placeholder="出厂日期" style="width: 100%;"></el-date-picker>
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
  import { findDictionaryByCode } from '@/api/system/dict'
  import { findSupplierList } from '@/api/base/supplier'
  export default {
    data() {
      return {
        visible: false,
        typeList: [],
        supplierList : [],
        statusList: [{
            dictCode: 1,
            dictName: '运行'
          },
          {
            dictCode: 2,
            dictName: '停机'
          },
          {
            dictCode : 3,
            dictName : '维修'
          }
        ],
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
          orgName: '',
          productionDate : '',
          productionName : '',
          supplierId : '',
          supplierName : ''
        }
      }
    },
    methods: {
      init(workType, id, row) {
        //this.dataForm.userId = id || 0
        this.workType = workType
        this.initTypeList()
        this.initSupplier()
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
          this.dataForm.orgId = row.id
          this.dataForm.orgName = row.name
        } else {
          this.titleText = '设备修改'
          findEquipmentById(id).then(response => {
            this.visible = true
            this.dataForm = response.data
          })
        }
      },
      initSupplier() {
        findSupplierList(null, '2').then(response => {
          this.supplierList = response.data
        })
      },
      supplierChange(val) {
        let obj = {}
        obj = this.supplierList.find((item) => {
        	return item.id === val
        })
        this.dataForm.supplierName = obj.name
      },
      initTypeList() {
        findDictionaryByCode('BASE.EQUIPMENT.TYPE.').then(response => {
          this.typeList = response.data
        })
      },
      typeChange(val) {
        let obj = {};
        obj = this.typeList.find((item) => {
          return item.dictCode === val;
        });
        this.dataForm.typeName = obj.dictName
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              saveEquipment(this.dataForm).then(response => {
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
              debugger
              updateEquipment(this.dataForm).then(response => {
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
