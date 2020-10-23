<template>
  <div class="app-container">
    <el-form :model="dataForm" @keyup.enter.native="getDataList()">
      <el-row>
        <el-col :span="8">
          <el-form-item label="">
            <el-button type="primary" size="small" icon="el-icon-refresh" @click="getDataList()" round>刷新</el-button>
            <el-button type="primary" size="small" icon="el-icon-plus" @click="addOrUpdateHandle(1, 0)" round>增加</el-button>
			<el-button type="primary" size="small" icon="el-icon-setting" @click="calendarSettingOpen" round>日历设置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table :data="dataList" border v-loading="dataListLoading" size="small" style="width: 100%">
      <el-table-column type="selection" align="center" width="50">
      </el-table-column>
      <el-table-column prop="mateCode" header-align="center" align="center" label="编码">
      </el-table-column>
      <el-table-column prop="mateName" header-align="center" align="center" label="名称">
      </el-table-column>
      <el-table-column prop="" header-align="center" align="center" label="开始日期">
      </el-table-column>
      <el-table-column prop="mateSpecifications" header-align="center" align="center" label="结束日期">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="班次数量">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="开始时间">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="结束时间">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="开始时间">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="结束时间">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="开始时间">
      </el-table-column>
      <el-table-column prop="mateNote" header-align="center" align="center" label="结束时间">
      </el-table-column>
      <el-table-column align="center" label="操作" width="100" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.mateId)"
            circle></el-button>
          <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.mateId)" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="sizeChangeHandle" @current-change="currentChangeHandle" :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" :total="totalPage" layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <frequencyAddOrUpdate v-if="addOrUpdateVisible" ref="frequencyAddOrUpdate" @refreshDataList="getDataList"></frequencyAddOrUpdate>
	<calendarSetting v-if="calendarSettingVisible" ref="calendarSetting" @refreshDataList="getDataList"></calendarSetting>
  </div>
</template>

<script>
  import frequencyAddOrUpdate from './frequency-add-or-update'
  import calendarSetting from './calendar-setting'
  export default {
    data() {
      return {
        dataForm: {
          key: ''
        },
        addOrUpdateVisible: false,
		calendarSettingVisible : false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        selectionDataList: []
      }
    },
    components: {
      frequencyAddOrUpdate,
	  calendarSetting
    },
    created() {
      // this.getDataList()
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
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/material/pagedQueryMaterialByParam'),
          method: 'get',
          params: {
            'startIndex': (this.pageIndex - 1) * this.pageSize,
            'pageSize': this.pageSize,
            'param': this.dataForm.key
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.dataList = data.data
            this.totalPage = data.totalCount
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
	  calendarSettingOpen() {
		  this.calendarSettingVisible = true
		  this.$nextTick(() => {
		    this.$refs.calendarSetting.init()
		  })
	  },
      // 新增 / 修改
      addOrUpdateHandle(workType, id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.frequencyAddOrUpdate.init(workType, id)
        })
      },
      // 删除
      deleteHandle(id) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/material/deleteMaterialById'),
            method: 'DELETE',
            params: {
              mateId: id
            }
          }).then(({
            data
          }) => {
            if (data) {
              this.$message({
                message: '删除成功',
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

<style>
</style>
