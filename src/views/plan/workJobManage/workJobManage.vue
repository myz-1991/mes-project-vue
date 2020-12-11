<template>
	<div class="app-container">
		<el-row>
			<el-col :span="8">
				<el-row style="margin-bottom: 20px;">
					<el-col :span="24">
						<el-card class="box-card">
						  <span style="font-size: 24px;margin-top: 10px;">设备编号: 7#20160303</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">设备名称:7号压铸机</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">设备IP:172.168.12.12</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">设备状态：运行</span>
						</el-card>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					<el-col :span="24">
						<el-card class="box-card">
						  <span style="font-size: 24px;margin-top: 10px;">产品编号：#P007</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">产品名称:卡玛斯前转左件</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">关联模具：M1 </span>
						  <el-button size="mini" type="primary" icon="el-icon-search" round>选择</el-button>
						</el-card>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					<el-col :span="24">
						<el-card class="box-card">
						  <span style="font-size: 24px;margin-top: 10px;">生产数量：3500</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">预计时长:25小时</span>
						</el-card>
					</el-col>
				</el-row>
				<el-row style="margin-bottom: 20px;">
					<el-col :span="24">
						<el-card class="box-card">
						  <span style="font-size: 24px;margin-top: 10px;">生产状态：在制</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">完成数量:1000</span><br /><br />
						  <span style="font-size: 24px;margin-top: 10px;">完成百分比：31%</span>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="16" style="padding: 5px;">
				<el-table border size="mini" :data="taskDataList">
					<el-table-column type="index" label="任务优先号" align="center" width="100">
					</el-table-column>
					<el-table-column label="设备名称" prop="equiName" align="center" />
					<el-table-column label="产品编码" prop="mateCode" align="center" />
					<el-table-column label="产品名称" prop="mateName" align="center" />
					<el-table-column label="任务单号" prop="code" align="center" />
					<el-table-column label="订单编号" prop="planName" align="center" />
					<el-table-column label="开工时间" prop="scheduledStartTime" align="center" />
					<el-table-column label="完工时间" prop="scheduledEndTime" align="center" />
					<el-table-column label="生产数量" prop="planNum" align="center" />
					<el-table-column label="操作" align="center" width="180" fixed="right">
						<template slot-scope="scope">
							<!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
							<el-button size="mini" icon="el-icon-data-analysis" type="success" round>选择</el-button>
							<el-button size="mini" icon="el-icon-data-analysis" type="danger" round>取消</el-button>
						</template>
					</el-table-column>
				</el-table>
			</el-col>
		</el-row>
		<span slot="footer">
		  <el-button type="primary" style="margin-left: 20px;margin-right: 180px;">生产任务</el-button>
		  <el-button type="info" style="margin-left: 20px;margin-right: 180px;">文件查看</el-button>
		  <el-button type="info" style="margin-left: 20px;margin-right: 180px;">三坐标查看</el-button>
		  <el-button type="info" style="margin-left: 20px;margin-right: 180px;">光谱查看</el-button>
		  <el-button type="info" style="margin-left: 20px;margin-right: 180px;">X光查看</el-button>
		</span>
	</div>
</template>

<script>
	import { listTaskByWorkerId } from '@/api/plan/task'
	export default {
		data() {
			return {
				taskDataList: [],
				addOrUpdateVisible: false,
				materialPrepareVisible: false,
				visible: false,
				orderVisible: false,
				processingProgressVisible: false,
				searchFormData: {
					searchTextValue: ''
				},
				tableData: [{
					date: '2016-05-02',
					name: '张三',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '李四',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王五',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '赵六',
					address: '上海市普陀区金沙江路 1516 弄'
				}],
				fileList: [],
				uploadUrl: []
			}
		},
		mounted() {
			this.taskDataInit()
		},
		methods: {
			dateFormat(dataValue) {
				var date = new Date(dataValue) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-'
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
				return Y + M + D
			},
			refreshorgTable() {
				this.taskDataInit()
			},
			taskDataInit() {
				debugger
				this.taskDataList = []
				listTaskByWorkerId(this.$store.getters.userId).then(response => {
					this.taskDataList = response.data
				})
			},
			load(tree, treeNode, resolve) {
				debugger
				this.$http({
					url: this.$http.adornPlanUrl('/plan/v1/task/selectTaskTreeByParam'),
					method: 'get',
					params: {
						superId: tree.taskId,
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
			taskTableSearch() {
				this.$http({
					url: this.$http.adornPlanUrl('/plan/v1/task/selectTaskTreeByParam'),
					method: 'get',
					params: {
						superId: '',
						param: this.searchFormData.searchTextValue
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.taskDataList = data
						for (let i = 0; i < this.taskDataList.length; i++) {
							if (this.taskDataList[i].leaf > 0) {
								this.taskDataList[i].leaf = true
							} else {
								this.taskDataList[i].leaf = false
							}
						}
					}
				})
			},
			// 新增 / 修改
			addOrUpdateHandle() {
				this.addOrUpdateVisible = true
				this.$nextTick(() => {
					this.$refs.planAdd.init()
				})
			},
			updateTaskStatusHandle(statusCode, statusName) {
				const rowData = this.$refs.taskTable.selection
				if (rowData.length != 1) {
					this.$message({
						message: '请选择一条任务进行操作！',
						type: 'warning'
					})
					return
				}
				this.$http({
					url: this.$http.adornPlanUrl('/plan/v1/task/updateTaskStatusById'),
					method: 'put',
					params: {
						taskStatusCode: statusCode,
						taskStatusName: statusName,
						taskId: rowData[0].taskId
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.$message({
							message: '任务' + statusName + '！',
							type: 'success',
							onClose: () => {
								this.refreshorgTable()
							}
						})
					}
				})
			},
			deleteHandle(rowData) {
				if (rowData.leaf) {
					this.$message({
						message: '该物料下存在其他物料信息，不能删除！',
						type: 'warning'
					})
					return false
				} else {
					this.$http({
						url: this.$http.adornBomUrl('/bom/v1/relaton/deleteBomtaskById'),
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
							this.refreshorgTable()
						}
					})
				}
			},
			openD() {
				this.visible = true
			},
			onSuccess(res) {
				this.$alert(res.data, '提示', {
					confirmButtonText: '确定',
					callback: action => {
						console.log('上传成功')
					}
				})
			},
			onError(res) {
				this.$alert('创建失败', '提示', {
					confirmButtonText: '确定',
					callback: action => {
						console.log('上传失败')
					}
				})
			},
			handleChange(file, fileList) {
				if (fileList.length > 0) {
					this.form.fileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的csv文件
				}
			},
			submit() {
				this.uploadUrl = '/upload' // 这里，读者换成实际项目中的上传接口
				this.$nextTick(() => {
					this.$refs.upload.submit()
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.upload-demo {
		display: flex;
	}

	.el-list-enter-active,
	.el-list-leave-active {
		transition: none;
	}

	.el-list-enter,
	.el-list-leave-active {
		opacity: 0;
	}

	.el-upload-list {
		height: 40px;
	}
</style>
