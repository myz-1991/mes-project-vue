<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
			<el-form-item label="字典名称" prop="dictName">
				<el-input v-model="dataForm.dictName"></el-input>
			</el-form-item>
			<el-form-item label="字典编码" prop="dictCode">
				<el-input v-model="dataForm.dictCode"></el-input>
			</el-form-item>
			<el-form-item label="字典类型" prop="dictType">
				<el-radio-group v-model="dataForm.dictType">
					<el-radio :label="2">业务</el-radio>
					<el-radio :label="1">通用</el-radio>
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
			<el-button type="danger" size="small" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
			<el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
  import { saveDictionary, findDictionaryById, updateDictionary } from '@/api/system/dict'
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
				this.dataForm.dictStatus = 1
				this.dataForm.dictPid = ''
        this.visible = true
				if (workType == 1) {
          this.titleText='字典添加'
					this.dataForm.dictPid = id
				} else {
					this.titleText='字典修改'
          findDictionaryById(id).then(response => {
            debugger
            this.dataForm = response.data
          })
				}
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
              saveDictionary(this.dataForm).then(response => {
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
              updateDictionary(this.dataForm).then(response => {
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
