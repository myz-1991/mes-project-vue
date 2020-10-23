<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm" label-width="80px">
			<el-form-item label="字典名称" prop="dictName">
				<el-input v-model="dataForm.dictName"></el-input>
			</el-form-item>
			<el-form-item label="字典编码" prop="dictCode">
				<el-input v-model="dataForm.dictCode"></el-input>
			</el-form-item>
			<el-form-item label="顺序号" prop="dictSequence">
				<el-input-number v-model="dataForm.dictSequence" controls-position="right" :min="0" label="顺序号"></el-input-number>
			</el-form-item>
			<el-form-item label="备注" prop="dictNote">
				<el-input v-model="dataForm.dictNote"></el-input>
			</el-form-item>
			<el-form-item label="字典类型" prop="dictType">
				<el-radio-group v-model="dataForm.dictType">
					<el-radio :label="2">词条</el-radio>
					<el-radio :label="1">条目</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="状态" size="mini" prop="dictStatus">
				<el-radio-group v-model="dataForm.dictStatus">
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
		data() {
			return {
				visible: false,
				titleText: '字典增加',
				workType: 1,
				dataForm: {
					dictId: '',
					dictName: '',
					dictCode: '',
					dictType: 1,
					dictNote: '',
					dictSequence : 0,
					dictStatus: 1,
					dictPid: ''
				},
			}
		},
		methods: {
			init(workType, id) {
				this.workType = workType
				this.dataForm.dictId = ''
				this.dataForm.dictName = ''
				this.dataForm.dictCode = ''
				this.dataForm.dictType = 1
				this.dataForm.dictNote = ''
				this.dataForm.dictSequence = 0
				this.dataForm.dictStatus = 1
				this.dataForm.dictPid = ''
				if (workType == 1) {
					this.visible = true
					this.dataForm.dictPid = id
				} else {
					this.titleText='字典修改'
					this.$http({
						url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryById'),
						method: 'get',
						params: {
							dictId: id
						}
					}).then(({
						data
					}) => {
						this.visible = true
						if (data) {
							this.dataForm.dictId = data.dictId
							this.dataForm.dictName = data.dictName
							this.dataForm.dictCode = data.dictCode
							this.dataForm.dictType = data.dictType
							this.dataForm.dictNote = data.dictNote
							this.dataForm.dictStatus = data.dictStatus
							this.dataForm.dictPid = data.dictPid
						}
					})
				}
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							this.$http({
								url: this.$http.adornSystemUrl('/sys/v1/dictionary/saveDictionary'),
								method: 'post',
								data: this.$http.adornData({
									dictName: this.dataForm.dictName,
									dictCode: this.dataForm.dictCode,
									dictType: this.dataForm.dictType,
									dictNote: this.dataForm.dictNote,
									dictStatus: this.dataForm.dictStatus,
									dictSequence : this.dataForm.dictSequence,
									dictPid: this.dataForm.dictPid
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
								url: this.$http.adornSystemUrl('/sys/v1/dictionary/updateDictionaryById'),
								method: 'put',
								data: this.$http.adornData({
									dictId: this.dataForm.dictId,
									dictName: this.dataForm.dictName,
									dictCode: this.dataForm.dictCode,
									dictType: this.dataForm.dictType,
									dictNote: this.dataForm.dictNote,
									dictStatus: this.dataForm.dictStatus,
									dictSequence : this.dataForm.dictSequence,
									dictPid: this.dataForm.dictPid
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
