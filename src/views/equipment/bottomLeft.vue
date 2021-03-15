<template>
  <div id="bottomLeft">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar"></icon>
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">{{ name }} 产量趋势图</span>
          <span class="fs-xl text mx-2"><a @click="cli('机加','113')">机加</a></span>
          <span class="fs-xl text mx-2"><a @click="cli('差压铸造','101')">差压铸造</a></span>
        </div>
      </div>
      <div>
        <BottomLeftChart v-bind:value='value'/>
      </div>
    </div>
  </div>
</template>

<script>
import BottomLeftChart from "@/components/echart/bottom/bottomLeftChart";
export default {
  data() {
    return {
      value:'113',
      name: '机加'
    };
  },
  components: {
    BottomLeftChart
  },
  mounted() {},
  methods: {
    cli(name ,cpPid){
      this.value = cpPid
      this.name = name
    }
  }
};
</script>

<style lang="scss">
a{

color: #C3CBE6;

}
a:hover{

color: red;

}
#bottomLeft {
  padding: 0.3rem 0.2rem;
  height: 6.5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 6.0625rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
}
</style>