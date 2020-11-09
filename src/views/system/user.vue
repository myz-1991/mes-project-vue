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
                  <el-button type="success" size="small" icon="el-icon-s-custom" round @click="allocationRole()">角色分配</el-button>
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
          <el-table ref="userList" v-loading="dataListLoading" :data="dataList" size="small" border style="width: 100%;">
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
                <el-button size="mini" icon="el-icon-edit" type="primary" round @click="addOrUpdateHandle(2, scope.row)"></el-button>
                <el-button size="mini" icon="el-icon-video-play" type="success" round @click="updateUserStatus(scope.row, 1)"></el-button>
                <el-button size="mini" icon="el-icon-video-pause" type="danger" round @click="updateUserStatus(scope.row, 2)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
        <div class="pagination-container">
          <el-pagination :current-page="pageIndex" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage"
            layout="total, sizes, prev, pager, next, jumper" @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
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
            <el-form-item label="用户名:" prop="account">
              <el-input v-model="userDataForm.account" placeholder="登录帐号" size="small" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="密码:" prop="password">
              <el-input v-model="userDataForm.password" type="password" placeholder="密码" size="small" />
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
              <el-select-tree :value="userDataForm.orgName" size="small" style="width: 100%;" :select-opt="option.select"
                :tree-opt="option.tree" @node-click="clickNode">
                <template v-slot:tree="{node}">
                  <span :title="node.data.name">{{ node.data.name }}</span>
                </template>
              </el-select-tree>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="性别:" size="small" prop="sex">
              <el-radio-group v-model="userDataForm.sex" size="small">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="12">
            <el-form-item label="角色分配:" prop="roleSelect">
              <el-select
                v-model="userDataForm.roleNameSelect"
                placeholder="请选择"
                style="width: 100%;"
                size="small"
                multiple
                @change="((val)=>{roleChange(val, index)})"
              >
                <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col> -->
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="状态:" size="small" prop="status">
              <el-radio-group v-model="userDataForm.status" size="small">
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

    <el-dialog :visible.sync="dialogRoleVisible" title="角色分配" width="30%">
      <el-table ref="roleTable" :data="roleList" size="small" tooltip-effect="dark" style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="name" label="角色名称">
        </el-table-column>
        <el-table-column prop="code" label="角色编码">
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="dialogRoleVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="roleSave()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    saveUser,
    getUserInfoPage,
    getUserDetail,
    updateUser,
    saveUserRoleRelation,
    findUserRoleRelation
  } from '@/api/system/user'
  import {
    getOrganizationTreeExpend
  } from '@/api/system/organization'
  import {
    getRoleList
  } from '@/api/system/role'
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
        dialogRoleVisible : false,
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
        selectUserId : '',
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
        userDataForm: {
          id: '',
          name: '',
          code: '',
          account: '',
          password: '',
          email: '',
          telephone: '',
          sex: 1,
          status: 1,
          orgId: '',
          orgName: ''
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
      clickNode(data, node, treeNode) {
        this.userDataForm.orgId = data.id
        this.userDataForm.orgName = data.name
      },
      updateUserStatus(row, type) {
        row.status = type
        updateUser(row).then(res => {
          this.dialogVisible = false
          this.$message({
            message: '操作成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              this.refreshUserTable()
            }
          })
        })
      },
      allocationRole() {
        this.roleList = []
        	const _selectData = this.$refs.userList.selection
        	if (_selectData.length != 1) {
        		this.$message('请选择一个用户！！！')
        		return false
        	} else if (_selectData.length == 1) {
        		this.selectUserId = _selectData[0].id
        	}
          this.dialogRoleVisible = true
          getRoleList('').then(response => {
            this.roleList = response.data
            findUserRoleRelation(this.selectUserId).then(respond => {
              let checkRole = respond.data
              for (let i = 0; i < this.roleList.length; i++) {
                for (let j = 0; j < checkRole.length; j++) {
                  if (this.roleList[i].id == checkRole[j].roleId) {
                    this.$refs.roleTable.toggleRowSelection(this.roleList[i]);
                  }
                }
              }
            })
          })
      },
      // 新增 / 修改
      addOrUpdateHandle(workType, row) {
        this.dialogType = 'add'
        this.dialogVisible = true
        getOrganizationTreeExpend().then(resp => {
          this.option.tree.data = resp.data
        })
        
        this.userDataForm.id = ''
        this.userDataForm.name = ''
        this.userDataForm.code = ''
        this.userDataForm.account = ''
        this.userDataForm.password = ''
        this.userDataForm.email = ''
        this.userDataForm.telephone = ''
        this.userDataForm.sex = 1
        this.userDataForm.status = 1
        this.userDataForm.orgId = ''
        this.userDataForm.orgName = ''
        if (workType == 2) {
          this.dialogType = 'edit'
          getUserDetail(row.id).then(response => {
            this.userDataForm = response.data

          })
        }
      },
      roleSave(){
        const _selectData = this.$refs.roleTable.selection
        const relations = new Array();
        if (_selectData.length < 1) {
        	this.$message('请选择一个用户！！！')
        	return false
        } else {
          for (let i = 0; i < _selectData.length; i++) {
            let id = _selectData[i].id
            let relation = {
              userId : this.selectUserId,
              roleId : id
            }
            relations.push(relation);
          }
          saveUserRoleRelation(relations).then(response => {
            this.dialogRoleVisible = false
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.refreshUserTable()
              }
            })
          })
        }
      },
      // 删除
      dataFormSubmit() {
        const isEdit = this.dialogType === 'edit'
        if (isEdit) {
          updateUser(this.userDataForm).then(res => {
            this.dialogVisible = false
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                this.refreshUserTable()
              }
            })
          })
        } else {
          saveUser(this.userDataForm).then(res => {
            this.dialogVisible = false
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.refreshUserTable()
              }
            })
          })
        }
      }
    }
  }
</script>

<style>
</style>
