<template>
  <el-dialog :title="titleText" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
    <el-form ref="dataForm" :model="dataForm" size="small" label-width="120px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="产品编码" prop="mateId">
            <el-select v-model="dataForm.mateName" placeholder="请选择产品" style="width: 260px;" filterable>
              <el-option :value="dataForm.mateName" style="height: auto">
                <el-tree ref="tree" :load="loadNode" lazy node-key="id" highlight-current :props="props" @node-click="handleCheckChange" />
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划号" prop="taskCode">
            <el-input v-model="dataForm.taskCode" placeholder="计划号" style="width: 260px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="批次号" prop="taskName">
            <el-input v-model="dataForm.taskName" placeholder="批次号" style="width: 260px;" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="毛坯库存" prop="taskScheduledStartTime">
            <el-input v-model="dataForm.taskName" placeholder="毛坯库存" style="width: 260px;" readonly="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="成品库存" prop="taskScheduledEndTime">
            <el-input v-model="dataForm.taskName" placeholder="成品库存" style="width: 260px;" readonly="true" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="合计数量" prop="taskDeliveryDate">
            <el-input v-model="dataForm.taskName" placeholder="合计数量" style="width: 260px;" readonly="true" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="订单量" prop="taskPlannedNum">
            <el-input-number v-model="dataForm.taskPlannedNum" placeholder="订单量" :min="1" style="width: 260px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="加工量" prop="taskProductionNum">
            <el-input-number v-model="dataForm.taskProductionNum" placeholder="加工量" :min="1" style="width: 260px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="优先级" prop="taskPriority">
            <el-select
              v-model="dataForm.taskPriority"
              placeholder="请选择"
              filterable
              width="500"
              style="width: 260px;"
              @change="((val)=>{taskPriorityChange(val, index)})"
            >
              <el-option v-for="item in taskPriorityList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="计划开始时间" prop="taskScheduledStartTime">
            <el-date-picker v-model="dataForm.taskScheduledStartTime" type="date" placeholder="选择日期" style="width: 260px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="计划结束时间" prop="taskScheduledEndTime">
            <el-date-picker v-model="dataForm.taskScheduledEndTime" type="date" placeholder="选择日期" style="width: 260px;" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="交付日期" prop="taskDeliveryDate">
            <el-date-picker v-model="dataForm.taskDeliveryDate" type="date" placeholder="选择日期" style="width: 260px;" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      materialList: [],
      taskPriorityList: [],
      processingMethodList: [],
      workshopList: [],
      titleText: '计划添加',
      workType: 1,
      props: {
        label: 'mateName',
        isLeaf: 'leaf'
      },
      dataForm: {
        taskId: null,
        taskName: null,
        taskCode: null,
        mateId: null,
        mateName: null,
        mateCode: null,
        taskScheduledStartTime: null,
        taskScheduledEndTime: null,
        taskDeliveryDate: null,
        taskPriority: null,
        taskPriorityName: null,
        taskPlannedNum: null,
        taskProductionNum: null,
        taskWorkshopId: null,
        taskWorkshopName: null,
        taskProcessingMethodCode: null,
        taskProcessingMethodName: null
      }
    }
  },
  methods: {
    init() {
      // this.dataForm.userId = id || 0
      this.visible = true
      // this.initMaterialList()
      this.initPriorityList()
      this.initProcessingMethodList()
      this.initWorkshopList()
    },
    loadNode(node, resolve) {
      if (node.level == 0) {
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/relaton/selectBomTreeByParam'),
          method: 'get'
        }).then(({
          data
        }) => {
          if (data) {
            this.materialList = data
            for (let i = 0; i < this.materialList.length; i++) {
              if (this.materialList[i].leaf == 0) {
                this.materialList[i].leaf = true
              } else {
                this.materialList[i].leaf = false
              }
            }
            return resolve(this.materialList)
          }
        })
        // [{ name: 'region' }]);
      } else {
        debugger
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/relaton/selectBomTreeByParam'),
          method: 'get',
          params: {
            pid: node.data.mateId
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.materialList = data
            for (let i = 0; i < this.materialList.length; i++) {
              if (this.materialList[i].leaf == 0) {
                this.materialList[i].leaf = true
              } else {
                this.materialList[i].leaf = false
              }
            }
            return resolve(this.materialList)
          }
        })
      }
    },
    handleCheckChange(data, node, event) {
      // let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      this.dataForm.mateName = data.mateName
      this.dataForm.mateId = data.mateId
      this.dataForm.mateCode = data.mateCode
    },
    // 初始化物料类型可选项
    initPriorityList() {
      this.$http({
        url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
        method: 'get',
        params: {
          dictCode: 'priority'
        }
      }).then(({
        data
      }) => {
        if (data) {
          this.taskPriorityList = data
        }
      })
    },
    taskPriorityChange(val) {
      debugger
      let obj = {}
      obj = this.taskPriorityList.find((item) => {
        return item.dictCode == val
      })
      this.dataForm.taskPriorityName = obj.dictName
    },
    // 初始化物料类型可选项
    initProcessingMethodList() {
      this.$http({
        url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
        method: 'get',
        params: {
          dictCode: 'processingMethod'
        }
      }).then(({
        data
      }) => {
        if (data) {
          this.processingMethodList = data
        }
      })
    },
    processingMethodChange(val) {
      debugger
      let obj = {}
      obj = this.processingMethodList.find((item) => {
        return item.dictCode == val
      })
      this.dataForm.taskProcessingMethodName = obj.dictName
    },
    // 初始化物料类型可选项
    initWorkshopList() {
      this.$http({
        url: this.$http.adornSystemUrl('/sys/v1/organization/selectAllOrganization'),
        method: 'get'
      }).then(({
        data
      }) => {
        if (data) {
          this.workshopList = data
        }
      })
    },
    taskWorkshopChange(val) {
      debugger
      let obj = {}
      obj = this.workshopList.find((item) => {
        return item.orgId == val
      })
      this.dataForm.taskWorkshopName = obj.orgName
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          if (this.workType == 1) {
            this.$http({
              url: this.$http.adornPlanUrl('/plan/v1/plan/insertTask'),
              method: 'post',
              data: this.$http.adornData({
                taskName: this.dataForm.taskName,
                taskCode: this.dataForm.taskCode,
                mateId: this.dataForm.mateId,
                mateName: this.dataForm.mateName,
                mateCode: this.dataForm.mateCode,
                taskScheduledStartTime: this.dataForm.taskScheduledStartTime,
                taskScheduledEndTime: this.dataForm.taskScheduledEndTime,
                taskDeliveryDate: this.dataForm.taskDeliveryDate,
                taskPriority: this.dataForm.taskPriority,
                taskPriorityName: this.dataForm.taskPriorityName,
                taskPlannedNum: this.dataForm.taskPlannedNum,
                taskProductionNum: this.dataForm.taskProductionNum,
                taskWorkshopId: this.dataForm.taskWorkshopId,
                taskWorkshopName: this.dataForm.taskWorkshopName,
                taskProcessingMethodCode: this.dataForm.taskProcessingMethodCode,
                taskProcessingMethodName: this.dataForm.taskProcessingMethodName
              })
            }).then(({
              data
            }) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          } else {
            this.$http({
              url: this.$http.adornPlanUrl('/plan/v1/task/updateTaskStatusById'),
              method: 'put',
              data: this.$http.adornData({
                taskId: this.dataForm.taskId,
                taskName: this.dataForm.taskName,
                taskCode: this.dataForm.taskCode,
                mateId: this.dataForm.mateId,
                mateName: this.dataForm.mateName,
                mateCode: this.dataForm.mateCode,
                taskScheduledStartTime: this.dataForm.taskScheduledStartTime,
                taskScheduledEndTime: this.dataForm.taskScheduledEndTime,
                taskDeliveryDate: this.dataForm.taskDeliveryDate,
                taskPriority: this.dataForm.taskPriority,
                taskPriorityName: this.dataForm.taskPriorityName,
                taskPlannedNum: this.dataForm.taskPlannedNum,
                taskProductionNum: this.dataForm.taskProductionNum,
                taskWorkshopId: this.dataForm.taskWorkshopId,
                taskWorkshopName: this.dataForm.taskWorkshopName,
                taskProcessingMethodCode: this.dataForm.taskProcessingMethodCode,
                taskProcessingMethodName: this.dataForm.taskProcessingMethodName
              })
            }).then(({
              data
            }) => {
              this.$message({
                message: '操作成功',
                type: 'success',
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            })
          }
        }
      })
    }
  }
}
</script>
