<template>
  <div :height="tableHeight">
    <el-card style="width: 99%; margin: 10px" class="box-1">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-card>
    <el-card style="width: 99%; margin-left: 10px">
      <div
        v-for="(item, index) in 2"
        :key="item"
        :class="index > 2 ? 'ddd1' : 'ddd2'"
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
        >
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
import { findTypeValues, findMdcCollectionObjectAll } from '@/api/a/a'
export default {
  data() {
    return {
      options: [
        {
          value: '1',
          label: '锯钻床'
        },
        {
          value: '2',
          label: '刻码机'
        },
        {
          value: '3',
          label: '熔炼炉'
        },
        {
          value: '4',
          label: '热处理炉'
        },
        {
          value: '5',
          label: '切边机'
        },
        {
          value: '6',
          label: '机床'
        }
      ],
      value: '',
      label: '',
      images: {
        png_0_1: require('@/assets/equipment/warn.png')
      },
      err: 'F-09878',
      tableHeight: document.documentElement.clientHeight - 10 + 'px',
      input: '',
      equipmentLength: '',
      dataList: '',
      startEndDate: ''
    }
  },
  created() {
    this.initEq()
  },
  mounted() {
  },
  methods: {
    dateChange() {},
    initEq() {
      findMdcCollectionObjectAll().then((respone) => {
        var list = respone.data
        this.dataList = respone.data
        this.equipmentLength = list.length
      })
    }
  }
}
</script>
<style>

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

.ec1 {
  position: relative;
  float: left;
  /* margin-left: -250px; */
}
</style>
