<template>
  <div class="app-container">
    <el-row>
    	<el-form :model="searchFormData" size="small">
    		<el-row>
    			<el-col :span="8">
    				<el-form-item label="">
    					<el-button type="primary" icon="el-icon-refresh" @click="refreshResourceTable()" round>刷新</el-button>
    					<el-button type="primary" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
    				</el-form-item>
    			</el-col>
    			<el-col :offset="8" :span="8">
    				<el-form-item label="">
    					<el-col :span="18">
    						<el-input type="text" v-model="searchFormData.searchTextValue" @keyup.enter.native="refreshResourceTable()"></el-input>
    					</el-col>
    					<el-col :offset="1" :span="3">
    						<el-button type="primary" icon="el-icon-search" @click="refreshResourceTable()" round>查询</el-button>
    					</el-col>
    				</el-form-item>
    			</el-col>
    		</el-row>
    	</el-form>
    </el-row>
    <el-row>
    	<el-table ref="resourceTable" size="small" :data="resourceDataList" style="width: 100%" row-key="resId" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'leaf'}">
    		<el-table-column type="selection" width="55">
    		</el-table-column>
    		<el-table-column prop="resName" label="资源名称" width="180">
    		</el-table-column>
    		<el-table-column prop="resIcon" align="center" label="显示图标">
				<template slot-scope="scope">
				  <icon-svg :name="scope.row.resIcon || ''"></icon-svg>
				</template>
    		</el-table-column>
    		<el-table-column prop="resType" align="center" label="资源类型">
				<template slot-scope="scope">
					<span v-if="scope.row.resType === 0">目录</span>
					<span v-if="scope.row.resType === 1">菜单</span>
					<span v-if="scope.row.resType === 2">按钮</span>
				</template>
    		</el-table-column>
			<el-table-column prop="resSequence" align="center" label="排序">
			</el-table-column>
			<el-table-column prop="resUrl" align="center" label="菜单URL">
			</el-table-column>
    		<el-table-column prop="resUpdatatime" align="center" label="更新时间">
    			<template slot-scope="scope">
    				<span>{{dateFormat(scope.row.resUpdatatime)}}</span>
    			</template>
    		</el-table-column>
    		<el-table-column label="操作" align="center" width="200">
    			<template slot-scope="scope">
    				<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle(2, scope.row.resId)" round>修改</el-button>
    				<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" round>删除</el-button>
    			</template>
    		</el-table-column>
    	</el-table>
    </el-row>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="resourceAddOrUpdate" @refreshDataList="refreshResourceTable"></add-or-update>
  </div>
</template>

<script>
  import AddOrUpdate from './menu-add-or-update'
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        searchFormData: {
			searchTextValue : ''
		},
        resourceDataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
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
	  refreshResourceTable() {
		this.getDataList();
	  },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
		this.resourceDataList = []
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/resource/selectResourceTreeByParam'),
          method: 'get',
          params: {
			 pid : '',
			 param : this.searchFormData.searchTextValue
		  }
        }).then(({data}) => {
			debugger
			this.resourceDataList = data
			for (let i = 0; i < this.resourceDataList.length; i++) {
				if (this.resourceDataList[i].leaf > 0) {
					this.resourceDataList[i].leaf = true
				} else {
					this.resourceDataList[i].leaf = false
				}
			}
			this.dataListLoading = false
        })
      },
	  load(tree, treeNode, resolve) {
	  	debugger
	  	this.$http({
	  		url: this.$http.adornSystemUrl('/sys/v1/resource/selectResourceTreeByParam'),
	  		method: 'get',
	  		params: {
	  			pid: tree.resId,
	  			param: this.searchFormData.searchTextValue
	  		}
	  	}).then(({
	  		data
	  	}) => {
	  		if (data) {
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
	  		}
	  	})
	  },
      // 新增 / 修改
     addOrUpdateHandle(workType, id) {
     	this.addOrUpdateVisible = true
     	if (workType == 1) {
     		const _selectData = this.$refs.resourceTable.selection
     		if (_selectData.length > 1) {
     			this.$message('请选择在一个菜单下添加！！！')
     			return false
     		} else if (_selectData.length == 1) {
     			id = _selectData[0].resId
     		}
     	}
     	this.$nextTick(() => {
     		this.$refs.resourceAddOrUpdate.init(workType, id)
     	})
     },
      // 删除
      deleteHandle (row) {
		if (row.leaf) {
			this.$message('该菜单下存在子菜单，不能进行删除！！！')
			return false
		}
        this.$confirm('是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornSystemUrl('/sys/v1/resource/deleteResourceById'),
            method: 'delete',
            params: {
				resId : row.resId
			}
          }).then(({data}) => {
            if (data) {
              this.$message({
                message: '操作成功',
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
