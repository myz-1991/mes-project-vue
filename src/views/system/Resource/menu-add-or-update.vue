<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
			<el-form-item label="类型" prop="menuType">
				<el-radio-group v-model="dataForm.menuType">
					<el-radio v-for="(type, index) in typeList" :label="index" :key="index">{{ type }}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item :label="typeList[dataForm.menuType] + '名称'" prop="menuName">
				<el-input v-model="dataForm.menuName" :placeholder="typeList[dataForm.menuType] + '名称'"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.menuType === 1" label="菜单路由" prop="menuUrl">
				<el-input v-model="dataForm.menuUrl" placeholder="菜单路由"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.menuType !== 2" label="排序号" prop="menuSequence">
				<el-input-number v-model="dataForm.menuSequence" controls-position="right" :min="0" label="排序号"></el-input-number>
			</el-form-item>
			<el-form-item v-if="dataForm.menuType !== 2" label="菜单图标" prop="menuIcon">
				<el-row>
					<el-col :span="24">
						<el-popover ref="iconListPopover" placement="bottom-start" trigger="click" popper-class="mod-menu__icon-popover">
							<div class="mod-menu__icon-inner">
								<div class="mod-menu__icon-list">
									<el-button v-for="(item, index) in svgIcons" :key="index" @click="iconActiveHandle(item)" :class="{ 'is-active': item === dataForm.menuIcon }">
										<svg-icon :icon-class="item" class-name="disabled" />
									</el-button>
								</div>
							</div>
						</el-popover>
						<el-input v-model="dataForm.menuIcon" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input"></el-input>
					</el-col>
				</el-row>
			</el-form-item>
		</el-form>
		<span slot="footer" class="dialog-footer">
			<el-button @click="visible = false" size="small" >取消</el-button>
			<el-button type="primary" size="small" @click="dataFormSubmit()">确定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	import { treeDataTranslate } from '@/utils'
  import { saveMenu, getMenuDetail, updateMenu } from '@/api/system/menu'
	import svgIcons from '@/views/icons/svg-icons'
	export default {
		data() {
			return {
        svgIcons,
				visible: false,
				titleText: '资源增加',
				workType : 1,
        typeList: ['目录', '菜单', '按钮'],
				dataForm: {
					menuId: '',
					menuName: '',
					menuType: 1,
					menuPid: 0,
					menuUrl: '',
					menuSequence: 1,
					menuIcon: ''
				},
				menuList: [],
				menuListTreeProps: {
					label: 'name',
					children: 'children'
				}
			}
		},
		// created() {
		// 	this.svgIcons = svgIcons
		// },
		methods: {
			init(workType, id) {
				this.workType = workType
        this.visible = true
				if (workType == 1) {
          this.dataForm.menuId = ''
          this.dataForm.menuName = ''
          this.dataForm.menuType = 1
          this.dataForm.menuUrl = ''
          this.dataForm.menuSequence = 1
          this.dataForm.menuIcon = ''
					this.dataForm.menuPid = id
				} else {
          this.titleText = '资源修改'
          getMenuDetail(id).then(response => {
            this.dataForm = response.data
          })
        }
			},
			// 图标选中
			iconActiveHandle(iconName) {
				this.dataForm.menuIcon = iconName
			},
      generateIconCode(symbol) {
        return `<svg-icon icon-class="${symbol}" />`
      },
      generateElementIconCode(symbol) {
        return `<i class="el-icon-${symbol}" />`
      },
      handleClipboard(text, event) {
        clipboard(text, event)
      },
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
              saveMenu(this.dataForm).then(response => {
                this.$message({
                	message: '保存成功',
                	type: 'success',
                	onClose: () => {
                		this.visible = false
                		this.$emit('refreshDataList')
                	}
                })
              });
						} else {
              updateMenu(this.dataForm).then(response => {
                this.$message({
                	message: '修改成功',
                	type: 'success',
                	onClose: () => {
                		this.visible = false
                		this.$emit('refreshDataList')
                	}
                })
              })
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.mod-menu {

		.menu-list__input,
		.icon-list__input {
			>.el-input__inner {
				cursor: pointer;
			}
		}

		&__icon-popover {
			width: 458px;
			overflow: hidden;
		}

		&__icon-inner {
			width: 478px;
			max-height: 258px;
			overflow-x: hidden;
			overflow-y: auto;
		}

		&__icon-list {
			width: 458px;
			padding: 0;
			margin: -8px 0 0 -8px;

			>.el-button {
				padding: 8px;
				margin: 8px 0 0 8px;

				>span {
					display: inline-block;
					vertical-align: middle;
					width: 18px;
					height: 18px;
					font-size: 18px;
				}
			}
		}

		.icon-list__tips {
			font-size: 18px;
			text-align: center;
			color: #e6a23c;
			cursor: pointer;
		}
	}
</style>
