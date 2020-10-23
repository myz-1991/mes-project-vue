<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
		<el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
			<el-form-item label="类型" prop="resType">
				<el-radio-group v-model="dataForm.resType">
					<el-radio v-for="(type, index) in dataForm.typeList" :label="index" :key="index">{{ type }}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item :label="dataForm.typeList[dataForm.resType] + '名称'" prop="resName">
				<el-input v-model="dataForm.resName" :placeholder="dataForm.typeList[dataForm.resType] + '名称'"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.resType === 1" label="菜单路由" prop="resUrl">
				<el-input v-model="dataForm.resUrl" placeholder="菜单路由"></el-input>
			</el-form-item>
			<el-form-item v-if="dataForm.resType !== 2" label="排序号" prop="resSequence">
				<el-input-number v-model="dataForm.resSequence" controls-position="right" :min="0" label="排序号"></el-input-number>
			</el-form-item>
			<el-form-item v-if="dataForm.resType !== 2" label="菜单图标" prop="resIcon">
				<el-row>
					<el-col :span="24">
						<el-popover ref="iconListPopover" placement="bottom-start" trigger="click" popper-class="mod-menu__icon-popover">
							<div class="mod-menu__icon-inner">
								<div class="mod-menu__icon-list">
									<el-button v-for="(item, index) in iconList" :key="index" @click="iconActiveHandle(item)" :class="{ 'is-active': item === dataForm.resIcon }">
										<icon-svg :name="item"></icon-svg>
									</el-button>
								</div>
							</div>
						</el-popover>
						<el-input v-model="dataForm.resIcon" v-popover:iconListPopover :readonly="true" placeholder="菜单图标名称" class="icon-list__input"></el-input>
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
	import {
		treeDataTranslate
	} from '@/utils'
	import Icon from '@/icons'
	export default {
		data() {
			return {
				visible: false,
				titleText: '资源增加',
				workType : 1,
				dataForm: {
					resId: 0,
					resType: 1,
					typeList: ['目录', '菜单', '按钮'],
					resName: '',
					resPid: 0,
					resUrl: '',
					resSequence: 0,
					resIcon: '',
					iconList: []
				},
				menuList: [],
				menuListTreeProps: {
					label: 'name',
					children: 'children'
				}
			}
		},
		created() {
			this.iconList = Icon.getNameList()
		},
		methods: {
			init(workType, id) {
				this.workType = workType
				if (workType == 1) {
					this.visible = true
					this.dataForm.resPid = id
				} else {
					this.titleText='资源修改'
					this.$http({
						url: this.$http.adornSystemUrl('/sys/v1/resource/selectResourceById'),
						method: 'get',
						params: {
							resId: id
						}
					}).then(({
						data
					}) => {
						this.visible = true
						if (data) {
							this.dataForm.resId = data.resId
							this.dataForm.resType = data.resType
							this.dataForm.resName = data.resName
							this.dataForm.resPid = data.resPid
							this.dataForm.resUrl = data.resUrl
							this.dataForm.resSequence = data.resSequence
							this.dataForm.resIcon = data.resIcon
						}
					})
				}
			},
			// 图标选中
			iconActiveHandle(iconName) {
				this.dataForm.resIcon = iconName
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						if (this.workType == 1) {
							this.$http({
								url: this.$http.adornSystemUrl('/sys/v1/resource/insertResource'),
								method: 'post',
								data: this.$http.adornData({
									resType: this.dataForm.resType,
									resName: this.dataForm.resName,
									resPid: this.dataForm.resPid,
									resUrl: this.dataForm.resUrl,
									resSequence: this.dataForm.resSequence,
									resIcon: this.dataForm.resIcon,
								})
							}).then(({
								data
							}) => {
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
						} else {
							this.$http({
								url: this.$http.adornSystemUrl('/sys/v1/resource/updateResourceById'),
								method: 'put',
								data: this.$http.adornData({
									resId : this.dataForm.resId,
									resType: this.dataForm.resType,
									resName: this.dataForm.resName,
									resPid: this.dataForm.resPid,
									resUrl: this.dataForm.resUrl,
									resSequence: this.dataForm.resSequence,
									resIcon: this.dataForm.resIcon,
								})
							}).then(({
								data
							}) => {
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
