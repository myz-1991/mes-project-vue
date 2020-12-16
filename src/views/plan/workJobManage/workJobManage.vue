<template>
  <div class="app-container">
    <el-row>
      <el-col :span="8">
        <el-row style="margin-bottom: 20px;">
          <el-col :span="24">
            <el-card class="box-card">
              <span style="font-size: 24px;margin-top: 10px;">设备编号: {{dataForm.equiCode}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">设备名称: {{dataForm.equiName}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">设备IP:</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">设备状态：<el-tag type="success">运行</el-tag></span>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="24">
            <el-card class="box-card">
              <span style="font-size: 24px;margin-top: 10px;">产品编号：{{dataForm.mateCode}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">产品名称: {{dataForm.mateName}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">关联模具：{{dataForm.mouldCode}} </span>
              <el-button size="mini" type="primary" icon="el-icon-search" @click="initMould" round>选择</el-button>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="24">
            <el-card class="box-card">
              <span style="font-size: 24px;margin-top: 10px;">生产数量：{{dataForm.planNum}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">预计时长:</span>
            </el-card>
          </el-col>
        </el-row>
        <el-row style="margin-bottom: 20px;">
          <el-col :span="24">
            <el-card class="box-card">
              <span style="font-size: 24px;margin-top: 10px;">生产状态：在制</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">完成数量: {{dataForm.finishNum}}</span><br /><br />
              <span style="font-size: 24px;margin-top: 10px;">完成百分比：</span>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="16" style="padding: 5px;">
        <span style="margin-bottom: 10px;">
          <el-button type="primary">生产任务</el-button>
          <el-button type="info">文件查看</el-button>
          <el-button v-if="buttonShow === false" type="info">三坐标查看</el-button>
          <el-button type="info">光谱查看</el-button>
          <el-button type="info">X光查看</el-button>
        </span>
        <el-table border size="mini" :data="taskDataList" style="margin-top: 10px;">
          <el-table-column type="index" label="任务优先号" align="center" width="100">
          </el-table-column>
          <el-table-column label="设备名称" prop="equiName" align="center" />
          <el-table-column label="产品编码" prop="mateCode" align="center" />
          <el-table-column label="产品名称" prop="mateName" align="center" />
          <el-table-column label="任务单号" prop="code" align="center" />
          <el-table-column label="订单编号" prop="planName" align="center" />
          <el-table-column label="开工时间" prop="scheduledStartTime" align="center" />
          <el-table-column label="完工时间" prop="scheduledEndTime" align="center" />
          <el-table-column label="生产数量" prop="planNum" align="center" />
          <el-table-column label="操作" align="center" width="180" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button size="mini" icon="el-icon-edit" type="success" @click="materialPrepareHandle(scope.row.taskId)" round>物料齐套</el-button> -->
              <el-tooltip v-if="scope.row.isSelect === false" class="item" effect="dark" content="选择" placement="top-start">
                <el-button size="mini" icon="el-icon-check" type="success" @click="selectTask(scope.row)" round>选择</el-button>
              </el-tooltip>
              <el-tooltip v-if="scope.row.isSelect === true" class="item" effect="dark" content="取消" placement="top-start">
                <el-button size="mini" icon="el-icon-close" type="danger" round>取消</el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
	
	<el-dialog title="选择模具" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
	  <el-table :data="mouldList" size="small" border>
	  	<el-table-column type="selection" width="55" />
	  	<el-table-column prop="code" align="center" label="模具编号" />
	  	<el-table-column prop="name" align="center" label="模具名称" />
	  	<el-table-column prop="cavities" align="center" label="模具腔数" />
	  	<el-table-column prop="" align="center" label="状态" />
	  	<el-table-column prop="" align="center" label="适用产品名称" />
	  	<el-table-column label="操作" align="center" width="150" fixed="right">
	  		<template slot-scope="scope">
	  			<el-button size="mini" icon="el-icon-data-analysis" type="success" round @click="selectMould(scope.row)">选择</el-button>
	  		</template>
	  	</el-table-column>
	  </el-table>
	  <el-pagination @current-change="currentChangeHandle1" :current-page="pageIndex1" :page-size="pageSize1" :total="totalPage1"
	   layout="sizes, prev, pager, next, jumper">
	  </el-pagination>
	</el-dialog>
  </div>
</template>

<script>
  import {
    listTaskByWorkerId,
	updateTask
  } from '@/api/plan/task'
  import {
  	findMouldPage
  } from '@/api/base/mould'
  import {
	  findEquipmentById
  } from '@/api/base/equipment'
  
  export default {
    data() {
      return {
        taskDataList: [],
        addOrUpdateVisible: false,
        materialPrepareVisible: false,
        visible: false,
        orderVisible: false,
        processingProgressVisible: false,
		buttonShow : true,
		mouldList : [],
        searchFormData: {
          searchTextValue: ''
        },
        dataForm : {
          equiName : '',
          equiCode : '',
          equiIpAdress : '',
          equiStatus : '',
          mateCode : '',
          mateName : '',
          mouldName : '',
          mouldCode : '',
          planNum : '',
          finishNum : '',
          status : ''
        },
        tableData: [],
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
        debugger
        this.taskDataList = []
        listTaskByWorkerId(this.$store.getters.userId).then(response => {
          this.taskDataList = response.data
		  if (this.taskDataList.length > 0) {
			  this.selectTask(this.taskDataList[0])
			  this.taskDataList[0].isSelect = true
			  findEquipmentById(this.taskDataList[0].equiId).then(res => {
				  debugger
				  let data = res.data
				  if (data.type = 'BASE.EQUIPMENT.TYPE.001') {
					  this.buttonShow = true
				  } else {
					  this.buttonShow = false
				  }
			  })
		  }
		  for (let i = 1; i < this.taskDataList.length; i++) {
			  this.taskDataList[i].isSelect = false
		  }
        })
      },
      initMould() {
      	this.visible = true
      	findMouldPage(null, this.pageSize1, this.pageIndex1).then(response => {
      		if (response) {
      			this.mouldList = response.data.records
      			this.totalPage1 = response.data.total
      		} else {
      			this.mouldList = []
      			this.totalPage1 = 0
      		}
      	})
      },
	  selectMould(row) {
		  let rowData = null
		  for (let i = 0; i < this.taskDataList.length; i++) {
			  if (this.taskDataList[i].isSelect == true) {
				  rowData = this.taskDataList[i]
				  break
			  }
		  }
		  rowData.mouldClampId = row.id
		  rowData.mouldClampName = row.name
		  rowData.mouldClampCode = row.code
		  updateTask(rowData).then(response => {
		  	this.$message({
		  		message: '操作成功',
		  		type: 'success',
		  		onClose: () => {
		  			this.visible = false
		  			// this.taskAddOrUpdateVisible = false
		  			this.taskDataInit()
		  		}
		  	})
		  })
	  },
      selectTask(row) {
          this.dataForm.equiName = row.equiName
          this.dataForm.equiCode = row.equiCode
          this.dataForm.equiIpAdress = ''
          this.dataForm.equiStatus = '1'
          this.dataForm.mateCode = row.mateCode
          this.dataForm.mateName = row.mateName
          this.dataForm.mouldName = row.mouldClampName
          this.dataForm.mouldCode = row.mouldClampCode
          this.dataForm.planNum = row.planNum
          this.dataForm.finishNum = row.finishNum
          this.dataForm.status = row.status
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
