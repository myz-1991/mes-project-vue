<template>
	<div>
		<div v-if="showFlag === 1">
			<el-form ref="dataForm" :model="dataForm" size="small" label-width="120px">
				<el-row>
					<el-col :span="12">
						<el-form-item label="计划单号" prop="planName">
							<el-input v-model="dataForm.planName" placeholder="计划单号" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="订单编号" prop="planCode">
							<el-input v-model="dataForm.planCode" placeholder="订单编号" readonly />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="产品名称" prop="mateName">
							<el-input v-model="dataForm.mateName" placeholder="产品名称" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品规格" prop="mateModel">
							<el-input v-model="dataForm.mateModel" placeholder="产品规格" readonly />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="客户名称" prop="customerName">
							<el-input v-model="dataForm.customerName" placeholder="客户名称" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品重量" prop="weight">
							<el-input v-model="dataForm.weight" placeholder="产品重量" readonly />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="计划数量" prop="planNum">
							<el-input v-model="dataForm.planNum" placeholder="计划数量" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="选择设备" prop="equiName">
							<el-input v-model="dataForm.equiName" placeholder="选择设备" style="width: 80%;margin-left: 5px;" readonly />
							<el-link size="mini" type="success" style="margin-top: 5px;" @click="initProuduct">查询设备</el-link>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="任务单号" prop="code">
							<el-input v-model="dataForm.code" placeholder="任务单号" readonly />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="是否紧急" prop="planCode">
							<el-input v-model="dataForm.planCode" placeholder="是否紧急" readonly />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="选择模/夹具" prop="mouldClampName">
							<el-input v-model="dataForm.mouldClampName" placeholder="选择模/夹具" readonly style="width: 80%;" />
							<el-link size="mini" type="success" style="margin-top: 5px;" @click="initMould">查询模/夹具</el-link>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单模产量" prop="cavities">
							<el-input v-model="dataForm.cavities" placeholder="单模产量" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="毛坯库存" prop="blankNum">
							<el-input v-model="dataForm.blankNum" placeholder="毛坯库存" readonly="true" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="成品库存" prop="stockNum">
							<el-input v-model="dataForm.stockNum" placeholder="成品库存" readonly="true" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="计划开始时间" prop="scheduledStartTime">
							<el-date-picker v-model="dataForm.scheduledStartTime" type="date" placeholder="选择日期" style="width: 100%;" />
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="计划结束时间" prop="scheduledEndTime">
							<el-date-picker v-model="dataForm.scheduledEndTime" type="date" placeholder="选择日期" style="width: 100%;" />
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="24">
						<el-form-item label="备注" prop="note">
							<el-input type="textarea" rows="3" v-model="dataForm.note" placeholder="备注" />
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</div>
		<div v-else-if="showFlag === 2">
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
		<div v-else-if="showFlag === 3">
			<el-table :data="mouldList" size="small" border>
				<el-table-column type="selection" width="55" />
				<el-table-column prop="code" align="center" label="模具编号" />
				<el-table-column prop="name" align="center" label="模具名称" />
				<el-table-column prop="cavities" align="center" label="模具腔数" />
				<el-table-column prop="" align="center" label="状态" />
				<el-table-column prop="" align="center" label="适用产品名称" />
				<el-table-column label="操作" align="center" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="selectMould(scope.row)">选择</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @current-change="currentChangeHandle1" :current-page="pageIndex1" :page-size="pageSize1" :total="totalPage1"
			 layout="sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
	</div>
	
</template>

<script>
	import {
		pageEquipmentByParam
	} from '@/api/base/equipment'
	import {
		saveTask,
		updateTask,
		findTask
	} from '@/api/plan/task'
	import {
		findMouldPage
	} from '@/api/base/mould'
	export default {
		data() {
			return {
				visible: false,
				showFlag: 1,
				equiList: [],
				mouldList: [],
				taskPriorityList: [],
				processingMethodList: [],
				workshopList: [],
				titleText: '任务添加',
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				pageIndex1: 1,
				pageSize1: 10,
				totalPage1: 0,
				workType: 1,
				props: {
					label: 'mateName',
					isLeaf: 'leaf'
				},
				dataForm: {
					planCode: '',
					planName: '',
					id: null,
					name: null,
					code: null,
					mateId: null,
					mateCode: null,
					mateName: null,
					scheduledStartTime: null,
					scheduledEndTime: null,
					deliverTime: null,
					actualStartTime: null,
					actualEndTime: null,
					status: null,
					statusName: null,
					priority: null,
					priorityName: null,
					planNum: null,
					productionNum: null,
					surplusNum: null,
					finishNum: null,
					qualifiedNum: null,
					unqualifiedNum: null,
					stockNum: null,
					blankNum: null,
					workshopId: null,
					workshopName: null,
					pid: 0,
					procVerId: null,
					createUser: '',
					createTime: null,
					updateUser: '',
					updateTime: null,
					mateModel: null,
					weight: null,
					customerId: null,
					customerName: null,
					mouldClampId: null,
					mouldClampName: null,
					mouldClampCode: null,
					equiId: null,
					equiName: null,
					equiCode: null,
					taskType: null,
					cavities: null,
					leaf: null
				}
			}
		},
		methods: {
			init(workType, rowData) {
				// this.dataForm.userId = id || 0
				this.visible = true
				// this.workType = workType
				if (workType == 1) {
					this.showFlag = 1
					this.dataForm.id = null
					this.dataForm.mateId = rowData.mateId
					this.dataForm.mateCode = rowData.mateCode
					this.dataForm.mateName = rowData.mateName
					this.dataForm.scheduledStartTime = null
					this.dataForm.scheduledEndTime = null
					this.dataForm.deliverTime = null
					this.dataForm.actualStartTime = null
					this.dataForm.actualEndTime = null
					this.dataForm.status = "PLAN.STATUS.003"
					this.dataForm.statusName = "未下发"
					this.dataForm.priority = null
					this.dataForm.priorityName = null
					this.dataForm.planNum = null
					this.dataForm.productionNum = null
					this.dataForm.surplusNum = null
					this.dataForm.finishNum = 0
					this.dataForm.qualifiedNum = null
					this.dataForm.unqualifiedNum = null
					this.dataForm.stockNum = null
					this.dataForm.blankNum = null
					this.dataForm.workshopId = null
					this.dataForm.workshopName = null
					debugger
					this.dataForm.pid = rowData.id
					this.dataForm.planCode = rowData.code
					this.dataForm.planName = rowData.name
					this.dataForm.procVerId = null
					this.dataForm.createUser = this.$store.getters.name
					this.dataForm.createTime = null
					this.dataForm.updateTime = null
					this.dataForm.mateModel = rowData.mateModel
					this.dataForm.weight = rowData.weight
					this.dataForm.customerId = rowData.customerId
					this.dataForm.customerName = rowData.customerName
					this.dataForm.mouldClampId = null
					this.dataForm.mouldClampName = null
					this.dataForm.mouldClampCode = null
					this.dataForm.taskType = '2'
					this.dataForm.leaf = null
				} else {
					findTask(rowData.id).then(response => {
						this.dataForm = response.data
					})
				}
			},
			dateFormat(dataValue) {
				var date = new Date(dataValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				return Y + M + D;
			},
			initProuduct() {
				this.showFlag = 2
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
			initMould() {
				this.showFlag = 3
				findMouldPage(null, this.pageSize1, this.pageIndex1).then(response => {
					if (response) {
						this.mouldList = response.data.records
						this.totalPage1 = response.data.total
					} else {
						this.mouldList = []
						this.totalPage1 = 0
					}
				})
			},
			currentChangeHandle(val) {
				this.pageIndex = val
				this.initProuduct()
			},
			currentChangeHandle1(val) {
				this.pageIndex = val
				this.initMould()
			},
			selectEqui(row) {
				this.showFlag = 1
				this.dataForm.equiId = row.id
				this.dataForm.equiName = row.name
				this.dataForm.equiCode = row.code
				this.dataForm.code = row.code + '-' + this.dateFormat(new Date())
			},
			selectMould(row) {
				this.showFlag = 1
				this.dataForm.mouldClampId = row.id
				this.dataForm.mouldClampName = row.name
				this.dataForm.mouldClampCode = row.code
				this.dataForm.cavities = row.cavities
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							this.dataForm.surplusNum = this.dataForm.planNum
							saveTask(this.dataForm).then(response => {
								this.$message({
									message: '操作成功',
									type: 'success',
									onClose: () => {
										this.visible = false
										this.$emit('refreshDataList')
									}
								})
							})
						} else {
							updateTask(this.dataForm).then(response => {
								this.$message({
									message: '操作成功',
									type: 'success',
									onClose: () => {
										this.visible = false
										this.$emit('refreshDataList')
									}
								})
							})
						}
					}
				})
			}
		}
	}
</script>
