<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="名称" prop="name">
            <el-input v-model="dataForm.name" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="班次" prop="frequency">
            <el-select v-model="dataForm.frequency" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in frequencyList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="开始周期" prop="workStartPeriod">
            <el-select v-model="dataForm.workStartPeriod" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in weekList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束周期" prop="workEndPeriod">
            <el-select v-model="dataForm.workEndPeriod" placeholder="请选择" style="width: 100%;">
              <el-option v-for="item in weekList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dataForm.frequency >= 1">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="firstStartTime">
            <el-time-select placeholder="开始时间" style="width: 100%;" v-model="dataForm.firstStartTime" :picker-options="{
				        start: '00:00',
				        step: '01:00',
				        end: '23:00'
				      }">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="firstEndTime">
            <el-time-select placeholder="结束时间" style="width: 100%;" v-model="dataForm.firstEndTime" :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '23:00'
				    }">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dataForm.frequency >= 2">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="secondStartTime">
            <el-time-select placeholder="开始时间" style="width: 100%;" v-model="dataForm.secondStartTime" :picker-options="{
				        start: '00:00',
				        step: '01:00',
				        end: '23:00'
				      }">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="secondEndTime">
            <el-time-select placeholder="结束时间" style="width: 100%;" v-model="dataForm.secondEndTime" :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '23:00'
				    }">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row v-if="dataForm.frequency == 3">
        <el-col :span="12">
          <el-form-item label="开始时间" prop="thirdStartTime">
            <el-time-select placeholder="开始时间" style="width: 100%;" v-model="dataForm.thirdStartTime" :picker-options="{
				        start: '00:00',
				        step: '01:00',
				        end: '23:00'
				      }">
            </el-time-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间" prop="thirdEndTime">
            <el-time-select placeholder="结束时间" style="width: 100%;" v-model="dataForm.thirdEndTime" :picker-options="{
				      start: '00:00',
				      step: '00:30',
				      end: '23:00'
				    }">
            </el-time-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="danger" size="small" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
      <el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import {
    saveFrequency,
    updateFrequency,
    findFrequency
  } from '@/api/calendar/frequency'
  export default {
    data() {
      return {
        visible: false,
        frequencyList: [{
          dictCode: 1,
          dictName: '一班'
        }, {
          dictCode: 2,
          dictName: '两班'
        }, {
          dictCode: 3,
          dictName: '三班'
        }],
        weekList: [{
            dictCode: 1,
            dictName: '星期一'
          },
          {
            dictCode: 2,
            dictName: '星期二'
          },
          {
            dictCode: 3,
            dictName: '星期三'
          },
          {
            dictCode: 4,
            dictName: '星期四'
          },
          {
            dictCode: 5,
            dictName: '星期五'
          },
          {
            dictCode: 6,
            dictName: '星期六'
          },
          {
            dictCode: 7,
            dictName: '星期日'
          }
        ],
        titleText: '班次模型添加',
        workType: 1,
        dataForm: {
          id: '',
          name: '',
          workStartPeriod: '',
          workEndPeriod: '',
          frequency: '',
          firstStartTime: '',
          firstEndTime: '',
          secondStartTime: '',
          secondEndTime: '',
          thirdStartTime: '',
          thirdEndTime: ''
        }
      }
    },
    methods: {
      init(workType, id) {
        //this.dataForm.userId = id || 0
        this.workType = workType

        if (workType == 1) {
          this.visible = true
          this.dataForm.id = ''
          this.dataForm.name = ''
          this.dataForm.workStartPeriod = ''
          this.dataForm.workEndPeriod = ''
          this.dataForm.frequency = ''
          this.dataForm.firstStartTime = ''
          this.dataForm.firstEndTime = ''
          this.dataForm.secondStartTime = ''
          this.dataForm.secondEndTime = ''
          this.dataForm.thirdStartTime = ''
          this.dataForm.thirdEndTime = ''
        } else {
          this.titleText = '班次模型修改'
          findFrequency(id).then(response => {
            this.visible = true
            this.dataForm = response.data
          })
        }
      },
      // 表单提交
      dataFormSubmit() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            if (this.workType == 1) {
              saveFrequency(this.dataForm).then(response => {
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
              updateFrequency(this.dataForm).then(response => {
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
