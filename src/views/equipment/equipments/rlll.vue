<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column
        prop="name"
        label="名称"
      >
      <!-- <template slot-scope="scope">
            <el-button type="text" @click="GoToNext(scope.row.name, scope.row.ip)">{{ scope.row.name }}</el-button>
          </template> -->
      </el-table-column>
      <template v-for="(item,index) in tableHead">
        <el-table-column :key="index" :prop="item.id" :label="item.equipmentName" />
      </template>

    </el-table>
  </div>
</template>
<script>
import { findTypeValues, getEquipmentName, getEquipmentCollectionPoint } from '@/api/a/a'
export default {
  data() {
    return {
      tableHead: [],
      tableData: [],
      value: '',
      dataList: null,
      timer: null,
      tableHeight: document.documentElement.clientHeight - 10 + 'px',
      input: ''
    }
  },
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    clearInterval(this.timer)
    this.timer = null
    this.loadData()
  },
  mounted() {
    this.timer = setInterval(this.loadData, 10000)
  },
  destroyed() {
    console.log('关闭')
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    GoToNext(name, ip) {
      this.$router.push({
        name: 'YieldStatement',
        params: { name: name, ip: ip }
      })
    },
    loadData() {
      getEquipmentName('熔炼炉').then((respone) => {
        this.tableHead = respone.data
      })
      getEquipmentCollectionPoint('熔炼炉').then((respone) => {
        this.tableData = respone.data
      })
    }
  }
}
</script>
