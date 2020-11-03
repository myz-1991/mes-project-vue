<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form ref="dataForm" :model="dataForm" :rules="dataRule" size="small" label-width="100px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="组织名称：" prop="name">
            <el-input v-model="dataForm.name" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="组织编码：" prop="code">
            <el-input v-model="dataForm.code" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="组织类型：" prop="type">
            <el-select v-model="dataForm.type" placeholder="请选择……" style="width: 100%;" @change="((val)=>{orgTypeChange(val, index)})">
              <el-option v-for="item in orgTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态：" prop="status">
            <el-radio-group v-model="dataForm.status">
              <el-radio :label="2">禁用</el-radio>
              <el-radio :label="1">正常</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注：" prop="note">
            <el-input v-model="dataForm.note" type="textarea" />
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
import { saveOrganization, findOrganizationById, updateOrganization } from '@/api/system/organization'
import { findDictionaryByCode } from '@/api/system/dict'
export default {
  data() {
    return {
      visible: false,
      titleText: '组织添加',
      workType: 1,
      orgTypeList: [],
      dataForm: {
        id: '',
        name: '',
        code: '',
        type: '',
        typeName: '',
        note: '',
        status: 1,
        pid: '0'
      },
      dataRule: {
        orgName: [
          { required: true, message: '请输入组织名称', trigger: 'blur' }
        ],
        orgCode: [
          { required: true, message: '请输入组织编码', trigger: 'blur' }
        ],
		  orgType: [
          { required: true, message: '请选择组织类型', trigger: 'blur' }
		  ]
      }
    }
  },
  methods: {
    init(workType, id) {
      // 表单清空
      this.dataForm.id = null
      this.dataForm.name = null
      this.dataForm.code = null
      this.dataForm.type = null
      this.dataForm.typeName = null
      this.dataForm.note = null
      this.dataForm.status = 1
      this.dataForm.pid = '0'

      this.workType = workType
      this.visible = true
      if (workType == 1) {
        this.titleText = '组织添加'
        this.dataForm.pid = id
      } else {
        this.titleText = '组织修改'
        findOrganizationById(id).then(response => {
          this.dataForm = response.data
        })
      }
      this.initOrgTypeList()
    },
    initOrgTypeList() {
      findDictionaryByCode('SYSTEM_ORG_TYPE.').then(response => {
        this.orgTypeList = response.data
      })
    },
    orgTypeChange(val) {
      let obj = {}
      obj = this.orgTypeList.find((item) => {
        return item.dictCode === val
      })
      this.dataForm.typeName = obj.dictName
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          debugger
          if (this.workType == 1) {
            saveOrganization(this.dataForm).then(response => {
              this.$message({
                		message: '操作成功',
                		type: 'success',
                		onClose: () => {
                			this.visible = false
                			// this.$emit('refreshDataList')
                		}
                	})
            })
          } else {
            updateOrganization(this.dataForm).then(response => {
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

<style>
</style>
