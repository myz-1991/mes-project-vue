<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible">
    <el-table v-loading="dataListLoading" :data="matePreparaList" border style="width: 100%">
      <el-table-column type="selection" align="center" width="50" />
      <el-table-column prop="mateCode" header-align="center" align="center" label="物料编码" />
      <el-table-column prop="mateName" header-align="center" align="center" label="物料名称" />
      <el-table-column prop="mateDesignNumber" header-align="center" align="center" label="物料图号" />
      <el-table-column prop="mateSpecifications" header-align="center" align="center" label="物料规格" />
      <el-table-column prop="mateTypeName" header-align="center" align="center" label="物料类型" />
      <el-table-column prop="mateUnitName" header-align="center" align="center" label="计量单位" />
      <el-table-column prop="mapeNum" header-align="center" align="center" label="需求数量" />
      <el-table-column prop="mapePrepareNum" header-align="center" align="center" label="已准备数量" />
      <!-- <el-table-column align="center" label="操作" width="200">
				<template slot-scope="scope">
					<el-button size="mini" icon="el-icon-edit" type="primary" @click="addOrUpdateHandle('2', scope.row.mateId)" round>修改</el-button>
					<el-button size="mini" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row.mateId)" round>删除</el-button>
				</template>
			</el-table-column> -->
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      titleText: '物料齐套',
      dataListLoading: false,
      matePreparaList: []
    }
  },
  methods: {
    init(id) {
      this.visible = true
      this.initMatePreparaList(id)
    },
    initMatePreparaList(id) {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornPlanUrl('/plan/v1/materialPrepara/selectMaterialPreparationByTaskId'),
        method: 'get',
        params: {
          taskId: id
        }
      }).then(({
        data
      }) => {
        this.visible = true
        this.dataListLoading = false
        if (data) {
          this.matePreparaList = data
        }
      })
    }
  }
}
</script>

<style>
</style>
