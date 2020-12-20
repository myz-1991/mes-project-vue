<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="夹具编码" prop="code">
            <el-input v-model="dataForm.code" placeholder="夹具编码" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="夹具名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="夹具名称" />
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
          <el-form-item label="精度" prop="accuacy">
            <el-input v-model="dataForm.accuacy" placeholder="精度" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
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
          <el-form-item label="备注" prop="note">
            <el-input type="textarea" rows="2" v-model="dataForm.note" placeholder="备注" />
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
    saveClamp,
    updateClamp,
    findClampById
  } from '@/api/base/clamp'

  import {
    findMaterielList
  } from '@/api/base/materiel'

  export default {
    data() {
      return {
        visible: false,
        titleText: '夹具添加',
        materielList: [],
        workType: 1,
        dataForm: {
          id: '',
          name: '',
          code: '',
          model: '',
          type: '',
          typeName: '',
          accuacy: '',
          note: '',
          readIdentifying : 1,
          mateId : '',
          mateName : '',
          mateCode : ''
        }
      }
    },
    methods: {
      init(workType, id) {
        this.workType = workType
        this.visible = true
        if (workType == 1) {
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.code = ''
          this.dataForm.model = ''
          this.dataForm.type = ''
          this.dataForm.typeName = ''
          this.dataForm.accuacy = ''
          this.dataForm.note = ''
          this.dataForm.mateId = ''
          this.dataForm.mateName = ''
          this.dataForm.mateCode = ''
        } else {
          this.titleText = '夹具修改'
          findClampById(id).then(response => {
            this.dataForm = response.data
          })
        }
        this.initMaterielList()
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
              saveClamp(this.dataForm).then(respone => {
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
              updateClamp(this.dataForm).then(response => {
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
