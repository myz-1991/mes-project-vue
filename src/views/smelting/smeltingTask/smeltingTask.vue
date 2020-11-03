<template>
  <div class="app-container">
    <el-container>
      <!-- <el-header>
        <el-row>
          <el-form size="small">
            <el-row>
              <el-form-item label="">
                <el-button type="primary" icon="el-icon-plus" round>新建</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-row>
      </el-header> -->
      <el-aside style="width: 40%;background-color: #FFFFFF;">
        <el-form>
          <el-form-item>
            <el-col :span="5">
              <el-button type="primary" size="small" icon="el-icon-plus" round>增加</el-button>
            </el-col>
            <el-col :span="5">
              <el-button type="success" size="small" icon="el-icon-check" round>完成</el-button>
            </el-col>
            <el-col :span="14">
              <el-form-item label="炉批号:">
                <el-select />
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="炉批号:" label-width="120">
            <el-col :span="20">
              <el-input type="text" readonly="true" style="width: 100%;" />
            </el-col>
          </el-form-item>
          <el-form-item label="铝锭重量:" label-width="120">
            <el-col :span="20">
              <el-input-number style="width: 90%;" /><span> KG</span>
            </el-col>
          </el-form-item>
          <el-form-item label="废料重量:" label-width="120">
            <el-col :span="20">
              <el-input-number style="width: 90%;" /><span> KG</span>
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
                <el-pagination
                  :current-page="pageIndex"
                  :page-sizes="[10, 20, 50, 100]"
                  :page-size="pageSize"
                  :total="totalPage"
                  layout="total, sizes, prev, pager, next, jumper"
                  @size-change="sizeChangeHandle"
                  @current-change="currentChangeHandle"
                />
              </el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-aside>
      <el-main>
        <el-table border>
          <el-table-column label="坩锅号" align="center" />
          <el-table-column label="检验结果" align="center" />
          <el-table-column label="处理结果" align="center" />
          <el-table-column label="换料地点" align="center" />
        </el-table>
        <el-pagination
          :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          :total="totalPage"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="sizeChangeHandle"
          @current-change="currentChangeHandle"
        />
      </el-main>
    </el-container>

    <!-- <el-row>
      <el-table ref="taskTable" :data="taskDataList" size="small" row-key="taskId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="taskCode" align="center" label="订单号" width="120" />
        <el-table-column prop="taskName" align="center" label="批次号" />
        <el-table-column prop="mateCode" align="center" label="产品编码" />
        <el-table-column prop="mateName" align="center" label="产品名称" />
        <el-table-column prop="mateName" align="center" label="规格型号" />
        <el-table-column prop="taskStatusName" align="center" label="计划状态" />
        <el-table-column prop="taskPlannedNum" align="center" label="库存数" />
        <el-table-column prop="taskProductionNum" align="center" label="毛坯数" />
        <el-table-column prop="taskWorkshopName" align="center" label="订单量" />
        <el-table-column prop="taskScheduledStartTime" align="center" label="计划开始日期" width="150">
          <template slot-scope="scope">
            <span>{{ dateFormat(scope.row.taskScheduledStartTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskScheduledEndTime" align="center" label="计划结束日期" width="150">
          <template slot-scope="scope">
            <span>{{ dateFormat(scope.row.taskScheduledEndTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskDeliveryDate" align="center" label="交付日期" width="120">
          <template slot-scope="scope">
            <span>{{ dateFormat(scope.row.taskDeliveryDate) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="taskPriorityName" align="center" label="优先级" />
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
    <!-- <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="processingProgressHandle(scope.row.taskId)">加工进度</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row> -->
    <!--
    <el-dialog title="计划导入" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
      <el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" :action="uploadUrl"
        :show-file-list="true" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="margin-top: 5px;" @click="handleSubmit">提交</el-button> -->
    <!-- <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span> -->
    <!-- </el-dialog> -->

    <!-- <el-dialog title="工单生成" size="small" :close-on-click-modal="false" :visible.sync="orderVisible" width="75%">
      <el-form ref="dataForm" size="small" label-width="120px">
        <el-row>
          <el-col :span="8">
            <el-form-item label="差压设备数">
              <el-input placeholder="差压设备数" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工效率">
              <el-input placeholder="加工效率" style="width: 260px;" readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工天数">
              <el-input vplaceholder="加工天数" style="width: 260px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总产量">
              <el-input placeholder="总产量" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="毛坯库存">
              <el-input placeholder="毛坯库存" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备库时间">
              <el-input placeholder="备库时间" style="width: 260px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-divider />
        <el-row>
          <el-col :span="8">
            <el-form-item label="机加设备数">
              <el-input placeholder="机加设备数" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工效率">
              <el-input placeholder="加工效率" style="width: 260px;" readonly="true" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="加工天数">
              <el-input vplaceholder="加工天数" style="width: 260px;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="总产量">
              <el-input placeholder="总产量" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="成品库存">
              <el-input placeholder="成品库存" style="width: 260px;" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="备库时间">
              <el-input placeholder="备库时间" style="width: 260px;" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskDataList: [],
      addOrUpdateVisible: false,
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
  activated() {
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
      this.$http({
        url: this.$http.adornPlanUrl('/plan/v1/task/selectTaskTreeByParam'),
        method: 'get',
        params: {
          param: ''
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
    addOrUpdateHandle() {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.planAdd.init()
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
