<template>
  <div class="app-container">
    <el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
          </el-form-item>
        </el-col>
        <el-col :offset="8" :span="8">
          <el-form-item label="">
            <el-col :span="18">
              <el-input type="text" v-model="dataForm.key" placeholder="工艺路线编码或名称查询" @keyup.enter.native="getDataList()"></el-input>
            </el-col>
            <el-col :offset="1" :span="3">
              <el-button type="primary" icon="el-icon-search" @click="getDataList()" round>查询</el-button>
            </el-col>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="provName" header-align="center" align="center" label="工艺路线名称" width="100">
      </el-table-column>
      <el-table-column prop="provCode" header-align="center" align="center" label="工艺路线编码" width="100">
      </el-table-column>
      <el-table-column prop="procCode" header-align="center" align="center" label="工序号">
      </el-table-column>
      <el-table-column prop="procName" header-align="center" align="center" label="工序名称">
      </el-table-column>
      <el-table-column prop="procSequence" header-align="center" align="center" label="顺序号">
      </el-table-column>
      <el-table-column prop="procActualPreparetime" header-align="center" align="center" label="实际准备时间" width="100">
      </el-table-column>
      <el-table-column prop="procActualmakeTime" header-align="center" align="center" label="实际加工时间" width="100">
      </el-table-column>
      <el-table-column prop="procActualEndTime" header-align="center" align="center" label="实际结束时间" width="100">
      </el-table-column>
      <el-table-column prop="procQuotaPreparetime" header-align="center" align="center" label="定额准备时间" width="100">
      </el-table-column>
      <el-table-column prop="procQuotamaketime" header-align="center" align="center" label="定额加工时间" width="100">
      </el-table-column>
      <el-table-column prop="procQuotaendtime" header-align="center" align="center" label="定额结束时间" width="100">
      </el-table-column>
      <el-table-column prop="procImportantStutas" header-align="center" align="center" label="是否重要工序" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.procImportantStutas === 2" size="small" type="danger">否</el-tag>
          <el-tag v-else size="small">是</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="procTimeUnitName" header-align="center" align="center" label="时间单位">
      </el-table-column>
      <el-table-column prop="procProductionTypeName" header-align="center" align="center" label="工序类型">
      </el-table-column>
      <el-table-column prop="procWorkcontent" header-align="center" align="center" label="加工内容">
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-dropdown size="small">
            <el-button type="primary" size="small">操作
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="materielsDetailedListOpen(scope.row)">物料清单</el-dropdown-item>
              <el-dropdown-item @click.native="productionRelationOpen(scope.row)">生产单元</el-dropdown-item>
              <el-dropdown-item @click.native="checkRequirementAddOpen(scope.row)">检验要求</el-dropdown-item>
              <el-dropdown-item v-show="isShow" @click.native="materielsDetailedListOpen(scope.row)">工装要求</el-dropdown-item>
              <el-dropdown-item v-show="isShow" @click.native="materielsDetailedListOpen(scope.row)">设备要求</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <processAddOrUpdate v-if="addOrUpdateVisible" ref="processAddOrUpdate" @refreshDataList="getDataList"></processAddOrUpdate>
    <materielsDetailedList v-if="materielsDetailedListVisible" ref="materielsDetailedList" @refreshDataList="getDataList"></materielsDetailedList>
    <productionRelation v-if="productionRelationVisible" ref="productionRelation" @refreshDataList="getDataList"></productionRelation>
    <checkRequirementAdd v-if="checkRequirementAddVisible" ref="checkRequirementAdd" @refreshDataList="getDataList"></checkRequirementAdd>
  </div>
</template>

<script>
  import processAddOrUpdate from './process-add-or-update'
  import materielsDetailedList from './materiels-detailed-list'
  import productionRelation from './production-relation'
  import checkRequirementAdd from './checkRequirement-add'
  export default {
    data() {
      return {
        dataForm: {
          key: ''
        },
        materielsDetailedListVisible: false,
        addOrUpdateVisible: false,
        isShow: false,
        productionRelationVisible: false,
        checkRequirementAddVisible : false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        selectionDataList: []
      }
    },
    components: {
      processAddOrUpdate,
      materielsDetailedList,
      productionRelation,
      checkRequirementAdd
    },
    created() {
      //this.getDataList()
    },
    methods: {
      dateFormat(dataValue) {
        var date = new Date(dataValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        return Y + M + D;
      },
      dataTimeFormat(dataValue) {
        var date = new Date(dataValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/process/selectProcessForPage'),
          method: 'get',
          params: {
            'startIndex': (this.pageIndex - 1) * this.pageSize,
            'pageSize': this.pageSize,
            'param': this.dataForm.key
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.dataList = data.data
            this.totalPage = data.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
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
      // 新增 / 修改
      addOrUpdateHandle(workType, id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.processAddOrUpdate.init(workType, id)
        })
      },
      // 物料清单页面打开
      materielsDetailedListOpen(row) {
        this.materielsDetailedListVisible = true
        this.$nextTick(() => {
          this.$refs.materielsDetailedList.init(row.procId)
        })
      },
      productionRelationOpen(row) {
        this.productionRelationVisible = true
        this.$nextTick(() => {
          this.$refs.productionRelation.init(row.procId)
        })
      },
      checkRequirementAddOpen(row) {
        this.checkRequirementAddVisible = true
        this.$nextTick(() => {
          this.$refs.checkRequirementAdd.init(row.procId)
        })
      },
      // materielsDetailedListOpen(row) {
      //   this.materielsDetailedListVisible = true
      //   this.$nextTick(() => {
      //     this.$refs.materielsDetailedList.init(row.provId)
      //   })
      // },
      processViewOpen(workType, id) {
        this.processViewVisible = true
        this.$nextTick(() => {
          this.$refs.processView.init(workType, id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/material/deleteMaterialById'),
            method: 'DELETE',
            params: {
              mateId: id
            }
          }).then(({
            data
          }) => {
            if (data) {
              this.$message({
                message: '删除成功',
                type: 'success',
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>

<style>
</style>
