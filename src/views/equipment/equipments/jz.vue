<template>
<div>
   <div
      class="dd1"
      v-for="(item, index) in dataList"
      :key="index"
      :offset="index > 0 ? 2 : 0"
    >
      <!-- <div  >
        </div> -->
      <div
        style="
          border-bottom: 1px solid white;
          width: 100%;
          padding: 15px;
          border-bottom: 2px solid #f4f4f4;
        "
      >
        <a href="javascript:void(0);" @click="GoToNext(item.objectname, item.ip)"><h3 class="box-title">{{ item.objectname }}</h3></a>
        <div class="eq_status" v-show="item.报警状态 === 'False' || item.报警状态 === '0'">
          <span style="color: white">运行</span>
        </div>
        <div class="eq_statusRed" v-show="item.报警状态 === 'True' || item.报警状态 === '1'">
          <span style="color: white">报警</span>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">锯片切割位置:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.锯片切割完成位置 }}
          </div>
          <div style="flex: 2 1 0%">锯片切割速度:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.锯片切割速度 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">锯片空载位置:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.锯片空载位置 }}
          </div>
          <div style="flex: 2 1 0%">锯片空载速度:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.锯片空载速度 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">钻头钻孔位置:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.钻头钻孔位置 }}
          </div>
          <div style="flex: 2 1 0%">钻头钻孔速度:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.钻头钻孔速度 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">钻头空载速度:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.钻头空载速度 }}
          </div>
          <div style="flex: 2 1 0%">钻头空载位置:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.钻头空载位置 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">生产节拍:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.生产节拍 }}
          </div>
          <div style="flex: 2 1 0%">单班加工量:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.单班加工量 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">报警状态:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.报警状态 }}
          </div>
          <div style="flex: 2 1 0%">运行状态:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.运行状态 }}
          </div>
        </div>
      </div>
      <!-- id="myTempo" -->
      <div
        class="myTempo"
        :id="item.id"
        :style="{ width: '400px', height: '230px' }"
      ></div>
    </div>
</div>
</template>
<script>
import { findTypeValues, findMdcCollectionObjectAll } from "@/api/a/a";
export default {
  data() {
    return {
      value: "",
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
    this.loadData();
  },

  mounted() {
      this.timer = setInterval(this.loadData, 10000);
  },
  destroyed() {
    console.log("关闭");
    clearInterval(this.timer);
    this.timer = null;
  },
  methods: {
    GoToNext(name, ip){
      this.$router.push({name: 'YieldStatement',params:{ name:name, ip:ip }});
    },
    loadData() {
      // const loading = this.$loading({
      //   lock: true, //lock的修改符--默认是false
      //   text: "Loading", //显示在加载图标下方的加载文案
      //   spinner: "el-icon-loading", //自定义加载图标类名
      //   background: "rgba(0, 0, 0, 0.7)", //遮罩层颜色
      //   // target: document.querySelector('#table')//loadin覆盖的dom元素节点
      // });
      findTypeValues("锯钻床").then((respone) => {
        this.dataList = respone.data;
        // loading.close();
        // this.$nextTick(function () {
        //   this.drawLine();
        // });
      });
    },
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
    }
  },
};
</script>
