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
							<el-input type="text" size="small" v-model="dataForm.key" placeholder="供应商信息查询" @keyup.enter.native="getDataList()"></el-input>
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
			<el-table-column prop="name" header-align="center" align="center" label="供应商名称">
			</el-table-column>
			<el-table-column prop="address" header-align="center" align="center" label="地址">
			</el-table-column>
			<el-table-column prop="contacts" header-align="center" align="center" label="联络人">
			</el-table-column>
			<el-table-column prop="telephone" header-align="center" align="center" label="联系电话">
			</el-table-column>
			<el-table-column prop="email" header-align="center" align="center" label="邮件地址">
			</el-table-column>
			<el-table-column prop="grade" header-align="center" align="center" label="信誉等级">
			</el-table-column>
      <el-table-column prop="note" header-align="center" align="center" label="备注">
      </el-table-column>
			<el-table-column align="center" label="操作" width="100" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.id)" circle></el-button>
					<el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.id)" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
		 :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="sizes, prev, pager, next, jumper">
		</el-pagination>
		<mouldAddOrUpdate v-if="addOrUpdateVisible" ref="mouldAddOrUpdate" @refreshDataList="getDataList"></mouldAddOrUpdate>
	</div>
</template>

<script>
	import {
		findSupplierPage,
    deleteSupplierById
	} from '@/api/base/supplier'
	import mouldAddOrUpdate from './supplier-add-or-update'
	export default {
		data() {
			return {
				dataForm: {
					key: ''
				},
				addOrUpdateVisible: false,
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				selectionDataList: []
			}
		},
		components: {
			mouldAddOrUpdate
		},
		mounted() {
			this.getDataList()
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
			// 获取数据列表
			getDataList() {
				this.dataListLoading = true
				findSupplierPage(this.dataForm.key, '2', this.pageSize, this.pageIndex).then(response => {
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
					this.$refs.mouldAddOrUpdate.init(workType, id)
				})
			},
			// 删除
			deleteHandle(id) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//row.readIdentifying = 2
					deleteSupplierById(id).then(response => {
						this.$message({
							message: '删除成功',
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
