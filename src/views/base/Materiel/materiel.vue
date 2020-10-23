<template>
	<div class="app-container">
	  <el-form :model="dataForm" @keyup.enter.native="getDataList()">
		  <el-row>
		  	<el-col :span="8">
		  		<el-form-item label="">
		  			<el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
		  			<el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
		  		</el-form-item>
		  	</el-col>
		  	<el-col :offset="8" :span="8">
		  		<el-form-item label="">
		  			<el-col :span="18">
		  				<el-input type="text" size="small" v-model="dataForm.key" placeholder="物料编码或名称查询" @keyup.enter.native="getDataList()"></el-input>
		  			</el-col>
		  			<el-col :offset="1" :span="3">
		  				<el-button type="primary" size="small" icon="el-icon-search" @click="getDataList()" round>查询</el-button>
		  			</el-col>
		  		</el-form-item>
		  	</el-col>
		  </el-row>
	  </el-form>
	  <el-table :data="dataList" border v-loading="dataListLoading" size="small" style="width: 100%">
		  <el-table-column type="selection" align="center" width="50">
		  </el-table-column>
	    <el-table-column prop="mateCode" header-align="center" align="center" label="物料编码">
	    </el-table-column>
		<el-table-column prop="mateName" header-align="center" align="center" label="物料名称">
		</el-table-column>
		<el-table-column prop="mateDesignNumber" header-align="center" align="center" label="物料图号">
		</el-table-column>
		<el-table-column prop="mateSpecifications" header-align="center" align="center" label="物料规格">
		</el-table-column>
		<el-table-column prop="mateTypeName" header-align="center" align="center" label="物料类型">
		</el-table-column>
		<el-table-column prop="mateUnitName" header-align="center" align="center" label="计量单位">
		</el-table-column>
    <el-table-column prop="mateSize" header-align="center" align="center" label="物料尺寸">
    </el-table-column>
    <el-table-column prop="mateBrand" header-align="center" align="center" label="物料牌号">
    </el-table-column>
    <el-table-column prop="mateSourceName" header-align="center" align="center" label="物料来源">
    </el-table-column>
    <el-table-column prop="mateNetWeight" header-align="center" align="center" label="物料净重">
    </el-table-column>
    <el-table-column prop="mateGrossWeight" header-align="center" align="center" label="物料毛重">
    </el-table-column>
    <el-table-column prop="mateWeightUnitName" header-align="center" align="center" label="重量单位">
    </el-table-column>
    <el-table-column prop="mateTexture" header-align="center" align="center" label="物料材质">
    </el-table-column>
    <el-table-column prop="mateAuxiliaryUnitName" header-align="center" align="center" width="120" label="辅助计量单位">
    </el-table-column>
		<el-table-column prop="mateFurnaceNumber" header-align="center" align="center" label="物料炉号">
		</el-table-column>
		<el-table-column prop="mateUpdateTime" header-align="center" align="center" label="更新时间">
			<template slot-scope="scope">
				<span>{{dateFormat(scope.row.mateUpdateTime)}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="mateNote" header-align="center" align="center" label="备注">
		</el-table-column>
		<el-table-column align="center" label="操作" width="100" fixed="right">
			<template slot-scope="scope">
				<el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.mateId)" circle></el-button>
				<el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.mateId)" circle></el-button>
			</template>
		</el-table-column>
	</el-table>
	  <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
	    :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
	  </el-pagination>
	  <materielAddOrUpdate v-if="addOrUpdateVisible" ref="materielAddOrUpdate" @refreshDataList="getDataList"></materielAddOrUpdate>
	</div>
</template>

<script>
	import materielAddOrUpdate from './materiel-add-or-update'
	export default {
	  data () {
	    return {
	      dataForm: {
	        key: ''
	      },
		  addOrUpdateVisible : false,
	      dataList: [],
	      pageIndex: 1,
	      pageSize: 10,
	      totalPage: 0,
	      dataListLoading: false,
	      selectionDataList: []
	    }
	  },
	  components: {
		materielAddOrUpdate
	  },
	  created () {
	    //this.getDataList()
	  },
	  methods: {
		dateFormat(dataValue) {
			var date = new Date(dataValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
			var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			return Y+M+D+h+m+s;
		},
	    // 获取数据列表
	    getDataList () {
	      this.dataListLoading = true
	      this.$http({
	        url: this.$http.adornBomUrl('/bom/v1/material/pagedQueryMaterialByParam'),
	        method: 'get',
	        params: {
			  'startIndex': (this.pageIndex - 1) * this.pageSize,
			  'pageSize': this.pageSize,
			  'param' : this.dataForm.key
	        }
	      }).then(({data}) => {
	        if (data) {
	          this.dataList = data.data
	          this.totalPage = data.totalCount
	        } else {
	          this.dataList = []
	          this.totalPage = 0
	        }
	        this.dataListLoading = false
	      })
	    },
	    // 每页数
	    sizeChangeHandle (val) {
	      this.pageSize = val
	      this.pageIndex = 1
	      this.getDataList()
	    },
	    // 当前页
	    currentChangeHandle (val) {
	      this.pageIndex = val
	      this.getDataList()
	    },
		// 新增 / 修改
		addOrUpdateHandle(workType, id) {
			this.addOrUpdateVisible = true
			this.$nextTick(() => {
				this.$refs.materielAddOrUpdate.init(workType, id)
			})
		},
		// 删除
		deleteHandle(id) {
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/material/deleteMaterialById'),
					method: 'DELETE',
					params: {
						mateId : id
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.$message({
							message: '删除成功',
							type: 'success',
							onClose: () => {
								this.getDataList()
							}
						})
					} else {
						this.$message.error(data.msg)
					}
				})
			}).catch(() => {})
		}
	  }
	}
</script>

<style>
</style>
