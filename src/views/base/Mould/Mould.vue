<template>
	<div class="app-container">
		<el-form :model="dataForm" @keyup.enter.native="getDataList()">
			<el-row>
				<el-col :span="8">
					<el-form-item label="">
						<el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
						<el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
						<el-button type="primary" icon="el-icon-edit-outline" size="small" round @click="visible = true">导入</el-button>
					</el-form-item>
				</el-col>
				<el-col :offset="8" :span="8">
					<el-form-item label="">
						<el-col :span="18">
							<el-input type="text" size="small" v-model="dataForm.key" placeholder="模具编码或名称查询" @keyup.enter.native="getDataList()"></el-input>
						</el-col>
						<el-col :offset="1" :span="3">
							<el-button type="primary" size="small" icon="el-icon-search" @click="getDataList()" round>查询</el-button>
						</el-col>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="dataList" border v-loading="dataListLoading" size="small" style="width: 100%">
			<el-table-column type="selection" align="center" width="50">
			</el-table-column>
			<el-table-column prop="code" header-align="center" align="center" label="模具编号">
			</el-table-column>
			<el-table-column prop="name" header-align="center" align="center" label="模具名称">
			</el-table-column>
			<el-table-column prop="cavities" header-align="center" align="center" label="模穴数">
			</el-table-column>
			<el-table-column prop="suitProduct" header-align="center" align="center" label="适用产品"></el-table-column>
			<el-table-column prop="mouldNo" header-align="center" align="center" label="模具图号"></el-table-column>
			<el-table-column prop="mouldLength" header-align="center" align="center" label="模具长度"></el-table-column>
			<el-table-column prop="mouldWidth" header-align="center" align="center" label="模具宽度"></el-table-column>
			<el-table-column prop="mouldLand" header-align="center" align="center" label="模具厚度"></el-table-column>
			<el-table-column prop="startDate" header-align="center" align="center" width="120" label="开始使用日期"></el-table-column>
			<el-table-column prop="waterGap" header-align="center" align="center" label="水口重量"></el-table-column>
			<el-table-column prop="ratedlife" header-align="center" align="center" label="设计寿命"></el-table-column>
			<el-table-column prop="compositeModule" header-align="center" align="center" label="合模数"></el-table-column>
			<el-table-column prop="supplierName" header-align="center" align="center" label="供应商"></el-table-column>
			<el-table-column prop="weight" header-align="center" align="center" label="重量(千克)"></el-table-column>
			<el-table-column prop="customersName" header-align="center" align="center" label="产品客户"></el-table-column>
			<el-table-column prop="model" header-align="center" align="center" label="规格型号">
			</el-table-column>
			<el-table-column prop="note" header-align="center" align="center" label="备注">
			</el-table-column>
			<el-table-column align="center" label="操作" width="100" fixed="right">
				<template slot-scope="scope">
					<el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.id)" circle></el-button>
					<el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row)" circle></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
		 :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="sizes, prev, pager, next, jumper">
		</el-pagination>
		<mouldAddOrUpdate v-if="addOrUpdateVisible" ref="mouldAddOrUpdate" @refreshDataList="getDataList"></mouldAddOrUpdate>

		<el-dialog title="模具导入" size="small" :close-on-click-modal="false" :visible.sync="visible" width="75%">
			<el-upload ref="upload" class="upload-demo" :file-list="fileList" :on-change="handleChange" action="" :before-upload="beforeUpload"
			 :show-file-list="true" :auto-upload="false">
				<el-button slot="trigger" type="primary">选取文件</el-button>
			</el-upload>
			<el-button type="primary" style="margin-top: 5px;" @click="importOrganizations">提交</el-button>
		</el-dialog>
	</div>
</template>

<script>
	import {
		findMouldPage,
		updateMould,
		importMoulds
	} from '@/api/base/mould'
	import mouldAddOrUpdate from './mould-add-or-update'
	export default {
		data() {
			return {
				dataForm: {
					key: ''
				},
				addOrUpdateVisible: false,
				dataList: [],
				pageIndex: 1,
				pageSize: 10,
				totalPage: 0,
				dataListLoading: false,
				selectionDataList: [],
				visible: false,
				fileList: [],
			}
		},
		components: {
			mouldAddOrUpdate
		},
		mounted() {
			this.getDataList()
		},
		methods: {
			dateFormat(dataValue) {
				var date = new Date(dataValue); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
				var Y = date.getFullYear() + '-';
				var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
				var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
				var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
				var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
				return Y + M + D + h + m + s;
			},
			// 获取数据列表
			getDataList() {
				this.dataListLoading = true
				findMouldPage(this.dataForm.key, this.pageSize, this.pageIndex).then(response => {
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
					this.$refs.mouldAddOrUpdate.init(workType, id)
				})
			},
			// 删除
			deleteHandle(row) {
				this.$confirm('是否删除?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					row.readIdentifying = 2
					updateMould(row).then(response => {
						this.$message({
							message: '删除成功',
							type: 'success',
							onClose: () => {
								this.getDataList()
							}
						})
					})
				}).catch(() => {})
			},
			handleChange(file, fileList) {
				if (fileList.length > 0) {
					this.fileList = [fileList[fileList.length - 1]] // 这一步，是 展示最后一次选择的csv文件
				}
			},
			beforeUpload(file) {
				debugger
				let fd = new FormData();
				var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
				const extension = testmsg === 'xls'
				if (!extension) {
					this.$message({
						message: '上传文件只能是 xls 格式!',
						type: 'warning',
						duration: 1000
					});
					return
				}
				fd.append('file', file);
				importMoulds(fd).then(response => {
					if (response.data == '导入成功！') {
						this.$message({
							message: response.data,
							type: 'success',
							duration: 1000,
							onClose: () => {
								this.visible = false
								this.getDataList()
							}
						});
					} else {
						this.$message({
							message: response.data,
							type: 'warning',
							duration: 1000
						});
					}
				})
			},
			importOrganizations() {
				this.$refs.upload.submit();
			}
		}
	}
</script>
