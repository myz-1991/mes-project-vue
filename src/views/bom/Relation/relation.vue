<template>
	<div class="app-container">
		<el-row>
			<el-form :model="searchFormData">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" size="small" icon="el-icon-refresh" @click="refreshMateTable()" round>刷新</el-button>
							<el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input type="text" size="small" v-model="searchFormData.searchTextValue" placeholder="物料编码或名称查询" @keyup.enter.native="orgTableSearch()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" size="small" icon="el-icon-search" @click="orgTableSearch()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
			<el-table ref="relationTable" :data="relationDataList" size="small" style="width: 100%" row-key="mateId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="mateName" label="物料名称" width="180">
				</el-table-column>
				<el-table-column prop="mateCode" align="center" label="物料编码">
				</el-table-column>
				<el-table-column prop="mateTypeName" align="center" label="物料类型">
				</el-table-column>
				<el-table-column prop="relaSingleNum" align="center" label="单套数量">
				</el-table-column>
				<el-table-column prop="relaUnitName" align="center" label="单位">
				</el-table-column>
				<el-table-column prop="relaUpdateTime" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.relaUpdateTime)}}</span>
					</template>
				</el-table-column>

				<el-table-column label="操作" align="center" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row)" circle></el-button>
            <el-button size="mini" icon="el-icon-view" type="success" @click="processViewHandle(scope.row.mateId)" circle></el-button>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" circle></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<relationAddOrUpdate v-if="addOrUpdateVisible" ref="relationAddOrUpdate" @refreshDataList="refreshMateTable"></relationAddOrUpdate>
    <processView v-if="processViewVisible" ref="processView" @refreshDataList="refreshMateTable"></processView>
  </div>
</template>

<script>
	import relationAddOrUpdate from './relation-add-or-update'
  import processView from './process-view'

	export default {
		data() {
			return {
				relationDataList: [],
				addOrUpdateVisible: false,
        processViewVisible : false,
				searchFormData : {
					searchTextValue : ''
				}
			}
		},
		components: {
			relationAddOrUpdate,
      processView
		},
		activated() {
			this.relationDataInit()
		},
		methods: {
      mouseOver() {
        alert(1234)
      },
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
			refreshMateTable() {
				this.relationDataInit()
			},
			relationDataInit() {
				this.relationDataList = []
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/relaton/selectBomTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: ''
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.relationDataList = data
						for (let i = 0; i < this.relationDataList.length; i++) {
							if (this.relationDataList[i].leaf > 0) {
								this.relationDataList[i].leaf = true
							} else {
								this.relationDataList[i].leaf = false
							}
						}
					}
				})
			},
			load(tree, treeNode, resolve) {
				debugger
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/relaton/selectBomTreeByParam'),
					method: 'get',
					params: {
						pid: tree.mateId,
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
					url: this.$http.adornBomUrl('/bom/v1/relaton/selectBomTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: this.searchFormData.searchTextValue
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.relationDataList = data
						for (let i = 0; i < this.relationDataList.length; i++) {
							if (this.relationDataList[i].leaf > 0) {
								this.relationDataList[i].leaf = true
							} else {
								this.relationDataList[i].leaf = false
							}
						}
					}
				})
			},
			// 新增 / 修改
			addOrUpdateHandle(workType, row) {
				this.addOrUpdateVisible = true
				if (workType == 1) {
					const _selectData = this.$refs.relationTable.selection
					row = _selectData[0]
				}
				this.$nextTick(() => {
					this.$refs.relationAddOrUpdate.init(workType, row)
				})
			},
      processViewHandle(id) {
        this.processViewVisible = true
        this.$nextTick(() => {
        	this.$refs.processView.init(id)
        })
      },
			deleteHandle(rowData) {
				if (rowData.leaf) {
					this.$message({
						message: '该物料下存在其他物料信息，不能删除！',
						type: 'warning'
					});
					return false
				} else {
					this.$http({
						url: this.$http.adornBomUrl('/bom/v1/relaton/deleteBomRelationById'),
						method: 'delete',
						params: {
							relaId: rowData.relaId
						}
					}).then(({
						data
					}) => {
						if (data) {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.refreshMateTable()
						}
					})
				}
			}
		},
	}
</script>

<style>
</style>
