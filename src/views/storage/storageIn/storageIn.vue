<template>
	<div class="app-container">
		<el-form :model="dataForm" inline>
			<el-row>
				<el-col :span="6">
					<el-form-item label="选择库房">
						<el-select v-model="selectStorage" @change="storageChange">
							<el-option label="成品库" value="1"></el-option>
							<el-option label="工具库" value="2"></el-option>
						</el-select>
					</el-form-item>
				</el-col>
				<el-col :span="3" :offset="2">
					<el-form-item>
						<el-input v-model="searchText" icon="search" placeholder="按物料编码或名称查询" style="width: 100%;" @change="realTime"></el-input>
					</el-form-item>
				</el-col>
				<el-col :span="11" :offset="2">
					<el-form-item>
						<el-button v-if="buttonFlag == 1" size="mini" icon="el-icon-check" type="primary" @click="visible = true" round>入库</el-button>
						<el-button v-if="buttonFlag == 2" size="mini" icon="el-icon-check" type="primary" @click="visible = true" round>归还</el-button>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-row>
			<el-col :span="11">
				<el-table :data="tableData" height="750" border style="width: 100%;margin-bottom: 0px" @selection-change="handleSelectionChange">
					<el-table-column type="selection" width="40">
					</el-table-column>
					<el-table-column prop="code" align="center" label="物料编码">
					</el-table-column> 
					<el-table-column prop="name" align="center" label="物料名称">
					</el-table-column>
					<el-table-column prop="specifications" align="center" label="规格型号">
					</el-table-column>
					<el-table-column prop="designnumber" align="center" label="物料图号">
					</el-table-column>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
				 :page-sizes="[30, 60, 90, 120]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
				</el-pagination>
			</el-col>

			<el-col :span="2">
				<div style="margin-top: 250%;margin-left:25%;margin-right:25%">
					<el-button type="primary" @click="selectItems" icon="icon el-icon-d-arrow-right" round></el-button>
				</div>
			</el-col>

			<el-col :span="11">
				<el-table :data="resultData" height="750" style="width: 100%;margin-bottom: 0px" border>
					<el-table-column prop="code" align="center" label="物料编码">
					</el-table-column>
					<el-table-column prop="name" align="center" label="物料名称">
					</el-table-column>
					<el-table-column prop="specifications" align="center" label="规格型号">
					</el-table-column>
					<el-table-column prop="designnumber" align="center" label="物料图号">
					</el-table-column>
					<el-table-column prop="number" align="center" label="入库数量">
						<template slot-scope="scope">
							<el-input style="width: 100%;"></el-input>
						</template>
					</el-table-column>
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" type="danger" @click.native.prevent="handleDelete(scope.$index, scope.row,resultData)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
				 :page-sizes="[30, 60, 90, 120]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
				</el-pagination>
			</el-col>
		</el-row>
		<el-dialog title="入库/归还" :visible.sync="visible" width="30%">
			<el-form label-width="80px">
				<el-form-item label="入库单号">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="送料人">
					<el-input></el-input>
				</el-form-item>
				<el-form-item label="送料日期">
					<el-date-picker style="width: 100%;"></el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer" style="text-align:right;">
			  <el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
			  <el-button type="primary" size="small" icon="el-icon-check" round >确定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				dataForm : {
					selectStorage : '',
					searchText : ''
				},
				visible: false,
				buttonFlag : 1,
				tableData: [{
					code: '物料A',
					name: '物料A',
					specifications: '物料A',
					designnumber: '物料A'
				}, {
					code: '物料B',
					name: '物料B',
					specifications: '物料B',
					designnumber: '物料B'
				}, {
					code: '物料C',
					name: '物料C',
					specifications: '物料C',
					designnumber: '物料C'
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
		},
		created() {
			// this.tableData = this.receiveData;
			// this.resetData = this.tableData;
			// if(this.isCheckValue){
			//   this.resultData = this.isCheckValue;
			//   //数据初始化时把数据emit到父组件操作方法中
			//   this.$emit('dispatchData',this.resultData);
			// }
		},
		watch: {
			receiveData(val) {
				this.tableData = val;
				this.resetData = val;
				this.filterBeforeData = val;
			},
			isCheckValue(val) {
				this.resultData = val;
				this.$emit('dispatchData', this.resultData);
			}
		},
		computed: {

		}
	}
</script>

<style>
</style>
