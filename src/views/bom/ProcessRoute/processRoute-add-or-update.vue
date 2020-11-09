<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm" size="small" label-width="100px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="名称" prop="name">
						<el-input v-model="dataForm.name" placeholder="工艺版本名称" style="width: 100%;"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="编码" prop="code">
						<el-input v-model="dataForm.code" placeholder="工艺版本编码" style="width: 100%;"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="设计者" prop="designer">
						<el-select v-model="dataForm.designer" placeholder="请选择" filterable style="width: 100%;">
							<el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="定版时间" prop="designDate">
						<el-date-picker v-model="dataForm.designDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="审核者" prop="reviewer">
						<el-select v-model="dataForm.reviewer" placeholder="请选择" filterable style="width: 100%;">
							<el-option v-for="item in userList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="审核时间" prop="reviewDate">
						<el-date-picker v-model="dataForm.reviewDate" type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="状态" size="small" prop="status">
						<el-radio-group v-model="dataForm.status" size="small">
							<el-radio :label="1">正常</el-radio>
							<el-radio :label="2">禁用</el-radio>
						</el-radio-group>
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
	import {
		saveProcessVersion,
		updateProcessVersion,
		findProcessVersionByIdd
	} from '@/api/bom/version'

	import { findUserList } from '@/api/system/user'
	export default {
		data() {
			return {
				visible: false,
				userList: [],
				titleText: '工艺增加',
				workType: 1,
				dataForm: {
					id: '',
					name: null,
					code: null,
					designer: null,
					designerName: null,
					designDate: null,
					reviewer: null,
					reviewerName: null,
					reviewDate: null,
					status: 1
				}
			}
		},
		methods: {
			init(workType, id) {
				//this.dataForm.userId = id || 0
				this.workType = workType
				this.visible = true
				if (workType == 1) {
					this.visible = true
					this.dataForm.id = ''
					this.dataForm.name = null
					this.dataForm.code = null
					this.dataForm.designer = null
					this.dataForm.designerName = null
					this.dataForm.designDate = null
					this.dataForm.revieweder = null
					this.dataForm.reviewederName = null
					this.dataForm.reviewedDate = null
					this.dataForm.status = 1
				} else {
					this.titleText = '工艺修改'
					findProcessVersionByIdd(id).then(response => {
						this.dataForm = response.data
					})
				}
				this.initUserList()
			},
			initUserList() {
				findUserList('').then(response => {
					this.userList = response.data
				})
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						let obj = {};
						obj = this.userList.find((item) => {
							return item.id === this.dataForm.designer;
						});
						this.dataForm.designerName = obj.name

						obj = this.userList.find((item) => {
							return item.id === this.dataForm.reviewer;
						});
						this.dataForm.reviewerName = obj.name
						if (this.workType == 1) {
							saveProcessVersion(this.dataForm).then(response => {
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
							updateProcessVersion(this.dataForm).then(response => {
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
