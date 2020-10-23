<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
	<el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
    <el-row>
      <el-col :span="12">
        <el-form-item label="夹具编码" prop="mateCode">
          <el-input v-model="dataForm.mateCode" placeholder="夹具编码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="夹具名称" prop="mateName">
          <el-input v-model="dataForm.mateName" placeholder="夹具名称"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-form-item label="规格型号" prop="mateDesignNumber">
          <el-input v-model="dataForm.mateDesignNumber" placeholder="规格型号"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="精度" prop="mateSpecifications">
          <el-input v-model="dataForm.mateSpecifications" placeholder="精度"></el-input>
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
    data () {
      return {
        visible: false,
        mateTypeList: [],
        mateUnitList: [],
        mateSourceList : [],
        mateWeightUnitList : [],
        titleText: '夹具添加',
        workType : 1,
        dataForm: {
          mateId : 0,
          mateName : null,
          mateCode : null,
          mateSpecifications : null,
          mateDesignNumber : null,
          mateType : null,
          mateTypeName : null,
          mateUnit : null,
          mateUnitName : null,
          mateSource : null,
          mateSourceName : null,
          mateNote : null,
          mateSize : null,
          mateBrand : null,
          mateFurnaceNumber : null,
          mateNetWeight : null,
          mateGrossWeight : null,
          mateWeightUnit : null,
          mateWeightUnitName : null,
          mateTexture : null,
          mateAuxiliaryUnit : null,
          mateAuxiliaryUnitName : null
        }
      }
    },
    methods: {
      init (workType, id) {
        //this.dataForm.userId = id || 0
		this.workType = workType

		if (workType == 1) {
			this.visible = true
			this.dataForm.mateId = 0
			this.dataForm.mateName = ''
			this.dataForm.mateCode = ''
			this.dataForm.mateSpecifications = ''
			this.dataForm.mateDesignNumber = ''
			this.dataForm.mateType = ''
			this.dataForm.mateTypeName = ''
			this.dataForm.mateUnit = ''
			this.dataForm.mateUnitName = ''
			this.dataForm.mateSource = ''
			this.dataForm.mateSourceName = ''
			this.dataForm.mateNote = ''
      this.dataForm.mateSize = ''
      this.dataForm.mateBrand  = ''
      this.dataForm.mateFurnaceNumber  = ''
      this.dataForm.mateNetWeight  = ''
      this.dataForm.mateGrossWeight  = ''
      this.dataForm.mateWeightUnit  = ''
      this.dataForm.mateWeightUnitName  = ''
      this.dataForm.mateTexture  = ''
      this.dataForm.mateAuxiliaryUnit  = ''
      this.dataForm.mateAuxiliaryUnitName = ''
		} else {
			this.titleText = '夹具修改'
			this.$http({
				url: this.$http.adornBomUrl('/bom/v1/material/selectMaterialById'),
				method: 'get',
				params: {
					mateId: id
				}
			}).then(({
				data
			}) => {
				this.visible = true
				if (data) {
					this.dataForm.mateId = data.mateId
					this.dataForm.mateName = data.mateName
					this.dataForm.mateCode = data.mateCode
					this.dataForm.mateSpecifications = data.mateSpecifications
					this.dataForm.mateDesignNumber = data.mateDesignNumber
					this.dataForm.mateType = data.mateType
					this.dataForm.mateTypeName = data.mateTypeName
					this.dataForm.mateUnit = data.mateUnit
					this.dataForm.mateUnitName = data.mateUnitName
					this.dataForm.mateSource = data.mateSource
					this.dataForm.mateSourceName = data.mateSourceName
					this.dataForm.mateNote = data.mateNote
          this.dataForm.mateSize = data.mateSize
          this.dataForm.mateBrand  = data.mateBrand
          this.dataForm.mateFurnaceNumber  = data.mateFurnaceNumber
          this.dataForm.mateNetWeight  = data.mateNetWeight
          this.dataForm.mateGrossWeight  = data.mateGrossWeight
          this.dataForm.mateWeightUnit  = data.mateWeightUnit
          this.dataForm.mateWeightUnitName  = data.mateWeightUnitName
          this.dataForm.mateTexture  = data.mateTexture
          this.dataForm.mateAuxiliaryUnit  = data.mateAuxiliaryUnit
          this.dataForm.mateAuxiliaryUnitName = data.mateAuxiliaryUnitName
				}
			})
		}
		this.initMateTypeList()
		this.initMateUnitList()
		this.initMateSourceList()
    this.initMateWeightUnitList()
    },
    initMateWeightUnitList() {
      this.$http({
      	url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
      	method: 'get',
      	params: {
      		dictCode : 'BASE.WeightUnit'
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
      obj = this.mateWeightUnitList.find((item)=>{
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
		  		dictCode : 'materiel_type'
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
		  obj = this.mateTypeList.find((item)=>{
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
	  		  let obj = {};
	  		  obj = this.mateUnitList.find((item)=>{
	  			return item.dictCode === val;
	  		  });
	  		  this.dataForm.mateUnitName = obj.dictName
	  },
    mateAuxiliaryUnitChange(val) {
      let obj = {};
      obj = this.mateUnitList.find((item)=>{
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
	  		  		dictCode : 'mateSource'
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
	  		  obj = this.mateSourceList.find((item)=>{
	  			return item.dictCode === val;
	  		  });
	  		  this.dataForm.mateSourceName = obj.dictName
	  },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
			  	if (this.workType == 1) {
			  		this.$http({
			  			url: this.$http.adornBomUrl('/bom/v1/material/insertMaterial'),
			  			method: 'post',
			  			data: this.$http.adornData({
							mateName : this.dataForm.mateName,
							mateCode : this.dataForm.mateCode,
							mateSpecifications : this.dataForm.mateSpecifications,
							mateDesignNumber : this.dataForm.mateDesignNumber,
							mateType : this.dataForm.mateType,
							mateTypeName : this.dataForm.mateTypeName,
							mateUnit : this.dataForm.mateUnit,
							mateUnitName : this.dataForm.mateUnitName,
							mateSource : this.dataForm.mateSource,
							mateSourceName : this.dataForm.mateSourceName,
							mateNote : this.dataForm.mateNote,
              mateSize : this.dataForm.mateSize,
              mateBrand : this.dataForm.mateBrand,
              mateFurnaceNumber : this.dataForm.mateFurnaceNumber,
              mateNetWeight : this.dataForm.mateNetWeight,
              mateGrossWeight : this.dataForm.mateGrossWeight,
              mateWeightUnit : this.dataForm.mateWeightUnit,
              mateWeightUnitName : this.dataForm.mateWeightUnitName,
              mateTexture : this.dataForm.mateTexture,
              mateAuxiliaryUnit : this.dataForm.mateAuxiliaryUnit,
              mateAuxiliaryUnitName : this.dataForm.mateAuxiliaryUnitName
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
			  				mateId : this.dataForm.mateId,
			  				mateName : this.dataForm.mateName,
			  				mateCode : this.dataForm.mateCode,
			  				mateSpecifications : this.dataForm.mateSpecifications,
			  				mateDesignNumber : this.dataForm.mateDesignNumber,
			  				mateType : this.dataForm.mateType,
			  				mateTypeName : this.dataForm.mateTypeName,
			  				mateUnit : this.dataForm.mateUnit,
			  				mateUnitName : this.dataForm.mateUnitName,
			  				mateSource : this.dataForm.mateSource,
			  				mateSourceName : this.dataForm.mateSourceName,
			  				mateNote : this.dataForm.mateNote,
                mateSize : this.dataForm.mateSize,
                mateBrand : this.dataForm.mateBrand,
                mateFurnaceNumber : this.dataForm.mateFurnaceNumber,
                mateNetWeight : this.dataForm.mateNetWeight,
                mateGrossWeight : this.dataForm.mateGrossWeight,
                mateWeightUnit : this.dataForm.mateWeightUnit,
                mateWeightUnitName : this.dataForm.mateWeightUnitName,
                mateTexture : this.dataForm.mateTexture,
                mateAuxiliaryUnit : this.dataForm.mateAuxiliaryUnit,
                mateAuxiliaryUnitName : this.dataForm.mateAuxiliaryUnitName
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
