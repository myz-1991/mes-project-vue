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
    this.timer = setInterval(this.loadData, 3000)
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
      getEquipmentName('锯钻床').then((respone) => {
        this.tableHead = respone.data
      })
      getEquipmentCollectionPoint('锯钻床').then((respone) => {
        this.tableData = respone.data
      })
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      // var myChart = this.$echarts.init(document.getElementById('myTempo'))
      //  let myChart = this.$echarts.init(document.getElementsByClassName('myTempo')[0])
      var ovar = {}
      var chart = {}
      for (let i = 0; i < this.dataList.length; i++) {
        ovar['var_' + i] = {
          color: ['#3398DB'],
          title: {
            text: '产量' // 标题文本内容
          },
          toolbox: {
            // 可视化的工具箱
            show: true,
            feature: {
              restore: {
                // 重置
                show: true
              },
              saveAsImage: {
                // 保存图片
                show: true
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#283b56'
              }
            }
          },
          legend: {
            // data:[ '预购队列']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: true,
              data: (function() {
                var now = new Date()
                var res = []
                var len = 10
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''))
                  now = new Date(now - 2000)
                }
                return res
              })()
            },
            {
              type: 'category',
              boundaryGap: true,
              data: (function() {
                var res = []
                var len = 10
                while (len--) {
                  res.push(10 - len - 1)
                }
                return res
              })()
            }
          ],
          yAxis: [
            {
              type: 'value',
              scale: true,
              name: ' ',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
            },
            {
              type: 'value',
              scale: true,
              name: '',
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2]
            }
          ],
          series: [
            {
              name: '产量',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: (function() {
                var res = []
                var len = 10
                while (len--) {
                  res.push(Math.round(Math.random() * 1000))
                }
                return res
              })()
            },
            {
              name: '节拍',
              type: 'line',
              data: (function() {
                var res = []
                var len = 0
                while (len < 10) {
                  res.push(Math.round(Math.random() * 1000))
                  len++
                }
                return res
              })()
            }
          ]
        }
        //  chart['var_'+i] = this.$echarts.init(document.getElementById(this.dataList[i].id))
        chart['var_' + i] = this.$echarts.init(
          document.getElementById(this.dataList[i].id)
        )
        chart['var_' + i].setOption(ovar['var_' + i])
        // 绘制图表
      }
      app.count = 11
      if (this.timer == null) {
        this.timer = setInterval(() => {
          var num = Math.round(Math.random() * 1000)
          var numm = Math.round(Math.random() * 1000)
          var axisData = new Date().toLocaleTimeString().replace(/^\D*/, '')
          var data0 = ovar['var_' + 0].series[0].data
          var data1 = ovar['var_' + 0].series[1].data
          // var data2 = ovar["var_" + 1].series[0].data;
          // var data3 = ovar["var_" + 1].series[1].data;
          data0.shift()
          data0.push(num)
          data1.shift()
          data1.push(num)
          // data2.shift();
          // data2.push(numm);
          // data3.shift();
          // data3.push(numm);
          ovar['var_' + 0].xAxis[0].data.shift()
          ovar['var_' + 0].xAxis[0].data.push(axisData)
          ovar['var_' + 0].xAxis[1].data.shift()
          ovar['var_' + 0].xAxis[1].data.push(app.count++)
          // ovar["var_" + 1].xAxis[0].data.shift();
          // ovar["var_" + 1].xAxis[0].data.push(axisData);
          // ovar["var_" + 1].xAxis[1].data.shift();
          // ovar["var_" + 1].xAxis[1].data.push(app.count++);
          chart['var_' + 0].setOption(ovar['var_' + 0], true)
          // chart["var_" + 1].setOption(ovar["var_" + 1]);
        }, 2000)
      }
    }
  }
}
</script>
