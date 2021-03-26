<template>
  <div id="equipmentStatusLeft1">
    <div>
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" />
          <dv-decoration-1 style="width:22.5rem;height:.25rem; position:relative;top:-.035rem;" />
        </div>
      </div>
      <div
        v-for="(item, index) in dataList"
        :key="index"
        class="bg-color-black"
        :offset="index > 0 ? 2 : 0"
      >
        <img
          v-if="item.status =='运行'"
          :src="images.png_0_open"
          style="
            float: right;
            width: 0.5rem;
            height: 0.5rem;
            margin-top: 0.1rem;
          "
        >
        <img
          v-if="item.status =='关机'"
          :src="images.png_0_close"
          style="
            float: right;
            width: 0.5rem;
            height: 0.5rem;
            margin-top: 0.1rem;
          "
        >
        <img
          v-if="item.status =='报警'"
          :src="images.png_0_warn"
          style="
            float: right;
            width: 0.5rem;
            height: 0.5rem;
            margin-top: 0.1rem;
          "
        >
        <p class="text">
          设备:   <span class="colorYellow">{{ item.name }}</span>

        </p>
        <p class="text">
          状态:   <span class="colorYellow">{{ item.status }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import CentreLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart'
import { yieldSpectaculars, equipmentStatus } from '@/api/a/a'

export default {
  name: 'EquipmentStatusLeft1',
  components: {
    CentreLeft1Chart
  },
  props: ['value'],
  data() {
    return {
      images: {
        png_0_open: require('@/assets/equipment/open.png'),
        png_0_close: require('@/assets/equipment/close.png'),
        png_0_warn: require('@/assets/equipment/warn1.png')
      },
      dataList: []
    }
  },
  watch: {
    value() {
      this.initEq()
    }
  },
  mounted() {
    this.changeTiming()
    this.initEq()
  },
  activated() {
  },
  methods: {
    changeTiming() {
      setInterval(() => {
        this.initEq()
      }, 5000)
    },
    changeNumber() {
    },
    initEq() {
      equipmentStatus(this.value).then((respone) => {
        this.dataList = respone.data
      })
    }
  }
}
</script>

<style lang="scss">
#equipmentStatusLeft1 {
  padding: 0.2rem;
  height: 8.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    float: left;
    margin-top: 0.15rem;
    margin-left: 0.325rem;
    width: 2.5rem;
    height: 1.7rem;
    border-radius: 0.1rem;
  }
  .text {
    color: #c3cbde;
    margin-left: 0.425rem;
    margin-top: 0.225rem;
  }
  .chart-box {
    margin-top: 0.2rem;
    width: 2.125rem;
    height: 2.125rem;
    .active-ring-name {
      padding-top: 0.125rem;
    }
  }
      .colorYellow {
        color: yellowgreen;
      }

}
</style>
