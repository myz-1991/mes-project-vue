<!-- 产量信息统计 -->
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
        <el-input
          v-model="input"
          placeholder="设备类型"
          style="width: 200px; margin-left: 10px"
        ></el-input>
        <el-button style="margin-left: 10px" type="primary">查询</el-button>
      </div>
    </el-card>
    <el-card style="width: 99%; margin-left: 10px">
      <div id="myYield" :style="{ width: '95%', height: '350px' }"></div>
    </el-card>

    <el-card style="width: 99%; margin-left: 10px; margin-top: 10px">
      <div id="myDayYield" :style="{ width: '95%', height: '350px' }"></div>
    </el-card>
  </div>
</template>

<script>
import { findTypeValues, findMdcCollectionObjectAll } from "@/api/a/a";
export default {
  data() {
    return {
      tableHeight: document.documentElement.clientHeight - 500 + "px",
      input: "",
      equipmentLength: "",
      dataList: "",
      startEndDate: "",
    };
  },
  created() {
    this.initEq();
  },
  mounted() {
    this.drawLine();
    this.drawLineDay();
  },
  methods: {
    dateChange() {},
    initEq() {
      findMdcCollectionObjectAll().then((respone) => {
        var list = respone.data;
        this.dataList = respone.data;
        this.equipmentLength = list.length;
      });
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myYield"));
      // 绘制图表
      myChart.setOption({
        color: ["#049FF1", "#70E1FF"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        title: {
          text: "产量", //标题文本内容
        },
        legend: {
          data: ["产量"],
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
        xAxis: {
          type: "category",
          data: ["1", "2", "3", "4", "5", "6", "7"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "产量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      });
    },
    drawLineDay() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myDayYield"));
      // 绘制图表
      myChart.setOption({
        color: ["#049FF1", "#D14A61"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "cross",
            label: {
              backgroundColor: "#283b56",
            },
          },
        },
        title: {
          text: "各工序设备产量分布信息", //标题文本内容
        },
        legend: {
          data: ["产量", "节拍"],
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
        xAxis: {
          type: "category",
          axisTick: {
            alignWithLabel: true,
          },
          data: ["1", "2", "3", "4", "5", "6", "7"],
        },
        yAxis: [
          {
            type: "value",
            name: "产量",
            position: "right",
            axisLine: {
              lineStyle: {
                color: "#049FF1",
              },
            },
            axisLabel: {
              formatter: "{value} 个",
            },
          },
          {
            type: "value",
            name: "节拍",
            position: "left",
            axisLine: {
              lineStyle: {
                color: "#D14A61",
              },
            },
            axisLabel: {
              formatter: "{value} 个",
            },
          },
        ],
        series: [
          {
            name: "产量",
            type: "bar",
            barWidth: "15%",
            data: [10, 52, 200, 334, 390, 330, 220],
          },
          {
            name: "节拍",
            type: "bar",
            barWidth: "15%",
            yAxisIndex: 1,
            data: [3, 2, 3, 4, 5, 6, 8],
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
