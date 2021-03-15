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
      <el-button-group style="margin-left: 70%">
        <el-button type="primary">日</el-button>
        <el-button type="primary">周</el-button>
        <el-button type="primary">月</el-button>
        <el-button type="primary">年</el-button>
      </el-button-group>
      <div
        id="myUtillization"
        :style="{ width: '95%', height: tableHeight }"
      ></div>
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
      tableHeight: document.documentElement.clientHeight - 300 + "px",
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
      let myChart = this.$echarts.init(
        document.getElementById("myUtillization")
      );
      // 绘制图表
      myChart.setOption({
        color: ["#3398DB"],
        title: {
          text: "设备稼动率", //标题文本内容
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
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: ["1", "2", "3", "4", "5", "6", "7"],
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} %",
            },
          },
        ],
        series: [
          {
            name: "稼动率",
            type: "bar",
            barWidth: "60%",
            data: [10.52, 52.35, 82, 43, 66, 22, 11],
            markLine: {
              symbol: "none",

              /*symbol:"none",               //去掉警戒线最后面的箭头
                           label:{
                               position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束
                            
                            
                           },*/
              data: [
                {
                  silent: false, //鼠标悬停事件  true没有，false有
                  lineStyle: {
                    //警戒线的样式  ，虚实  颜色
                    type: "solid",
                    color: "#FA3934",
                  },
                  label: {
                    position: "end",
                    formatter: "合格线",
                  },
                  yAxis: 50, // 警戒线的标注值，可以有多个yAxis,多条警示线
                },
                //  {

                //      silent:false,             //鼠标悬停事件  true没有，false有
                //      lineStyle:{               //警戒线的样式  ，虚实  颜色
                //          type:"solid",
                //          color:"#FA3934",

                //      },
                //      label:{
                //          position:'end',
                //          formatter:"优秀(350)",
                //          fontSize:'8'
                //      },
                //      yAxis:55           // 警戒线的标注值，可以有多个yAxis,多条警示线

                //  }
              ],
            },
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
