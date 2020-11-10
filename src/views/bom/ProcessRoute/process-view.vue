<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" :lock-scroll="false"
    :append-to-body="true" width="80%">
    <el-form size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="工序号" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.code" v-show="scope.row.show" size="small" placeholder="工序号" style="width: 100%;"></el-input>
          <el-link v-show="!scope.row.show" type="primary" @click="openProcess(scope.row)">{{scope.row.code}}</el-link>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="工序名称" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.name" v-show="scope.row.show" size="small" placeholder="工序名称" style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column size="small" header-align="center" align="center" label="顺序号" width="100">
        <template slot-scope="scope">
          <el-input v-model="scope.row.sequence" v-show="scope.row.show" size="small" placeholder="顺序号" style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.sequence}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="实际准备时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.actualPrepareTime" v-show="scope.row.show" size="small" placeholder="实际准备时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.actualPrepareTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="实际加工时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.actualMakeTime" v-show="scope.row.show" size="small" placeholder="实际加工时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.actualMakeTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="实际结束时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.actualEndTime" v-show="scope.row.show" size="small" placeholder="实际结束时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.actualEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="定额准备时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.normPrepareTime" v-show="scope.row.show" size="small" placeholder="定额准备时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.normPrepareTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="定额加工时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.normMakeTime" v-show="scope.row.show" size="small" placeholder="定额加工时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.normMakeTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="定额结束时间" width="120">
        <template slot-scope="scope">
          <el-input v-model="scope.row.normEndTime" v-show="scope.row.show" size="small" placeholder="定额结束时间"
            style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.normEndTime}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="是否重要工序" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.key" size="small" v-show="scope.row.show" placeholder="请选择"
            style="width: 100%;">
            <el-option v-for="item in procImportantStutasList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
            </el-option>
          </el-select>
          <el-tag v-show="!scope.row.show" v-if="scope.row.key == 2" size="small" type="danger">否</el-tag>
          <el-tag v-show="!scope.row.show" v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="时间单位" width="120">
        <template slot-scope="scope">
          <el-select v-model="scope.row.timeUnit" size="small" v-show="scope.row.show" placeholder="请选择" filterable
            style="width: 100%;">
            <el-option v-for="item in timeUnitList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.timeUnitName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="工序类型" width="140">
        <template slot-scope="scope">
          <el-select v-model="scope.row.productType" size="small" v-show="scope.row.show" placeholder="请选择"
            filterable style="width: 100%;">
            <el-option v-for="item in processTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.productTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="加工内容" width="200">
        <template slot-scope="scope">
          <el-input type="textarea" rows="1" v-model="scope.row.note" v-show="scope.row.show" size="small"
            placeholder="备注" style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.note}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" type="primary" @click="editHandle(scope.row)" circle></el-button>
          <el-button size="mini" icon="el-icon-check" type="success" @click="submitFormHandle(scope.row)" circle></el-button>
          <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row, scope.$index)"
            circle></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  import { savaProcess, updateProcess, deleteProcess, findProcessList } from '@/api/bom/process'
  import { findDictionaryByCode } from '@/api/system/dict'
  export default {
    data() {
      return {
        visible: false,
        dataListLoading: false,
        timeUnitList: [],
        procImportantStutasList: [{
            dictCode: 1,
            dictName: '是'
          },
          {
            dictCode: 2,
            dictName: '否'
          }
        ],
        processTypeList: [],
        dataList: [],
        provId: null,
        titleText: '设置工序'
      }
    },
    methods: {
      init(id) {
        //this.dataForm.userId = id || 0
        this.visible = true
        debugger
        this.provId = id
        this.getDataList(id)
        this.initTimeUnitList()
        this.initProcessTypeList()
      },
      getDataList(id) {
        this.dataListLoading = true
        findProcessList('', id, '').then(response => {
          this.dataListLoading = false
          if (response) {
            let resultList = []
            for (let i in response.data) {
              response.data[i].show = false
              resultList.push(response.data[i])
            }
            this.dataList = resultList
          }
        })
      },
      // 初始化物料类型可选项
      initTimeUnitList() {
        findDictionaryByCode('BOM.PROCESS.TIMEUNIT.').then(response => {
          this.timeUnitList = response.data
        })
      },
      // 初始化物料类型可选项
      initProcessTypeList() {
        findDictionaryByCode('BOM.PROCESS.PRODUCTTYPE.').then(response => {
          this.processTypeList = response.data
        })
      },
      openProcess(row) {
        this.visible = false
        this.$router.push({
        	name: 'Process',
        	params : {
        		id : row.id
        	}
        })
      },
      addHandle() {
        let addRow = {}
        addRow.show = true
        this.dataList.push(addRow)
      },
      editHandle(row) {
        row.show = true
      },
      // 表单提交
      submitFormHandle(row) {
        row.show = false;
        let obj = {};
        obj = this.timeUnitList.find((item) => {
          return item.dictCode === row.timeUnit;
        });
        row.timeUnitName = obj.dictName

        obj = this.processTypeList.find((item) => {
          return item.dictCode === row.productType;
        });
        row.productTypeName = obj.dictName
        if (row.id == null) {
          row.provId = this.provId
          debugger;
          savaProcess(row).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.provId)
              }
            })
          })
        } else {
          updateProcess(row).then(response => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.provId)
              }
            })
          })
        }

      },
      deleteHandle(row, rowIndex) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.id != null) {
            deleteProcess(row.id).then(response => {
              this.$message({
                message: '操作成功',
                type: 'success',
                onClose: () => {
                  this.getDataList(this.provId)
                }
              })
            })
          } else {
            this.dataList.splice(rowIndex, 1)
          }
        }).catch(() => {})
      }
    }
  }
</script>
