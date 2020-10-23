<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
	<el-form :model="checkItemDataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
		<el-form-item label="姓名" prop="name">
		  <el-input v-model="checkItemDataForm.name" placeholder="姓名"></el-input>
		</el-form-item>
		<el-form-item label="工号" prop="code">
		  <el-input v-model="checkItemDataForm.code" placeholder="工号"></el-input>
		</el-form-item>
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="checkItemDataForm.userName" placeholder="登录帐号"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passWord">
        <el-input v-model="checkItemDataForm.passWord" type="password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="checkItemDataForm.email" placeholder="邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="telephone">
        <el-input v-model="checkItemDataForm.telephone" placeholder="手机号"></el-input>
      </el-form-item>
	  <el-form-item  label="选择角色" prop="roleSelect">
		<el-select v-model="checkItemDataForm.roleSelect" placeholder="请选择" width="500" multiple>
		    <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId">
		    </el-option>
		</el-select>
	  </el-form-item>
      <el-form-item label="性别" size="mini" prop="gender">
        <el-radio-group v-model="checkItemDataForm.gender" size="mini">
          <el-radio :label="1">男</el-radio>
          <el-radio :label="2">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" size="mini" prop="stuts">
        <el-radio-group v-model="checkItemDataForm.stuts" size="mini">
          <el-radio :label="2">禁用</el-radio>
          <el-radio :label="1">正常</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
      <el-button type="primary" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        roleList: [],
		titleText: '用户增加',
		workType : 1,
        checkItemDataForm: {
          userId: 0,
		  name : '',
		  code : '',
          userName: '',
          passWord: '',
          email: '',
          telephone: '',
          gender : 1,
          stuts: 1,
		  roleSelect : []
        }
      }
    },
    methods: {
      init (workType, id) {
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
			this.checkItemDataForm.gender = ''
			this.checkItemDataForm.stuts = ''
		} else {
			this.titleText = '用户修改'
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
		  		param : ''
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
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
			  	if (this.workType == 1) {
			  		this.$http({
			  			url: this.$http.adornSystemUrl('/sys/v1/user/insertUser'),
			  			method: 'post',
			  			data: this.$http.adornData({
							userId : this.checkItemDataForm.userId,
							name : this.checkItemDataForm.name,
							code : this.checkItemDataForm.code,
							userName : this.checkItemDataForm.userName,
							passWord : this.checkItemDataForm.passWord,
							email : this.checkItemDataForm.email,
							telephone : this.checkItemDataForm.telephone,
							gender : this.checkItemDataForm.gender,
							stuts : this.checkItemDataForm.stuts,
							roles : JSON.stringify(this.checkItemDataForm.roleSelect)
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
			  				userId : this.checkItemDataForm.userId,
			  				name : this.checkItemDataForm.name,
			  				code : this.checkItemDataForm.code,
			  				userName : this.checkItemDataForm.userName,
			  				passWord : this.checkItemDataForm.passWord,
			  				email : this.checkItemDataForm.email,
			  				telephone : this.checkItemDataForm.telephone,
			  				gender : this.checkItemDataForm.gender,
			  				stuts : this.checkItemDataForm.stuts,
							roles : JSON.stringify(this.checkItemDataForm.roleSelect)
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
