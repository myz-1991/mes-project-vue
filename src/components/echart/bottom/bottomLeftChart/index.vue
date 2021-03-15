<!-- 产量 -->
<template>
  <div>
    <Chart :cdata="cdata" />
  </div>
</template>

<script>
import Chart from './chart.vue'
import { fifteenYieldByCpPid } from "@/api/a/a";
export default {
  data () {
    return {
      cdata: {
        category: [
          // "12",
          // "34",
          // "56",
          // "78",
          // "95",
          // "55",
          // "6",
          // "3",
          // "213",
          // "453",
          // "88",
          // "453",
          // "33",
          // "123",
          // "378",
          // "3783",
          // "37",
          // "37",
          // "453",
          // "453"
        ],
        lineData: [
          // 18092,
          // 20728,
          // 24045,
          // 28348,
          // 32808,
          // 36097,
          // 39867,
          // 44715,
          // 48444,
          // 50415,
          // 56061,
          // 62677,
          // 59521,
          // 67560,
          // 18092,
          // 20728,
          // 24045,
          // 28348,
          // 32808,
          // 36097
        ],
        barData: [
          // 4600,
          // 5000,
          // 5500,
          // 6500,
          // 7500,
          // 8500,
          // 9900,
          // 12500,
          // 14000,
          // 21500,
          // 23200,
          // 24450,
          // 25250,
          // 33300,
          // 4600,
          // 5000,
          // 5500,
          // 6500,
          // 7500,
          // 8500
        ],
        rateData: []
      }
    };
  },
  props:['value'],
  components: {
    Chart,
  },
  watch:{
    value(){
          this.cdata.lineData = []
          this.cdata.barData = []
          this.cdata.category = []
          this.cdata.rateData = []
          this.initEq()
    }
  },
  mounted () {
    // this.setData();
    this.initEq();
  },
  methods: {
    // 演示数据
    // setData () {
    //   console.log(this.value)
    //   for (let i = 0; i < this.cdata.barData.length -1; i++) {
    //     let rate = this.cdata.barData[i] / this.cdata.lineData[i];
    //     this.cdata.rateData.push(rate.toFixed(2));
    //   }
    // },
    initEq() {
      fifteenYieldByCpPid({'cpPid':this.value}).then((respone) => {
        console.log(JSON.parse(respone.data))
        this.dataList = JSON.parse(respone.data);
        this.dataList =this.dataList.data
        for(let i=0;i<this.dataList.length;i++){
            // this.outputList.push(this.dataList[i].output)
            this.cdata.lineData.push(this.dataList[i].yield)
            this.cdata.barData.push(this.dataList[i].reject)
            this.cdata.category.push(this.dataList[i].date)
            this.cdata.rateData.push(this.dataList[i].percent)
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>