<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-form :model="dataForm" size="small">
            <el-row>
              <el-col :span="8">
                <el-form-item label="">
                  <el-button type="primary" size="small" icon="el-icon-refresh" round @click="refreshUserTable()">刷新</el-button>
                  <el-button type="primary" size="small" icon="el-icon-plus" round @click="addOrUpdateHandle(1, 0)">增加</el-button>
                </el-form-item>
              </el-col>
              <el-col :offset="8" :span="8">
                <el-form-item label="">
                  <el-col :span="18">
                    <el-input v-model="dataForm.searchTextValue" placeholder="坩锅号或炉批号查询" type="text"
                      @keyup.enter.native="refreshUserTable()" />
                  </el-col>
                  <el-col :offset="1" :span="3">
                    <el-button type="primary" icon="el-icon-search" round @click="refreshUserTable()">查询</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-table ref="userList" v-loading="dataListLoading" :data="dataList" size="small" border style="width: 100%;">
            <el-table-column type="selection" align="center" width="50" />
            <el-table-column prop="code" align="center" label="坩锅号" />
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status == 1" type="success">空闲</el-tag>
                <el-tag v-else-if="scope.row.status == 2" type="warning">占用</el-tag>
                <el-tag v-else type="danger">出库</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="jobName" align="center" label="炉批号">
            </el-table-column>
            <el-table-column prop="checkResult" align="center" label="检验结果">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.checkResult == 2" type="danger">NG</el-tag>
                <el-tag v-else-if="scope.row.checkResult == 1" type="success">OK</el-tag>
                <span v-else></span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-delete" type="danger" round @click="deleteCrucible(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container">
          <el-pagination :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="sizes, prev, pager, next, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" title="坩锅添加">
      <el-form ref="dataForm" :model="userDataForm" size="small" label-width="80px">
        <el-form-item label="坩锅号:" prop="code">
          <el-input v-model="userDataForm.code" placeholder="坩锅号" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import {
    pageCrucible,
    saveCrucible,
    deleteCrucible
  } from '@/api/smelt/crucible'
  export default {
    data() {
      return {
        dataForm: {
          searchTextValue: ''
        },
        dialogVisible: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        addOrUpdateVisible: false,
        userDataForm: {
          code: '',
          status: 1
        }
      }
    },
    mounted() {
      this.getDataList()
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
        return Y + M + D + h + m + s
      },
      refreshUserTable() {
        this.getDataList()
      },
      // 获取数据列表
      getDataList() {
        this.dataListLoading = true
        pageCrucible(this.dataForm.searchTextValue, this.pageIndex, this.pageSize).then(response => {
          this.dataListLoading = false
          const {
            data
          } = response
          this.dataList = data.records
          this.totalPage = data.total
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
      addOrUpdateHandle(workType, row) {
        this.dialogVisible = true
        this.userDataForm.code = ''
        this.userDataForm.status = 1
      },
      // 删除
      dataFormSubmit() {
        saveCrucible(this.userDataForm).then(res => {
          this.dialogVisible = false
          this.$message({
            message: '操作成功',
            type: 'success',
            onClose: () => {
              this.refreshUserTable()
            }
          })
        })
      },
      deleteCrucible(id) {
        this.$confirm('是否删除?', '提示', {
        	confirmButtonText: '确定',
        	cancelButtonText: '取消',
        	type: 'warning'
        }).then(() => {
          deleteCrucible(id).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              onClose: () => {
                this.refreshUserTable()
              }
            })
          })
        })
      }
    }
  }
</script>

<style>
</style>
