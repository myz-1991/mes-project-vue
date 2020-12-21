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
              <el-button type="primary" icon="el-icon-receiving" round @click="visible = true">附件上传</el-button>
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
		<el-table-column prop="mateCode" align="center" label="熔炼炉号" />
		<el-table-column prop="mateName" align="center" label="精炼炉号" />
        <el-table-column align="center" label="检验结果">
			<template slot-scope="scope">
				<el-tag v-if="scope.row.status === 2" type="danger">不合格</el-tag>
				<el-tag v-else type="success">不合格</el-tag>
			</template>
		</el-table-column>
        <el-table-column prop="checkDate" align="center" label="送检日期" width="150">
        </el-table-column>
        <el-table-column prop="checkName" align="center" label="送检人" />
        <el-table-column label="操作" align="center" width="280" fixed="right">
          <template slot-scope="scope">
            <!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
            <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="checkVisible = true">检验明细</el-button>
            <el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="processingProgressHandle(scope.row.taskId)">投放合金</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>

    <el-dialog title="文件上传" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
      <el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" :action="uploadUrl"
        :show-file-list="true" :on-success="onSuccess" :on-error="onError" :auto-upload="false">
        <el-button slot="trigger" type="primary">选取文件</el-button>
      </el-upload>
      <el-button type="primary" style="margin-top: 5px;" @click="handleSubmit">提交</el-button>
    </el-dialog>

    <el-dialog title="新建检验任务" size="small" :close-on-click-modal="false" :visible.sync="orderVisible" width="60%">
      <el-form ref="dataForm" size="small" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="检验类型">
              <el-select v-model="value" placeholder="请选择检验类型" style="width: 100%;">
                <el-option label="广普分析" value="1" />
                <el-option label="拉棒" value="2" />
                <el-option label="三座标" value="3" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="批次号">
              <el-select v-model="value" placeholder="请选择批次号" style="width: 100%;">
                <el-option label="20201028-1" value="1" />
                <el-option label="20201028-2" value="2" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="产品编码">
              <el-input placeholder="产品编码" read-only />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="产品名称">
              <el-input placeholder="产品名称" read-only />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="规格型号">
              <el-input placeholder="规格型号" read-only />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="送检时间">
              <el-date-picker type="date" placeholder="送检时间" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="二维码">
              <el-input placeholder="二维码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="检验数量">
              <el-input-number placeholder="检验数量" style="width: 100%;" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="坩锅号">
              <el-select placeholder="二维码" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="光谱分析标准值" size="small" :close-on-click-modal="false" :visible.sync="standardVisible" width="90%">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="value1" width="130">
        </el-table-column>
        <el-table-column prop="value2" label="Si硅">
        </el-table-column>
        <el-table-column prop="value3" label="MG镁">
        </el-table-column>
        <el-table-column prop="value4" label="Ti钛">
        </el-table-column>
        <el-table-column prop="value5" label="Sr锶">
        </el-table-column>
        <el-table-column prop="value6" label="Fe铁">
        </el-table-column>
        <el-table-column prop="value7" label="Cu铜">
        </el-table-column>
        <el-table-column prop="value8" label="Mn锰">
        </el-table-column>
        <el-table-column prop="value9" label="Cd镉">
        </el-table-column>
        <el-table-column prop="value10" label="Ca钙">
        </el-table-column>
        <el-table-column prop="value11" label="Na钠">
        </el-table-column>
        <el-table-column prop="value12" label="Sb锑">
        </el-table-column>
        <el-table-column prop="value13" label="P磷">
        </el-table-column>
        <el-table-column prop="value14" label="其他单个">
        </el-table-column>
        <el-table-column prop="value15" label="其他总量">
        </el-table-column>
      </el-table>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span> -->
    </el-dialog>
	
	<el-dialog title="检验结果" size="small" :close-on-click-modal="false" :visible.sync="checkVisible" width="90%">
	  <el-table :data="tableData1" style="width: 100%" border>
	    <el-table-column prop="value1" width="130">
	    </el-table-column>
	    <el-table-column prop="value2" label="Si硅">
	    </el-table-column>
	    <el-table-column prop="value3" label="MG镁">
	    </el-table-column>
	    <el-table-column prop="value4" label="Ti钛">
	    </el-table-column>
	    <el-table-column prop="value5" label="Sr锶">
	    </el-table-column>
	    <el-table-column prop="value6" label="Fe铁">
	    </el-table-column>
	    <el-table-column prop="value7" label="Cu铜">
	    </el-table-column>
	    <el-table-column prop="value8" label="Mn锰">
	    </el-table-column>
	    <el-table-column prop="value9" label="Cd镉">
	    </el-table-column>
	    <el-table-column prop="value10" label="Ca钙">
	    </el-table-column>
	    <el-table-column prop="value11" label="Na钠">
	    </el-table-column>
	    <el-table-column prop="value12" label="Sb锑">
	    </el-table-column>
	    <el-table-column prop="value13" label="P磷">
	    </el-table-column>
	    <el-table-column prop="value14" label="其他单个">
	    </el-table-column>
	    <el-table-column prop="value15" label="其他总量">
	    </el-table-column>
	  </el-table>
	  <!-- <span slot="footer" class="dialog-footer">
	    <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
	    <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
	  </span> -->
	</el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        taskDataList: [{
			taskName : '2020-12-12-01',
			mateCode : '1#',
			mateName : '',
			status : 1,
			checkDate : '2020-12-12',
			checkName : '张三'
		},{
			taskName : '2020-12-12-01',
			mateCode : '',
			mateName : 'M1',
			status : 1,
			checkDate : '2020-12-12',
			checkName : '张三'
		}],
		checkVisible : false,
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
          value1 : '熔炼炉内铝液',
          value2 : '6.5-7.5',
          value3 : '0.38-0.43',
          value4 : '0.08-0.15',
          value5 : '≤0.026',
          value6 : '≤0.13',
          value7 : '≤0.02',
          value8 : '0.02-0.05',
          value9 : '≤0.0075',
          value10 : '≤0.002',
          value11 : '≤0.0015',
          value12 : '≤0.004',
          value13 : '≤0.002',
          value14 : '≤0.03',
          value15 : '≤0.10'
        },{
          value1 : '保温炉内铝液',
          value2 : '6.5-7.5',
          value3 : '0.38-0.43',
          value4 : '0.08-0.15',
          value5 : '0.2-0.026',
          value6 : '≤0.13',
          value7 : '≤0.02',
          value8 : '0.02-0.05',
          value9 : '≤0.0075',
          value10 : '≤0.002',
          value11 : '≤0.0015',
          value12 : '≤0.004',
          value13 : '≤0.002',
          value14 : '≤0.03',
          value15 : '≤0.10'
        }],
		tableData1 : [{
		  value1 : '熔炼炉内铝液',
		  value2 : '6.5-7.5',
		  value3 : '0.38-0.43',
		  value4 : '0.08-0.15',
		  value5 : '≤0.026',
		  value6 : '≤0.13',
		  value7 : '≤0.02',
		  value8 : '0.02-0.05',
		  value9 : '≤0.0075',
		  value10 : '≤0.002',
		  value11 : '≤0.0015',
		  value12 : '≤0.004',
		  value13 : '≤0.002',
		  value14 : '≤0.03',
		  value15 : '≤0.10'
		},{
		  value1 : '1#',
		  value2 : '6.5',
		  value3 : '0.38',
		  value4 : '0.08',
		  value5 : '0.025',
		  value6 : '0.13',
		  value7 : '0.02',
		  value8 : '0.02',
		  value9 : '0.0065',
		  value10 : '0.002',
		  value11 : '0.0015',
		  value12 : '0.004',
		  value13 : '0.002',
		  value14 : '0.03',
		  value15 : '0.10'
		}, {
		  value1 : '保温炉内铝液',
		  value2 : '6.5-7.5',
		  value3 : '0.38-0.43',
		  value4 : '0.08-0.15',
		  value5 : '0.2-0.026',
		  value6 : '≤0.13',
		  value7 : '≤0.02',
		  value8 : '0.02-0.05',
		  value9 : '≤0.0075',
		  value10 : '≤0.002',
		  value11 : '≤0.0015',
		  value12 : '≤0.004',
		  value13 : '≤0.002',
		  value14 : '≤0.03',
		  value15 : '≤0.10'
		},{
		  value1 : 'M1',
		  value2 : '6.5',
		  value3 : '0.43',
		  value4 : '0.15',
		  value5 : '0.026',
		  value6 : '0.13',
		  value7 : '0.02',
		  value8 : '0.05',
		  value9 : '0.0075',
		  value10 : '0.002',
		  value11 : '0.0015',
		  value12 : '0.004',
		  value13 : '0.002',
		  value14 : '0.03',
		  value15 : '0.10'
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
