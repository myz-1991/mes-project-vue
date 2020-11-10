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
								<el-input type="text" size="small" v-model="searchFormData.searchTextValue" placeholder="物料编码或名称查询"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" size="small" icon="el-icon-search" @click="refreshMateTable()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
			<el-table ref="relationTable" :data="relationDataList" size="small" style="width: 100%" row-key="mateId" border lazy
			 :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="mateName" label="物料名称" width="180">
				</el-table-column>
				<el-table-column prop="mateCode" align="center" label="物料编码">
				</el-table-column>
				<el-table-column prop="mateSpecifications" align="center" label="规格型号">
				</el-table-column>
				<el-table-column prop="singleNum" align="center" label="单套数量">
				</el-table-column>
				<el-table-column prop="unitName" align="center" label="单位">
				</el-table-column>
				<el-table-column prop="updateTime" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>

				<el-table-column label="操作" align="center" fixed="right">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="修改" placement="top-start">
						      <el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row)" circle></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="分配工艺" placement="top-start">
							<el-button size="mini" icon="el-icon-share" type="success" @click="processViewHandle(scope.row.mateId)" circle></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
							<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" circle></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<relationAddOrUpdate v-if="addOrUpdateVisible" ref="relationAddOrUpdate" @refreshDataList="refreshMateTable"></relationAddOrUpdate>
		<addProcessRoute v-if="addVisible" ref="addProcessRoute" @refreshDataList="refreshMateTable"></addProcessRoute>
	</div>
</template>

<script>
	import relationAddOrUpdate from './relation-add-or-update'
	import addProcessRoute from './add-processRoute'
	import { findRelationTree, deleteRelation } from '@/api/bom/relation'

	export default {
		data() {
			return {
				relationDataList: [],
				addVisible : false,
				addOrUpdateVisible: false,
				processViewVisible: false,
				searchFormData: {
					searchTextValue: ''
				}
			}
		},
		components: {
			relationAddOrUpdate,
			addProcessRoute
		},
		mounted() {
			this.relationDataInit()
		},
		methods: {
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
			refreshMateTable() {
				this.relationDataInit()
			},
			relationDataInit() {
				this.relationDataList = []
				findRelationTree('', this.searchFormData.searchTextValue).then(response => {
					if (response) {
						this.relationDataList = response.data
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
				findRelationTree(tree.mateId, this.searchFormData.searchTextValue).then(response => {
					if (response) {
						let data = response.data
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
					if (_selectData.length > 1) {
						this.$message({
							message: '请选择一条数据！',
							type: 'warning'
						})
						return false;
					}
					row = _selectData[0]
				}
				this.$nextTick(() => {
					this.$refs.relationAddOrUpdate.init(workType, row)
				})
			},
			processViewHandle(id) {
				this.addVisible = true
				this.$nextTick(() => {
					this.$refs.addProcessRoute.init(id)
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
					deleteRelation(rowData.id).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success'
						})
						this.refreshMateTable()
					})
				}
			}
		},
	}
</script>

<style>
</style>
