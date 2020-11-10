<template>
	<div class="app-container">
		<el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()">
			  <el-row>
			  	<el-col :span="8">
			  		<el-form-item label="">
			  			<el-button type="primary" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
			  			<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
			  		</el-form-item>
			  	</el-col>
			  	<el-col :offset="8" :span="8">
			  		<el-form-item label="">
			  			<el-col :span="18">
			  				<el-input type="text" v-model="dataForm.key" placeholder="工艺版本编码或名称查询" @keyup.enter.native="getDataList()"></el-input>
			  			</el-col>
			  			<el-col :offset="1" :span="3">
			  				<el-button type="primary" icon="el-icon-search" @click="getDataList()" round>查询</el-button>
			  			</el-col>
			  		</el-form-item>
			  	</el-col>
			  </el-row>
		  </el-form>
		  <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
			  <el-table-column type="selection" align="center" width="50">
			  </el-table-column>
			<el-table-column prop="name" header-align="center" align="center" label="工艺版本名称">
			</el-table-column>
			<el-table-column prop="code" header-align="center" align="center" label="工艺版本编码">
			</el-table-column>
			<el-table-column prop="designerName" header-align="center" align="center" label="设计者">
			</el-table-column>
			<el-table-column prop="designDate" header-align="center" align="center" label="定版时间">
				<template slot-scope="scope">
					<span>{{dateFormat(scope.row.designDate)}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="reviewerName" header-align="center" align="center" label="审核者">
			</el-table-column>
			<el-table-column prop="reviewDate" header-align="center" align="center" label="审核时间">
				<template slot-scope="scope">
					<span>{{dateFormat(scope.row.reviewDate)}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="status" header-align="center" align="center" label="状态">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.status === 2" size="small" type="danger">禁用</el-tag>
					<el-tag v-else size="small">正常</el-tag>
				</template>
			</el-table-column>
			<el-table-column prop="updateTime" header-align="center" align="center" label="更新时间">
				<template slot-scope="scope">
					<span>{{dataTimeFormat(scope.row.updateTime)}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="150">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="修改" placement="top-start">
					    <el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.id)" circle></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="设置工序" placement="top-start">
						<el-button size="mini" icon="el-icon-setting" type="success" @click="processViewOpen(1, scope.row)" circle></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="禁用" placement="top-start">
						<el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" circle></el-button>
					</el-tooltip>
				</template>
			</el-table-column>
		</el-table>
		  <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
		    :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
		  </el-pagination>
		  <processAddOrUpdate v-if="addOrUpdateVisible" ref="processAddOrUpdate" @refreshDataList="getDataList"></processAddOrUpdate>
		  <processView v-if="processViewVisible" ref="processView" @refreshDataList="getDataList"></processView>
	</div>
</template>

<script>
	import processAddOrUpdate from './processRoute-add-or-update'
	import processView from './process-view'
	import { findProcessVersionPage, updateProcessVersion } from '@/api/bom/version'
	export default {
	  data () {
	    return {
	      dataForm: {
	        key: '',
			id : ''
	      },
		  processViewVisible : false,
		  addOrUpdateVisible : false,
	      dataList: [],
	      pageIndex: 1,
	      pageSize: 10,
	      totalPage: 1,
	      dataListLoading: false,
	      selectionDataList: []
	    }
	  },
	  components: {
		processAddOrUpdate,
		processView
	  },
	  mounted () {
		this.dataForm.id = this.$route.params.id
	    this.getDataList()
	  },
	  methods: {
		dateFormat(dataValue) {
			var date = new Date(dataValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			return Y+M+D;
		},
		dataTimeFormat(dataValue) {
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
		  findProcessVersionPage(this.dataForm.id, this.dataForm.key, this.pageSize, this.pageIndex).then(response => {
			  debugger
			  if (response) {
			    this.dataList = response.data.records
			    this.totalPage = response.data.totalCount
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
				this.$refs.processAddOrUpdate.init(workType, id)
			})
		},
		processViewOpen(workType, id) {
			this.processViewVisible = true
			this.$nextTick(() => {
				this.$refs.processView.init(workType, id)
			})
		},
		// 删除
		deleteHandle(row) {
			this.$confirm('是否禁用?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
        row.status = 2
        updateProcessVersion(row).then(response => {
          this.$message({
          	message: '操作成功',
          	type: 'success',
          	onClose: () => {
          		this.getDataList()
          	}
          })
        })
			}).catch(() => {})
		}
	  }
	}
</script>

<style>
</style>
