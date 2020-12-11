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
							<el-button size="mini" type="warning" icon="el-icon-edit" round @click="addOrUpdateHandle(2, 0)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="改派" placement="top-start">
							<el-button size="mini" icon="el-icon-view" type="success" round @click="taskViewOpen(scope.row.id)"></el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="删除" placement="top-start">
							<el-button size="mini" icon="el-icon-data-analysis" type="danger" round @click="processingProgressHandle(scope.row.taskId)"></el-button>
						</el-tooltip>
					</template>
				</el-table-column>
			</el-table>
		</div>
	</el-dialog>
</template>

<script>
	import {
		findMaterielPage
	} from '@/api/base/materiel'
	import {
		listTaskByParam,
		updateTask,
		findTask
	} from '@/api/plan/task'
	export default {
		data() {
			return {
				visible: false,
				planId: null,
				showFlag: 1,
				taskList: [],
				titleText: '任务查看'
			}
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
		}
	}
</script>
