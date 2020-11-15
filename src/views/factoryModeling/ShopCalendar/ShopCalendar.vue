<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="日历查询" name="first">
        <el-form :model="searchForm" ref="dataForm" inline>
          <el-form-item label="组织:" prop="orgId">
            <el-select-tree :value="searchForm.orgId" size="small" style="width: 100%;" :select-opt="option.select"
              :tree-opt="option.tree" @node-click="clickNode1">
              <template v-slot:tree="{node}">
                <span :title="node.data.name">{{ node.data.name }}</span>
              </template>
            </el-select-tree>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-check" size="small" @click="initCaledarInfo" round>确定</el-button>
            <!-- <el-button>重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="日历设置" name="second">
        <el-form :model="dataForm" ref="dataForm" inline :rules="dataFormRules">
          <el-form-item label="组织:" prop="orgId">
            <el-select-tree :value="dataForm.orgId" size="small" style="width: 100%;" :select-opt="option.select"
              :tree-opt="option.tree" @node-click="clickNode">
              <template v-slot:tree="{node}">
                <span :title="node.data.name">{{ node.data.name }}</span>
              </template>
            </el-select-tree>
          </el-form-item>
          <el-form-item label="设置日期" prop="startDate">
            <el-col :span="11">
              <el-date-picker v-model="dataForm.startTime" size="small" type="date" placeholder="开始日期" style="width: 100%;">
              </el-date-picker>
            </el-col>
            <el-col class="line" :span="1">—</el-col>
            <el-col :span="12">
              <el-date-picker v-model="dataForm.endTime" size="small" type="date" placeholder="结束日期" style="width: 100%;">
              </el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="班次模型" prop="frequencyId">
            <el-select v-model="dataForm.frequencyId" size="small" placeholder="请选择">
              <el-option v-for="item in frequencyList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="success" icon="el-icon-check" size="small" @click="batchSaveCaledar" round>确定</el-button>
            <el-button type="danger" icon="el-icon-refresh-right" size="small" @click="dataFormReset" round>重置</el-button>
            <!-- <el-button>重置</el-button> -->
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>

    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''" @click="calendarClick(data)">
          {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : '' }}
          <el-tag v-if="validateDate(data) == 1" type="success">一班</el-tag>
          <el-tag v-if="validateDate(data) == 2" type="success">两班</el-tag>
          <el-tag v-if="validateDate(data) == 3" type="success">三班</el-tag>
          <el-tag v-if="validateDate(data) == 0" type="danger">休息</el-tag>
        </p>
        <!-- <p class="addBtn" v-show="data.isSelected == true" @click="calendarClick()">添加日程</p> -->
      </template>
    </el-calendar>

    <el-dialog title="排班" :visible.sync="dialogFormVisible" width="60%">
      <el-tabs v-model="activeName1" size="small" type="card" @tab-click="handleClick">
        <el-tab-pane label="设备班次" size="small" name="equipment">
          <el-table :data="schedulingList" border style="width: 100%">
            <el-table-column prop="machinName" label="设备名称" width="180">
            </el-table-column>
            <el-table-column prop="machinCode" label="设备编码" width="180">
            </el-table-column>
            <el-table-column prop="frequency" label="班次" width="180">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.frequency == 1">第一班</el-tag>
                <el-tag v-else-if="scope.row.frequency == 2">第二班</el-tag>
                <el-tag v-else="scope.row.frequency == 3">第三班</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="workerName" label="组织/人员">
            </el-table-column>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.id)" circle></el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="班次设置" name="setting">
          <el-form :model="schedulingForm" ref="schedulingForm" label-width="100">
            <el-form-item label="设备名称" prop="machinId">
              <el-select v-model="schedulingForm.machinId" size="small" placeholder="请选择设备">
                <el-option v-for="item in equipmentList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="frequency >= 1" label="班次一" prop="workerId1">
                <el-select v-model="schedulingForm.workerId1" size="small"
                  placeholder="请选择人员">
                  <el-option v-for="item in workerList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="frequency >= 2" label="班次二" prop="workerId2">
                <el-select v-model="schedulingForm.workerId2" size="small"
                  placeholder="请选择设备">
                  <el-option v-for="item in workerList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="frequency == 3" label="班次三" prop="workerId3">
                <el-select v-model="schedulingForm.workerId3" size="small"
                  placeholder="请选择设备">
                  <el-option v-for="item in workerList" :key="item.id" :label="item.name" :value="item.id">
                  </el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" icon="el-icon-check" size="small" @click="batchSaveScheduling" round>确定</el-button>
              <el-button type="danger" icon="el-icon-refresh-right" size="small" @click="schedulingFormReset" round>重置</el-button>
              <!-- <el-button>重置</el-button> -->
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getOrganizationTreeExpend
  } from '@/api/system/organization'
  import {
    listFrequencyByParam
  } from '@/api/calendar/frequency'
  import {
    batchSaveCaledar,
    listCaledarByParam
  } from '@/api/calendar/calendar'
  import {
    saveScheduling,
    updateScheduling,
    deleteScheduling,
    pageScheduling,
    batchSaveScheduling
  } from '@/api/calendar/scheduling'

  import {
    listEquipmentByParam
  } from '@/api/base/equipment'

  import {
    findUserList
  } from '@/api/system/user'

  import ElSelectTree from '@/components/select-tree/index'
  export default {
    components: {
      ElSelectTree
    },
    data() {
      return {
        value: new Date(),
        dialogFormVisible: false,
        activeName: 'first',
        activeName1: 'equipment',
        schedulingList: [],
        equipmentList: [],
        caleId: '',
        frequency: '',
        wokerTypeList: [{
            id: 1,
            value: '组织'
          },
          {
            id: 2,
            value: '人员'
          },
        ],
        calendarList: [],
        workerList: [],
        frequencyList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        searchForm: {
          orgId: ''
        },
        schedulingForm: {
          caleId: '',
          machinId: '',
          machinName: '',
          machinCode: '',
          wokerType1: 1,
          workerId1: '',
          workerName1: '',
          wokerType2: 1,
          workerId2: '',
          workerName2: '',
          wokerType3: 1,
          workerId3: '',
          workerName3: ''
        },
        dataForm: {
          orgId: '',
          orgName: '',
          startTime: '',
          endTime: '',
          frequencyId: ''
        },
        dataFormRules: {
          orgId: [{
            required: true,
            message: '请选择组织',
            trigger: 'blur'
          }],
          startTime: [{
            required: true,
            message: '请选择开始时间',
            trigger: 'blur'
          }],
          endTime: [{
            required: true,
            message: '请选择结束时间',
            trigger: 'blur'
          }],
          frequencyId: [{
            required: true,
            message: '请选择班次模型',
            trigger: 'blur'
          }]
        },
        option: {
          select: {
            filterable: true,
            clearable: true
          },
          tree: {
            highlightCurrent: true,
            data: [],
            expandOnClickNode: true,
            nodeKey: 'id',
            props: {},
            indent: 10,
            valueKey: 'id',
            displayKey: 'name',
            showCheckbox: false
          }
        },
        form: {
          name: '',
          region: '',
          region1: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    mounted() {
      this.initOrgList()
      this.initFrequencyList()
    },
    methods: {
      calendarClick(data) {
        if (this.calendarList.length != 0) {
          for (let i = 0; i < this.calendarList.length; i++) {
            let workingDate = this.calendarList[i].workingDate
            if (workingDate == data.day) {
              this.caleId = this.calendarList[i].id
              this.frequency = this.calendarList[i].frequency
              this.dialogFormVisible = true
              this.initEquipmentList()
              this.initWorkerList()
              this.initScheduling(this.caleId)
            }
          }
        } else {
          return null;
        }
      },
      initEquipmentList() {
        listEquipmentByParam('', '').then(response => {
          this.equipmentList = response.data
        })
      },
      initWorkerList() {
        findUserList('').then(response => {
          this.workerList = response.data
        })
      },
      initCaledarInfo() {
        var year = this.value.getFullYear(); //获取完整的年份(4位,1970-????)
        var month = this.value.getMonth() + 1; //获取当前月份(0-11,0代表1月)
        var day = this.value.getDate(); //获取当前日(1-31)
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        let date = year + '-' + month + '-' + day
        listCaledarByParam(date, this.searchForm.orgId).then(response => {
          this.calendarList = response.data
        })
      },
      validateDate(date) {
        if (this.calendarList.length != 0) {
          for (let i = 0; i < this.calendarList.length; i++) {
            let workingDate = this.calendarList[i].workingDate
            if (workingDate == date.day) {
              return this.calendarList[i].frequency
            }
          }
        } else {
          return null;
        }
      },
      initOrgList() {
        getOrganizationTreeExpend().then(resp => {
          this.option.tree.data = resp.data
        })
      },
      clickNode1(data, node, treeNode) {
        this.searchForm.orgId = data.id
      },
      clickNode(data, node, treeNode) {
        this.dataForm.orgId = data.id
        this.dataForm.orgName = data.name
      },
      clickNode2(data, node, treeNode) {
        this.schedulingForm.workerId1 = data.id
        this.schedulingForm.workerName1 = data.name
      },
      clickNode3(data, node, treeNode) {
        this.schedulingForm.workerId2 = data.id
        this.schedulingForm.workerName2 = data.name
      },
      clickNode4(data, node, treeNode) {
        this.schedulingForm.workerId3 = data.id
        this.schedulingForm.workerName3 = data.name
      },
      initFrequencyList() {
        listFrequencyByParam('').then(response => {
          this.frequencyList = response.data
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
      batchSaveCaledar() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            batchSaveCaledar(this.dataForm).then(response => {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1000
                // onClose: () => {
                //   this.refreshUserTable()
                // }
              })
            })
          }
        })
      },
      dataFormReset() {
        this.dataForm.orgId = ''
        this.dataForm.orgName = ''
        this.dataForm.startTime = ''
        this.dataForm.endTime = ''
        this.dataForm.frequencyId = ''
      },
      initScheduling(caleId) {
        pageScheduling(caleId, '', this.pageSize, this.pageIndex).then(response => {
          if (response) {
            this.schedulingList = response.data.records
            this.totalPage = response.data.total
          } else {
            this.schedulingList = []
            this.totalPage = 0
          }
        })
      },
      deleteHandle(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteScheduling(id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              onClose: () => {
                this.initScheduling(this.caleId)
              }
            })
          })
        }).catch(() => {})
      },
      handleClick() {
        debugger
        if (this.activeName1 == 'equipment') {
          this.initScheduling(this.caleId)
        } else {
          this.schedulingFormReset()
        }
      },
      schedulingFormReset() {
          this.schedulingForm.caleId = ''
          this.schedulingForm.machinId = ''
          this.schedulingForm.machinName = ''
          this.schedulingForm.machinCode = ''
          this.schedulingForm.wokerType1 = 1
          this.schedulingForm.workerId1 = ''
          this.schedulingForm.workerName1 = ''
          this.schedulingForm.wokerType2 = 1
          this.schedulingForm.workerId2 = ''
          this.schedulingForm.workerName2 = ''
          this.schedulingForm.wokerType3 = 1
          this.schedulingForm.workerId3 = ''
          this.schedulingForm.workerName3 = ''
      },
      batchSaveScheduling() {
        let data = []
        let obj = {}
        obj = this.equipmentList.find((item) => {
          return item.id === this.schedulingForm.machinId
        })
        let machinName = obj.name
        let machinCode = obj.code
        for (let i = 1; i <= this.frequency; i++) {
          let wokerId = this.schedulingForm['workerId' + i]
          obj = this.workerList.find((item) => {
            return item.id === wokerId
          })
          let workerName = obj.name
          let submitData = {
            caleId : this.caleId,
            frequency : i,
            machinId : this.schedulingForm.machinId,
            machinName : machinName,
            machinCode : machinCode,
            workerId : wokerId,
            workerName : workerName
          }
          data.push(submitData)
        }
        batchSaveScheduling(data).then(response => {
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000
          })
        })
      }
    }
  }
</script>

<style>
  .is-selected {
    color: #1989FA;
  }

  .addBtn {
    position: absolute;
    z-index: 99;
    display: block;
    width: 65px;
    height: 20px;
    padding: 9px;
    background: rgba(0, 200, 156, .6);
    color: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px
  }

  .addBtn:hover {
    background: rgba(0, 200, 156, 1);
  }
</style>
