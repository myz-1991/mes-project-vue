<template>
	<div class="app-container">
		<el-form :model="dataForm" inline>
			<el-row>
				<el-col :span="3">
					<el-form-item>
						<el-select v-model="selectStorage" placeholder="请选择库房" @change="storageChange">
							<el-option label="成品库" value="1"></el-option>
							<el-option label="工具库" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-table :data="tableData" height="700" style="width: 100%;margin-bottom: 0px" border>
			<el-table-column prop="code" align="center" label="物料编码">
			</el-table-column>
			<el-table-column prop="code" align="center" label="物料名称">
			</el-table-column>
			<el-table-column prop="code" align="center" label="规格型号">
			</el-table-column>
			<el-table-column prop="code" align="center" label="物料图号">
			</el-table-column>
			<el-table-column prop="code" align="center" label="存放位置">
			</el-table-column>
			<el-table-column prop="code" align="center" label="数量">
			</el-table-column>
		</el-table>
		<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
		 :page-sizes="[30, 60, 90, 120]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
		</el-pagination>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dataForm: {
					selectStorage: '',
					searchText: ''
				},
				visible: false,
				buttonFlag: 1,
				tableData: [{
					code: 'RK00001',
					name: '入库',
					specifications: '张三',
					designnumber: '2020-11-21'
				}, {
					code: 'CK00001',
					name: '出库',
					specifications: '张三',
					designnumber: '2020-11-21'
				}, {
					code: 'RK00002',
					name: '入库',
					specifications: '张三',
					designnumber: '2020-11-21'
				}],
				pageIndex: 1,
				pageSize: 20,
				totalPage: 0,
				multipleSelection: [],
				resultData: [],
				searchInput: {
					tableDataName: "", //搜索框绑定值
				},
				filterTableDataEnd: [],
				resetData: [], //用于搜索重置
				filterBeforeData: [] //用于存放搜索操作前数据。
			}
		},

		methods: {
			storageChange(newValue) {
				this.buttonFlag = newValue
			},
			realTime() {
				// console.log("已执行实时搜索功能");
				//每次手动将数据置空,因为会出现多次点击搜索情况
				this.filterTableDataEnd = [];
				//这里是为了阻止搜索框删除完最后一个值时再检索，数据会重复显示问题
				if (this.searchInput.tableDataName == "") {
					this.tableData = this.resetData;
					return;
				}
				this.tableKey.forEach((v, i) => {
					this.resetData.forEach((value, index) => {
						if (value && value[v.value]) {
							if (value[v.value].indexOf(this.searchInput.tableDataName) >= 0) {
								this.filterTableDataEnd.push(value)
							}
						}
					});
				});

				this.tableData = this.filterTableDataEnd;
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
			/**
			 * 跟据当前索引位置删除数据
			 * 同时把该条删除的数据添加到左边待选table中
			 */
			handleDelete(index, row, resultData) {
				resultData.splice(index, 1); //右边删除数据
				this.filterBeforeData.push(row);
				this.resetData = this.filterBeforeData;
				//根据删除后得到的数据再进行一次搜索展示
				this.realTime();
				this.$emit('dispatchData', this.resultData);
			},
			handleSelectionChange(val) {
				this.multipleSelection = val;
			},
			selectItems: function() {
				//等同下一行代码---数组合并,频繁使用用concat会造成内存浪费
				this.resultData.push.apply(this.resultData, this.multipleSelection);
				//把获取的数据发送到父组件
				this.$emit('dispatchData', this.resultData);
				//在返回push数据后剩余的待选列表所有数据赋值到resetData中，然后再在待选列表中显示检索删除被剩余的数据
				this.filterBeforeData = this.overlap(this.filterBeforeData, this.resultData);
				this.resetData = this.filterBeforeData;
				//删除左边被选中的数据,返回待选列表中被剩余的数据
				this.tableData = this.overlap(this.tableData, this.resultData);

			},
			/**
			 * 删除选中item
			 * @param arr 数据
			 * @param arr2
			 * @returns {Array}
			 */
			overlap: function(arr, arr2) {
				var arr3 = new Array();
				var index = 0,
					i = 0,
					j = 0;
				for (i = 0; i < arr.length; i++) {
					var has = false;
					for (j = 0; j < arr2.length; j++) {
						if (arr[i] == arr2[j]) {
							has = true;
							break;
						}
					}
					if (!has) {
						arr3[index++] = arr[i];
					}
				}
				return arr3;
			},
		}
	}
</script>

<style>
</style>
