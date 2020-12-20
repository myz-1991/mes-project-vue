<template>
  <div class="app-container">
    <el-row>
      <el-form :model="searchFormData" size="small">
        <el-row>
          <el-col :span="16">
            <el-form-item label="">
              <el-button type="primary" icon="el-icon-refresh" round @click="refreshorgTable()">刷新</el-button>
              <el-button type="primary" icon="el-icon-plus" round @click="addOrUpdateHandle(1, 0)">新建计划</el-button>
              <el-button type="primary" icon="el-icon-plus" round @click="addOrUpdateHandle1(1, 0)">新建任务</el-button>
              <el-button type="primary" icon="el-icon-receiving" round @click="visible = true">导入</el-button>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="">
              <el-col :span="18">
                <el-input v-model="searchFormData.searchTextValue" type="text" placeholder="计划号或批次号查询"
                  @keyup.enter.native="taskTableSearch()" />
              </el-col>
              <el-col :offset="1" :span="3">
                <el-button type="primary" icon="el-icon-search" round @click="taskTableSearch()">查询</el-button>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-row>
    <el-row>
      <el-table ref="taskTable" :data="taskDataList" size="small" border>
        <el-table-column type="selection" width="55" />
        <el-table-column prop="name" align="center" label="计划单号" width="120" />
        <el-table-column prop="code" align="center" label="订单编号" />
        <el-table-column prop="mateCode" align="center" label="产品编号" />
        <el-table-column prop="mateName" align="center" label="产品名称" />
        <el-table-column prop="mateModel" align="center" label="规格型号" />
        <el-table-column prop="planNum" align="center" label="计划数量" />
        <!-- <el-table-column prop="taskWorkshopName" align="center" label="预计生产时长" width="110"/> -->
        <el-table-column align="center" label="状态">
          <template slot-scope="scope">
            <el-tag type="success">{{scope.row.statusName}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="scheduledStartTime" align="center" label="计划开始时间" width="110" />
        <el-table-column prop="scheduledEndTime" align="center" label="计划结束时间" width="110" />
        <el-table-column prop="createUser" align="center" label="创建人" />
        <el-table-column align="center" label="分配数量">
          <template slot-scope="scope">
            <span>{{scope.row.planNum - scope.row.surplusNum}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="surplusNum" align="center" label="剩余数量" />
        </el-table-column>
        <el-table-column prop="weight" align="center" label="产品重量（kg）" width="120" />
        <el-table-column prop="customerName" align="center" label="客户名称" />
        <el-table-column label="操作" align="center" width="200" fixed="right">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button size="mini" icon="el-icon-edit" type="warning" @click="addOrUpdateHandle('2', scope.row)"
                round></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="查看任务单" placement="top-start">
              <el-button size="mini" icon="el-icon-view" type="primary" round @click="taskViewOpen(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button size="mini" icon="el-icon-delete" type="danger" round @click="deleteTask(scope.row.id)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <planAdd v-if="addOrUpdateVisible" ref="planAdd" @refreshDataList="refreshorgTable" />
    <taskAdd v-if="taskAddVisible" ref="taskAdd" @refreshDataList="refreshorgTable" />
    <taskView v-if="taskViewVisible" ref="taskView" @refreshDataList="refreshorgTable"></taskView>

    <el-dialog title="计划导入" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
      <el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" action=""
        :before-upload="beforeUpload" :show-file-list="true" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="margin-top: 5px;" @click="importTask">提交</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios'
  import {
    pageTaskByParam,
    importTaskData,
    deleteTask
  } from '@/api/plan/task'
  import planAdd from './plan-add'
  import taskAdd from './task-add'
  import taskView from './taskView'
  export default {
    components: {
      planAdd,
      taskAdd,
      taskView
    },
    data() {
      return {
        taskDataList: [],
        addOrUpdateVisible: false,
        taskAddVisible: false,
        taskViewVisible: false,
        materialPrepareVisible: false,
        visible: false,
        orderVisible: false,
        processingProgressVisible: false,
        searchFormData: {
          searchTextValue: ''
        },
        fileList: []
        // uploadUrl: '/plan/v1/task/importTaskData'
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
        this.taskDataList = []
        pageTaskByParam('', '1', this.searchFormData.searchTextValue, '', '', 1, 10).then(response => {
          debugger
          this.taskDataList = response.data.records
        })
      },
      beforeUpload(file) {
        debugger
        let fd = new FormData();
        var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        const extension = testmsg === 'xls'
        if (!extension) {
          this.$message({
            message: '上传文件只能是 xls 格式!',
            type: 'warning'
          });
          return
        }
        fd.append('file', file);
        importTaskData(fd).then(response => {

        })
      },
      importTask() {
        debugger
        this.$refs.upload.submit();
      },
      taskViewOpen(id) {
        this.taskViewVisible = true
        this.$nextTick(() => {
          this.$refs.taskView.init(id)
        })
      },
      // 新增 / 修改
      addOrUpdateHandle(workType, row) {
        if (workType == '2' && row.status != 'PLAN.STATUS.001') {
          this.$message({
            message: '只能修改未分配的计划任务！',
            type: 'warning'
          })
          return
        }
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.planAdd.init(workType, id)
        })
      },
      addOrUpdateHandle1(workType, id) {
        const rowData = this.$refs.taskTable.selection
        if (rowData.length != 1) {
          this.$message({
            message: '请选择一条任务进行操作！',
            type: 'warning'
          })
          return
        }
        this.taskAddVisible = true
        this.$nextTick(() => {
          this.$refs.taskAdd.init(workType, rowData[0])
        })
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
          this.fileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的csv文件
        }
      },
      submit() {
        this.uploadUrl = '/upload' // 这里，读者换成实际项目中的上传接口
        this.$nextTick(() => {
          this.$refs.upload.submit()
        })
      },
      deleteTask(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteTask(id).then(response => {
            this.$message({
              message: '删除成功！',
              type: 'success'
            })
          })
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
