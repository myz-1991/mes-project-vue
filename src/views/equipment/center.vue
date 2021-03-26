<template>
  <div id="center">
    <div class="up">
      <div v-for="item in titleItem" :key="item.title" class="bg-color-black item">
        <p class="ml-3 colorBlue fw-b">{{ item.title }}</p>
        <div>
          <dv-digital-flop :config="item.number" style="width:1.25rem;height:.625rem;" />
        </div>
      </div>
    </div>
    <div class="down">
      <div class="ranking bg-color-black">
        <span style="color:#5cd9e8">
          <icon name="align-left" />
        </span>
        <!-- <span class="fs-xl text mx-2 mb-1">年度负责人组件达标榜</span> -->
        <!-- <dv-scroll-ranking-board :config="ranking" style="height:2.75rem" /> -->
        <!-- 4个主要的数据 -->
        <div class="bottom-data">
          <div v-for="(item,index) in numberData" :key="index" class="item-box">
            <div class="d-flex">
              <dv-digital-flop :config="item.number" style="width:2.5rem;height:.625rem;" />
            </div>
            <p class="text" style="text-align: center;">
              {{ item.text }}
              <span class="colorYellow">(件)</span>
            </p>
          </div>
        </div>
      </div>
      <div class="percent">
        <div class="item bg-color-black">
          <span>本月任务达成率</span>
          <CenterChart :id="rate[0].id" :tips="rate[0].tips" :color-obj="rate[0].colorData" />
        </div>
        <div class="item bg-color-black">
          <span>本月任务失败率</span>
          <CenterChart :id="rate[1].id" :tips="rate[1].tips" :color-obj="rate[1].colorData" />
        </div>
        <div class="water">
          <dv-water-level-pond :config="water" style="height: 1.5rem" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CenterChart from '@/components/echart/center/centerChartRate'
import { yieldSpectacularsCopy, taskNumber, yearTaskNumber, monthTaskNumber, dayTaskNumber, yearTaskFailNumber, yearTaskSucceedNumber, monthSucceedTaskNumber, monthSucceedTaskRate, monthFailTaskRate } from '@/api/a/a'
import data from '@/old-views/pdf/content'

export default {
  components: {
    CenterChart
  },
  data() {
    return {
      timer: null,
      query: {
        startTime: '',
        endTime: '',
        type: ''
      },
      titleItem: [
        {
          title: '今年累计任务建次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        },
        {
          title: '本月累计任务次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        },
        {
          title: '今日累计任务次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        },
        {
          title: '今年失败任务次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        },
        {
          title: '今年任务达成次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        },
        {
          title: '本月任务达成次数',
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          }
        }
      ],
      numberData: [
        {
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          },
          text: '今日产量'
        },
        {
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          },
          text: '合格数量'
        },
        {
          number: {
            number: [0],
            toFixed: 1,
            content: '{nt}'
          },
          text: '次品数量'
        }
      ],
      water: {
        data: [25, 50],
        shape: 'roundRect',
        formatter: '{value}%',
        waveNum: 3
      },
      // 通过率和达标率的组件复用数据
      rate: [
        {
          id: 'centerRate1',
          tips: 0,
          colorData: {
            textStyle: '#3fc0fb',
            series: {
              color: ['#00bcd44a', 'transparent'],
              dataColor: {
                normal: '#03a9f4',
                shadowColor: '#97e2f5'
              }
            }
          }
        },
        {
          id: 'centerRate2',
          tips: 0,
          colorData: {
            textStyle: '#67e0e3',
            series: {
              color: ['#faf3a378', 'transparent'],
              dataColor: {
                normal: '#ff9800',
                shadowColor: '#fcebad'
              }
            }
          }
        }
      ]
    }
  },
  mounted() {
    // this.changeTiming();
    this.initNum()
    this.initTaskYear()
    this.initTaskMonth()
    this.initTaskDay()
    this.initFailTaskYear()
    this.initSuccessTaskYear()
    this.initSuccessTaskMonth()
    this.initSuccessTaskRate()
    this.initFailTaskRate()
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
        this.initNum()
        this.initTaskYear()
        this.initTaskMonth()
        this.initTaskDay()
        this.initFailTaskYear()
        this.initSuccessTaskYear()
        this.initSuccessTaskMonth()
        this.initSuccessTaskRate()
        this.initFailTaskRate()
      }, 60000)
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index
        item.number = { ...item.number }
      })
    },
    initNum() {
      yieldSpectacularsCopy().then((respone) => {
        var list = JSON.parse(respone.data)
        // parseInt(list.data.ok)
        for (let index = 0; index < this.numberData.length; index++) {
          const element = this.numberData[index]
          if (index == 0) {
            element.number.number[0] = parseInt(list.data.output)
          } else if (index == 1) {
            element.number.number[0] = parseInt(list.data.ok)
          } else {
            element.number.number[0] = parseInt(list.data.nok)
          }
          element.number = { ...element.number }
        }
      })
    },
    initTaskYear() {
      yearTaskNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 0) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initTaskMonth() {
      monthTaskNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 1) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initTaskDay() {
      dayTaskNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 2) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initFailTaskYear() {
      yearTaskFailNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 3) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initSuccessTaskYear() {
      yearTaskSucceedNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 4) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initSuccessTaskMonth() {
      monthSucceedTaskNumber().then((respone) => {
        const data = JSON.parse(respone.data)
        for (let index = 0; index < this.titleItem.length; index++) {
          const element = this.titleItem[index]
          if (index == 5) {
            element.number.number[0] = parseInt(data.data)
            element.number = { ...element.number }
            break
          }
        }
      })
    },
    initSuccessTaskRate() {
      monthSucceedTaskRate().then((respone) => {
        const data = JSON.parse(respone.data)
        this.rate[0].tips = data.data
      })
    },
    initSuccessTaskRate() {
      monthSucceedTaskRate().then((respone) => {
        const data = JSON.parse(respone.data)
        this.rate[0].tips = data
      })
    },
    initFailTaskRate() {
      monthFailTaskRate().then((respone) => {
        const data = JSON.parse(respone.data)
        this.rate[1].tips = data
        this.water.data[0] = this.rate[0].tips
        this.water.data[1] = data
        /**
       * 使用ES6拓展运算符生成新的props对象
       * 组件侦知数据变化 自动刷新状态
       */
        this.water = { ...this.water }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
      margin-top: 15px;
      // 金币
      .coin {
        position: absolute;
        left: 0.1rem;
        top: 0.2125rem;
        font-size: 0.25rem;
        color: #ffc107;
      }
      .colorYellow {
        color: yellowgreen;
      }
    }
  }
#center {
  display: flex;
  flex-direction: column;
  .up {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .item {
      border-radius: 0.0625rem;
      padding-top: 0.2rem;
      margin-top: 0.1rem;
      width: 32%;
      height: 0.875rem;
    }
  }
  .down {
    padding: 0.07rem 0.05rem;
    padding-bottom: 0;
    width: 100%;
    display: flex;
    height: 3.1875rem;
    justify-content: space-between;
    .bg-color-black {
      border-radius: 0.0625rem;
    }
    .ranking {
      padding: 0.125rem;
      width: 59%;
    }
    .percent {
      width: 40%;
      display: flex;
      flex-wrap: wrap;
      .item {
        width: 50%;
        height: 1.5rem;
        span {
          margin-top: 0.0875rem;
          display: flex;
          justify-content: center;
        }
      }
      .water {
        width: 100%;
      }
    }
  }
}
</style>
