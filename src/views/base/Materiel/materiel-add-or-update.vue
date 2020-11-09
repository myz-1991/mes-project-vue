<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料编码" prop="code">
						<el-input v-model="dataForm.code" placeholder="物料编码" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="物料名称" prop="name">
						<el-input v-model="dataForm.name" placeholder="物料名称" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料图号" prop="designnumber">
						<el-input v-model="dataForm.designnumber" placeholder="物料图号" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="物料规格" prop="specifications">
						<el-input v-model="dataForm.specifications" placeholder="物料规格" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料类型" prop="typeName">
						<el-select v-model="dataForm.typeName" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateTypeChange(val, index)})">
							<el-option v-for="item in mateTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="计量单位" prop="unit">
						<el-select v-model="dataForm.unit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateUnitChange(val, index)})">
							<el-option v-for="item in mateUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="来源" prop="source">
						<el-select v-model="dataForm.source" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateSourceChange(val, index)})">
							<el-option v-for="item in mateSourceList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="物料尺寸" prop="mateSize">
						<el-input v-model="dataForm.mateSize" placeholder="物料尺寸" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料牌号" prop="brand">
						<el-input v-model="dataForm.brand" placeholder="物料牌号" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="物料材质" prop="texture">
						<el-input v-model="dataForm.texture" placeholder="物料材质" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料净重" prop="netWeight">
						<el-input v-model="dataForm.netWeight" placeholder="物料净重" />
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="物料毛重" prop="grossWeight">
						<el-input v-model="dataForm.grossWeight" placeholder="物料毛重" />
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="重量单位" prop="weightUnit">
						<el-select v-model="dataForm.weightUnit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateWeightUnitChange(val, index)})">
							<el-option v-for="item in mateWeightUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="辅助单位" prop="auxiliaryUnit">
						<el-select v-model="dataForm.auxiliaryUnit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateAuxiliaryUnitChange(val, index)})">
							<el-option v-for="item in mateUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="物料炉号" prop="furnaceNumber">
						<el-input v-model="dataForm.furnaceNumber" placeholder="物料炉号" />
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
		findMaterielById,
		updateMateriel,
		saveMateriel
	} from '@/api/base/materiel'
	
	import { findDictionaryByCode } from '@/api/system/dict'
	
	export default {
		data() {
			return {
				visible: false,
				mateTypeList: [],
				mateUnitList: [],
				mateSourceList: [],
				mateWeightUnitList: [],
				titleText: '物料增加',
				workType: 1,
				dataForm: {
					id: '',
					name: '',
					code: '',
					type: '',
					typeName: '',
					specifications: '',
					designnumber: '',
					unit: '',
					unitName: '',
					source: '',
					sourceName: '',
					mateSize: '',
					brand: '',
					furnaceNumber: '',
					netWeight: '',
					grossWeight: '',
					weightUnit: '',
					weightUnitName: '',
					texture: '',
					auxiliaryUnit: '',
					auxiliaryUnitName: '',
					note : '',
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
					this.dataForm.name = ''
					this.dataForm.code = ''
					this.dataForm.type = ''
					this.dataForm.typeName = ''
					this.dataForm.specifications = ''
					this.dataForm.designnumber = ''
					this.dataForm.unit = ''
					this.dataForm.unitName = ''
					this.dataForm.source = ''
					this.dataForm.sourceName = ''
					this.dataForm.mateSize = ''
					this.dataForm.brand = ''
					this.dataForm.furnaceNumber = ''
					this.dataForm.netWeight = ''
					this.dataForm.grossWeight = ''
					this.dataForm.weightUnit = ''
					this.dataForm.weightUnitName = ''
					this.dataForm.texture = ''
					this.dataForm.auxiliaryUnit = ''
					this.dataForm.auxiliaryUnitName = ''
					this.dataForm.note = ''
					this.dataForm.readIdentifying = 1
				} else {
					this.titleText = '物料修改'
					findMaterielById(id).then(response => {
						this.dataForm = response.data
					})
				}
				this.initMateTypeList()
				this.initMateUnitList()
				this.initMateSourceList()
				this.initMateWeightUnitList()
			},
			initMateWeightUnitList() {
				findDictionaryByCode('BASE.MATERIEL.WEIGHTUNIT.').then(response => {
					if (response) {
						this.mateWeightUnitList = response.data
					}
				})
			},
			mateWeightUnitChange(val) {
				let obj = {}
				obj = this.mateWeightUnitList.find((item) => {
					return item.dictCode === val
				})
				this.dataForm.weightUnitName = obj.dictName
			},
			// 初始化物料类型可选项
			initMateTypeList() {
				findDictionaryByCode('BASE.MATERIEL.TYPE.').then(response => {
					if (response) {
						this.mateTypeList = response.data
					}
				})
			},
			mateTypeChange(val) {
				let obj = {}
				obj = this.mateTypeList.find((item) => {
					return item.dictCode === val
				})
				this.dataForm.typeName = obj.dictName
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
				let obj = {}
				obj = this.mateUnitList.find((item) => {
					return item.dictCode === val
				})
				this.dataForm.unitName = obj.dictName
			},
			mateAuxiliaryUnitChange(val) {
				let obj = {}
				obj = this.mateUnitList.find((item) => {
					return item.dictCode === val
				})
				this.dataForm.auxiliaryUnitName = obj.dictName
			},
			// 初始化物料类型可选项
			initMateSourceList() {
				findDictionaryByCode('BASE.MATERIEL.SOURCE.').then(response => {
					if (response) {
						this.mateSourceList = response.data
					}
				})
			},
			mateSourceChange(val) {
				let obj = {}
				obj = this.mateSourceList.find((item) => {
					return item.dictCode === val
				})
				this.dataForm.sourceName = obj.dictName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							saveMateriel(this.dataForm).then(response => {
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
							updateMateriel(this.dataForm).then(response => {
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
