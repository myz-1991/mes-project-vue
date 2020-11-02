<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" :rules="dataRule" size="small" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="组织名称：" prop="name">
						<el-input v-model="dataForm.name"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="组织编码：" prop="code">
						<el-input v-model="dataForm.code"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="组织类型：" prop="type">
						<el-select v-model="dataForm.type" placeholder="请选择……" style="width: 100%;" @change="((val)=>{orgTypeChange(val, index)})">
						    <el-option v-for="item in orgTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
						    </el-option>
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
						<el-input type="textarea" v-model="dataForm.note"></el-input>
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
  import {  saveOrganization } from '@/api/system/organization'
	export default {
		data() {
			return {
				visible: false,
				titleText: '组织添加',
				workType: 1,
				orgTypeList : [],
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
        dataRule : {
          orgName : [
            { required: true, message: '请输入组织名称', trigger: 'blur' }
          ],
          orgCode : [
            { required: true, message: '请输入组织编码', trigger: 'blur' }
          ],
		  orgType : [
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
				if (workType == 1) {
					this.visible = true
					this.dataForm.pid = id
				} else {}
				// this.initOrgTypeList()
			},
			initOrgTypeList() {
					  this.$http({
					  	url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					  	method: 'get',
					  	params: {
					  		dictCode : 'organization.type'
					  	}
					  }).then(({
					  	data
					  }) => {
					  	if (data) {
					  		this.orgTypeList = data
					  	}
					  })
			},
			orgTypeChange(val) {
				let obj = {};
				obj = this.orgTypeList.find((item)=>{
					return item.dictCode === val;
				});
				this.dataForm.orgTypeName = obj.dictName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						debugger
						if (this.workType == 1) {
              saveOrganization(this.dataForm).then(response => {
                debugger
                this.$message({
                		message: '操作成功',
                		type: 'success',
                		onClose: () => {
                			this.visible = false
                			// this.$emit('refreshDataList')
                		}
                	})
              })
							// this.$http({
							// 	url: this.$http.adornSystemUrl('/sys/v1/organization/saveOrganization'),
							// 	method: 'post',
							// 	data: this.$http.adornData({
							// 		orgId: this.dataForm.orgId,
							// 		orgName: this.dataForm.orgName,
							// 		orgCode: this.dataForm.orgCode,
							// 		orgType: this.dataForm.orgType,
							// 		orgTypeName: this.dataForm.orgTypeName,
							// 		orgNote: this.dataForm.orgNote,
							// 		orgStuts: this.dataForm.orgStuts,
							// 		orgPid: this.dataForm.orgPid
							// 	})
							// }).then(({
								// data
							// }) => {
							// 	this.$message({
							// 		message: '操作成功',
							// 		type: 'success',
							// 		onClose: () => {
							// 			this.visible = false
							// 			this.$emit('refreshDataList')
							// 		}
							// 	})
							// })
						} else {
							this.$http({
								url: this.$http.adornSystemUrl('/sys/v1/organization/updateOrganizationById'),
								method: 'put',
								data: this.$http.adornData({
									orgId: this.dataForm.orgId,
									orgName: this.dataForm.orgName,
									orgCode: this.dataForm.orgCode,
									orgType: this.dataForm.orgType,
									orgTypeName: this.dataForm.orgTypeName,
									orgNote: this.dataForm.orgNote,
									orgStuts: this.dataForm.orgStuts,
									orgPid: this.dataForm.orgPid
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

<style>
</style>
