<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="70%">
    <el-table v-loading="dataListLoading" :data="workOrderList" size="small" border>
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column prop="taskCode" header-align="center" align="center" label="工序号" />
      <el-table-column prop="taskName" header-align="center" align="center" label="工序名称" />
      <el-table-column prop="taskPlannedNum" header-align="center" align="center" label="计划数" />
      <el-table-column prop="taskProductionNum" header-align="center" align="center" label="投产数" />
      <el-table-column prop="taskStatusName" header-align="center" align="center" label="计划状态" />
      <el-table-column prop="taskActualStartTime" header-align="center" align="center" label="实际开始时间" width="150">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.taskActualStartTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskActualEndTime" header-align="center" align="center" label="实际结束时间" width="150">
        <template slot-scope="scope">
          <span>{{ dateFormat(scope.row.taskActualEndTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="taskOperatorName" header-align="center" align="center" label="操作者" />
      <el-table-column prop="taskWorkshopName" header-align="center" align="center" label="加工车间" />
      <el-table-column prop="taskOperatorName" header-align="center" align="center" label="检验人" />
      <el-table-column prop="taskSendCheckNum" header-align="center" align="center" label="送检数" />
      <el-table-column prop="taskQualifiedNum" header-align="center" align="center" label="合格数" />
      <el-table-column prop="taskUnqualifiedNum" header-align="center" align="center" label="不合格数" />
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      titleText: '加工进度',
      dataListLoading: false,
      workOrderList: []
    }
  },
  methods: {
    dateFormat(dataValue) {
      	var date = new Date(dataValue)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
      	var Y = date.getFullYear() + '-'
      	var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      	var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
      	var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
      	var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
      	var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
      	return Y + M + D + h + m + s
    },
    init(id) {
      this.visible = true
      this.initWorkOrderList(id)
    },
    initWorkOrderList(id) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornPlanUrl('/plan/v1/workOrder/selectWorkOrderByTaskId'),
        method: 'get',
        params: {
          taskId: id
        }
      }).then(({
        data
      }) => {
        this.dataListLoading = false
        if (data) {
          this.workOrderList = data
        }
      })
    }
  }
}
</script>

<style>
</style>
