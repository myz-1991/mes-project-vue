<template>
	<div class="app-container">
		<el-row>
			<el-form :model="dataForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" size="small" icon="el-icon-refresh" @click="refreshCheckItemTable()" round>刷新</el-button>
							<el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input size="small" type="text" v-model="dataForm.searchTextValue" placeholder="缺陷项名称查询" @keyup.enter.native="refreshCheckItemTable()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button size="small" type="primary" icon="el-icon-search" @click="refreshCheckItemTable()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
				<el-table size="mini" :data="dataList" border v-loading="dataListLoading" style="width: 100%;">
					<el-table-column type="selection" align="center" width="50">
					</el-table-column>
					<el-table-column prop="name" align="center" label="缺陷项名称">
					</el-table-column>
					<el-table-column prop="status" align="center" label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 2" type="danger">禁用</el-tag>
              <el-tag v-else type="success">正常</el-tag>
            </template>
					</el-table-column>
					<el-table-column align="center" label="操作" width="200">
						<template slot-scope="scope">
							<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.id)" round>修改</el-button>
							<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.id)" round>删除</el-button>
						</template>
					</el-table-column>
				</el-table>
		</el-row>
		<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
		<!-- 弹窗, 新增 / 修改 -->
		<checkItemAddOrUpdate v-if="addOrUpdateVisible" ref="checkItemAddOrUpdate" @refreshDataList="getDataList"></checkItemAddOrUpdate>
	</div>
</template>

<script>
  import { findDefectsPage, deleteDefets } from '@/api/bom/defects'
	import checkItemAddOrUpdate from './checkItem-add-or-update'
	export default {
		data() {
			return {
				dataForm: {
					searchTextValue: ''
				},
				dataList: [],
				pageIndex: 1,
				pageSize: 20,
				totalPage: 0,
				dataListLoading: false,
				dataListSelections: [],
				addOrUpdateVisible: false
			}
		},
		components: {
			checkItemAddOrUpdate
		},
		mounted() {
			this.getDataList()
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
			refreshCheckItemTable() {
				this.getDataList()
			},
			// 获取数据列表
			getDataList() {
				this.dataListLoading = true
        findDefectsPage(this.dataForm.searchTextValue, this.pageSize, this.pageIndex).then(response => {
          if (response) {
            this.dataList = response.data.records
            this.totalPage = response.data.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
			},
			// 每页数
			sizeChangeHandle(val) {
				this.pageSize = val
				this.pageIndex = 1
				this.getDataList()
			},
			// 当前页
			currentChangeHandle(val) {
				this.pageIndex = val
				this.getDataList()
			},
			// 新增 / 修改
			addOrUpdateHandle(workType, id) {
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
					this.$refs.checkItemAddOrUpdate.init(workType, id)
				})
			},
			// 删除
			deleteHandle(id) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
          deleteDefets(id).then(response => {
            this.$message({
            	message: '删除成功',
            	type: 'success',
              duration: 1000,
            	onClose: () => {
            		this.refreshCheckItemTable()
            	}
            })
          })
				}).catch(() => {})
			}
		}
	}
</script>
