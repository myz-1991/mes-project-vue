<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="刀具编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="刀具编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="刀具名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="刀具名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="刀具规格" prop="model">
            <el-input v-model="dataForm.model" placeholder="刀具规格" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="NC程序号" prop="ncNumber">
            <el-input v-model="dataForm.ncNumber" placeholder="NC程序号" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="长度" prop="toolLength">
            <el-input v-model="dataForm.toolLength" placeholder="长度" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="直径" prop="diameter">
            <el-input v-model="dataForm.diameter" placeholder="直径" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="底角半径" prop="lowerRadius">
            <el-input v-model="dataForm.lowerRadius" placeholder="底角半径" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="刃长" prop="bladeLength">
            <el-input v-model="dataForm.bladeLength" placeholder="刃长" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="额定寿命" prop="ratedLife">
            <el-input v-model="dataForm.ratedLife" placeholder="额定寿命" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="使用寿命" prop="activeLife">
            <el-input v-model="dataForm.activeLife" placeholder="刃长" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="供应商" prop="lowerRadius">
            <el-select style="width: 100%;" v-model="dataForm.supplierId" placeholder="选择供应商" @change="((val)=>{supplierChange(val, index)})">
              <el-option v-for="item in supplierList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="适用产品" prop="mateId">
            <el-select style="width: 100%;" v-model="dataForm.mateId" placeholder="选择适用产品" @change="((val)=>{materielChange(val, index)})">
              <el-option v-for="item in materielList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" size="mini" prop="note">
            <el-input v-model="dataForm.note" type="textarea" rows="3" />
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
    findToolById,
    updateTool,
    saveTool
  } from '@/api/base/tool'
  import {
    findSupplierList
  } from '@/api/base/supplier'
  import {
    findMaterielList
  } from '@/api/base/materiel'
  export default {
    data() {
      return {
        visible: false,
        supplierList: [],
        materielList: [],
        titleText: '刀具添加',
        workType: 1,
        dataForm: {
          id: '',
          name: null,
          code: null,
          model: null,
          ncNumber: null,
          note: null,
          readIdentifying: 1,
          toolLength : '',
          diameter : '',
          lowerRadius : '',
          bladeLength : '',
          supplierId : '',
          supplierName : '',
          ratedLife : '',
          activeLife : '',
          mateId : '',
          mateName : '',
          mateCode : ''
        }
      }
    },
    methods: {
      init(workType, id) {
        // this.dataForm.userId = id || 0
        this.workType = workType
        this.visible = true
        if (workType == 1) {
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.code = ''
          this.dataForm.model = ''
          this.dataForm.ncNumber = ''
          this.dataForm.note = ''
          this.dataForm.readIdentifying = 1
          this.dataForm.toolLength = ''
          this.dataForm.diameter = ''
          this.dataForm.lowerRadius = ''
          this.dataForm.bladeLength = ''
          this.dataForm.supplierId = ''
          this.dataForm.supplierName = ''
          this.dataForm.ratedLife = ''
          this.dataForm.activeLife = ''
          this.dataForm.mateId = ''
          this.dataForm.mateName = ''
          this.dataForm.mateCode = ''
        } else {
          this.titleText = '刀具修改'
          findToolById(id).then(response => {
            this.dataForm = response.data
          })
        }
        this.initSupplierList()
        this.initMaterielList()
      },
      initSupplierList() {
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
      initMaterielList() {
        findMaterielList(null).then(response => {
          this.materielList = response.data
        })
      },
      materielChange(val) {
        let obj = {}
        obj = this.materielList.find((item) => {
          return item.id === val
        })
        this.dataForm.mateName = obj.name
        this.dataForm.mateCode = obj.code
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              saveTool(this.dataForm).then(response => {
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
              updateTool(this.dataForm).then(response => {
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
