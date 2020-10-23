<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" :rules="dataRule" size="small" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="组织名称：" prop="orgName">
						<el-input v-model="dataForm.orgName"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="组织编码：" prop="orgCode">
						<el-input v-model="dataForm.orgCode"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="组织类型：" prop="orgType">
						<el-select v-model="dataForm.orgType" placeholder="请选择……" style="width: 100%;" @change="((val)=>{orgTypeChange(val, index)})">
						    <el-option v-for="item in orgTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
						    </el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="状态：" prop="orgStuts">
						<el-radio-group v-model="dataForm.orgStuts">
							<el-radio :label="2">禁用</el-radio>
							<el-radio :label="1">正常</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="备注：" prop="orgNote">
						<el-input type="textarea" v-model="dataForm.orgNote"></el-input>
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
				titleText: '组织添加',
				workType: 1,
				orgTypeList : [],
				dataForm: {
					orgId: '',
					orgName: '',
					orgCode: '',
					orgType: '',
					orgTypeName: '',
					orgNote: '',
					orgStuts: 1,
					orgPid: ''
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
				this.dataForm.orgId = null
				this.dataForm.orgName = null
				this.dataForm.orgCode = null
				this.dataForm.orgType = null
				this.dataForm.orgTypeName = null
				this.dataForm.orgNote = null
				this.dataForm.orgStuts = 1
				this.dataForm.orgPid = null
				
				this.workType = workType
				if (workType == 1) {
					this.visible = true
					this.dataForm.orgPid = id
				} else {
					this.titleText='组织修改'
					this.$http({
						url: this.$http.adornSystemUrl('/sys/v1/organization/selectOrganizationById'),
						method: 'get',
						params: {
							orgId: id
						}
					}).then(({
						data
					}) => {
						this.visible = true
						if (data) {
							this.dataForm.orgId = data.orgId
							this.dataForm.orgName = data.orgName
							this.dataForm.orgCode = data.orgCode
							this.dataForm.orgType = data.orgType
							this.dataForm.orgTypeName = data.orgTypeName
							this.dataForm.orgNote = data.orgNote
							this.dataForm.orgStuts = data.orgStuts
							this.dataForm.orgPid = data.orgPid
						}
					})
				}
				this.initOrgTypeList()
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
							this.$http({
								url: this.$http.adornSystemUrl('/sys/v1/organization/saveOrganization'),
								method: 'post',
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
