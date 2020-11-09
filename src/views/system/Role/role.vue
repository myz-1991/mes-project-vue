<template>
  <div class="app-container">
		<el-row>
			<el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()">
				<el-row>
					<el-col :span="8">
						<el-form-item label="">
							<el-button type="primary" icon="el-icon-refresh" @click="refreshRoleTable()" round>刷新</el-button>
							<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle()" round>增加</el-button>
						</el-form-item>
					</el-col>
					<el-col :offset="8" :span="8">
						<el-form-item label="">
							<el-col :span="18">
								<el-input type="text" v-model="dataForm.roleName" placeholder="角色名称" @keyup.enter.native="refreshRoleTable()"></el-input>
							</el-col>
							<el-col :offset="1" :span="3">
								<el-button type="primary" icon="el-icon-search" @click="refreshRoleTable()" round>查询</el-button>
							</el-col>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>
		</el-row>
		<el-row>
			<el-table :data="dataList" size="small" ref="roleTable" border v-loading="dataListLoading" style="width: 100%;">
				<el-table-column type="selection" header-align="center" align="center" width="50">
				</el-table-column>
        <el-table-column prop="code" header-align="center" align="center" label="角色编码">
        </el-table-column>
				<el-table-column prop="name" header-align="center" align="center" label="角色名称">
				</el-table-column>
				<el-table-column prop="note" header-align="center" align="center" label="备注">
				</el-table-column>
        <el-table-column prop="createTime" header-align="center" align="center" label="创建时间">
        	<template slot-scope="scope">
        		<span>{{dateFormat(scope.row.createTime)}}</span>
        	</template>
        </el-table-column>
				<el-table-column prop="updateTime" header-align="center" align="center" label="更新时间">
					<template slot-scope="scope">
						<span>{{dateFormat(scope.row.updateTime)}}</span>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作" width="200">
					<template slot-scope="scope">
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteHandle(scope.row.id)" round>删除</el-button>
						<el-button size="mini" icon="el-icon-s-check" type="success" @click="roleRelationHandle(scope.row.id)" round>授权</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
			  :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
			</el-pagination>
		</el-row>

    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
	<roleRelation v-if="roleRelationVisible" ref="roleRelation" @refreshDataList="getDataList"></roleRelation>
  </div>
</template>

<script>
  import {
    deleteRoleById,
    findRolePageByParam
  } from '@/api/system/role'
  import AddOrUpdate from './role-add-or-update'
  import roleRelation from './relation-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          roleName: ''
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        roleRelationVisible : false
      }
    },
    components: {
      AddOrUpdate,
      roleRelation
    },
    mounted () {
      this.getDataList()
    },
    methods: {
		// 时间类型格式化
		dateFormat(dataValue) {
			var date = new Date(dataValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear() + '-';
			var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
			var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
			var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
			var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
			var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
			return Y+M+D+h+m+s;
		},
		// 列表刷新
		refreshRoleTable() {
			this.getDataList()
		},
		// 获取数据列表
		getDataList () {
			this.dataListLoading = true
      findRolePageByParam(this.dataForm.roleName, this.pageSize, this.pageIndex).then(response => {
        if (response) {
        	this.dataList = response.data.records
        	this.totalPage = response.data.total
        } else {
        	this.dataList = []
        	this.totalPage = 0
        }
        this.dataListLoading = false
      })
		},
		// 每页数
		sizeChangeHandle (val) {
			this.pageSize = val
			this.pageIndex = 1
			this.getDataList()
		},
		// 当前页
		currentChangeHandle (val) {
			this.pageIndex = val
			this.getDataList()
		},
		// 新增 / 修改
		addOrUpdateHandle () {
			this.addOrUpdateVisible = true
			this.$nextTick(() => {
				this.$refs.addOrUpdate.init()
			})
		},
		// 授權
		roleRelationHandle(id) {
			this.roleRelationVisible = true
			this.$nextTick(() => {
				this.$refs.roleRelation.init(id)
			})
		},
		// 删除
		deleteHandle (id) {
			this.$confirm('是否删除?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
        deleteRoleById(id).then(response => {
          this.$message({
          	message: '删除成功',
          	type: 'success',
          	onClose: () => {
          		this.refreshRoleTable()
          	}
          })
        })
			}).catch(() => {})
		}
    }
  }
</script>
