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
              <el-button type="warning" icon="el-icon-edit" round @click="addOrUpdateHandle(2, 0)">编辑</el-button>
              <el-button type="primary" icon="el-icon-receiving" round @click="visible = true">导入</el-button>
              <!-- <el-button type="primary" icon="el-icon-coordinate" round @click="orderVisible = true">工单生成</el-button> -->
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
        <el-table-column type="expand" @click="test">
          <template slot-scope="props">
            <el-table size="mini" style="margin-right: -100px;" border>
              <el-table-column type="index" width="55" />
              <el-table-column align="center" label="任务单号" />
              <el-table-column align="center" label="设备名称" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务数量" />
              <el-table-column prop="taskWorkshopName" align="center" label="完成数量" />
              <el-table-column prop="taskWorkshopName" align="center" label="完成率" />
              <el-table-column prop="taskWorkshopName" align="center" label="合格数" />
              <el-table-column prop="taskWorkshopName" align="center" label="剩余数量" />
              <el-table-column prop="taskWorkshopName" align="center" label="模/夹具编号" />
              <el-table-column prop="taskWorkshopName" align="center" label="模/夹具名称" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务创建人" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务开始时间" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务结束时间" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务实际开始时间" />
              <el-table-column prop="taskWorkshopName" align="center" label="任务实际结束时间" />
              <el-table-column prop="taskWorkshopName" align="center" label="切单人" />
              <el-table-column prop="taskWorkshopName" align="center" label="次品数量" />
              <el-table-column prop="taskWorkshopName" align="center" label="次品率" />
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="name" align="center" label="计划单号" width="120" />
        <el-table-column prop="code" align="center" label="订单编号" />
        <el-table-column prop="mateCode" align="center" label="产品编号" />
        <el-table-column prop="mateName" align="center" label="产品名称" />
        <el-table-column prop="mateModel" align="center" label="规格型号" />
        <el-table-column prop="planNum" align="center" label="计划数量" />
        <!-- <el-table-column prop="taskWorkshopName" align="center" label="预计生产时长" width="110"/> -->
        <el-table-column prop="status" align="center" label="状态">
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
        <!-- <template slot-scope="scope">
						<span v-if="scope.row[surplusNum] === null">{{scope.row.planNum}}</span>
						<span v-else>{{scope.row.surplusNum}}</span>
					</template> -->
        </el-table-column>
        <el-table-column prop="weight" align="center" label="产品重量（kg）" width="120" />
        <el-table-column prop="customerName" align="center" label="客户名称" />
        <!-- <el-table-column prop="taskWorkshopName" align="center" label="领料数量" />
				<el-table-column prop="taskWorkshopName" align="center" label="领料名称" /> -->
        <!-- <el-table-column label="操作" align="center" width="150" fixed="right">
					<template slot-scope="scope">
						<!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
        <!-- <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="processingProgressHandle(scope.row.taskId)">加工进度</el-button>
					</template>
				</el-table-column> -->
      </el-table>
    </el-row>
    <planAdd v-if="addOrUpdateVisible" ref="planAdd" @refreshDataList="refreshorgTable" />
    <taskAdd v-if="taskAddVisible" ref="taskAdd" @refreshDataList="refreshorgTable" />

    <el-dialog title="计划导入" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
      <el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" :action="uploadUrl"
        :show-file-list="true" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="margin-top: 5px;" @click="handleSubmit">提交</el-button>
    </el-dialog>

    <el-dialog title="工单生成" size="small" :close-on-click-modal="false" :visible.sync="orderVisible" width="75%">
      <el-form ref="dataForm" size="small" label-width="80px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="工单任务">
              <el-select v-model="value" placeholder="请选择工单" style="width: 100%;">
                <el-option label="差压" value="1">
                </el-option>
                <el-option label="机加" value="2">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工设备">
              <el-select v-model="value" placeholder="请选择设备·" style="width: 100%;">
                <el-option label="压装1" value="1">
                </el-option>
                <el-option label="压装2" value="2">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工效率">
              <el-input placeholder="加工效率" readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总产量">
              <el-input placeholder="总产量" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛坯库存">
              <el-input placeholder="毛坯库存" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成品库存">
              <el-input placeholder="成品库存" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="加工天数">
              <el-input placeholder="加工天数" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="开始时间">
              <el-date-picker type="date" placeholder="开始时间" style="width: 100%;">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" size="small" icon="el-icon-check" round style="margin-left: 10px;">确定</el-button>
          </el-col>
        </el-row>
      </el-form>
      <el-table border>
        <el-table-column label="日期" align="center"></el-table-column>
        <el-table-column label="设备" align="center"></el-table-column>
        <el-table-column label="数量" align="center"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    pageTaskByParam
  } from '@/api/plan/task'
  import planAdd from './plan-add'
  import taskAdd from './task-add'
  export default {
    components: {
      planAdd,
      taskAdd
    },
    data() {
      return {
        taskDataList: [],
        addOrUpdateVisible: false,
        taskAddVisible: false,
        materialPrepareVisible: false,
        visible: false,
        orderVisible: false,
        processingProgressVisible: false,
        searchFormData: {
          searchTextValue: ''
        },
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
        this.taskDataList = []
        pageTaskByParam(this.searchFormData.searchTextValue, '', '', 1, 10).then(response => {
          debugger
          this.taskDataList = response.data.records
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
      test() {
        alert(1111)
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
      addOrUpdateHandle(workType, id) {
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
