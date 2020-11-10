<template>
	<el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="40%">
		<el-form :model="dataForm" size="small" ref="dataForm" label-width="80px">
			<el-row>
				<el-col :span="10">
					<el-form-item label="选择工艺" prop="prvnId">
						<el-select v-model="dataForm.prvnId" placeholder="选择工艺" style="width: 100%;" filterable>
							<el-option v-for="item in versionList" :key="item.id" :label="item.name" :value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="10">
					<el-form-item label="是否可用" prop="isUsed">
						<el-radio-group v-model="dataForm.isUsed">
							<el-radio :label="1">是</el-radio>
							<el-radio :label="2">否</el-radio>
						</el-radio-group>
					</el-form-item>
				</el-col>
				<el-col :span="4">
					<el-button type="primary" size="small" icon="el-icon-check" @click="dataFormSubmit()" round>确定</el-button>
				</el-col>
			</el-row>
		</el-form>


		<el-table ref="processsTable" size="small" :data="relationList" border v-loading="dataListLoading" style="width: 100%">
			<el-table-column type="index" align="center" width="50">
			</el-table-column>
			<el-table-column prop="NAME" header-align="center" align="center" label="工艺名称">
				<template slot-scope="scope">
					<el-link type="primary" @click="openProcess(scope.row)">{{scope.row.NAME}}</el-link>
				</template>
			</el-table-column>
			<el-table-column prop="CODE" header-align="center" align="center" label="工艺编码">
			</el-table-column>
			<el-table-column prop="ISUSED" header-align="center" align="center" label="状态">
				<template slot-scope="scope">
					<el-tag v-if="scope.row.ISUSED === 2" size="small" type="danger">禁用</el-tag>
					<el-tag v-else size="small">正常</el-tag>
				</template>
			</el-table-column>
		</el-table>
	</el-dialog>
</template>

<script>
	import {
		findMaterielList
	} from '@/api/base/materiel'
	import {
		findRelationById,
		saveRelation,
		updateRelation
	} from '@/api/bom/relation'
	import {
		findDictionaryByCode
	} from '@/api/system/dict'

	import {
		saveProcessVersionRelation,
		findProcessVersionListByMateId
	} from '@/api/bom/version'

	import {
		findProcessVersionList
	} from '@/api/bom/version'
	export default {
		data() {
			return {
				visible: false,
				titleText: '工艺分配',
				workType: 1,
				dataListLoading: false,
				versionList: [],
				relationList: [],
				dataForm: {
					mateId: '',
					prvnId: '',
					isUsed: 1
				},
			}
		},
		methods: {
			init(id) {
				debugger
				this.visible = true
				this.dataForm.mateId = id
				this.dataForm.prvnId = ''
				this.dataForm.isUsed = 1
				this.initVersionList()
				this.refreshDataList(id)
			},
			refreshDataList(id) {
				findProcessVersionListByMateId(id).then(response => {
					debugger
					this.relationList = response.data
				})
			},
			initVersionList() {
				findProcessVersionList('').then(response => {
					if (response) {
						this.versionList = response.data
					}
				})
			},
			openProcess(row) {
				this.visible = false
				this.$router.push({
					name: 'ProcessRoute',
					params : {
						id : row.ID
					}
				})
			},
			// 表单提交
			dataFormSubmit() {
				this.$refs['dataForm'].validate((valid) => {
					if (valid) {
						saveProcessVersionRelation(this.dataForm).then(response => {
							this.$message({
								message: '操作成功',
								type: 'success',
								onClose: () => {
									this.refreshDataList(this.dataForm.mateId)
								}
							})
						})
					}
				})
			}
		}
	}
</script>

<style>
</style>
