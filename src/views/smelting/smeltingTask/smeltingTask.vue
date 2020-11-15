<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-form :model="searchFormData">
          <el-form-item>
            <el-input v-model="searchTextValue" placeholder="按炉批号查询"></el-input>
          </el-form-item>
        </el-form>
        <el-table :data="taskDataList" tooltip-effect="dark" style="width: 100%" @selection-change="taskDataSelectionChange"
          border>
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column prop="name" label="炉批号"></el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.status == 1" type="info">已开工</el-tag>
              <el-tag v-else-if="scope.row.status == 2" type="success">已入炉</el-tag>
              <el-tag v-else-if="scope.row.status == 3" type="warning">已出炉</el-tag>
              <el-tag v-else type="danger">已完工</el-tag>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
          layout="sizes, prev, pager, next, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
      </el-col>
      <el-col :span="15" :offset="1">
        <el-form :model="dataForm" size="small">
          <el-form-item>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addJob" round>增加</el-button>
            <el-button type="success" size="small" icon="el-icon-plus" @click="stockOut" round>入炉</el-button>
            <el-button type="warning" size="small" icon="el-icon-plus" @click="outCrucible" round>出炉</el-button>
            <el-button type="danger" size="small" icon="el-icon-check" @click="finishJob" round>完成</el-button>
          </el-form-item>
          <el-form-item label="炉批号:" label-width="120">
            <el-col :span="20">
              <el-input v-model="dataForm.name" type="text" readonly="true" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="铝锭重量:" label-width="120">
            <el-col :span="20">
              <el-input-number v-model="dataForm.aluminumIngot" precision="2" style="width: 90%;" /><span> KG</span>
            </el-col>
          </el-form-item>
          <el-form-item label="废料重量:" label-width="120">
            <el-col :span="20">
              <el-input-number v-model="dataForm.waste" precision="2" style="width: 90%;" /><span> KG</span>
            </el-col>
          </el-form-item>
          <el-form-item label="废品号:" label-width="120">
            <el-row>
              <el-col :span="20">
                <el-input style="width: 100%;" />
              </el-col>
            </el-row>
            <el-row style="margin-top: 3px;">
              <el-col :span="24" style="border-radius: 4px;">
                <el-table border style="height: 280px;">
                  <el-table-column label="二维码" align="center" />
                  <el-table-column label="产品名称" align="center" />
                </el-table>
                <el-pagination :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
                  layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="选择坩锅">
      <el-table :data="crucibleDataList" ref="crucible" tooltip-effect="dark" style="width: 100%" border>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="code" align="center" label="坩锅号" />
        <el-table-column prop="status" align="center" label="状态">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 1" type="success">空闲</el-tag>
            <el-tag v-else-if="scope.row.status == 2" type="warning">占用</el-tag>
            <el-tag v-else type="danger">出库</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="jobName" align="center" label="炉批号">
        </el-table-column>
        <el-table-column prop="checkResult" align="center" label="检验结果">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.checkResult == 2" type="danger">NG</el-tag>
            <el-tag v-else-if="scope.row.checkResult == 1" type="success">OK</el-tag>
            <span v-else></span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    addJob,
    updateJob,
    findJob,
    pageJob
  } from '@/api/smelt/job'
  import {
    saveAccessRecord,
    findAccessRecord
  } from '@/api/smelt/record'
  import {
    listCrucible,
    updateCrucible
  } from '@/api/smelt/crucible'
  export default {
    data() {
      return {
        taskDataList: [],
        crucibleDataList : [],
        addOrUpdateVisible: false,
        visible: false,
        orderVisible: false,
        dialogVisible : false,
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        processingProgressVisible: false,
        searchFormData: {
          searchTextValue: ''
        },
        dataForm: {
          id: '',
          name: '',
          accessId: '',
          status: '',
          aluminumIngot: '',
          waste: ''
        }
      }
    },
    mounted() {
      this.initTaskData()
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
        this.initTaskData()
      },
      initTaskData() {
        pageJob(this.searchFormData.searchTextValue, '', '', this.pageSize, this.pageIndex).then(response => {
          if (response) {
            this.taskDataList = response.data.records
            this.totalPage = response.data.total
          } else {
            this.taskDataList = []
            this.totalPage = 0
          }
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
      addJob() {
        addJob().then(response => {
          this.dataForm.id = response.data.id
          this.dataForm.name = response.data.name
          this.initTaskData()
        })
      },
      stockOut() {
        let data = {
          type: 2,
          aluminumIngot: this.dataForm.aluminumIngot,
          waste: this.dataForm.waste
        }
        saveAccessRecord(data).then(response => {
          let jobData = {
            id: this.dataForm.id,
            name: this.dataForm.name,
            status: 2,
            accessId: response.data.id
          }
          this.dataForm.accessId = response.data.id
          updateJob(jobData).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.initTaskData()
              }
            })
          })
        })
      },
      outCrucible() {
        this.dialogVisible = true
        listCrucible('').then(response => {
          this.crucibleDataList = response.data
        })
      },
      finishJob() {
        debugger
        let jobData = {
          id: this.dataForm.id,
          name: this.dataForm.name,
          status: 4,
          accessId: this.dataForm.accessId
        }
        updateJob(jobData).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose: () => {
              this.initTaskData()
            }
          })
        })
      },
      taskDataSelectionChange(selection) {
        if (selection.length == 1) {
          this.dataForm.name = selection[0].name
          this.dataForm.id = selection[0].id
          this.dataForm.accessId = selection[0].accessId
          this.dataForm.aluminumIngot = 0
          this.dataForm.waste = 0
          if (selection[0].accessId != null) {
            findAccessRecord(selection[0].accessId).then(response => {
              this.dataForm.aluminumIngot = response.data.aluminumIngot
              this.dataForm.waste = response.data.waste
            })
          }
        }
      },
      // 新增 / 修改
      addOrUpdateHandle() {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.planAdd.init()
        })
      },
      dataFormSubmit() {
        let records = this.$refs.crucible.selection
        for (let i = 0; i < records.length; i++) {
          if (records[i].status != 1) {
            this.$message({
              message: '坩锅号：' + records[i].code + '不可以选择！',
              type: 'warning'
            })
            return false;
          }
          let data = records[i]
          data.jobId = this.dataForm.id
          data.jobName = this.dataForm.name
          data.status = 2
          updateCrucible(data)
        }
         this.$message({
           message: '操作成功',
           type: 'success',
           onClose: () => {
             this.dialogVisible = false
             this.initTaskData()
           }
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
