<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="name" label="名称">
        <!-- <template slot-scope="scope">
            <el-button type="text" @click="GoToNext(scope.row.name, scope.row.ip)">{{ scope.row.name }}</el-button>
          </template> -->
      </el-table-column>
      <template v-for="(item, index) in tableHead">
        <el-table-column
          :key="index"
          :prop="item.id"
          :label="item.equipmentName"
        />
      </template>
    </el-table>
    <div class="block" style="margin: 10px">
      <el-date-picker
        v-model="timeValue"
        type="date"
        placeholder="选择日期"
        format="yyyy/MM/dd"
        value-format="yyyy/MM/dd"
      />
      <el-button
        type="primary"
        plain
        style="margin-left: 10px"
        @click="onClick()"
      >查询</el-button>
    </div>
    <div
      id="charts1"
      v-loading="loading"
      style="width: 1300px; height: 400px; float: left"
    />
    <div style="float: left">
      <div
        id="charts2"
        v-loading="loading"
        style="width: 1300px; height: 400px"
      />
    </div>
  </div>
</template>
<script>
import {
  findTypeValues,
  getEquipmentName,
  getEquipmentCollectionPoint,
  getHeatLine,
  getHeatLineCopy
} from '@/api/a/a'
export default {
  data() {
    return {
      loading: false,
      timeValue: '',
      tableHead: [],
      tableData: [],
      value: '',
      dataList: null,
      timer: null,
      tableHeight: document.documentElement.clientHeight - 10 + 'px',
      input: '',
      heat1: [],
      heat2: [],
      heat3: [],
      heat4: [],
      heat5: [],
      heat6: [],
      heat7: [],
      heat8: [],
      heatCopy1: [],
      heatCopy2: []
    }
  },
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    clearInterval(this.timer)
    this.timer = null
    this.loadData()
  },
  mounted() {
    this.timer = setInterval(this.loadData, 50000)
  },
  destroyed() {
    console.log('关闭')
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    onClick() {
      if (this.timeValue == 'null') {
        this.$message('请选择时间')
        return
      }
      this.getHeatLine()
    },
    getHeatLine() {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var timeV = '' + year + '/' + month + '/' + day
      if (this.timeValue != timeV) {
        this.loading = true
      }
      if (this.timeValue != 'null') {
        getHeatLine('172.17.0.178', this.timeValue).then((respone) => {
          this.heat1 = respone.data[0].value
          this.heat2 = respone.data[1].value
          this.heat3 = respone.data[2].value
          this.heat4 = respone.data[3].value
          this.heat5 = respone.data[4].value
          this.heat6 = respone.data[5].value
          this.heat7 = respone.data[6].value
          this.heat8 = respone.data[7].value
          this.heatCopy1 = respone.data[9].value
          this.heatCopy2 = respone.data[10].value
          this.getLineChart()
          this.getLineChartCopy()
          this.loading = false
        })
      }
    },
    getLineChart() {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = this.$echarts.init(document.getElementById('charts1'))
      const data = [
        { name: 1596038400000, value: [1596038400000, 53] },
        { name: 1596039040000, value: [1596039040000, 51] },
        { name: 1596039680000, value: [1596039680000, 51] },
        { name: 1596040320000, value: [1596040320000, 51] },
        { name: 1596040832000, value: [1596040832000, 58] },
        { name: 1596041472000, value: [1596041472000, 67] },
        { name: 1596042112000, value: [1596042112000, 68] },
        { name: 1596042624000, value: [1596042624000, 54] },
        { name: 1596043264000, value: [1596043264000, 51] },
        { name: 1596043904000, value: [1596043904000, 57] },
        { name: 1596044416000, value: [1596044416000, 52] },
        { name: 1596045056000, value: [1596045056000, 54] },
        { name: 1596045696000, value: [1596045696000, 51] },
        { name: 1596046208000, value: [1596046208000, 51] },
        { name: 1596046848000, value: [1596046848000, 52] },
        { name: 1596047488000, value: [1596047488000, 51] },
        { name: 1596048000000, value: [1596048000000, 53] },
        { name: 1596048640000, value: [1596048640000, 52] },
        { name: 1596049280000, value: [1596049280000, 67] },
        { name: 1596049920000, value: [1596049920000, 59] },
        { name: 1596050432000, value: [1596050432000, 58] },
        { name: 1596051072000, value: [1596051072000, 52] },
        { name: 1596051712000, value: [1596051712000, 55] },
        { name: 1596052224000, value: [1596052224000, 53] },
        { name: 1596052864000, value: [1596052864000, 54] },
        { name: 1596053504000, value: [1596053504000, 54] },
        { name: 1596054016000, value: [1596054016000, 54] },
        { name: 1596054656000, value: [1596054656000, 52] },
        { name: 1596055296000, value: [1596055296000, 54] },
        { name: 1596055808000, value: [1596055808000, 65] },
        { name: 1596056448000, value: [1596056448000, 59] },
        { name: 1596057088000, value: [1596057088000, 55] },
        { name: 1596057600000, value: [1596057600000, 53] },
        { name: 1596058240000, value: [1596058240000, 55] },
        { name: 1596058880000, value: [1596058880000, 54] },
        { name: 1596059520000, value: [1596059520000, 55] },
        { name: 1596060032000, value: [1596060032000, 64] },
        { name: 1596060672000, value: [1596060672000, 57] },
        { name: 1596061312000, value: [1596061312000, 56] },
        { name: 1596061824000, value: [1596061824000, 55] },
        { name: 1596062464000, value: [1596062464000, 55] },
        { name: 1596063104000, value: [1596063104000, 55] },
        { name: 1596063616000, value: [1596063616000, 58] },
        { name: 1596064256000, value: [1596064256000, 79] },
        { name: 1596064896000, value: [1596064896000, 60] },
        { name: 1596065408000, value: [1596065408000, 63] },
        { name: 1596066048000, value: [1596066048000, 63] },
        { name: 1596066688000, value: [1596066688000, 82] },
        { name: 1596067200000, value: [1596067200000, 81] },
        { name: 1596067840000, value: [1596067840000, 78] },
        { name: 1596068480000, value: [1596068480000, 78] },
        { name: 1596069120000, value: [1596069120000, 65] },
        { name: 1596069632000, value: [1596069632000, 76] },
        { name: 1596070272000, value: [1596070272000, 80] },
        { name: 1596070912000, value: [1596070912000, 78] },
        { name: 1596107040000, value: [1596107040000, 70] },
        { name: 1596109040000, value: [1596109040000, 0] },
        { name: 1596124799000, value: [1596124799000, 0] }
      ]
      // 绘制图表
      myChart1.setOption({
        title: [], //
        legend: {
          data: [
            '固溶一区',
            '固溶二区',
            '固溶三区',
            '固溶四区',
            '固溶五区',
            '固溶六区',
            '固溶七区',
            '固溶八区'
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              var date = new Date(value)
              var hour = date.getHours()
              var minutes = date.getMinutes()
              if (hour < 10) {
                hour = '0' + hour
              }
              if (minutes < 10) {
                minutes = '0' + minutes
              }
              return hour + ':' + minutes
            },
            color: '#1B2232'
          }
        },
        yAxis: {
          name: '数据',
          nameTextStyle: {
            color: '#1B2232',
            fontSize: 15
          },
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            color: '#1B2232'
          },
          min: 520,
          max: 560
        },
        series: [
          {
            name: '固溶一区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            // symbolSize: 1,
            data: this.heat1
          },
          {
            name: '固溶二区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            // symbolSize: 1,
            data: this.heat2
          },
          {
            name: '固溶三区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 5,
            data: this.heat3,
            markLine: {
              symbol: 'none',

              /* symbol:"none",               //去掉警戒线最后面的箭头
                           label:{
                               position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束

                           },*/
              data: [
                {
                  silent: true, // 鼠标悬停事件  true没有，false有
                  lineStyle: {
                    // 警戒线的样式  ，虚实  颜色
                    type: 'solid',
                    color: 'blue'
                  },
                  label: {
                    position: 'end',
                    formatter: '上限'
                  },
                  yAxis: 543 // 警戒线的标注值，可以有多个yAxis,多条警示线
                },
                {
                  silent: true, // 鼠标悬停事件  true没有，false有
                  lineStyle: {
                    // 警戒线的样式  ，虚实  颜色
                    type: 'solid',
                    color: 'blue'
                  },
                  label: {
                    position: 'end',
                    formatter: '下限'
                  },
                  yAxis: 533 // 警戒线的标注值，可以有多个yAxis,多条警示线
                }
              ]
            }
          },
          {
            name: '固溶四区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 5,
            data: this.heat4
          },
          {
            name: '固溶五区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 5,
            data: this.heat5
          },
          {
            name: '固溶六区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 5,
            data: this.heat6
          },
          {
            name: '固溶七区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            symbolSize: 5,
            data: this.heat7
          },
          {
            name: '固溶八区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            // symbolSize: 1,
            data: this.heat8,
            markLine: {
              symbol: 'none',

              /* symbol:"none",               //去掉警戒线最后面的箭头
                           label:{
                               position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束

                           },*/
              data: [
                {
                  silent: true, // 鼠标悬停事件  true没有，false有
                  lineStyle: {
                    // 警戒线的样式  ，虚实  颜色
                    type: 'solid',
                    color: 'blue'
                  },
                  label: {
                    position: 'end',
                    formatter: '八区下限'
                  },
                  yAxis: 523 // 警戒线的标注值，可以有多个yAxis,多条警示线
                }
              ]
            }
          }
        ]
      })
    },
    getLineChartCopy() {
      // 基于准备好的dom，初始化echarts实例
      var myChart1 = this.$echarts.init(document.getElementById('charts2'))
      // 绘制图表
      myChart1.setOption({
        title: [], //
        legend: { data: ['时效一区', '时效二区'] },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            animation: false
          }
        },
        xAxis: {
          type: 'time',
          splitLine: {
            show: false
          },
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              var date = new Date(value)
              var hour = date.getHours()
              var minutes = date.getMinutes()
              if (hour < 10) {
                hour = '0' + hour
              }
              if (minutes < 10) {
                minutes = '0' + minutes
              }
              return hour + ':' + minutes
            },
            color: '#1B2232'
          }
        },
        yAxis: {
          name: '数据',
          nameTextStyle: {
            color: '#1B2232',
            fontSize: 15
          },
          type: 'value',
          boundaryGap: [0, '100%'],
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#1B2232'
            }
          },
          axisLabel: {
            color: '#1B2232'
          },
          min: 100,
          max: 240
        },
        series: [
          {
            name: '时效一区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            symbolSize: 1,
            data: this.heatCopy1
          },
          {
            name: '时效二区',
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            smooth: true,
            symbolSize: 1,
            data: this.heatCopy2
          }
        ]
      })
    },
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
      getEquipmentName('热处理炉').then((respone) => {
        this.tableHead = respone.data
      })
      getEquipmentCollectionPoint('热处理炉').then((respone) => {
        this.tableData = respone.data
      })
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() + 1
      var day = now.getDate()
      if (month < 10) {
        month = '0' + month
      }
      if (day < 10) {
        day = '0' + day
      }
      var timeV = '' + year + '/' + month + '/' + day
      if (this.timeValue == timeV) {
        this.getHeatLine()
      }
    }
  }
}
</script>
