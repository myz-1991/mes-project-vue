<!-- 报警数据报表 -->
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
        <el-button style="margin-left: 10px" type="primary">导出</el-button>
      </div>
    </el-card>
    <el-card style="float: left;width: 30%; margin-left: 10px">
      <div
        id="myUtillization"
        :style="{ width: '95%', height: '300px' }"
      ></div>
    </el-card>
    <el-card style="float: left;width: 65%; margin-left: 10px">
      <div
        id="my"
        :style="{ width: '95%', height: '300px' }"
      ></div>
    </el-card>
    <el-card style="float: left;width: 96%;margin-left: 10px;margin-top: 10px;">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="date"
        label="序号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="设备名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="报警内容">
      </el-table-column>
      <el-table-column
        prop="date"
        label="开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="结束时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="date"
        label="操作"
        width="180">
      </el-table-column>
    </el-table>
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
        title: {
        text: '报警设备类型占比',
        },
        tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      left: 'center',
        top: 'bottom',
        type: 'scroll',
        data: ['as','sv','a','b','c','d','e']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {
              show: true,
                type: ['pie', 'funnel']
                },
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
          name: '报警',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
              {
                name:'as',
                value:30
              },
              {
                name:'sv',
                value:30
              },
               {
                name:'a',
                value:30
              },
               {
                name:'b',
                value:30
              },
               {
                name:'c',
                value:30
              },
               {
                name:'d',
                value:30
              },
               {
                name:'e',
                value:30
              }
            ],
            emphasis: {
              itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
            }
        }
    ]
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
