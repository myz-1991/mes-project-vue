<template>
	<el-dialog :title="titleText" size="small" :close-on-click-modal="false" :visible.sync="visible" width="85%">
		<div v-show="showFlag === 1">
			<el-table ref="taskTable" :data="taskList" size="small" border>
				<el-table-column type="index" width="55" />
				<el-table-column prop="code" align="center" label="任务单号" />
				<el-table-column prop="equiName" align="center" label="设备名称" />
				<el-table-column prop="statusName" align="center" label="状态">
					<template slot-scope="scope">
						<el-tag v-if="tagType(scope.row.status) == 1" size="small" type="danger">未下发</el-tag>
						<el-tag v-else size="small">已下发</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="planNum" align="center" label="任务数量" />
				<el-table-column prop="finishNum" align="center" label="完成数量" />
				<el-table-column align="center" label="完成率">
					<template slot-scope="scope">
						<span>{{scope.row.finishNum / scope.row.planNum}} %</span>
					</template>
				</el-table-column>
				<el-table-column prop="qualifiedNum" align="center" label="合格数" />
				<el-table-column align="center" label="剩余数量">
					<template slot-scope="scope">
						<span>{{scope.row.planNum - scope.row.qualifiedNum}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="mouldClampCode" align="center" label="模/夹具编号" />
				<el-table-column prop="mouldClampName" align="center" label="模/夹具名称" />
				<el-table-column prop="createUser" align="center" label="任务创建人" />
				<el-table-column prop="scheduledStartTime" align="center" label="任务开始时间" />
				<el-table-column prop="scheduledEndTime" align="center" label="任务结束时间" />
				<el-table-column prop="actualStartTime" align="center" label="任务实际开始时间" />
				<el-table-column prop="actualEndTime" align="center" label="任务实际结束时间" />
				<el-table-column prop="updateUser" align="center" label="切单人" />
				<el-table-column align="center" label="次品数量">
					<template slot-scope="scope">
						<span>{{scope.row.finishNum - scope.row.qualifiedNum}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="次品率">
					<template slot-scope="scope">
						<span v-if="scope.row.finishNum == 0">0 %</span>
						<span v-else>{{(scope.row.finishNum - scope.row.qualifiedNum) / scope.row.finishNum}} %</span>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center" width="200" fixed="right">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
							<el-button size="mini" type="warning" icon="el-icon-edit" round @click="editTask(scope.row)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="改派" placement="top-start">
							<el-button size="mini" icon="el-icon-user" type="success" round @click="initEqui(scope.row)"></el-button>
						</el-tooltip>
						<!-- <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
							<el-button size="mini" icon="el-icon-delete" type="danger" round @click="processingProgressHandle(scope.row.taskId)"></el-button>
						</el-tooltip> -->
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div v-show="showFlag === 3">
			<el-table :data="equiList" size="small" border>
				<el-table-column type="selection" width="55" />
				<el-table-column prop="code" align="center" label="设备编号" />
				<el-table-column prop="name" align="center" label="设备名称" />
				<el-table-column prop="fixedCode" align="center" label="资产编码" />
				<el-table-column prop="" align="center" label="状态" />
				<el-table-column prop="" align="center" label="IP地址" />
				<el-table-column label="操作" align="center" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="selectEqui(scope.row)">选择</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @current-change="currentChangeHandle" :current-page="pageIndex" :page-size="pageSize" :total="totalPage"
			 layout="sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
		<taskAddOrUpdate v-if="taskAddOrUpdateVisible" ref="taskAddOrUpdate"></taskAddOrUpdate>
		<span v-show="showFlag === 2" slot="footer" class="dialog-footer">
			<el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
			<el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {
		findMaterielPage
	} from '@/api/base/materiel'
	import {
		pageEquipmentByParam
	} from '@/api/base/equipment'
	import {
		listTaskByParam,
		updateTask,
		findTask
	} from '@/api/plan/task'
	import taskAddOrUpdate from './task-add-or-update'
	export default {
		data() {
			return {
				visible: false,
				taskAddOrUpdateVisible : false,
				planId: null,
				showFlag: 1,
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				taskList: [],
				equiList : [],
				selectTask : null,
				titleText: '任务查看'
			}
		},
		components: {
		  taskAddOrUpdate
		},
		methods: {
			init(id) {
				// this.dataForm.userId = id || 0
				this.visible = true
				this.planId = id
				this.initTaskList()
			},
			initTaskList() {
				listTaskByParam(this.planId, '2', null, null, null).then(response => {
					this.taskList = response.data
				})
			},
			tagType(val) {
				if (val == 'PLAN.STATUS.003') {
					return 1;
				} else {
					return 0;
				}
			},
			editTask(row) {
				this.showFlag = 2
				this.taskAddOrUpdateVisible = true
				this.$nextTick(() => {
				  this.$refs.taskAddOrUpdate.init('2', row)
				})
				
			},
			currentChangeHandle(val) {
				this.pageIndex = val
				this.initEqui()
			},
			initEqui(row) {
				this.selectTask = row
				this.showFlag = 3
				pageEquipmentByParam(null, null, this.pageSize, this.pageIndex).then(response => {
					if (response) {
						this.equiList = response.data.records
						this.totalPage = response.data.total
					} else {
						this.equiList = []
						this.totalPage = 0
					}
				})
			},
			selectEqui(row) {
				this.selectTask.equiId = row.id
				this.selectTask.equiName = row.name
				this.selectTask.equiCode = row.code
				this.selectTask.updateUser = this.$store.getters.name
				updateTask(this.selectTask).then(response => {
					this.$message({
						message: '操作成功',
						type: 'success',
						onClose: () => {
							this.showFlag = 1
							// this.taskAddOrUpdateVisible = false
							this.initTaskList()
						}
					})
				})
			},
			dataFormSubmit() {
				debugger
				let dataForm = this.$refs.taskAddOrUpdate.dataForm
				// dataForm.updateUser = this.$store.getters.name
				updateTask(dataForm).then(response => {
					this.$message({
						message: '操作成功',
						type: 'success',
						onClose: () => {
							this.showFlag = 1
							this.taskAddOrUpdateVisible = false
							this.initTaskList()
						}
					})
				})
			}
		}
	}
</script>
