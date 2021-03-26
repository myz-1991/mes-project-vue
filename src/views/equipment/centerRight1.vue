<template>
  <div id="centreRight1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-line" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">任务完成情况</span>
        </div>
      </div>
      <div class="d-flex jc-center body-box">
        <dv-scroll-board :config="config" style="width:7.975rem;height:4.28rem" />
      </div>
    </div>
  </div>
</template>

<script>
import { getTask } from '@/api/a/a'
export default {
  components: {},
  data() {
    return {
      timer: null,
      config: {
        header: ['设备名', '任务量', '完成数量', '完成率(%)'],
        data: [
        ],
        rowNum: 5, // 表格行数
        headerHeight: 35,
        headerBGC: '#0f1325', // 表头
        oddRowBGC: '#0f1325', // 奇数行
        evenRowBGC: '#171c33', // 偶数行
        index: true,
        columnWidth: [40],
        align: 'center'
      }
    }
  },
  mounted() {
    this.initTask()
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
        this.initTask()
      }, 60000)
    },
    initTask() {
      getTask().then((respone) => {
        var list = respone.data
        var list1 = []
        for (let i = 0; i < list.length; i++) {
          var task = []
          task[0] = list[i].equiName
          task[1] = list[i].planNum
          task[2] = list[i].finishNum
          task[3] = list[i].percent
          list1.push(task)
        }
        this.config = {
          header: ['设备名', '任务量', '完成数量', '完成率(%)'],
          data: list1,
          rowNum: 4, // 表格行数
          headerBGC: '#0f1325', // 表头
          oddRowBGC: '#0f1325', // 奇数行
          evenRowBGC: '#171c33', // 偶数行
          index: true
        // align: 'center'
        }
        this.config = { ...this.config }
      })
    }
  }
}
</script>

<style lang="scss">
#centreRight1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 6.775rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
    border-radius: 0.125rem;
  }
  .text {
    color: #c3cbde;
  }
  .body-box {
    border-radius: 0.125rem;
    overflow: hidden;
  }
}
</style>
