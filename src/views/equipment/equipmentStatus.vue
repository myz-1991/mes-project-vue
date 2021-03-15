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
      <el-row>
        <el-col :span="24">
          <div class="d1">
            <div class="d2"></div>
            <div class="d3">
              <h5>关机：5台</h5>
            </div>
            <div
              class="d2"
              style="background-color: #67c23a; margin-left: 20px"
            ></div>
            <div class="d3">
              <h5>运行：5台</h5>
            </div>
            <div
              class="d2"
              style="background-color: #f56c6c; margin-left: 20px"
            ></div>
            <div class="d3">
              <h5>报警：0台</h5>
            </div>
          </div>
        </el-col>
      </el-row>
      <div
        :class="index > 2 ? 'ddd1' : 'ddd2'"
        v-for="(item, index) in dataList"
        :key="item"
        :offset="index > 0 ? 2 : 0"
      >
        <div style="width: 85%; margin-left: 20px">
          <h6 style="color: white">{{ item.objecttype }}</h6>
        </div>
        <img
          :src="images.png_0_1"
          style="
            float: left;
            width: 40px;
            height: 40px;
            margin-left: 240px;
            margin-top: -15%;
          "
        />
        <div
          style="
            border-bottom: 1px solid white;
            width: 85%;
            margin-top: -8%;
            margin-left: 20px;
          "
        >
          <h2 style="color: white">{{ item.objectname }}</h2>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { findTypeValues, findMdcCollectionObjectAll } from "@/api/a/a";
export default {
  data() {
    return {
      images: {
        png_0_1: require("@/assets/equipment/warn.png"),
      },
      err: "F-09878",
      tableHeight: document.documentElement.clientHeight - 10 + "px",
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
    this.gantt();
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
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "设备仪表盘", //标题文本内容
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
            detail: { formatter: "{value}%" },
            data: [{ value: 45, name: "利用率" }],
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
