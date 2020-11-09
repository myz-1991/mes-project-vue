<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="40%">
		<el-form :model="dataForm" size="small" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="上级物料" prop="matePid">
						<el-input v-model="dataForm.matePname" readOnly></el-input>
						<!-- <el-select v-model="dataForm.matePid" placeholder="请选择" style="width: 100%;" filterable>
							<el-option v-for="item in mateList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select> -->
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="下级物料" prop="mateId">
						<el-select v-model="dataForm.mateId" placeholder="请选择" style="width: 100%;" filterable>
							<el-option v-for="item in mateList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="单套数量" prop="singleNum">
						<el-input-number v-model="dataForm.singleNum" style="width: 100%;"></el-input-number>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="单位" prop="unit">
						<el-select v-model="dataForm.unit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateUnitChange(val, index)})">
							<el-option v-for="item in mateUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
							</el-option>
						</el-select>
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
		findMaterielList
	} from '@/api/base/materiel'
	import {
		findRelationById,
		saveRelation,
		updateRelation
	} from '@/api/bom/relation'
	import {
		findDictionaryByCode
	} from '@/api/system/dict'
	export default {
		data() {
			return {
				visible: false,
				titleText: 'BOM结构增加',
				workType: 1,
				mateList: [],
				mateUnitList: [],
				dataForm: {
					id: '',
					mateId: '',
					mateName : '',
					mateCode : '',
					mateSpecifications : '',
					matePid: 0,
					matePname : '',
					matePcode : '',
					matePspecifications : '',
					singleNum: 0,
					unit: '',
					unitName: ''
				},
			}
		},
		methods: {
			init(workType, row) {
				this.visible = true
				this.dataForm.relaId = ''
				this.dataForm.mateId = ''
				this.dataForm.mateName = ''
				this.dataForm.mateCode = ''
				this.dataForm.mateSpecifications = ''
				this.dataForm.matePid = 0
				this.dataForm.matePname = ''
				this.dataForm.matePcode = ''
				this.dataForm.matePspecifications = ''
				this.dataForm.singleNum = 0
				this.dataForm.unit = ''
				this.dataForm.unitName = ''

				this.workType = workType

				if (workType == 1) {
					debugger
					this.titleText = 'BOM结构增加'
					if (row != null) {
						this.dataForm.matePid = row.mateId
						this.dataForm.matePname = row.mateName
						this.dataForm.matePcode = row.mateCode
						this.dataForm.matePspecifications = row.mateSpecifications
					}
				} else {
					this.titleText = 'BOM结构修改'
					findRelationById(row.id).then(response => {
						this.dataForm = response.data
					})
				}
				this.initMateList()
				this.initMateUnitList()
			},
			initMateList() {
				findMaterielList('').then(response => {
					if (response) {
						this.mateList = response.data
					}
				})
			},
			// 初始化物料类型可选项
			initMateUnitList() {
				findDictionaryByCode('BASE.MATERIEL.UNIT.').then(response => {
					if (response) {
						this.mateUnitList = response.data
					}
				})
			},
			mateUnitChange(val) {
				debugger
				let obj = {};
				obj = this.mateUnitList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.unitName = obj.dictName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						let obj = {};
						obj = this.mateList.find((item) => {
							return item.id === this.dataForm.mateId;
						});
						this.dataForm.mateName = obj.name
						this.dataForm.mateCode = obj.code
						this.dataForm.mateSpecifications = obj.specifications
						
						if (this.workType == 1) {
							saveRelation(this.dataForm).then(response => {
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
							updateRelation(this.dataForm).then(response => {
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
