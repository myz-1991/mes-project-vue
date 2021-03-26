<template>
  <div>
    <!-- 地图位置 -->
    <!-- <Echart
      id="centreLeft2Chart"
      ref="centreLeft2ChartRef"
      :options="options"
      height="4.5rem"
      width="4.125rem"
    ></Echart> -->
    <Echart
      id="centreLeft2Chart"
      :options="options"
      height="4.5rem"
      width="4.125rem"
    />
  </div>
</template>

<script>
import Echart from '@/common/echart'
export default {
  components: {
    Echart
  },
  props: {
    cdata: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {}
    }
  },
  watch: {
    cdata: {
      handler(newData) {
        this.options = {
          color: [
            '#37a2da',
            '#32c5e9',
            '#9fe6b8',
            '#ffdb5c',
            '#ff9f7f',
            '#fb7293',
            '#e7bcf3',
            '#8378ea'
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          toolbox: {
            show: true
          },
          calculable: true,
          legend: {
            orient: 'horizontal',
            icon: 'circle',
            bottom: 0,
            x: 'center',
            type: 'scroll',
            data: newData.xData,
            textStyle: {
              color: '#fff'
            }
          },
          series: [
            {
              name: '产品占比',
              type: 'pie',
              radius: [10, 70],
              roseType: 'area',
              center: ['50%', '40%'],
              data: newData.seriesData
            }
          ]
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 开启定时器
    startInterval() {
      const _self = this
      // 应通过接口获取配置时间，暂时写死5s
      const time = 80000
      if (this.intervalId !== null) {
        clearInterval(this.intervalId)
      }
      this.intervalId = setInterval(() => {
        _self.initDrawLine()
      }, time)
    }
  }
}
</script>
