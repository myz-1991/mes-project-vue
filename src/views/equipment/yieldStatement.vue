<!-- 产量信息报表 -->
<template>
  <div :height="tableHeight">
    <el-card style="width: 99%; margin: 10px" class="box-1">
      <div class="text item">
        <el-date-picker
          v-model="startEndDate"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="dateChange"
        />

        <!-- <el-button style="margin-left: 10px" type="primary">查询</el-button> -->
      </div>
    </el-card>
    <el-card
      style="position: relative; float: left; width: 40%; margin-left: 10px"
    >
      <div id="myYieldProduct" :style="{ width: '95%', height: '300px' }"></div>
    </el-card>
    <el-card
      style="position: relative; float: left; width: 27.2%; margin-left: 10px"
    >
      <div
        id="utilizationRatio"
        :style="{ width: '95%', height: '300px' }"
      ></div>
    </el-card>
    <el-card
      style="position: relative; float: left; width: 30.2%; margin-left: 10px"
    >
      <div id="a" :style="{ width: '95%', height: '300px' }"></div>
    </el-card>
    <el-card
      style="
        position: relative;
        float: left;
        width: 99%;
        margin-left: 10px;
        margin-top: 10px;
      "
    >
      <div id="fifteenYield" :style="{ width: '98%', height: '350px' }"></div>
    </el-card>
  </div>
</template>

<script>
import {
  findTypeValues,
  fifteenYield,
  OEE,
  oneProductNum,
  ganttChart,
} from "@/api/a/a";
import { formatDate } from "@/utils/date";
import echarts from "echarts";
export default {
  name: "YieldStatement",
  data() {
    return {
      name: this.$route.params.name,
      ip: this.$route.params.ip,
      // name:'2X光机',
      // ip:'172.16.82.13',
      tableHeight: document.documentElement.clientHeight - 500 + "px",
      input: "",
      equipmentLength: "",
      dataList: "",
      startEndDate: "",
      tableData: null,
      outputList: [],
      yieldList: [],
      rejectList: [],
      equipmentName: "",
      dateList: [],
      percentList: [],
      value: "",
      productName: [],
      productNum: [],
      query: {
        name: this.$route.params.name,
        ip: this.$route.params.ip,
        startDate: "",
        endDate: "",
      },
    };
  },
  created() {
    // this.initGantt()
  },
  mounted() {},
  activated() {
    this.ip = this.$route.params.ip;
    this.name = this.$route.params.name;
    this.query.ip = this.$route.params.ip;
    this.query.name = this.$route.params.name;
    this.initEq();
    this.initUt();
    this.initDrawLine();
    this.initGantt();
    // this.gantt();
    // var errorInput = this.$route.params.aa
    // if (errorInput !== null && errorInput !== '') {
    //   this.qrCode = errorInput
    // }
  },
  methods: {
    dateChange(val) {
      if (this.startEndDate) {
        // formatDate
        this.query.startDate = formatDate(
          this.startEndDate[0],
          "yyyy/MM/dd hh:mm:ss"
        );
        this.query.endDate = formatDate(
          this.startEndDate[1],
          "yyyy/MM/dd hh:mm:ss"
        );
      } else {
        this.query.startDate = "";
        this.query.endDate = "";
      }
      this.initUt();
      this.initDrawLine();
    },
    initEq() {
      fifteenYield({ name: this.name, ip: this.ip }).then((respone) => {
        this.dataList = JSON.parse(respone.data);
        this.dataList = this.dataList.data;
        for (let i = 0; i < this.dataList.length; i++) {
          this.outputList.push(this.dataList[i].output);
          this.yieldList.push(this.dataList[i].yield);
          this.rejectList.push(this.dataList[i].reject);
          this.equipmentName = this.dataList[i].equipmentName;
          this.dateList.push(this.dataList[i].date);
          this.percentList.push(this.dataList[i].percent);
        }
        this.fifteenYield();
      });
    },
    initUt() {
      OEE(this.query).then((respone) => {
        this.value = respone.data;
        this.utilizationRatio();
      });
    },
    initGantt() {
      ganttChart(this.query).then((respone) => {
        console.log(respone.data);
        this.gantt(respone.data);
      });
    },
    initDrawLine() {
      oneProductNum(this.query).then((respone) => {
        var list = JSON.parse(respone.data);
        for (let i = 0; i < list.data.length; i++) {
          this.productName.push(list.data[i].productName);
          // this.productNum.push(list.data[i].productNum)
          var da = {
            name: list.data[i].productName,
            value: list.data[i].productNum,
          };
          this.productNum.push(da);
        }
        this.drawLine();
      });
    },
    gantt(data) {
      var colors = ["#32CD32", "#FF4500", "#696969"]; //两种状态的颜色
      var state = ["正常", "报警", "关机"]; //两种状态
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(
        document.getElementById("myYieldProduct")
      );
      myChart.setOption({
        color: colors,
        tooltip: {
          //提示框
          formatter: function (params) {
            return params.name + ":" + params.value[1] + "~" + params.value[2];
          }, //数据的值
        },
        legend: {
          //图例
          data: state,
          bottom: "1%",
          selectedMode: false, // 图例设为不可点击
          textStyle: {
            color: "#000",
          },
        },
        dataZoom: [
          {
            type: "slider",
            filterMode: "weakFilter",
            showDataShadow: false,
            labelFormatter: "",
          },
          {
            type: "inside",
            filterMode: "weakFilter",
          },
        ],
        grid: {
          //绘图网格
          left: "3%",
          right: "3%",
          top: "1%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          type: "time",
          interval: 3600 * 12 * 1000,
          axisLabel: {
            formatter: function (value) {
              var date = new Date(value);
              return (
                getzf(date.getHours()) +
                ":" +
                getzf(date.getMinutes()) +
                "\n" +
                date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                " "
              );
              function getzf(num) {
                if (parseInt(num) < 10) {
                  num = "0" + num;
                }
                return num;
              }
            },
          },
        },
        yAxis: {
          data: [this.name],
        },
        series: [
          // 用空bar来显示四个图例
          { name: state[0], type: "bar", data: [] },
          { name: state[1], type: "bar", data: [] },
          { name: state[2], type: "bar", data: [] },
          {
            type: "custom",
            renderItem: function (params, api) {
              //自定义的图形元素渲染逻辑，是通过书写 renderItem 函数实现的
              var categoryIndex = api.value(0); //这里使用 api.value(0) 取出当前 dataItem 中第一个维度的数值。
              var start = api.coord([api.value(1), categoryIndex]); // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
              var end = api.coord([api.value(2), categoryIndex]);
              var height = 60; //柱体宽度

              return {
                type: "rect", // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                shape: echarts.graphic.clipRectByRect(
                  {
                    // 矩形的位置和大小。
                    x: start[0],
                    y: start[1] - height / 2,
                    width: end[0] - start[0],
                    height: height,
                  },
                  {
                    // 当前坐标系的包围盒。
                    x: params.coordSys.x,
                    y: params.coordSys.y,
                    width: params.coordSys.width,
                    height: params.coordSys.height,
                  }
                ),
                style: api.style(),
              };
            },
            encode: {
              x: [1, 2], // data 中『维度1』和『维度2』对应到 X 轴
              y: 0, // data 中『维度0』对应到 Y 轴
            },
            data: data,
          },
        ],
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("a"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "加工产品占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          type: "scroll",
          data: this.productName,
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
            },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "产品名称",
            type: "pie",
            radius: "55%",
            center: ["50%", "46%"],
            data: this.productNum,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
    },
    utilizationRatio() {
      let myChart = this.$echarts.init(
        document.getElementById("utilizationRatio")
      );
      myChart.setOption({
        title: {
          text: "OEE", //标题文本内容
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
          //弹窗组件
          formatter: "{a} <br/>{b} : {c}%",
        },
        series: [
          {
            name: "指标",
            type: "gauge",
            detail: { formatter: "{value} %" },
            data: [{ value: this.value, name: "OEE" }],
          },
        ],
      });
    },
    fifteenYield() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("fifteenYield"));
      myChart.setOption({
        title: {
          text: this.equipmentName + " 15天产量趋势图", //标题文本内容
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        legend: {
          data: ["出产量", "合格品", "废品", "一次合格率"],
        },
        xAxis: [
          {
            type: "category",
            data: this.dateList,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "产量",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "废品",
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "一次合格率",
            min: 0,
            max: 100,
            position: "right",
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EE6666",
              },
            },
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "出产量",
            type: "bar",
            data: this.outputList,
          },
          {
            name: "合格品",
            type: "bar",
            data: this.yieldList,
          },
          {
            name: "废品",
            type: "line",
            yAxisIndex: 1,
            data: this.rejectList,
          },
          {
            name: "一次合格率",
            type: "line",
            yAxisIndex: 2,
            data: this.percentList,
          },
        ],
      });
    },
  },
};
</script>
<style>
.d1 {
  position: relative;
  width: 100%;
  height: 30px;
  /* border: 1px red solid; */
}

h2 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
}

.ddd1 {
  position: relative;
  float: left;
  width: 23%;
  height: 170px;
  /* margin-left: 10px; */
  margin: 10px;
  /* border: 1px red solid; */
  background-color: red; /* 不支持线性的时候显示 */
  background-image: linear-gradient(to right, #e54244, #f57c7e);
  border-radius: 5px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
}
.ddd2 {
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
/* .c1 {
   width: 100%;
   height: 100px;
   border: 1px red solid;
 } */
/* .box-card1 {
   position: relative;
   float: left;
    width: 550px;
    height: 370px;
  }
   .box-card2 {
     position: relative;
     float: left;
    width: 55%;
    height: 370px;
  } */

/* .box-card1 {
   position: relative;
   float: left;
    width: 100%;
    height: 370px;
  } */
.ec1 {
  position: relative;
  float: left;
  /* margin-left: -250px; */
}
</style>
