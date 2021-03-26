<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import { productSpectaculars } from '@/api/a/a'
export default {
  components: {
    Chart
  },
  data() {
    return {
      cdata: {
        xData: [],
        seriesData: [
        ]
      }
    }
  },
  mounted() {
    // this.initDrawLine()
  },
  methods: {
    initDrawLine() {
      productSpectaculars().then((respone) => {
        var list = JSON.parse(respone.data)
        for (let i = 0; i < list.data.length; i++) {
          this.cdata.xData.push(list.data[i].productName)
          var da = {
            'name': list.data[i].productName,
            'value': list.data[i].num
          }
          this.cdata.seriesData.push(da)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
