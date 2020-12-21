<template>
  <div class="app-container">
    <el-row>
      <el-form :model="searchFormData" size="small">
        <el-row>
          <el-col :span="8">
            <el-form-item label="">
              <el-button type="primary" icon="el-icon-refresh" round @click="refreshorgTable()">刷新</el-button>
              <el-button type="primary" icon="el-icon-view" round @click="standardVisible = true">查看标准</el-button>
              <!-- <el-button type="primary" icon="el-icon-plus" round @click="orderVisible=true">新建</el-button> -->
              <!-- <el-button type="primary" icon="el-icon-receiving" round @click="visible = true">附件上传</el-button> -->
              <el-button type="primary" icon="el-icon-check" round>完工</el-button>
            </el-form-item>
          </el-col>
          <el-col :offset="8" :span="8">
            <el-form-item label="">
              <el-col :span="18">
                <el-input v-model="searchFormData.searchTextValue" type="text" />
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
      <el-table ref="taskTable" :data="taskDataList" size="small" row-key="taskId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="taskName" align="center" label="任务号" />
        <el-table-column prop="mateCode" align="center" label="炉批号" />
        <el-table-column align="center" label="检验结果">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status === 2" type="danger">不合格</el-tag>
            <el-tag v-else type="success">合格</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="checkDate" align="center" label="送检日期" width="150">
        </el-table-column>
        <el-table-column prop="checkName" align="center" label="送检人" />
        <el-table-column label="操作" align="center" width="280" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
            <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="checkVisible = true">检验明细</el-button>
            <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="visible = true">导入结果</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="导入结果" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
      <el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" :action="uploadUrl"
        :show-file-list="true" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="margin-top: 5px;" @click="handleSubmit">提交</el-button>
    </el-dialog>

    <el-dialog title="硬度分析标准值" size="small" :close-on-click-modal="false" :visible.sync="standardVisible" width="50%">
      <el-table :data="tableData" border>
        <el-table-column prop="value1" label="项目" align="center"></el-table-column>
        <el-table-column label="屈服强度（MPa）" align="center">
          <el-table-column prop="value2" label="Rp0.2" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="抗拉强度（MPa）" align="center">
          <el-table-column prop="value3" label="Rm" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="延伸率（%）" align="center">
          <el-table-column prop="value4" label="A5" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="硬度（HB）" align="center">
          <el-table-column prop="value5" label="HBW5/250" align="center"></el-table-column>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="standardVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round>确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="检验结果" size="small" :close-on-click-modal="false" :visible.sync="checkVisible" width="70%">
      <el-table :data="tableData1" border>
        <el-table-column prop="value6" label="炉批号">
        </el-table-column>
        <el-table-column prop="value1" label="项目" align="center"></el-table-column>
        <el-table-column label="屈服强度（MPa）" align="center">
          <el-table-column prop="value2" label="Rp0.2" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="抗拉强度（MPa）" align="center">
          <el-table-column prop="value3" label="Rm" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="延伸率（%）" align="center">
          <el-table-column prop="value4" label="A5" align="center"></el-table-column>
        </el-table-column>
        <el-table-column label="硬度（HB）" align="center">
          <el-table-column prop="value5" label="HBW5/250" align="center"></el-table-column>
        </el-table-column>
      </el-table>
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
        taskDataList: [{
          taskName: '2020-12-12-01',
          mateCode: '20201212-01',
          mateName: 'M1',
          status: 1,
          checkDate: '2020-12-12',
          checkName: '张三'
        }, {
          taskName: '2020-12-12-02',
          mateCode: '20201212-02',
          mateName: 'M2',
          status: 1,
          checkDate: '2020-12-12',
          checkName: '张三'
        }],
        checkVisible: false,
        addOrUpdateVisible: false,
        materialPrepareVisible: false,
        visible: false,
        orderVisible: false,
        standardVisible: false,
        processingProgressVisible: false,
        searchFormData: {
          searchTextValue: ''
        },
        tableData : [{
          value1 : '标准值',
          value2 : '≥220',
          value3 : '≥290',
          value4 : '≥7',
          value5 : '≥80'
        }],
        tableData1 : [{
          value6 : '',
          value1 : '标准值',
          value2 : '≥220',
          value3 : '≥290',
          value4 : '≥7',
          value5 : '≥80'
        }, {
          value6 : '20201212-01',
          value1 : '实测值',
          value2 : '220',
          value3 : '290',
          value4 : '7',
          value5 : '80'
        }],
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
