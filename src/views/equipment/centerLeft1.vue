<template>
  <div id="centreLeft1">
    <div class="bg-color-black">
      <div class="d-flex pt-2 pl-2">
        <span style="color:#5cd9e8">
          <icon name="chart-bar" />
        </span>
        <div class="d-flex">
          <span class="fs-xl text mx-2">半成品库</span>
          <dv-decoration-3 style="width:1.25rem;height:.25rem; position:relative;top:-.0375rem;" />
        </div>
      </div>
      <div class="d-flex jc-center">
        <!-- <CentreLeft1Chart /> -->
        <dv-active-ring-chart :config="config" style="width:3.25rem;height:2.75rem" />
      </div>
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
  </div>
</template>

<script>
import CentreLeft1Chart from '@/components/echart/centerLeft/centerLeft1Chart'
import { yieldSpectaculars, productSpectaculars } from '@/api/a/a'

export default {
  components: {
    CentreLeft1Chart
  },
  data() {
    return {
      timer: null,
      output: [],
      ok: [],
      nok: [],
      config: {
        lineWidth: 20,
        activeRadius: '80%',
        radius: '75%',
        activeTimeGap: 2000,
        digitalFlopStyle: {
          fontSize: 23
        },
        data: []
      },
      numberData: [
        {
          number: {
            number: [1],
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
      ]
    }
  },
  mounted() {
    this.changeTiming()
    this.initNum()
    this.initDrawLine()
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
        this.initDrawLine()
      }, 240000)
    },
    changeNumber() {
      this.numberData.forEach((item, index) => {
        item.number.number[0] += ++index
        item.number = { ...item.number }
      })
    },
    initNum() {
      yieldSpectaculars().then((respone) => {
        var list = JSON.parse(respone.data)
        // parseInt(list.data.ok)
        this.numberData[0].number.number[0] = 2
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
        // this.ok = list.data.ok
        // this.nok = list.data.nok
      })
    },
    initDrawLine() {
      productSpectaculars().then((respone) => {
        var list = JSON.parse(respone.data)
        var list1 = []
        for (let i = 0; i < list.data.length; i++) {
          var da = {
            'name': list.data[i].productName,
            'value': list.data[i].num
          }
          list1.push(da)
        }
        this.config = {
          lineWidth: 20,
          activeRadius: '80%',
          radius: '75%',
          activeTimeGap: 2000,
          digitalFlopStyle: {
            fontSize: 23
          },
          data: list1
        }
        this.config = { ...this.config }
        console.log(this.config)
      })
    }
  }
}
</script>

<style lang="scss">
#centreLeft1 {
  padding: 0.2rem;
  height: 5.125rem;
  min-width: 3.75rem;
  border-radius: 0.0625rem;
  .bg-color-black {
    height: 4.8125rem;
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

  .bottom-data {
    .item-box {
      float: right;
      position: relative;
      width: 50%;
      color: #d3d6dd;
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
}
</style>
