<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
			<el-row>
				<el-col :span="12">
					<el-form-item label="选择车间" prop="mateType">
						<el-select v-model="dataForm.mateType" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateTypeChange(val, index)})">
							<el-option v-for="item in mateTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="班次模型" prop="mateUnit">
						<el-select v-model="dataForm.mateUnit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateUnitChange(val, index)})">
							<el-option v-for="item in mateUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="12">
					<el-form-item label="开始日期" prop="startTime1">
						<el-date-picker v-model="dataForm.startTime1" type="date" placeholder="开始日期" style="width: 100%;">
						</el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12">
					<el-form-item label="结束日期" prop="endTime1">
						<el-date-picker v-model="dataForm.endTime1" type="date" placeholder="结束日期" style="width: 100%;">
						</el-date-picker>
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
				mateTypeList: [],
				mateUnitList: [],
				mateSourceList: [],
				mateWeightUnitList: [],
				titleText: '工厂日历设置',
				workType: 1,
				dataForm: {
					mateId: 0,
					mateName: null,
					mateCode: null,
					mateSpecifications: null,
					mateDesignNumber: null,
					mateType: null,
					mateTypeName: null,
					mateUnit: null,
					mateUnitName: null,
					mateSource: null,
					mateSourceName: null,
					mateNote: null,
					mateSize: null,
					mateBrand: null,
					mateFurnaceNumber: null,
					mateNetWeight: null,
					mateGrossWeight: null,
					mateWeightUnit: null,
					mateWeightUnitName: null,
					mateTexture: null,
					mateAuxiliaryUnit: null,
					mateAuxiliaryUnitName: null,
					startTime3 : null,
					startTime2 : null,
					startTime1 : null,
					endTime1 : null,
					endTime2 : null,
					endTime3 : null,
				}
			}
		},
		methods: {
			init() {
				this.visible = true
			},
			initMateWeightUnitList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'BASE.WeightUnit'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.mateWeightUnitList = data
					}
				})
			},
			mateWeightUnitChange(val) {
				let obj = {};
				obj = this.mateWeightUnitList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.mateWeightUnitName = obj.dictName
			},
			// 初始化物料类型可选项
			initMateTypeList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'materiel_type'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.mateTypeList = data
					}
				})
			},
			mateTypeChange(val) {
				let obj = {};
				obj = this.mateTypeList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.mateTypeName = obj.dictName
			},
			// 初始化物料类型可选项
			initMateUnitList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'unit'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.mateUnitList = data
					}
				})
			},
			mateUnitChange(val) {
				let obj = {};
				obj = this.mateUnitList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.mateUnitName = obj.dictName
			},
			mateAuxiliaryUnitChange(val) {
				let obj = {};
				obj = this.mateUnitList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.mateAuxiliaryUnitName = obj.dictName
			},
			// 初始化物料类型可选项
			initMateSourceList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'mateSource'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.mateSourceList = data
					}
				})
			},
			mateSourceChange(val) {
				debugger
				let obj = {};
				obj = this.mateSourceList.find((item) => {
					return item.dictCode === val;
				});
				this.dataForm.mateSourceName = obj.dictName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							this.$http({
								url: this.$http.adornBomUrl('/bom/v1/material/insertMaterial'),
								method: 'post',
								data: this.$http.adornData({
									mateName: this.dataForm.mateName,
									mateCode: this.dataForm.mateCode,
									mateSpecifications: this.dataForm.mateSpecifications,
									mateDesignNumber: this.dataForm.mateDesignNumber,
									mateType: this.dataForm.mateType,
									mateTypeName: this.dataForm.mateTypeName,
									mateUnit: this.dataForm.mateUnit,
									mateUnitName: this.dataForm.mateUnitName,
									mateSource: this.dataForm.mateSource,
									mateSourceName: this.dataForm.mateSourceName,
									mateNote: this.dataForm.mateNote,
									mateSize: this.dataForm.mateSize,
									mateBrand: this.dataForm.mateBrand,
									mateFurnaceNumber: this.dataForm.mateFurnaceNumber,
									mateNetWeight: this.dataForm.mateNetWeight,
									mateGrossWeight: this.dataForm.mateGrossWeight,
									mateWeightUnit: this.dataForm.mateWeightUnit,
									mateWeightUnitName: this.dataForm.mateWeightUnitName,
									mateTexture: this.dataForm.mateTexture,
									mateAuxiliaryUnit: this.dataForm.mateAuxiliaryUnit,
									mateAuxiliaryUnitName: this.dataForm.mateAuxiliaryUnitName
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
								url: this.$http.adornBomUrl('/bom/v1/material/updateMaterialById'),
								method: 'put',
								data: this.$http.adornData({
									mateId: this.dataForm.mateId,
									mateName: this.dataForm.mateName,
									mateCode: this.dataForm.mateCode,
									mateSpecifications: this.dataForm.mateSpecifications,
									mateDesignNumber: this.dataForm.mateDesignNumber,
									mateType: this.dataForm.mateType,
									mateTypeName: this.dataForm.mateTypeName,
									mateUnit: this.dataForm.mateUnit,
									mateUnitName: this.dataForm.mateUnitName,
									mateSource: this.dataForm.mateSource,
									mateSourceName: this.dataForm.mateSourceName,
									mateNote: this.dataForm.mateNote,
									mateSize: this.dataForm.mateSize,
									mateBrand: this.dataForm.mateBrand,
									mateFurnaceNumber: this.dataForm.mateFurnaceNumber,
									mateNetWeight: this.dataForm.mateNetWeight,
									mateGrossWeight: this.dataForm.mateGrossWeight,
									mateWeightUnit: this.dataForm.mateWeightUnit,
									mateWeightUnitName: this.dataForm.mateWeightUnitName,
									mateTexture: this.dataForm.mateTexture,
									mateAuxiliaryUnit: this.dataForm.mateAuxiliaryUnit,
									mateAuxiliaryUnitName: this.dataForm.mateAuxiliaryUnitName
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
