<template>
  <div id="index">
    <dv-full-screen-container class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <div class="d-flex jc-center">
          <dv-decoration-10 style="width: 33.3%; height: 0.0625rem" />
          <div class="d-flex jc-center">
            <dv-decoration-8
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
            <div class="title">
              <span class="title-text">设备实时监控</span>
              <dv-decoration-6
                class="title-bototm"
                :reverse="true"
                :color="['#50e3c2', '#67a1e5']"
                style="width: 3.125rem; height: 0.1rem"
              />
            </div>
            <dv-decoration-8
              :reverse="true"
              :color="['#568aea', '#000000']"
              style="width: 2.5rem; height: 0.625rem"
            />
          </div>
          <dv-decoration-10
            style="width: 33.3%; height: 0.0625rem; transform: rotateY(180deg)"
          />
        </div>

        <!-- 第二行 -->
        <div class="d-flex jc-between px-2">
          <div class="d-flex" style="width: 40%">
            <div
              class="react-right ml-4"
              style="
                width: 6.25rem;
                text-align: left;
                background-color: #0f1325;
              "
            >
              <span class="react-before" />
              <span
                class="text"
              ><el-select v-model="value" placeholder="请选择" @change="dataChange()">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.label"
                /> </el-select></span>
            </div>
            <div class="react-right ml-3" style="background-color: #0f1325">
              <span class="text colorBlue" />
            </div>
          </div>
          <div style="width: 40%" class="d-flex">
            <div class="react-left bg-color-blue mr-3">
              <span class="text fw-b">设备状态</span>
            </div>
            <div
              class="react-left mr-4"
              style="
                width: 6.25rem;
                background-color: #0f1325;
                text-align: right;
              "
            >
              <span class="react-after" />
              <span
                class="text"
              >{{ dateYear }} {{ dateWeek }} {{ dateDay }}</span>
            </div>
          </div>
        </div>

        <div class="body-box">
          <!-- 第三行数据 -->
          <div class="content-box">
            <dv-border-box-13>
              <equipmentStatusLeft1 :value="value" />
            </dv-border-box-13>
          </div>

          <!-- 第四行数据 -->
          <div class="">
            <dv-border-box-12>
              <equipmentStatusLeft2 :value="value" />
            </dv-border-box-12>
          </div>
        </div>
      </div>
    </dv-full-screen-container>
  </div>
</template>

<script>
import { formatTime } from '../../utils/indexC.js'
import equipmentStatusLeft1 from './equipmentStatusLeft1'
import equipmentStatusLeft2 from './equipmentStatusLeft2'
export default {
  components: {
    equipmentStatusLeft1,
    equipmentStatusLeft2
  },
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
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    }
  },
  created() {
    this.value = this.options[0].label
  },
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  methods: {
    dataChange() {
      console.log(this.value)
      return this.label
    },
    timeFn() {
      setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      setTimeout(() => {
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" >
@import "../../assets/scss/index.scss";
#app .hideSidebar .sidebar-container {
  width: 3px !important;
}
#app .hideSidebar .sidebar-container:hover {
  width: 54px !important;
}
</style>
<style scoped>
.text >>> .el-input--medium .el-input__inner {
  height: 36px;
  line-height: 36px;
  background-color: #0f1325;
}
</style>
