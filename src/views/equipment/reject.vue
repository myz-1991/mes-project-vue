<!-- 不合格品 -->
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
    <el-card
      style="position: relative; float: left; width: 50%; margin-left: 10px"
    >
      <div id="reject" :style="{ width: '95%', height: '350px' }"></div>
    </el-card>
    <el-card
      style="position: relative; float: left; width: 48.2%; margin-left: 10px"
    >
      <div
        id="rejectType"
        :style="{ width: '95%', height: '350px' }"
      ></div>
    </el-card>
    <el-card style="float: left;width: 99%;margin-left: 10px;margin-top: 10px;">
        <div id="myYieldDay" :style="{ width: '95%', height: '350px' }"></div>
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
    this.utilizationRatio();
    this.myYieldDay();
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
      let myChart = this.$echarts.init(
        document.getElementById("reject")
      );
      // 绘制图表
      myChart.setOption({
        title: {
          text: "不合格品设备占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          type: "scroll",
          data: ["一号机", "sv", "a", "b", "c", "d", "e"],
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
            name: "设备名称",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                name: "一号机",
                value: 30,
              },
              {
                name: "sv",
                value: 30,
              },
              {
                name: "a",
                value: 30,
              },
              {
                name: "b",
                value: 30,
              },
              {
                name: "c",
                value: 30,
              },
              {
                name: "d",
                value: 30,
              },
              {
                name: "e",
                value: 30,
              },
            ],
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
        document.getElementById("rejectType")
      );
      myChart.setOption({
        title: {
          text: "缺陷类型占比",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          left: "center",
          top: "bottom",
          type: "scroll",
          data: ["夹渣"],
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
            name: "缺陷名称",
            type: "pie",
            radius: "55%",
            center: ["50%", "50%"],
            data: [
              {
                name: "夹渣",
                value: 30,
              }
            ],
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
    myYieldDay() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myYieldDay"));
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
          text: "设备产出不合格品数量", //标题文本内容
        },
        legend: {
          data: ["次品数量"],
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
            name: "次品数量",
            type: "bar",
            barWidth: "60%",
            data: [10, 52, 200, 334, 390, 330, 220],
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
