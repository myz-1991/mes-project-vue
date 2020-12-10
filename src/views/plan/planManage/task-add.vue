<template>
	<el-dialog :title="titleText" size="small" :close-on-click-modal="false" :visible.sync="visible" width="60%">
		<div v-show="showFlag === 1">
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
							<el-input v-model="dataForm.mateName" placeholder="产品名称" readonly/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品规格" prop="mateModel">
							<el-input v-model="dataForm.mateModel" placeholder="产品规格" readonly/>
						</el-form-item>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12">
						<el-form-item label="客户名称" prop="customerName">
							<el-input v-model="dataForm.customerName" placeholder="客户名称" readonly/>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="产品重量" prop="weight">
							<el-input v-model="dataForm.weight" placeholder="产品重量" readonly/>
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
						<el-form-item label="选择设备" prop="planNum">
							<el-input v-model="dataForm.customerName" placeholder="选择设备" style="width: 85%;margin-left: 5px;" readonly/>
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
						<el-form-item label="选择模/夹具" prop="planNum">
							<el-input v-model="dataForm.customerName" placeholder="选择模/夹具" readonly style="width: 80%;"/>
							<el-link size="mini" type="success" style="margin-top: 5px;" @click="initProuduct">查询模/夹具</el-link>
						</el-form-item>
					</el-col>
					<el-col :span="12">
						<el-form-item label="单模产量" prop="planNum">
							<el-input v-model="dataForm.planNum" placeholder="单模产量" />
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
		<div v-show="showFlag === 2">
			<el-table :data="materialList" size="small" border>
				<el-table-column type="selection" width="55" />
				<el-table-column prop="code" align="center" label="产品编码"/>
				<el-table-column prop="name" align="center" label="产品名称" />
				<el-table-column prop="code" align="center" label="零件号" />
				<el-table-column prop="netWeight" align="center" label="产品重量" />
				<!-- <el-table-column prop="" align="center" label="箱体容量" />
				<el-table-column prop="" align="center" label="压铸毛坯重量（kg）" width="180"/>
				<el-table-column prop="" align="center" label="机加成品重量（kg）" width="180"/> -->
				<el-table-column prop="customerName" align="center" label="客户" />
				<el-table-column label="操作" align="center" width="150" fixed="right">
					<template slot-scope="scope">
						<el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="selectProuduct(scope.row)">选择</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @current-change="currentChangeHandle" :current-page="pageIndex" :page-size="pageSize" :total="totalPage" layout="sizes, prev, pager, next, jumper">
			</el-pagination>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
			<el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import {findMaterielPage} from '@/api/base/materiel'
	import {saveTask, updateTask, findTask} from '@/api/plan/task'
	export default {
		data() {
			return {
				visible: false,
				showFlag : 1,
				materialList: [],
				taskPriorityList: [],
				processingMethodList: [],
				workshopList: [],
				titleText: '任务添加',
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				workType: 1,
				props: {
					label: 'mateName',
					isLeaf: 'leaf'
				},
				dataForm: {
					planCode : '',
					planName : '',
					id : null,
					name : null,
					code : null,
					mateId : null,
					mateCode : null,
					mateName : null,
					scheduledStartTime : null,
					scheduledEndTime : null,
					deliverTime : null,
					actualStartTime : null,
					actualEndTime : null,
					status : null,
					statusName : null,
					priority : null,
					priorityName : null,
					planNum : null,
					productionNum : null,
					surplusNum : null,
					finishNum : null,
					qualifiedNum : null,
					unqualifiedNum : null,
					stockNum : null,
					blankNum : null,
					workshopId : null,
					workshopName : null,
					pid : 0,
					procVerId : null,
					createUser : '',
					createTime : null,
					updateUser : '',
					updateTime : null,
					mateModel : null,
					weight : null,
					customerId : null,
					customerName : null,
					mouldClampId : null,
					mouldClampName : null,
					mouldClampCode : null,
					taskType : null,
					leaf : null
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
					this.dataForm.id  = null
					this.dataForm.name  = 'P' + this.dateFormat(new Date())
					this.dataForm.code  = 'OR' + this.dateFormat(new Date())
					this.dataForm.mateId  = rowData.mateId
					this.dataForm.mateCode  = rowData.mateCode
					this.dataForm.mateName  = rowData.mateName
					this.dataForm.scheduledStartTime  = null
					this.dataForm.scheduledEndTime  = null
					this.dataForm.deliverTime  = null
					this.dataForm.actualStartTime  = null
					this.dataForm.actualEndTime  = null
					this.dataForm.status  = null
					this.dataForm.statusName  = null
					this.dataForm.priority  = null
					this.dataForm.priorityName  = null
					this.dataForm.planNum  = null
					this.dataForm.productionNum  = null
					this.dataForm.surplusNum  = null
					this.dataForm.finishNum  = null
					this.dataForm.qualifiedNum  = null
					this.dataForm.unqualifiedNum  = null
					this.dataForm.stockNum  = null
					this.dataForm.blankNum  = null
					this.dataForm.workshopId  = null
					this.dataForm.workshopName  = null
					debugger
					this.dataForm.pid  = rowData.id
					this.dataForm.planCode = rowData.code
					this.dataForm.planName = rowData.name
					this.dataForm.procVerId  = null
					this.dataForm.createUser = this.$store.getters.name
					this.dataForm.createTime  = null
					this.dataForm.updateTime  = null
					this.dataForm.mateModel  = rowData.mateModel
					this.dataForm.weight  = rowData.weight
					this.dataForm.customerId  = rowData.customerId
					this.dataForm.customerName  = rowData.customerName
					this.dataForm.mouldClampId  = null
					this.dataForm.mouldClampName  = null
					this.dataForm.mouldClampCode  = null
					this.dataForm.taskType  = '1'
					this.dataForm.leaf = null
				} else {
					findTask(id).then(response => {
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
				findMaterielPage(null, this.pageSize, this.pageIndex).then(response => {
					if (response) {
					  this.materialList = response.data.records
					  this.totalPage = response.data.total
					} else {
					  this.materialList = []
					  this.totalPage = 0
					}
				})
			},
			currentChangeHandle(val) {
			  this.pageIndex = val
			  this.initProuduct()
			},
			selectProuduct(row) {
				this.showFlag = 1
				this.dataForm.mateId  = row.id
				this.dataForm.mateCode  = row.code
				this.dataForm.mateName  = row.name
				this.dataForm.mateModel = row.specifications
				this.dataForm.weight = row.netWeight
				this.dataForm.customerId = row.customerId
				this.dataForm.customerName = row.customerName
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
