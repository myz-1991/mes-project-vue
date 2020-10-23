<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="40%">
		<el-form :model="dataForm" size="small" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="上级物料" prop="matePid">
          	<el-select v-model="dataForm.matePid" placeholder="请选择" style="width: 100%;" filterable>
          	    <el-option v-for="item in mateList" :key="item.mateId" :label="item.mateName" :value="item.mateId">
          	    </el-option>
          	</el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="下级物料" prop="mateId">
          	<el-select v-model="dataForm.mateId" placeholder="请选择" style="width: 100%;" filterable>
          	    <el-option v-for="item in mateList" :key="item.mateId" :label="item.mateName" :value="item.mateId">
          	    </el-option>
          	</el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单套数量" prop="relaSingleNum">
          	<el-input-number v-model="dataForm.relaSingleNum" style="width: 100%;"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="单位" prop="relaUnit">
          	<el-select v-model="dataForm.relaUnit" placeholder="请选择" style="width: 100%;" @change="((val)=>{mateUnitChange(val, index)})">
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
	export default {
		data() {
			return {
				visible: false,
				titleText: 'BOM结构增加',
				workType: 1,
				mateList : [],
				mateUnitList: [],
				dataForm: {
					relaId: '',
					mateId: '',
					matePid: '',
					relaSingleNum : 0,
					relaUnit: '',
					relaUnitName: ''
				},
			}
		},
		methods: {
			init(workType, row) {
				this.dataForm.relaId =''
				this.dataForm.mateId = ''
				this.dataForm.matePid = ''
				this.dataForm.relaSingleNum = 0
				this.dataForm.relaUnit = ''
				this.dataForm.relaUnitName = ''

				this.workType = workType

				if (workType == 1) {
          this.titleText='BOM结构增加'
					this.visible = true
					if (row != null) {
						this.dataForm.matePid = row.mateId
					}
				} else {
					this.titleText='BOM结构修改'
					this.dataForm.relaId = row.relaId
					this.dataForm.mateId = row.mateId
					this.dataForm.matePid = row.matePid
					this.dataForm.relaSingleNum = row.relaSingleNum
					this.dataForm.relaUnit = row.relaUnit
					this.dataForm.relaUnitName = row.relaUnitName
				}
				this.initMateList()
				this.initMateUnitList()
			},
			initMateList() {
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/material/pagedQueryMaterialByParam'),
					method: 'get'
				}).then(({
					data
				}) => {
					this.visible = true
					if (data) {
						this.mateList = data.data
					}
				})
			},
			// 初始化物料类型可选项
			initMateUnitList() {
					  this.$http({
					  	url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					  	method: 'get',
					  	params: {
					  		dictCode : 'unit'
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
					  debugger
					  let obj = {};
					  obj = this.mateUnitList.find((item)=>{
						return item.dictCode === val;
					  });
					  this.dataForm.relaUnitName = obj.dictName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							this.$http({
								url: this.$http.adornBomUrl('/bom/v1/relaton/insertBomRelation'),
								method: 'post',
								data: this.$http.adornData({
									mateId : this.dataForm.mateId,
									matePid : this.dataForm.matePid,
									relaSingleNum : this.dataForm.relaSingleNum,
									relaUnit : this.dataForm.relaUnit,
									relaUnitName : this.dataForm.relaUnitName
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
								url: this.$http.adornBomUrl('/bom/v1/relaton/updateBomRelationById'),
								method: 'put',
								data: this.$http.adornData({
									relaId : this.dataForm.relaId,
									mateId : this.dataForm.mateId,
									matePid : this.dataForm.matePid,
									relaSingleNum : this.dataForm.relaSingleNum,
									relaUnit : this.dataForm.relaUnit,
									relaUnitName : this.dataForm.relaUnitName
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
