<template>
	<div class="app-container">
		<el-row>
			<el-form size="mini" :model="dataForm">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" icon="el-icon-refresh" @click="refreshCheckItemTable()" round>刷新</el-button>
							<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input type="text" v-model="dataForm.searchTextValue" placeholder="检验项点编码查询" @keyup.enter.native="refreshCheckItemTable()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" icon="el-icon-search" @click="refreshCheckItemTable()" round>查询</el-button>
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
				<el-table-column prop="itemName" align="center" label="标准项">
				</el-table-column>
				<el-table-column prop="itemStandardValue" align="center" label="Si">
				</el-table-column>
				<el-table-column prop="itemPositiveerror" align="center" label="Fe">
				</el-table-column>
				<el-table-column prop="itemNegativeerror" align="center" label="Cu">
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="Mn">
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="Mg">
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="Zn">
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="Ti">
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="其它杂质">
					<el-table-column prop="name" label="单个" width="120">
					</el-table-column>
					<el-table-column prop="name" label="总量" width="120">
					</el-table-column>
				</el-table-column>
				<el-table-column prop="itemSize" align="center" label="Al">
				</el-table-column>
				<el-table-column align="center" label="操作" width="200">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.userId)" round>修改</el-button>
						<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.userId)" round>删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-row>
		<!-- 弹窗, 新增 / 修改 -->
		<checkItemAddOrUpdate v-if="addOrUpdateVisible" ref="checkItemAddOrUpdate" @refreshDataList="getDataList"></checkItemAddOrUpdate>
	</div>
</template>

<script>
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
		activated() {
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
			refreshCheckItemTable() {
				this.getDataList()
			},
			// 获取数据列表
			getDataList() {
				this.dataListLoading = true
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/checkItem/pagedQueryCheckItemByParam'),
					method: 'get',
					params: {
						'startIndex': (this.pageIndex - 1) * this.pageSize,
						'pageSize': this.pageSize,
						'param': this.dataForm.searchTextValue
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
					this.$http({
						url: this.$http.adornBomUrl('/bom/v1/checkItem/deleteCheckItemById'),
						method: 'DELETE',
						params: {
							userId: id
						}
					}).then(({
						data
					}) => {
						if (data) {
							this.$message({
								message: '删除成功',
								type: 'success',
								onClose: () => {
									this.refreshCheckItemTable()
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
