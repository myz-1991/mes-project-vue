<template>
	<div class="app-container">
		<el-row>
			<el-form :model="searchFormData" size="small">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" icon="el-icon-refresh" @click="refreshdictTable()" round>刷新</el-button>
							<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input type="text" v-model="searchFormData.searchTextValue" @keyup.enter.native="dictTableSearch()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" icon="el-icon-search" @click="dictTableSearch()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
			<el-table ref="dictTable" :data="dictDataList" size="small" style="width: 100%" row-key="dictId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<el-table-column prop="dictName" label="字典名称" width="180">
				</el-table-column>
				<el-table-column prop="dictCode" align="center" label="字典编码">
				</el-table-column>
				<el-table-column prop="dictType" align="center" label="字典类型">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.dictType === 2" size="small" type="success">词条</el-tag>
						<el-tag v-else size="small">条目</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="dictStatus" align="center" label="状态">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.dictStatus === 2" size="small" type="danger">禁用</el-tag>
						<el-tag v-else size="small">正常</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="dictSequence" align="center" label="顺序">
				</el-table-column>
				<el-table-column prop="dictUpdateTime" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.dictUpdateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="dictNote" align="center" label="备注">
				</el-table-column>
				<el-table-column label="操作" align="center" width="200">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row.dictId)" round>修改</el-button>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" round>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<dictionaryAddOrUpdate v-if="addOrUpdateVisible" ref="departmentAddOrUpdate" @refreshDataList="refreshdictTable"></dictionaryAddOrUpdate>
	</div>
</template>

<script>
	import dictionaryAddOrUpdate from './dictionary-add-or-update'
	export default {
		data() {
			return {
				dictDataList: [],
				addOrUpdateVisible: false,
				searchFormData : {
					searchTextValue : ''
				}
			}
		},
		components: {
			dictionaryAddOrUpdate
		},
		activated() {
			this.dictDataInit()
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
			refreshdictTable() {
				this.dictDataInit()
			},
			dictDataInit() {
				this.dictDataList = []
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: ''
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.dictDataList = data
						for (let i = 0; i < this.dictDataList.length; i++) {
							if (this.dictDataList[i].leaf > 0) {
								this.dictDataList[i].leaf = true
							} else {
								this.dictDataList[i].leaf = false
							}
						}
					}
				})
			},
			load(tree, treeNode, resolve) {
				debugger
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryTreeByParam'),
					method: 'get',
					params: {
						pid: tree.dictId,
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
			dictTableSearch() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryTreeByParam'),
					method: 'get',
					params: {
						pid: '',
						param: this.searchFormData.searchTextValue
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.dictDataList = data
						for (let i = 0; i < this.dictDataList.length; i++) {
							if (this.dictDataList[i].leaf > 0) {
								this.dictDataList[i].leaf = true
							} else {
								this.dictDataList[i].leaf = false
							}
						}
					}
				})
			},
			// 新增 / 修改
			addOrUpdateHandle(workType, id) {
				this.addOrUpdateVisible = true
				if (workType == 1) {
					const _selectData = this.$refs.dictTable.selection
					if (_selectData.length > 1) {
						this.$message('请选择一个部门下添加！！！')
						return false
					} else if (_selectData.length == 1) {
						id = _selectData[0].dictId
					}
				}
				this.$nextTick(() => {
					this.$refs.departmentAddOrUpdate.init(workType, id)
				})
			},
			deleteHandle(rowData) {
				if (rowData.leaf) {
					this.$message({
						message: '该节点下存在其他节点，不能删除！',
						type: 'warning'
					});
					return false
				} else {
					this.$http({
						url: this.$http.adornSystemUrl('/sys/v1/dictionary/deleteDictionaryById'),
						method: 'delete',
						params: {
							dictId: rowData.dictId
						}
					}).then(({
						data
					}) => {
						if (data) {
							this.$message({
								message: '删除成功',
								type: 'success'
							})
							this.refreshdictTable()
						}
					})
				}
			}
		},
	}
</script>

<style>
</style>
