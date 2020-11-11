<template>
  <div class="app-container">
    <el-container>
      <el-aside width="300px" style="padding-top: 20px;">
        <el-row style="float: left;">
          <el-form :model="searchFormData" size="small">
            <el-row>
              <el-col :span="24">
                <el-form-item label="">
                  <el-col :span="16">
                    <el-input
                      v-model="searchFormData.searchTextValue"
                      type="text"
                      placeholder="部門编码或名称查询"
                      @keyup.enter.native="orgTableSearch()"
                    />
                  </el-col>
                  <el-col :offset="1" :span="3">
                    <el-button type="primary" icon="el-icon-search" round @click="orgTableSearch()">查询</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-row>
        <el-row>
          <el-table
            ref="orgTable"
            :data="orgDataList"
            size="small"
            style="width: 100%"
            row-key="id"
            border
            lazy
            :load="load"
            :tree-props="{children: 'children', hasChildren: 'leaf'}"
            @row-click="orgRowClick"
          >
            <el-table-column prop="name" label="部门名称" width="250" />
            <!-- <el-table-column prop="orgCode" align="center" label="部门编码">
            </el-table-column> -->
          </el-table>
        </el-row>
      </el-aside>
      <el-container>
        <el-main style="padding-top: -250px;">
          <el-form :model="dataForm" @keyup.enter.native="getDataList()">
            <el-row>
              <el-col :span="8">
                <el-form-item label="">
                  <el-button type="primary" size="small" icon="el-icon-refresh" round @click="getDataList()">刷新</el-button>
                  <el-button type="primary" size="small" icon="el-icon-plus" round @click="addOrUpdateHandle(1, 0)">增加</el-button>
                </el-form-item>
              </el-col>
              <el-col :offset="8" :span="8">
                <el-form-item label="">
                  <el-col :span="18">
                    <el-input
                      v-model="dataForm.key"
                      type="text"
                      size="small"
                      placeholder="设备编码或名称查询"
                      @keyup.enter.native="getDataList()"
                    />
                  </el-col>
                  <el-col :offset="1" :span="3">
                    <el-button type="primary" size="small" icon="el-icon-search" round @click="getDataList()">查询</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table v-loading="dataListLoading" :data="dataList" border size="small" style="width: 100%">
            <el-table-column type="selection" align="center" width="50" />
            <el-table-column prop="code" header-align="center" align="center" label="设备编码" />
            <el-table-column prop="name" header-align="center" align="center" label="设备名称" />
            <el-table-column prop="fixedCode" header-align="center" align="center" label="固定资产编码" />
            <el-table-column prop="model" header-align="center" align="center" label="规格型号" />
            <el-table-column prop="typeName" header-align="center" align="center" label="设备类型" />
            <el-table-column prop="note" header-align="center" align="center" label="设备描述" />
            <el-table-column prop="status" header-align="center" align="center" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 3" size="small" type="warning">维修</el-tag>
              	<el-tag v-if="scope.row.status === 2" size="small" type="danger">停机</el-tag>
              	<el-tag v-else size="small">运行</el-tag>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  icon="el-icon-edit"
                  type="primary"
                  circle
                  @click="addOrUpdateHandle('2', scope.row.mateId)"
                />
                <el-button
                  size="small"
                  icon="el-icon-delete"
                  type="danger"
                  circle
                  @click="deleteHandle(scope.row.mateId)"
                />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
          />
        </el-main>
      </el-container>
    </el-container>

    <equipmentAddOrUpdate v-if="addOrUpdateVisible" ref="equipmentAddOrUpdate" @refreshDataList="getDataList" />
  </div>
</template>

<script>
  import { findOrganizationTree } from '@/api/system/organization'
  import { deleteEquipment, pageEquipmentByParam} from '@/api/base/equipment'
import equipmentAddOrUpdate from './equipment-add-or-update'
export default {
  components: {
    equipmentAddOrUpdate
  },
  data() {
    return {
      orgDataList: [],
      searchFormData: {
        	searchTextValue: ''
      },
      dataForm: {
        key: ''
      },
      addOrUpdateVisible: false,
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      selectionDataList: []
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
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.initOrgTree()
      this.initEquipment('')
    },
    initOrgTree() {
      findOrganizationTree().then(response => {
        this.orgDataList = response.data
        for (let i = 0; i < this.orgDataList.length; i++) {
          if (this.orgDataList[i].leaf > 0) {
            this.orgDataList[i].leaf = true
          } else {
            this.orgDataList[i].leaf = false
          }
        }
      })
    },
    initEquipment(id) {
      pageEquipmentByParam(this.dataForm.key, id, this.pageSize, this.pageIndex).then(response => {
        if (response) {
          this.dataList = response.data.records
          this.totalPage = response.data.total / this.pageSize
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    orgRowClick(row) {
      this.initEquipment(row.id)
    },
    load(tree, treeNode, resolve) {
      findOrganizationTree(tree.id, '').then(response => {
        const data = response.data
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
        this.$refs.equipmentAddOrUpdate.init(workType, id)
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
