<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="checkItemDataForm" size="mini" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="120px">
      <el-form-item label="缺陷项名称" prop="name">
        <el-input v-model="checkItemDataForm.name" placeholder="缺陷项名称"></el-input>
      </el-form-item>
      <el-form-item label="顺序" prop="code">
        <el-input v-model="checkItemDataForm.code" placeholder="顺序"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="是否有效" size="mini" prop="gender">
        <el-radio-group v-model="checkItemDataForm.gender" size="mini">
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
  export default {
    data() {
      return {
        visible: false,
        roleList: [],
        titleText: '缺陷项增加',
        workType: 1,
        checkItemDataForm: {
          userId: 0,
          name: '',
          code: '',
          userName: '',
          passWord: '',
          email: '',
          telephone: '',
          gender: 1,
          stuts: 1,
          roleSelect: []
        }
      }
    },
    methods: {
      init(workType, id) {
        //this.dataForm.userId = id || 0
        this.workType = workType
        if (workType == 1) {
          this.visible = true
          this.checkItemDataForm.userId = 0
          this.checkItemDataForm.name = ''
          this.checkItemDataForm.code = ''
          this.checkItemDataForm.userName = ''
          this.checkItemDataForm.passWord = ''
          this.checkItemDataForm.email = ''
          this.checkItemDataForm.telephone = ''
          this.checkItemDataForm.gender = 1
          this.checkItemDataForm.stuts = ''
        } else {
          this.titleText = '缺陷项修改'
          this.$http({
            url: this.$http.adornSystemUrl('/sys/v1/user/selectUserById'),
            method: 'get',
            params: {
              userId: id
            }
          }).then(({
            data
          }) => {
            this.visible = true
            if (data) {
              this.checkItemDataForm.userId = data.userId
              this.checkItemDataForm.name = data.name
              this.checkItemDataForm.code = data.code
              this.checkItemDataForm.userName = data.userName
              this.checkItemDataForm.passWord = data.passWord
              this.checkItemDataForm.email = data.email
              this.checkItemDataForm.telephone = data.telephone
              this.checkItemDataForm.gender = data.gender
              this.checkItemDataForm.stuts = data.stuts
            }
          })
        }
        this.initRoleList()
      },
      // 初始化角色
      initRoleList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/role/selectRoleByParam'),
          method: 'get',
          params: {
            param: ''
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.roleList = data
          }
        })
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              this.$http({
                url: this.$http.adornSystemUrl('/sys/v1/user/insertUser'),
                method: 'post',
                data: this.$http.adornData({
                  userId: this.checkItemDataForm.userId,
                  name: this.checkItemDataForm.name,
                  code: this.checkItemDataForm.code,
                  userName: this.checkItemDataForm.userName,
                  passWord: this.checkItemDataForm.passWord,
                  email: this.checkItemDataForm.email,
                  telephone: this.checkItemDataForm.telephone,
                  gender: this.checkItemDataForm.gender,
                  stuts: this.checkItemDataForm.stuts,
                  roles: JSON.stringify(this.checkItemDataForm.roleSelect)
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
                url: this.$http.adornSystemUrl('/sys/v1/user/updateUserById'),
                method: 'put',
                data: this.$http.adornData({
                  userId: this.checkItemDataForm.userId,
                  name: this.checkItemDataForm.name,
                  code: this.checkItemDataForm.code,
                  userName: this.checkItemDataForm.userName,
                  passWord: this.checkItemDataForm.passWord,
                  email: this.checkItemDataForm.email,
                  telephone: this.checkItemDataForm.telephone,
                  gender: this.checkItemDataForm.gender,
                  stuts: this.checkItemDataForm.stuts,
                  roles: JSON.stringify(this.checkItemDataForm.roleSelect)
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
