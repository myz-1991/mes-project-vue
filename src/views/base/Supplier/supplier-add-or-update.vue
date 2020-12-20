<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="名称" prop="name">
						<el-input v-model="dataForm.name" placeholder="名称" />
					</el-form-item>
				</el-col>
        <el-col :span="12">
        	<el-form-item label="地址" prop="address">
        		<el-input v-model="dataForm.address" placeholder="地址" />
        	</el-form-item>
        </el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="联络人" prop="contacts">
						<el-input v-model="dataForm.contacts" placeholder="联络人" />
					</el-form-item>
				</el-col>
        <el-col :span="12">
        	<el-form-item label="联系电话" prop="telephone">
        		<el-input v-model="dataForm.telephone" placeholder="联系电话" />
        	</el-form-item>
        </el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="邮件地址" prop="email">
						<el-input v-model="dataForm.email" placeholder="邮件地址" />
					</el-form-item>
				</el-col>
        <!-- <el-col :span="12">
        	<el-form-item label="信誉等级" prop="grade">
        		<el-input v-model="dataForm.grade" placeholder="信誉等级"></el-input>
        	</el-form-item>
        </el-col> -->
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="备注" prop="note">
						<el-input type="textarea" rows="2" v-model="dataForm.note" placeholder="备注"></el-input>
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
		saveSupplier,
		updateSupplier,
		findSupplierById
	} from '@/api/base/supplier'

	export default {
		data() {
			return {
				visible: false,
				mateTypeList: [],
				mateUnitList: [],
				mateSourceList: [],
				mateWeightUnitList: [],
				titleText: '供应商信息添加',
				workType: 1,
				dataForm: {
					id : '',
					name : null,
					address : null,
					contacts : null,
					telephone : null,
					email : null,
					grade : null,
					note : null,
					type : 2
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
					this.dataForm.name = null
					this.dataForm.address = null
					this.dataForm.contacts = null
					this.dataForm.telephone = null
					this.dataForm.email = null
					this.dataForm.grade = null
					this.dataForm.note = null
					this.dataForm.type = 2
				} else {
					this.titleText = '供应商信息修改'
					findSupplierById(id).then(response => {
						this.dataForm = response.data
					})
				}
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							saveSupplier(this.dataForm).then(response => {
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
							updateSupplier(this.dataForm).then(response => {
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
