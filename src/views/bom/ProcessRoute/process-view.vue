<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" :lock-scroll="false" :append-to-body="true" width="80%">
		<el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
			<el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
		</el-form>
		<el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
			<el-table-column type="index" align="center" width="50">
			</el-table-column>
			<el-table-column header-align="center" align="center" label="工序号" width="100">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procCode" v-show="scope.row.show" size="small" placeholder="工序号" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procCode}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="工序名称" width="100">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procName" v-show="scope.row.show" size="small" placeholder="工序名称" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procName}}</span>
				</template>
			</el-table-column>
			<el-table-column size="small" header-align="center" align="center" label="顺序号" width="100">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procSequence" v-show="scope.row.show" size="small" placeholder="顺序号" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procSequence}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="实际准备时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procActualPreparetime" v-show="scope.row.show" size="small" placeholder="实际准备时间"
					 style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procActualPreparetime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="实际加工时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procActualmakeTime" v-show="scope.row.show" size="small" placeholder="实际加工时间" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procActualmakeTime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="实际结束时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procActualEndTime" v-show="scope.row.show" size="small" placeholder="实际结束时间" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procActualEndTime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="定额准备时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procQuotaPreparetime" v-show="scope.row.show" size="small" placeholder="定额准备时间" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procQuotaPreparetime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="定额加工时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procQuotamaketime" v-show="scope.row.show" size="small" placeholder="定额加工时间" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procQuotamaketime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="定额结束时间" width="120">
				<template slot-scope="scope">
					<el-input v-model="scope.row.procQuotaendtime" v-show="scope.row.show" size="small" placeholder="定额结束时间" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procQuotaendtime}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="是否重要工序" width="120">
				<template slot-scope="scope">
					<el-select v-model="scope.row.procImportantStutas" size="small" v-show="scope.row.show" placeholder="请选择" style="width: 100%;">
						<el-option v-for="item in procImportantStutasList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
						</el-option>
					</el-select>
					<el-tag v-show="!scope.row.show" v-if="scope.row.procImportantStutas == 2" size="small" type="danger">否</el-tag>
					<el-tag v-show="!scope.row.show" v-else size="small">是</el-tag>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="时间单位" width="120">
				<template slot-scope="scope">
					<el-select v-model="scope.row.procTimeUnit" size="small" v-show="scope.row.show" placeholder="请选择" filterable
					 style="width: 100%;">
						<el-option v-for="item in timeUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
						</el-option>
					</el-select>
					<span v-show="!scope.row.show">{{scope.row.procTimeUnitName}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="工序类型" width="140">
				<template slot-scope="scope">
					<el-select v-model="scope.row.procProductionType" size="small" v-show="scope.row.show" placeholder="请选择"
					 filterable style="width: 100%;">
						<el-option v-for="item in processTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
						</el-option>
					</el-select>
					<span v-show="!scope.row.show">{{scope.row.procProductionTypeName}}</span>
				</template>
			</el-table-column>
			<el-table-column header-align="center" align="center" label="加工内容" width="200">
				<template slot-scope="scope">
					<el-input type="textarea" rows="1" v-model="scope.row.procWorkcontent" v-show="scope.row.show" size="small"
					 placeholder="备注" style="width: 100%;"></el-input>
					<span v-show="!scope.row.show">{{scope.row.procWorkcontent}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="操作" width="150" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" icon="el-icon-edit" type="primary" @click="editHandle(scope.row)" circle></el-button>
					<el-button size="mini" icon="el-icon-check" type="success" @click="submitFormHandle(scope.row)" circle></el-button>
					<el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row, scope.$index)" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
	export default {
		data() {
			return {
				visible: false,
				dataListLoading: false,
				timeUnitList: [],
				procImportantStutasList: [{
						dictCode: 1,
						dictName: '是'
					},
					{
						dictCode: 2,
						dictName: '否'
					}
				],
				processTypeList: [],
				dataList: [],
				provId: null,
				titleText: '工序查看'
			}
		},
		methods: {
			init(id) {
				//this.dataForm.userId = id || 0
				this.visible = true
				this.provId = id
				// this.getDataList(id)
				// this.initTimeUnitList()
				// this.initProcessTypeList()
			},
			getDataList(id) {
				this.dataListLoading = true
				this.$http({
					url: this.$http.adornBomUrl('/bom/v1/process/selectProcessParam'),
					method: 'get',
					params: {
						provId: id
					}
				}).then(({
					data
				}) => {
					this.dataListLoading = false
					this.visible = true
					if (data) {
						let resultList = []
						for (let i in data) {
							data[i].show = false
							resultList.push(data[i])
						}
						this.dataList = resultList
					}
				})
			},
			// 初始化物料类型可选项
			initTimeUnitList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'timeUnit'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.timeUnitList = data
					}
				})
			},
			// 初始化物料类型可选项
			initProcessTypeList() {
				this.$http({
					url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
					method: 'get',
					params: {
						dictCode: 'processType'
					}
				}).then(({
					data
				}) => {
					if (data) {
						this.processTypeList = data
					}
				})
			},
			addHandle() {
				let addRow = {}
				addRow.show = true
				this.dataList.push(addRow)
			},
			editHandle(row) {
				row.show = true
			},
			// 表单提交
			submitFormHandle(row) {
				row.show = false;
				let obj = {};
				obj = this.timeUnitList.find((item) => {
					return item.dictCode === row.procTimeUnit;
				});
				row.procTimeUnitName = obj.dictName

				obj = this.processTypeList.find((item) => {
					return item.dictCode === row.procProductionType;
				});
				row.procProductionTypeName = obj.dictName
				if (row.procId == null) {
					this.$http({
						url: this.$http.adornBomUrl('/bom/v1/process/insertProcess'),
						method: 'post',
						data: this.$http.adornData({
							provId: this.provId,
							procCode: row.procCode,
							procName: row.procName,
							procSequence: row.procSequence,
							procImportantStutas: row.procImportantStutas,
							procActualPreparetime: row.procActualPreparetime,
							procActualmakeTime: row.procActualmakeTime,
							procActualEndTime: row.procActualEndTime,
							procQuotaPreparetime: row.procQuotaPreparetime,
							procQuotamaketime: row.procQuotamaketime,
							procQuotaendtime: row.procQuotaendtime,
							procTimeUnit: row.procTimeUnit,
							procTimeUnitName: row.procTimeUnitName,
							procProductionType: row.procProductionType,
							procProductionTypeName: row.procProductionTypeName,
							procWorkcontent: row.procWorkcontent
						})
					}).then(({
						data
					}) => {
						this.$message({
							message: '操作成功',
							type: 'success',
							onClose: () => {
								this.getDataList(this.provId)
							}
						})
					})
				} else {
					this.$http({
						url: this.$http.adornBomUrl('/bom/v1/process/updateProcessById'),
						method: 'put',
						data: this.$http.adornData({
							procId: row.procId,
							provId: row.provId,
							procCode: row.procCode,
							procName: row.procName,
							procSequence: row.procSequence,
							procImportantStutas: row.procImportantStutas,
							procActualPreparetime: row.procActualPreparetime,
							procActualmakeTime: row.procActualmakeTime,
							procActualEndTime: row.procActualEndTime,
							procQuotaPreparetime: row.procQuotaPreparetime,
							procQuotamaketime: row.procQuotamaketime,
							procQuotaendtime: row.procQuotaendtime,
							procTimeUnit: row.procTimeUnit,
							procTimeUnitName: row.procTimeUnitName,
							procProductionType: row.procProductionType,
							procProductionTypeName: row.procProductionTypeName,
							procWorkcontent: row.procWorkcontent
						})
					}).then(({
						data
					}) => {
						this.$message({
							message: '操作成功',
							type: 'success',
							onClose: () => {
								this.getDataList(this.provId)
							}
						})
					})
				}

			},
			deleteHandle(row, rowIndex) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (row.procId != null) {
						this.$http({
							url: this.$http.adornBomUrl('/bom/v1/process/deleteProcessById'),
							method: 'delete',
							params: {
								procId: procId
							}
						}).then(({
							data
						}) => {
							this.visible = true
							if (data) {
								this.$message({
									message: '操作成功',
									type: 'success',
									onClose: () => {
										this.getDataList(this.provId)
									}
								})
							}
						})
					} else {
						this.dataList.splice(rowIndex, 1)
					}
				}).catch(() => {})
			}
		}
	}
</script>
