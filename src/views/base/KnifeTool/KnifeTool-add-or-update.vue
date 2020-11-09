<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="刀具编码" prop="code">
						<el-input v-model="dataForm.code" placeholder="刀具编码" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="刀具名称" prop="name">
						<el-input v-model="dataForm.name" placeholder="刀具名称" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<!-- el-col :span="12">
					<el-form-item label="刀具类型" prop="mateType">
						<el-select v-model="dataForm.mateType" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateTypeChange(val, index)})">
							<el-option v-for="item in mateTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col> -->
				<el-col :span="12">
					<el-form-item label="刀具规格" prop="model">
						<el-input v-model="dataForm.model" placeholder="刀具规格" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="NC程序号" prop="ncNumber">
						<el-input v-model="dataForm.ncNumber" placeholder="NC程序号" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="备注" size="mini" prop="note">
						<el-input v-model="dataForm.note" type="textarea" rows="3" />
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
		findToolById,
		updateTool,
		saveTool
	} from '@/api/base/tool'
	export default {
		data() {
			return {
				visible: false,
				mateTypeList: [],
				mateUnitList: [],
				mateSourceList: [],
				mateWeightUnitList: [],
				titleText: '刀具添加',
				workType: 1,
				dataForm: {
					id: '',
					name: null,
					code: null,
					model: null,
					ncNumber: null,
					note: null,
					readIdentifying : 1,
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
					this.dataForm.name = ''
					this.dataForm.code = ''
					this.dataForm.model = ''
					this.dataForm.ncNumber = ''
					this.dataForm.note = ''
					this.dataForm.readIdentifying = 1
				} else {
					this.titleText = '刀具修改'
					findToolById(id).then(response => {
						this.dataForm = response.data
					})
				}
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							saveTool(this.dataForm).then(response => {
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
							updateTool(this.dataForm).then(response => {
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
