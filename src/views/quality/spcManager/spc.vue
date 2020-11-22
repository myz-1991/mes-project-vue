<template>
  <div class="app-container">
    <el-form inline="">
      <el-form-item label="产品">
        <el-select>
          <el-option>1</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项点">
        <el-select>
          <el-option>2</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="时间">
        <el-col :span="11">
          <el-date-picker></el-date-picker>
        </el-col>
        <el-col :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker></el-date-picker>
        </el-col>
      </el-form-item>
    </el-form>
    <div :id="id" :class="className" style="width: 100%;height: 500px;" />
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      id: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '500px'
      },
      height: {
        type: String,
        default: '200px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      this.chart.dispose()
      this.chart = null
    },
    methods: {
      initChart() {
        this.chart = echarts.init(document.getElementById(this.id))

        this.chart.setOption({
          //backgroundColor: '#394056',
          animation: true,
          grid: {
            top: 40,
            left: 50,
            right: 40,
            bottom: 50
          },
          xAxis: {
            name: 'x',
            minorTick: {
              show: true
            },
            splitLine: {
              lineStyle: {
                color: '#999'
              }
            },
            minorSplitLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          yAxis: {
            name: 'y',
            min: -9,
            max: 9,
            minorTick: {
              show: true
            },
            splitLine: {
              lineStyle: {
                color: '#999'
              }
            },
            minorSplitLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            }
          },
          dataZoom: [{
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: 0,
            endValue: 100
          }, {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0]
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            clip: true,
            data: this.generateData()
          }]
        })
      },
      func(x) {
          x /= 10;
          return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 10;
      },
      generateData() {
          let data = [];
          for (let i = 0; i <= 200; i += 0.1) {
              data.push([i, this.func(i)]);
          }
          return data;
      }
    }
  }
</script>

<style>
</style>
