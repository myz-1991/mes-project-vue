<template>
  <div :height="tableHeight">
    <el-card style="width: 99%; margin: 10px" class="box-1">
      <div class="text item">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </el-card>
    <!-- 锯钻床 -->
    <div v-if="value === '1'">
      <jz />
    </div>
    <!-- 刻码机 -->
    <div v-if="value === '2'">
      <km />
    </div>
    <!-- 熔炼炉 -->
    <div v-if="value === '3'">
      <rll />
    </div>
    <!-- 热处理炉 -->
    <div v-if="value === '4'">
      <rcll />
    </div>
    <!-- 切边机 -->
    <div v-if="value === '5'">
      <qbj />
    </div>
    <!-- 机床 -->
    <div v-if="value === '6'">
      <jc />
    </div>
  </div>
</template>

<script>
import jz from '@/views/equipment/equipments/jz.vue';
import rll from '@/views/equipment/equipments/rll.vue';
import rcll from '@/views/equipment/equipments/rcll.vue';
import km from '@/views/equipment/equipments/km.vue';
import qbj from '@/views/equipment/equipments/qbj.vue';
import jc from '@/views/equipment/equipments/jc.vue';

export default {
  components: { jz, rll, rcll, km, qbj, jc }, 
  data() {
    return {
      options: [
        {
          value: "1",
          label: "锯钻床",
        },
        {
          value: "2",
          label: "刻码机",
        },
        {
          value: "3",
          label: "熔炼炉",
        },
        {
          value: "4",
          label: "热处理炉",
        },
        {
          value: "5",
          label: "切边机",
        },
        {
          value: "6",
          label: "机床",
        }
      ],
      value: "",
      label: "",
      dataList: null,
      timer: null,
      tableHeight: document.documentElement.clientHeight - 10 + "px",
      input: "",
      tableData: null
    };
  },
  created() {
    // 每次进入界面时，先清除之前的所有定时器，然后启动新的定时器
    clearInterval(this.timer);
    this.timer = null;
  },

  mounted() {
  },
  destroyed() {
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      //var myChart = this.$echarts.init(document.getElementById('myTempo'))
      //  let myChart = this.$echarts.init(document.getElementsByClassName('myTempo')[0])
      var ovar = {};
      var chart = {};
      for (let i = 0; i < this.dataList.length; i++) {
        ovar["var_" + i] = {
          color: ["#3398DB"],
          title: {
            text: "产量", //标题文本内容
          },
          toolbox: {
            //可视化的工具箱
            show: true,
            feature: {
              restore: {
                //重置
                show: true,
              },
              saveAsImage: {
                //保存图片
                show: true,
              },
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "cross",
              label: {
                backgroundColor: "#283b56",
              },
            },
          },
          legend: {
            // data:[ '预购队列']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: { readOnly: false },
              restore: {},
              saveAsImage: {},
            },
          },
          dataZoom: {
            show: false,
            start: 0,
            end: 100,
          },
          xAxis: [
            {
              type: "category",
              boundaryGap: true,
              data: (function () {
                var now = new Date();
                var res = [];
                var len = 10;
                while (len--) {
                  res.unshift(now.toLocaleTimeString().replace(/^\D*/, ""));
                  now = new Date(now - 2000);
                }
                return res;
              })(),
            },
            {
              type: "category",
              boundaryGap: true,
              data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                  res.push(10 - len - 1);
                }
                return res;
              })(),
            },
          ],
          yAxis: [
            {
              type: "value",
              scale: true,
              name: " ",
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2],
            },
            {
              type: "value",
              scale: true,
              name: "",
              max: 1200,
              min: 0,
              boundaryGap: [0.2, 0.2],
            },
          ],
          series: [
            {
              name: "产量",
              type: "bar",
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: (function () {
                var res = [];
                var len = 10;
                while (len--) {
                  res.push(Math.round(Math.random() * 1000));
                }
                return res;
              })(),
            },
            {
              name: "节拍",
              type: "line",
              data: (function () {
                var res = [];
                var len = 0;
                while (len < 10) {
                  res.push(Math.round(Math.random() * 1000));
                  len++;
                }
                return res;
              })(),
            },
          ],
        };
        //  chart['var_'+i] = this.$echarts.init(document.getElementById(this.dataList[i].id))
        chart["var_" + i] = this.$echarts.init(
          document.getElementById(this.dataList[i].id)
        );
        chart["var_" + i].setOption(ovar["var_" + i]);
        // 绘制图表
      }
      app.count = 11;
      if (this.timer == null) {
        this.timer = setInterval(() => {
          var num = Math.round(Math.random() * 1000);
          var numm = Math.round(Math.random() * 1000);
          var axisData = new Date().toLocaleTimeString().replace(/^\D*/, "");
          var data0 = ovar["var_" + 0].series[0].data;
          var data1 = ovar["var_" + 0].series[1].data;
          // var data2 = ovar["var_" + 1].series[0].data;
          // var data3 = ovar["var_" + 1].series[1].data;
          data0.shift();
          data0.push(num);
          data1.shift();
          data1.push(num);
          // data2.shift();
          // data2.push(numm);
          // data3.shift();
          // data3.push(numm);
          ovar["var_" + 0].xAxis[0].data.shift();
          ovar["var_" + 0].xAxis[0].data.push(axisData);
          ovar["var_" + 0].xAxis[1].data.shift();
          ovar["var_" + 0].xAxis[1].data.push(app.count++);
          // ovar["var_" + 1].xAxis[0].data.shift();
          // ovar["var_" + 1].xAxis[0].data.push(axisData);
          // ovar["var_" + 1].xAxis[1].data.shift();
          // ovar["var_" + 1].xAxis[1].data.push(app.count++);
          chart["var_" + 0].setOption(ovar["var_" + 0], true);
          // chart["var_" + 1].setOption(ovar["var_" + 1]);
        }, 2000);
      }
    },
    /**
     * [beforeunloadHandler 浏览器关闭时进行用户提示]
     * @return {[type]} [description]
     */
    beforeunloadHandler(e) {
      e = e || window.event;
      if (e) {
        e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      return "您是否确认离开此页面-您输入的数据可能不会被保存";
    },
  },
};
</script>
<style>
a:hover{

color: blue;

}
.lineData {
  text-align: right;
  flex: 1 1 0%;
  border: 1px solid lightgray;
  margin-right: 10px;
}
.eq_statusHeat {
  float: left;
  position: absolute;
  /* border: 1px red solid;  */
  width: 20%;
  height: 20px;
  margin-left: 70%;
  /* margin-top: -2%; */
  background-color: #5cb85c;
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25em;
}
.eq_statusHeatRed {
  float: left;
  position: absolute;
  /* border: 1px red solid;  */
  width: 20%;
  height: 20px;
  margin-left: 70%;
  /* margin-top: -2%; */
  background-color: red;
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25em;
}
.eq_status {
  float: left;
  /* border: 1px red solid;  */
  width: 20%;
  height: 20px;
  margin-left: 80%;
  margin-top: -5%;
  background-color: #5cb85c;
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25em;
}
.eq_statusRed {
  float: left;
  /* border: 1px red solid;  */
  width: 20%;
  height: 20px;
  margin-left: 80%;
  margin-top: -5%;
  background-color: red;
  display: inline;
  padding: 0.2em 0.6em 0.3em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  border-radius: 0.25em;
}
.d1 {
  position: relative;
  width: 100%;
  height: 30px;
  /* border: 1px red solid; */
}

.dd1 {
  position: relative;
  float: left;
  width: 31%;
  height: 500px;
  /* margin-left: 10px; */
  background: #ffffff;
  margin: 10px;
  /* border: 1px red solid; */
  border-top: 3px solid #d2d6de;
  border-radius: 5px;
  border-top-color: #3c8dbc;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.dd2 {
  position: relative;
  float: left;
  width: 23%;
  height: 170px;
  /* margin-left: 10px; */
  margin: 10px;
  /* border: 1px red solid; */
  background-color: red; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #6d6a61, #a8a8a7);
  border-radius: 5px;
}
.heat {
  position: relative;
  float: left;
  width: 95%;
  height: 600px;
  background: #ffffff;
  margin: 10px;
  border-top: 3px solid #d2d6de;
  border-radius: 5px;
  border-top-color: #3c8dbc;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.d2 {
  position: relative;
  float: left;
  width: 13px;
  height: 13px;
  background-color: #909399;
  border-radius: 3px;
  margin: 5px;
  /* margin-left:10px ; */
}
.d3 {
  position: relative;
  float: left;
  margin-top: -18px;
  margin-left: 7px;
}
.box-title {
  font-weight: normal;
  display: inline-block;
  font-size: 18px;
  margin: 0;
  line-height: 1;
}
.ec1 {
  position: relative;
  float: left;
  /* margin-left: -250px; */
}
</style>
