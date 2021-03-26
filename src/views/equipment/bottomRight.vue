<template>
  <div id="bottomRight">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-area" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">计划完成情况</span>
          <div class="decoration2">
            <dv-decoration-2 :reverse="true" style="width:5px;height:6rem;" />
          </div>
        </div>
      </div>
      <div>
        <!-- <BottomRightChart /> -->
        <dv-scroll-board
          wait-time="3000"
          :row-num="6"
          :config="config"
          style="width:100%;height:6.1875rem;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BottomRightChart from '@/components/echart/bottom/bottomRightChart'
import { getPlan } from '@/api/a/a'

export default {
  components: {
    BottomRightChart
  },
  data() {
    return {
      timer: null,
      config: {
        header: ['计划编号', '计划总数', '完成数量', '完成率(%)'],
        data: [],
        rowNum: 6, // 表格行数
        index: true,
        headerBGC: '#0f1325', // 表头
        oddRowBGC: '#0f1325', // 奇数行
        evenRowBGC: '#171c33', // 偶数行
        waitTime: 2000, // 轮播时间间隔(ms)
        align: 'center'
      }
    }
  },
  mounted() {
    this.initPlan()
    this.changeTiming()
  },
  destroyed() {
    console.log('关闭')
    clearInterval(this.timer)
    this.timer = null
  },
  methods: {
    changeTiming() {
      this.timer = setInterval(() => {
        this.initPlan()
      }, 240000)
    },
    initPlan() {
      getPlan().then((respone) => {
        var list = respone.data
        var list1 = []
        for (let i = 0; i < list.length; i++) {
          var plan = []
          plan[0] = list[i].code
          plan[1] = list[i].planNum
          plan[2] = list[i].finishNum
          plan[3] = list[i].percent
          list1.push(plan)
        }
        this.config = {
          header: ['计划编号', '计划总数', '完成数量', '完成率(%)'],
          data: list1,
          rowNum: 5, // 表格行数
          headerBGC: '#0f1325', // 表头
          oddRowBGC: '#0f1325', // 奇数行
          evenRowBGC: '#171c33', // 偶数行
          index: true,
          align: 'center'
        }
        this.config = { ...this.config }
      })
    }
  }
}
</script>

<style lang="scss">
#bottomRight {
  padding: 0.2rem 0.2rem 0;
  height: 6.5rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 6.1875rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  } //下滑线动态
  .decoration2 {
    position: absolute;
    right: 0.125rem;
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
