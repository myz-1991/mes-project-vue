<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="模具编码" prop="code">
						<el-input v-model="dataForm.code" placeholder="模具编码" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="模具名称" prop="name">
						<el-input v-model="dataForm.name" placeholder="模具名称" />
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
					<el-form-item label="精度" prop="accuracy">
						<el-input v-model="dataForm.accuracy" placeholder="精度" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="额定寿命" prop="ratedlife">
						<el-input v-model="dataForm.ratedlife" placeholder="额定寿命" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="寿命预警" prop="earlywarning">
						<el-input v-model="dataForm.earlywarning" placeholder="寿命预警" />
					</el-form-item>
				</el-col>
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
		saveMould,
		updateMould,
		findMouldById
	} from '@/api/base/mould'
	
	export default {
		data() {
			return {
				visible: false,
				mateTypeList: [],
				mateUnitList: [],
				mateSourceList: [],
				mateWeightUnitList: [],
				titleText: '模具添加',
				workType: 1,
				dataForm: {
					id : '',
					name : null,
					code : null,
					model : null,
					accuracy : null,
					ratedlife : null,
					earlywarning : null,
					note : null,
					readIdentifying : 1
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
					this.dataForm.code = null
					this.dataForm.model = null
					this.dataForm.accuracy = null
					this.dataForm.ratedlife = null
					this.dataForm.earlywarning = null
					this.dataForm.note = null
					this.dataForm.readIdentifying = 1
				} else {
					this.titleText = '模具修改'
					findMouldById(id).then(response => {
						this.dataForm = response.data
					})
				}
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							saveMould(this.dataForm).then(response => {
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
							updateMould(this.dataForm).then(response => {
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
