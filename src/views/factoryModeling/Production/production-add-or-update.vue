<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
	<el-form :model="productionDataForm" ref="dataForm" size="small" label-width="100px">
		<el-form-item label="生产资源名称" prop="name">
		  <el-input v-model="productionDataForm.prodName" placeholder="生产资源名称"></el-input>
		</el-form-item>
		<el-form-item label="生产资源编码" prop="prodCode">
		  <el-input v-model="productionDataForm.prodCode" placeholder="生产资源编码"></el-input>
		</el-form-item>
	  <el-form-item  label="生产资源类型" prop="prodType">
		<el-select v-model="productionDataForm.prodType" placeholder="请选择" style="width: 100%;" @change="((val)=>{prodTypeChange(val, index)})">
		    <el-option v-for="item in prodTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
		    </el-option>
		</el-select>
	  </el-form-item>
	  <!-- <el-form-item label="已选内容" prop="roleList">
	      <el-checkbox-group>
	        <el-checkbox v-for="item in roleList" :key="item.contUnitId" :label="item.contUnitName"></el-checkbox>
	      </el-checkbox-group>
	  </el-form-item>
	  <el-form-item  label="生产资源内容" prop="contentSelect">
	  		<el-select v-model="contentSelect" placeholder="请选择" width="500" multiple ref="contentSelect">
	  		    <el-option v-if="productionDataForm.prodType === 'prodType.001'" v-for="item in contentList" :key="item.userId" :label="item.userName" :value="item.userId">
	  		    </el-option>
				<el-option v-else v-for="item in contentList" :key="item.userId" :label="item.userName" :value="item.userId">
				</el-option>
	  		</el-select>
	  </el-form-item> -->
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
        roleList: [],
		prodTypeList : [],
		contentList : [],
		titleText: '生产资源增加',
		workType : 1,
		contentSelect : [],
        productionDataForm: {
          prodId: 0,
		  prodName : '',
		  prodCode : '',
          prodType: '',
          prodTypeName: '',
          orgId: '',
		  contextList : []
        }
      }
    },
    methods: {
      init (workType, row) {
        //this.dataForm.userId = id || 0
		this.workType = workType
		this.contentSelect = []
		this.initProdTypeList()
		this.productionDataForm.contextList = []
		if (workType == 1) {
			this.visible = true
			this.productionDataForm.prodId = 0
			this.productionDataForm.prodName = ''
			this.productionDataForm.prodCode = ''
			this.productionDataForm.prodType = ''
			this.productionDataForm.prodTypeName = ''
			this.productionDataForm.orgId = row.orgId
		} else {
			this.titleText = '生产资源修改'
			this.productionDataForm.prodId = row.prodId
			this.$http({
				url: this.$http.adornBomUrl('/bom/v1/production/selectProductionById'),
				method: 'get',
				params: {
					prodId: row.prodId
				}
			}).then(({
				data
			}) => {
				this.visible = true
				if (data) {
					this.productionDataForm.prodId = data.prodId
					this.productionDataForm.prodName = data.prodName
					this.productionDataForm.prodCode = data.prodCode
					this.productionDataForm.prodType = data.prodType
					this.productionDataForm.prodTypeName = data.prodTypeName
					this.productionDataForm.orgId = data.orgId
					this.initContext()
					this.prodTypeChange(data.prodType)
				}
			})
		}

      },
	  // 初始化物料类型可选项
	  initProdTypeList() {
	  		  this.$http({
	  		  	url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
	  		  	method: 'get',
	  		  	params: {
	  		  		dictCode : 'prodType'
	  		  	}
	  		  }).then(({
	  		  	data
	  		  }) => {
	  		  	if (data) {
	  		  		this.prodTypeList = data
	  		  	}
	  		  })
	  },
	  prodTypeChange(val) {
		  let obj = {};
		  obj = this.prodTypeList.find((item)=>{
			return item.dictCode === val;
		  });
		  this.productionDataForm.prodTypeName = obj.dictName
		  if (val == 'prodType.001') {
			  this.initContextList()
		  }
	  },
	  // 初始化角色
	  initContextList() {
	  		  this.$http({
	  		  	url: this.$http.adornSystemUrl('/sys/v1/user/selectUserByParam'),
	  		  	method: 'get',
            params: {
              prodId: this.productionDataForm.prodId
            }
	  		  }).then(({
	  		  	data
	  		  }) => {
	  		  	if (data) {
	  		  		this.contentList = data.data
	  		  	}
	  		  })
	  },
	  // 初始化角色
	  initContext() {
		  this.$http({
		  	url: this.$http.adornBomUrl('/bom/v1/content/selectProductionContentByProdId'),
		  	method: 'get',
			params: {
				prodId: this.productionDataForm.prodId
			}
		  }).then(({
		  	data
		  }) => {
		  	if (data) {
				debugger
				this.roleList = data
		  		this.productionDataForm.contextList = data
		  	}
		  })
	  },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
			  debugger
			  let cont = this.$refs.contentSelect.selected;
			  for (let i = 0; i < cont.length; i++) {
				  let model = {
					  contUnitId : cont[i].value,
					  contUnitName : cont[i].label,
					  contType : this.productionDataForm.prodType,
					  contTypeName : this.productionDataForm.prodTypeName
				  }
				  this.productionDataForm.contextList.push(model)
			  }
			  	if (this.workType == 1) {
			  		this.$http({
			  			url: this.$http.adornBomUrl('/bom/v1/production/insertProduction'),
			  			method: 'post',
			  			data: this.$http.adornData({
							prodName : this.productionDataForm.prodName,
							prodCode : this.productionDataForm.prodCode ,
							prodType: this.productionDataForm.prodType,
							prodTypeName: this.productionDataForm.prodTypeName,
							orgId: this.productionDataForm.orgId,
							contextList : this.productionDataForm.contextList
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
			  			url: this.$http.adornBomUrl('/bom/v1/production/updateProductionById'),
			  			method: 'put',
			  			data: this.$http.adornData({
			  				prodId : this.productionDataForm.prodId,
			  				prodName : this.productionDataForm.prodName,
			  				prodCode : this.productionDataForm.prodCode ,
			  				prodType: this.productionDataForm.prodType,
			  				prodTypeName: this.productionDataForm.prodTypeName,
			  				orgId: this.productionDataForm.orgId,
			  				contextList : this.productionDataForm.contextList
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
