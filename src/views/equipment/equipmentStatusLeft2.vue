<template>
  <div id="equipmentStatusLeft2">
    <div>
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2" />
          <dv-decoration-6 style="width:22.5rem;height:.05rem; position:relative;top:-.035rem;" />
        </div>
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
    }
  }
}
</script>

<style lang="scss">
#equipmentStatusLeft2 {
  padding: 0.2rem;
  height: 3.125rem;
  min-width: 8.75rem;
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
