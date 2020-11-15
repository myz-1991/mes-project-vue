<template>
  <div class="app-container">
    <el-form :model="dataForm" @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
            <el-button type="primary" size="small" icon="el-icon-setting" @click="calendarSettingOpen" round>日历设置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" size="small" style="width: 100%">
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="name" header-align="center" align="center" label="名称">
      </el-table-column>
      <el-table-column prop="workStartPeriod" header-align="center" align="center" label="开始周期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.workStartPeriod === 1" size="small">星期一</el-tag>
          <el-tag v-else-if="scope.row.workStartPeriod === 2" size="small">星期二</el-tag>
          <el-tag v-else-if="scope.row.workStartPeriod === 3" size="small">星期三</el-tag>
          <el-tag v-else-if="scope.row.workStartPeriod === 4" size="small">星期四</el-tag>
          <el-tag v-else-if="scope.row.workStartPeriod === 5" size="small">星期五</el-tag>
          <el-tag v-else-if="scope.row.workStartPeriod === 6" size="small">星期六</el-tag>
          <el-tag v-else size="small">星期日</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="workEndPeriod" header-align="center" align="center" label="结束周期">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.workEndPeriod === 1" size="small">星期一</el-tag>
          <el-tag v-else-if="scope.row.workEndPeriod === 2" size="small">星期二</el-tag>
          <el-tag v-else-if="scope.row.workEndPeriod === 3" size="small">星期三</el-tag>
          <el-tag v-else-if="scope.row.workEndPeriod === 4" size="small">星期四</el-tag>
          <el-tag v-else-if="scope.row.workEndPeriod === 5" size="small">星期五</el-tag>
          <el-tag v-else-if="scope.row.workEndPeriod === 6" size="small">星期六</el-tag>
          <el-tag v-else size="small">星期日</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="frequency" header-align="center" align="center" label="班次">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.frequency === 1" size="small">一班</el-tag>
          <el-tag v-else-if="scope.row.frequency === 2" size="small">两班</el-tag>
          <el-tag v-else-if="scope.row.frequency === 3" size="small">三班</el-tag>
          <el-tag v-else size="small" type="danger">休息</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="第一班上班时间">
        <template slot-scope="scope">
          <span v-if="scope.row.frequency >= 1">{{scope.row.firstStartTime}} - {{scope.row.firstEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="第二班上班时间">
        <template slot-scope="scope">
          <span v-if="scope.row.frequency >= 2">{{scope.row.secondStartTime}} - {{scope.row.secondEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="第三班上班时间">
        <template slot-scope="scope">
          <span v-if="scope.row.frequency >= 3">{{scope.row.thirdStartTime}} - {{scope.row.thirdEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.id)"
            circle></el-button>
          <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.id)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <frequencyAddOrUpdate v-if="addOrUpdateVisible" ref="frequencyAddOrUpdate" @refreshDataList="getDataList"></frequencyAddOrUpdate>
    <calendarSetting v-if="calendarSettingVisible" ref="calendarSetting" @refreshDataList="getDataList"></calendarSetting>
  </div>
</template>

<script>
  import {
    deleteFrequency,
    listFrequencyByParam
  } from '@/api/calendar/frequency'
  import frequencyAddOrUpdate from './frequency-add-or-update'
  import calendarSetting from './calendar-setting'
  export default {
    data() {
      return {
        dataForm: {
          key: ''
        },
        addOrUpdateVisible: false,
        calendarSettingVisible: false,
        dataList: [],
        dataListLoading: false,
        selectionDataList: []
      }
    },
    components: {
      frequencyAddOrUpdate,
      calendarSetting
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
        listFrequencyByParam(this.dataForm.key).then(response => {
          this.dataListLoading = false
          this.dataList = response.data
        })
      },
      calendarSettingOpen() {
        this.calendarSettingVisible = true
        this.$nextTick(() => {
          this.$refs.calendarSetting.init()
        })
      },
      // 新增 / 修改
      addOrUpdateHandle(workType, id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.frequencyAddOrUpdate.init(workType, id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteFrequency(id).then(response => {
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

<style>
</style>
