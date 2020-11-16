<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <el-form :model="stockForm">
          <el-row>
            <el-col :span="12">
              <el-form-item label="铝锭库存:" label-width="120">
                <el-col :span="20">
                  <el-input v-model="stockForm.aluminumIngot" style="width: 90%;" disabled></el-input><span> KG</span>
                </el-col>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item  label="废料库存:" label-width="120">
                <el-col :span="20">
                  <el-input v-model="stockForm.waste" style="width: 90%;" disabled></el-input><span> KG</span>
                </el-col>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-header>
      <el-main>
        <el-form style="margin-bottom: 5px;">
          <el-button type="primary" size="small" icon="el-icon-plus" round @click="addOrUpdateHandle()">入库</el-button>
        </el-form>
        <el-table border :data="recordList">
          <el-table-column label="操作类型" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.type == 2">出库</el-tag>
              <el-tag v-else>入库</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="材料类型" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.aluminumIngot > 0 && scope.row.waste > 0">铝锭/废料</el-tag>
              <el-tag v-else-if="scope.row.aluminumIngot > 0">铝锭</el-tag>
              <el-tag v-else>废料</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="出/入库数量" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.aluminumIngot > 0 && scope.row.waste > 0">{{scope.row.aluminumIngot}}/{{scope.row.waste}} KG</span>
              <span v-else-if="scope.row.aluminumIngot > 0">{{scope.row.aluminumIngot}} KG</span>
              <span v-else>{{scope.row.waste}} KG</span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="入库时间" align="center">
            <template slot-scope="scope">
              <span>{{scope.row.createTime}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="入库人" align="center"></el-table-column> -->
        </el-table>
        <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
          :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="sizes, prev, pager, next, jumper">
        </el-pagination>
      </el-main>
    </el-container>

    <el-dialog title="材料入库" size="small" :close-on-click-modal="false" :visible.sync="orderVisible" width="35%">
      <el-form ref="dataForm" :model="dataForm" size="small" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="材料类型">
              <el-select v-model="dataForm.mateType" placeholder="请选择材料类型" style="width: 100%;">
                <el-option label="铝锭" value="1">
                </el-option>
                <el-option label="废料" value="2">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="入库重量">
              <el-input-number v-show="dataForm.mateType == 1" v-model="dataForm.aluminumIngot" precision="2" placeholder="入库重量" style="width: 100%;" />
              <el-input-number v-show="dataForm.mateType == 2" v-model="dataForm.waste" precision="2" placeholder="入库重量" style="width: 100%;"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="orderVisible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round @click="dataFormSubmit()">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { saveAccessRecord, pageAccessRecord, findStock } from '@/api/smelt/record'
  export default {
    data() {
      return {
        orderVisible: false,
        pageIndex: 1,
        pageSize: 20,
        totalPage: 0,
        recordList : [],
        searchFormData: {
          searchTextValue: ''
        },
        stockForm : {
          aluminumIngot : '',
          waste : ''
        },
        dataForm : {
          id : '',
          type : 1,
          mateType : '1',
          aluminumIngot : '',
          waste : ''
        }
      }
    },
    mounted() {
      this.taskDataInit()
    },
    methods: {
      dateFormat(dataValue) {
        var date = new Date(dataValue) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-'
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
        return Y + M + D
      },
      refreshorgTable() {
        this.taskDataInit()
      },
      taskDataInit() {
        pageAccessRecord('', '', this.pageSize, this.pageIndex).then(response => {
          if (response) {
            this.recordList = response.data.records
            this.totalPage = response.data.total
          } else {
            this.recordList = []
            this.totalPage = 0
          }
        })
        findStock().then(response => {
          this.stockForm.aluminumIngot = response.data.aluminumIngot
          this.stockForm.waste = response.data.waste
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
      dataFormSubmit() {
        saveAccessRecord(this.dataForm).then(response => {
          this.$message({
            message: '保存成功',
            type: 'success',
            onClose: () => {
              this.orderVisible = false
              this.taskDataInit()
            }
          })
        })
      },
      // 新增 / 修改
      addOrUpdateHandle() {
        this.orderVisible = true
          this.dataForm.id = ''
          this.dataForm.type = 1
          this.dataForm.mateType = '1'
          this.dataForm.aluminumIngot = 0
          this.dataForm.waste = 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .upload-demo {
    display: flex;
  }

  .el-list-enter-active,
  .el-list-leave-active {
    transition: none;
  }

  .el-list-enter,
  .el-list-leave-active {
    opacity: 0;
  }

  .el-upload-list {
    height: 40px;
  }
</style>
