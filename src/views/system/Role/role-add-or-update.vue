<template>
  <el-dialog :title="角色增加" :close-on-click-modal="false" :visible.sync="visible">
    <el-form :model="dataForm" size="small" :rules="dataRule" ref="dataForm" label-width="80px">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="dataForm.roleName" placeholder="角色名称"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="roleNote">
        <el-input v-model="dataForm.roleNote" placeholder="备注"></el-input>
      </el-form-item>
     <!-- <el-form-item size="mini" label="授权">
        <el-tree
          :data="menuList"
          :props="menuListTreeProps"
          node-key="menuId"
          ref="menuListTree"
          :default-expand-all="true"
          show-checkbox>
        </el-tree>
      </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
    	<el-button type="danger" size="small" icon="el-icon-delete" @click="visible = false" round>取消</el-button>
    	<el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
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
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          roleName: '',
          roleNote: ''
        },
        dataRule: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
      }
    },
    methods: {
		init (id) {
			this.visible = true
			this.dataForm.roleName = ''
			this.dataForm.roleNote = ''
		},
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornSystemUrl('/sys/v1/role/insertRole'),
              method: 'post',
              data: this.$http.adornData({
                'roleName': this.dataForm.roleName,
                'roleNote': this.dataForm.roleNote
              })
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
        })
      }
    }
  }
</script>
