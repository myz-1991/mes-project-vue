<template>
  <div class="app-container">
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-form :model="dataForm" size="small">
            <el-row>
              <el-col :span="8">
                <el-form-item label="">
                  <el-button type="primary" icon="el-icon-refresh" round @click="refreshUserTable()">刷新</el-button>
                  <el-button type="primary" icon="el-icon-plus" round @click="addOrUpdateHandle(1, 0)">增加</el-button>
                </el-form-item>
              </el-col>
              <el-col :offset="8" :span="8">
                <el-form-item label="">
                  <el-col :span="18">
                    <el-input v-model="dataForm.searchTextValue" type="text" @keyup.enter.native="refreshUserTable()" />
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
          <el-table v-loading="dataListLoading" :data="dataList" size="small" border style="width: 100%;">
            <el-table-column type="selection" align="center" width="50" />
            <el-table-column prop="name" align="center" label="姓名" />
            <el-table-column prop="code" align="center" label="工号" />
            <el-table-column prop="sex" align="center" label="性别">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.sex === 2" size="small" type="danger">女</el-tag>
                <el-tag v-else size="small">男</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="orgName" align="center" label="所属组织" />
            <el-table-column prop="account" align="center" label="用户名" />
            <el-table-column align="center" label="角色">
              <template slot-scope="scope">
                <template v-for="item in scope.row.roleNameList">
                  <el-tag size="small" style="margin-top: 3px;">{{ item }}</el-tag>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="email" align="center" label="邮箱" />
            <el-table-column prop="telephone" align="center" label="手机号" />
            <el-table-column prop="status" align="center" label="状态">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.status === 2" size="small" type="danger">禁用</el-tag>
                <el-tag v-else size="small">正常</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="createTime" align="center" label="创建时间">
              <template slot-scope="scope">
                <span>{{ dateFormat(scope.row.createTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="updateTime" align="center" label="更新时间">
              <template slot-scope="scope">
                <span>{{ dateFormat(scope.row.updateTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="200">
              <template slot-scope="scope">
                <el-button size="mini" icon="el-icon-edit" type="primary" round @click="addOrUpdateHandle(2, scope.row)">修改</el-button>
                <el-button size="mini" icon="el-icon-delete" type="danger" round @click="deleteHandle(scope.row.userId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container">
          <el-pagination
            :current-page="pageIndex"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="sizeChangeHandle"
            @current-change="currentChangeHandle"
          />
        </div>
      </el-col>
    </el-row>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'用户修改':'用户添加'">
      <el-form ref="dataForm" :model="userDataForm" size="small" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="姓名:" prop="name">
              <el-input v-model="userDataForm.name" placeholder="姓名" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="工号:" prop="code">
              <el-input v-model="userDataForm.code" placeholder="工号" size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="用户名:" prop="userName">
              <el-input v-model="userDataForm.userName" placeholder="登录帐号" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:" prop="passWord">
              <el-input v-model="userDataForm.passWord" type="password" placeholder="密码" size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="邮箱:" prop="email">
              <el-input v-model="userDataForm.email" placeholder="邮箱" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号:" prop="telephone">
              <el-input v-model="userDataForm.telephone" placeholder="手机号" size="small" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="12">
            <el-form-item label="所属组织:" prop="orgName">
              <!-- v-model="userDataForm.orgId" -->
              <el-select-tree
                :value="userDataForm.orgName"
                size="small"
                style="width: 100%;"
                :select-opt="option.select"
                :tree-opt="option.tree"
                @node-click="clickNode"
              >
                <template v-slot:tree="{node}">
                  <span :title="node.data.orgName">{{ node.data.orgName }}</span>
                </template>
              </el-select-tree>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色分配:" prop="roleSelect">
              <el-select
                v-model="userDataForm.roleNameSelect"
                placeholder="请选择"
                style="width: 100%;"
                size="small"
                multiple
                @change="((val)=>{roleChange(val, index)})"
              >
                <el-option v-for="item in roleList" :key="item.roleId" :label="item.roleName" :value="item.roleId" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="性别:" size="small" prop="gender">
              <el-radio-group v-model="userDataForm.gender" size="small">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态:" size="small" prop="stuts">
              <el-radio-group v-model="userDataForm.stuts" size="small">
                <el-radio :label="2">禁用</el-radio>
                <el-radio :label="1">正常</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { saveUser, getUserInfoPage } from '@/api/system/user'
import ElSelectTree from '@/components/select-tree/index'
export default {
  components: {
    ElSelectTree
  },
  data() {
    return {
      dataForm: {
        searchTextValue: ''
      },
      dialogVisible: false,
      dialogType: 'add',
      dataList: [],
      pageIndex: 1,
      pageSize: 20,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      roleList: [],
      option: {
        select: {
          filterable: true,
          clearable: true
        },
        tree: {
          highlightCurrent: true,
          data: [],
          expandOnClickNode: true,
          nodeKey: 'orgId',
          props: {},
          indent: 10,
          valueKey: 'orgId',
          displayKey: 'orgName',
          showCheckbox: false
        }
      },
      userDataForm: {
        userId: 0,
        name: '',
        code: '',
        userName: '',
        passWord: '',
        email: '',
        telephone: '',
        gender: 1,
        stuts: 1,
        orgId: '',
        orgName: '',
        roleSelect: [],
        roleNameSelect: []
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
      getUserInfoPage(this.dataForm.searchTextValue, this.pageIndex, this.pageSize).then(response => {
        this.dataListLoading = false
        debugger
        const { data } = response
        this.dataList = data.records
        this.totalPage = data.total
      })
      // this.$http({
      // 	url: this.$http.adornSystemUrl('/sys/v1/user/selectUserByParam'),
      // 	method: 'get',
      // 	params: {
      // 		'startIndex': (this.pageIndex - 1) * this.pageSize,
      // 		'pageSize': this.pageSize,
      // 		'param': this.dataForm.searchTextValue
      // 	}
      // }).then(({
      // data
      // }) => {
      // 	if (data) {
      // 		let userData = []
      // 		for (let i in data.data) {
      // 			let roleNameList = []
      // 			let roleIdList = []
      // 			if (data.data[i].roleName != null) {
      // 				if (data.data[i].roleName.indexOf(',') > 0) {
      // 					roleNameList = data.data[i].roleName.split(',')
      // 					roleIdList = data.data[i].roleId.split(',')
      // 				} else {
      // 					roleNameList.push(data.data[i].roleName)
      // 					roleIdList.push(data.data[i].roleId)
      // 				}
      // 				data.data[i].roleNameList = roleNameList
      // 				data.data[i].roleIdList = roleIdList
      // 			}
      // 			userData.push(data.data[i])
      // 		}
      // 		this.dataList = userData
      // 		this.totalPage = data.totalCount
      // 	} else {
      // 		this.dataList = []
      // 		this.totalPage = 0
      // 	}
      // 	this.dataListLoading = false
      // })
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
      this.dialogType = 'add'
      this.dialogVisible = true
      // this.$nextTick(() => {
      // 	this.$refs.userAddOrUpdate.init(workType, row)
      // })
    },
    // 删除
    deleteHandle(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/user/deleteUserById'),
          method: 'DELETE',
          params: {
            userId: id
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.$message({
              message: '删除成功',
              type: 'success',
              onClose: () => {
                this.refreshUserTable()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {})
    },
    dataFormSubmit() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        alert(123123)
      } else {
        saveUser(this.userDataForm).then(res => {
          debugger
          this.dialogVisible = false
        })
      }
    }
  }
}
</script>

<style>
</style>
