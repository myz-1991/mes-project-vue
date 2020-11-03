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
								<el-input type="text" placeholder="字典编码或名称查询" v-model="searchFormData.searchTextValue" @keyup.enter.native="dictTableSearch()"></el-input>
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
						<el-tag v-if="scope.row.dictType === 2" size="small" type="success">业务</el-tag>
						<el-tag v-else size="small">通用</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="dictStatus" align="center" label="状态">
					<template slot-scope="scope">
						<el-tag v-if="scope.row.dictStatus === 2" size="small" type="danger">禁用</el-tag>
						<el-tag v-else size="small">正常</el-tag>
					</template>
				</el-table-column>
        <el-table-column prop="createTime" align="center" label="创建时间">
        	<template slot-scope="scope">
        		<span>{{dateFormat(scope.row.createTime)}}</span>
        	</template>
        </el-table-column>
				<el-table-column prop="updateTime" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="200">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row.dictId)" round></el-button>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" round></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<dictionaryAddOrUpdate v-if="addOrUpdateVisible" ref="departmentAddOrUpdate" @refreshDataList="refreshdictTable"></dictionaryAddOrUpdate>
	</div>
</template>

<script>
  import { findDictionaryTree, deleteDictionary } from '@/api/system/dict'
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
		mounted() {
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
        findDictionaryTree('', '').then(response => {
          this.dictDataList = response.data
          for (let i = 0; i < this.dictDataList.length; i++) {
          	if (this.dictDataList[i].leaf > 0) {
          		this.dictDataList[i].leaf = true
          	} else {
          		this.dictDataList[i].leaf = false
          	}
          }
        })
			},
			load(tree, treeNode, resolve) {
        findDictionaryTree(tree.dictId, '').then(response => {
          const data = response.data
          for (let i = 0; i < data.length; i++) {
          	if (data.leaf > 0) {
          		data.leaf = true
          	} else {
          		data.leaf = false
          	}
          }
          setTimeout(() => {
          	resolve(data)
          }, 1000)
        })
			},
			dictTableSearch() {
        this.dictDataList = []
        findDictionaryTree('', this.searchFormData.searchTextValue).then(response => {
          this.dictDataList = response.data
          for (let i = 0; i < this.dictDataList.length; i++) {
          	if (this.dictDataList[i].leaf > 0) {
          		this.dictDataList[i].leaf = true
          	} else {
          		this.dictDataList[i].leaf = false
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
						this.$message('请选择一条数据！！！')
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
          deleteDictionary(rowData).then(response => {
            this.$message({
            	message: '删除成功',
            	type: 'success'
            })
            this.refreshdictTable()
          })
				}
			}
		},
	}
</script>

<style>
</style>
