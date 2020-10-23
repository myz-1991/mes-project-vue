<template>
  <el-dialog :title="titleText" size="small" :close-on-click-modal="false" :visible.sync="visible" width="80%">
    <el-table ref="processsTable" size="small" :data="processRouteList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column prop="provName" header-align="center" align="center" label="工艺名称">
      </el-table-column>
      <el-table-column prop="provCode" header-align="center" align="center" label="工艺编码">
      </el-table-column>
      <el-table-column prop="provDesigner" header-align="center" align="center" label="设计者">
      </el-table-column>
      <el-table-column prop="provDesignDate" header-align="center" align="center" label="定版时间">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.provDesignDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="provRevieweder" header-align="center" align="center" label="审核者">
      </el-table-column>
      <el-table-column prop="provReviewedDate" header-align="center" align="center" label="审核时间">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.provReviewedDate)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="provStutas" header-align="center" align="center" label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.provStutas === 2" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="provUpdateTime" header-align="center" align="center" label="更新时间">
        <template slot-scope="scope">
          <span>{{dataTimeFormat(scope.row.provUpdateTime)}}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        dataListLoading : false,
        titleText: '工艺查看',
        processRouteList: []
      }
    },
    methods: {
      init(id) {
        this.visible = true
          this.dataListLoading = true
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/version/selectProcessVersionParam'),
            method: 'get',
            params: {
              mateId : id
            }
          }).then(({
            data
          }) => {
            if (data) {
              this.processRouteList = data
            }
            this.dataListLoading = false
          })
      },
      dataTimeFormat(dataValue) {
        var date = new Date(dataValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
        return Y+M+D+h+m+s;
      },
      dateFormat(dataValue) {
      	var date = new Date(dataValue);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      	var Y = date.getFullYear() + '-';
      	var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      	var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
      	return Y+M+D;
      },
    }
  }
</script>

<style>
</style>
