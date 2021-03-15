<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue';
import { productSpectacularsCopy } from "@/api/a/a";

export default {
  data () {
    return {
      cdata: {
        xData: [],
        seriesData: [
        ]
      }
    }
  },
  components: {
    Chart,
  },
  mounted () {
    this.initDrawLine()
  },
  methods: {
    initDrawLine(){ 
      productSpectacularsCopy().then((respone) =>{
        var list = JSON.parse(respone.data);
        for(let i =0;i<list.data.length;i++){
            this.cdata.xData.push(list.data[i].productName)
            var da ={
              "name":list.data[i].productName,
              "value":list.data[i].num
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