<template>
	<div class="app-container">
		<el-row>
			<el-form :model="searchFormData" size="small">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" icon="el-icon-refresh" size="small" @click="refreshorgTable()" round>刷新</el-button>
							<el-button type="primary" icon="el-icon-plus" size="small" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input type="text" v-model="searchFormData.searchTextValue" @keyup.enter.native="orgTableSearch()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" icon="el-icon-search" size="small" @click="orgTableSearch()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
			<el-table ref="orgTable" :data="orgDataList" size="small" style="width: 100%" row-key="orgId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="orgName" label="组织名称" width="180">
				</el-table-column>
				<el-table-column prop="orgCode" align="center" label="组织编码">
				</el-table-column>
				<el-table-column prop="orgTypeName" align="center" label="组织类型">
				</el-table-column>
				<el-table-column prop="orgUpdatetime" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.orgUpdatetime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="orgNote" align="center" label="备注">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row.orgId)" round>修改</el-button>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" round>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<organizationAddOrUpdate v-if="addOrUpdateVisible" ref="organizationAddOrUpdate" @refreshDataList="refreshorgTable"></organizationAddOrUpdate>
	</div>
</template>

<script>
	import organizationAddOrUpdate from './organization-add-or-update'
	export default {
		data() {
			return {
				orgDataList: [],
				addOrUpdateVisible: false,
				searchFormData : {
					searchTextValue : ''
				}
			}
		},
		components: {
			organizationAddOrUpdate
		},
		activated() {
			//this.orgDataInit()
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
			refreshorgTable() {
				this.orgDataInit()
			},
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
			orgTableSearch() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/organization/selectOrganizationTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: this.searchFormData.searchTextValue
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
			// 新增 / 修改
			addOrUpdateHandle(workType, id) {
				this.addOrUpdateVisible = true
				if (workType == 1) {
					const _selectData = this.$refs.orgTable.selection
					if (_selectData.length > 1) {
						this.$message('请选择一个部门下添加！！！')
						return false
					} else if (_selectData.length == 1) {
						id = _selectData[0].orgId
					}
				}
				this.$nextTick(() => {
					this.$refs.organizationAddOrUpdate.init(workType, id)
				})
			},
			deleteHandle(rowData) {
				if (rowData.leaf) {
					this.$message({
						message: '该部门下存在其他部门信息，不能删除！',
						type: 'warning'
					});
					return false
				} else {
					this.$http({
						url: this.$http.adornSystemUrl('/sys/v1/organization/deleteOrganizationById'),
						method: 'delete',
						params: {
							orgId: rowData.orgId
						}
					}).then(({
						data
					}) => {
						if (data) {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.refreshorgTable()
						}
					})
				}
			}
		},
	}
</script>

<style>
</style>
