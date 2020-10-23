<template>
  <el-dialog title="权限分配" :close-on-click-modal="false" :visible.sync="visible" width="30%">
    <el-form ref="dataForm" size="small" label-width="80px">
     <el-form-item size="mini" label="授权">
        <el-tree :data="menuList" :default-checked-keys="defaultChecked" :props="menuListTreeProps" node-key="resId" ref="menuListTree" :default-expand-all="true" :check-strictly="true" show-checkbox>
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    	<el-button type="danger" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
    	<el-button type="primary" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
        visible: false,
        menuList: [],
		roleId : null,
        menuListTreeProps: {
          label: 'resName',
          children: 'list'
        },
		defaultChecked : []
      }
    },
    methods: {
		init (id) {
			debugger
			this.menuList = []
			this.visible = true
			this.roleId = id
			this.$http({
			  url: this.$http.adornSystemUrl('/sys/v1/resource/selectRoleMenuList'),
			  method: 'get',
			  params : {
				  roleId : id
			  }
			}).then(({data}) => {
			  if (data) {
				  debugger
					this.menuList = data
					let checkedArray = this.defaultCheckedTree(data)
					this.defaultChecked = checkedArray
			  }
			})
		},
		// 递归查看已选择的节点信息
		defaultCheckedTree(data) {
			let checkArray = []
			for (let i = 0; i < data.length; i++) {
				if (data[i].checked > 0) {
					checkArray.push(data[i].resId)
				}
				if (data[i].leaf > 0) {
					let cArray = this.defaultCheckedTree(data[i].list)
					checkArray = checkArray.concat(cArray)
				}
			}
			return checkArray;
		},
      // 表单提交
      dataFormSubmit () {
		  debugger
		let _selection = this.$refs.menuListTree.getCheckedKeys()
		let relation = []
		for (let i = 0; i < _selection.length; i++) {
			let _model = {
				roleId : this.roleId,
				resId : _selection[i]
			}
			relation.push(_model)
		}
		this.$http({
		  url: this.$http.adornSystemUrl('/sys/v1/role/batchInsertRoleResourceRelation'),
		  method: 'post',
		  data : JSON.stringify(relation)
		}).then(({data}) => {
		  if (data) {
			this.$message({
			  message: '操作成功',
			  type: 'success',
			  onClose: () => {
				this.visible = false
				this.$emit('refreshDataList')
			  }
			})
		  } else {
			this.$message.error(data.msg)
		  }
		})
      }
    }
  }
</script>
