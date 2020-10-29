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
      <el-header>
        <el-form>
          <el-row>
            <el-col :span="12">
              <el-form-item label="铝锭库存:" label-width="120">
                <el-col :span="20">
                  <el-input-number style="width: 90%;" disabled></el-input-number><span> KG</span>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="废料库存:" label-width="120">
                <el-col :span="20">
                  <el-input-number style="width: 90%;" disabled></el-input-number><span> KG</span>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
        <el-form style="margin-bottom: 5px;">
          <el-button type="primary" size="small" icon="el-icon-plus" round @click="orderVisible = true">入库</el-button>
        </el-form>
        <el-table border>
          <el-table-column label="入库类型" align="center"></el-table-column>
          <el-table-column label="入库数量" align="center"></el-table-column>
          <el-table-column label="入库时间" align="center"></el-table-column>
          <el-table-column label="入库人" align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-main>
    </el-container>

    <el-dialog title="原材料入库" size="small" :close-on-click-modal="false" :visible.sync="orderVisible" width="30%">
      <el-form ref="dataForm" size="small" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="入库类型">
              <el-select v-model="value" placeholder="请选择入库类型" style="width: 100%;">
                  <el-option label="铝锭" value="1">
                  </el-option>
				  <el-option label="废料" value="2">
				  </el-option>
                </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库重量">
              <el-input-number placeholder="入库重量" style="width: 100%;" readonly="true" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
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
