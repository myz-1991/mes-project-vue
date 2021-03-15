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
          <div style="flex: 2 1 0%">主轴负载:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.主轴负载 }}
          </div>
          <div style="flex: 2 1 0%">进给速度:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.进给速度 }}
          </div>
        </div>
      </div>

      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">运行模式:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.运行模式 }}
          </div>
          <div style="flex: 2 1 0%">报警信息:</div>
          <div
            style="
              text-align: right;
              flex: 1 1 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.报警信息 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">当前加工程序名:</div>
          <div
            style="
              text-align: right;
              flex: 2 2 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.当前加工程序名 }}
          </div>
          <div style="flex: 2 1 0%">开机时间:</div>
          <div
            style="
              text-align: right;
              flex: 2 2 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.开机时间 }}
          </div>
        </div>
      </div>
      <div class="col-md-12" style="width: 100%; padding: 10px">
        <div style="display: flex">
          <div style="flex: 2 1 0%">运行时间:</div>
          <div
            style="
              text-align: right;
              flex: 2 2 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.运行时间 }}
          </div>
          <div style="flex: 2 1 0%">切削时间:</div>
          <div
            style="
              text-align: right;
              flex: 2 2 0%;
              border: 1px solid lightgray;
              margin-right: 10px;
            "
          >
            {{ item.切削时间 }}
          </div>
        </div>
      </div>  
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
      findTypeValues("机加").then((respone) => {
        this.dataList = respone.data;
        // loading.close();
        // this.$nextTick(function () {
        //   this.drawLine();
        // });
      });
    }
  },
};
</script>

<style scoped>
		.dd1 {
  width: 31%;
  height: 450px;
}
</style>

