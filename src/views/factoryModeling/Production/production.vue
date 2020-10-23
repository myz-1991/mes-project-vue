<template>
	<div class="app-container">
		<el-container>
			<el-aside width="400px" style="padding-top: 20px;">
				<el-row style="float: left;">
					<el-form :model="searchFormData" size="small">
						<el-row>
							<el-col :span="24">
								<el-form-item label="">
									<el-col :span="16">
										<el-input type="text" v-model="searchFormData.searchTextValue" placeholder="部門编码或名称查询" @keyup.enter.native="orgTableSearch()"></el-input>
									</el-col>
									<el-col :offset="1" :span="3">
										<el-button type="primary" icon="el-icon-search" @click="orgTableSearch()" round>查询</el-button>
									</el-col>
								</el-form-item>
							</el-col>
						</el-row>
					</el-form>
				</el-row>
				<el-row>
					<el-table ref="orgTable" :data="orgDataList" size="small" style="width: 100%" row-key="orgId" @row-click="orgRowClick" border lazy :load="load"
					 :tree-props="{children: 'children', hasChildren: 'leaf'}">
						<el-table-column prop="orgName" label="部门名称" width="180">
						</el-table-column>
						<el-table-column prop="orgCode" align="center" label="部门编码">
						</el-table-column>
					</el-table>
				</el-row>
			</el-aside>
			<el-container>
				<el-main style="padding-top: -250px;">
					<el-row>
						<el-form :model="searchFormData" size="small">
							<el-row>
								<el-col :span="16">
									<el-form-item label="">
										<el-button type="primary" icon="el-icon-refresh" @click="refreshorgTable()" round>刷新</el-button>
										<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(1)" round>增加</el-button>
                    <el-button type="primary" icon="el-icon-view" @click="contentViewHandle()" round>生产资源内容</el-button>
									</el-form-item>
								</el-col>
								<el-col :span="8">
									<el-form-item label="">
										<el-col :span="18">
											<el-input type="text" v-model="searchFormData.searchTextValue" @keyup.enter.native="orgTableSearch()"></el-input>
										</el-col>
										<el-col :offset="1" :span="3">
											<el-button type="primary" icon="el-icon-search" @click="orgTableSearch()" round>查询</el-button>
										</el-col>
									</el-form-item>
								</el-col>
							</el-row>
						</el-form>
					</el-row>
					<el-row>
						<el-table ref="productionTable" :data="dataList" size="small" border v-loading="dataListLoading" style="width: 100%;">
							<el-table-column type="selection" align="center" width="50">
							</el-table-column>
							<el-table-column prop="prodName" align="center" label="生产资源名称">
							</el-table-column>
							<el-table-column prop="prodCode" align="center" label="生产资源编码">
							</el-table-column>
							<el-table-column prop="prodTypeName" align="center" label="生产资源类型">
							</el-table-column>
							<el-table-column prop="prodUpdateTime" align="center" label="更新时间">
								<template slot-scope="scope">
									<span>{{dateFormat(scope.row.prodUpdateTime)}}</span>
								</template>
							</el-table-column>
							<el-table-column align="center" label="操作" width="200">
								<template slot-scope="scope">
									<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row)" round>修改</el-button>
									<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.prodId)" round>删除</el-button>
								</template>
							</el-table-column>
						</el-table>
						<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
						</el-pagination>
						<productionAddOrUpdate v-if="productionAddOrUpdate" ref="productionAddOrUpdate" @refreshDataList="getDataList"></productionAddOrUpdate>
            <productionContextView v-if="productionContextViewVisible" ref="productionContextView" @refreshDataList="getDataList"></productionContextView>
					</el-row>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
	import productionAddOrUpdate from './production-add-or-update'
  import productionContextView from './production-content-view'
	export default {
		data() {
			return {
				orgDataList: [],
				dataList: [],
				dataForm: {
					searchTextValue: ''
				},
				searchFormData : {
					searchTextValue : ''
				},
				selectOrgId : '',
				pageIndex: 1,
				pageSize: 20,
				totalPage: 0,
				productionAddOrUpdate : false,
        productionContextViewVisible : false,
				dataListLoading: false,
				dataListSelections: [],
				addOrUpdateVisible: false
			}
		},
		components: {
			productionAddOrUpdate,
      productionContextView
		},
		activated() {
			this.orgDataInit()
		},
		methods: {
			orgDataInit() {
				this.orgDataList = []
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/organization/selectOrganizationTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: ''
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.orgDataList = data
						for (let i = 0; i < this.orgDataList.length; i++) {
							if (this.orgDataList[i].leaf > 0) {
								this.orgDataList[i].leaf = true
							} else {
								this.orgDataList[i].leaf = false
							}
						}
					}
				})
			},
			load(tree, treeNode, resolve) {
				debugger
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/organization/selectOrganizationTreeByParam'),
					method: 'get',
					params: {
						pid: tree.orgId,
						param: ''
					}
				}).then(({
					data
				}) => {
					if (data) {
						for (let i = 0; i < data.length; i++) {
							if (data[i].leaf > 0) {
								data[i].leaf = true
							} else {
								data[i].leaf = false
							}
						}
						setTimeout(() => {
							resolve(data)
						}, 1000)
					}
				})
			},
			dateFormat(dataValue) {
				var date = new Date(dataValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				return Y + M + D + h + m + s;
			},
			refreshCheckItemTable() {
				this.getDataList()
			},
			orgRowClick(row, column, event) {
				this.selectOrgId = row.orgId
				this.getDataList()
			},
			// 获取数据列表
			getDataList() {
				this.dataListLoading = true
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/production/pagedQueryProductionByParam'),
					method: 'get',
					params: {
						'startIndex': (this.pageIndex - 1) * this.pageSize,
						'pageSize': this.pageSize,
						'param': this.dataForm.searchTextValue,
						'orgId' : this.selectOrgId
					}
				}).then(({
					data
				}) => {
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
			addOrUpdateHandle(workType, row) {
				this.productionAddOrUpdate = true
				if (workType == 1) {
					let model = {
						orgId : this.selectOrgId
					}
					row = model
				}
				this.$nextTick(() => {
					this.$refs.productionAddOrUpdate.init(workType, row)
				})
			},
      contentViewHandle() {
        let selectionRow = this.$refs.productionTable.selection;
        if (selectionRow.length != 1) {
          this.$message({
          	message: '请选择一条数据！',
          	type: 'info'
          })
          return false;
        }
        this.productionContextViewVisible = true
        this.$nextTick(() => {
        	this.$refs.productionContextView.init(selectionRow[0].prodId)
        })
      }
		}
	}
</script>

<style>
</style>
