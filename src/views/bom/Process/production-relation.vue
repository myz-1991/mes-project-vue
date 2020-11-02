<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="40%">
    <el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="生产单元名称" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.prodId" size="small" v-show="scope.row.show" placeholder="请选择" filterable
            :filter-method="mateSelectionFilter" style="width: 100%;" @change="mateSelection(scope.row.prodId, scope.$index)">
            <el-option v-for="item in productionList" :key="item.prodId" :label="item.prodName" :value="item.prodId">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.prodName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="prodCode" header-align="center" align="center" label="生产单元编码" width="100">
      </el-table-column>
      <el-table-column prop="prodTypeName" size="small" header-align="center" align="center" label="生产单元类型" width="100">
      </el-table-column>
      <el-table-column align="center" label="操作" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" icon="el-icon-edit" type="primary" @click="editHandle(scope.row)" circle></el-button>
          <el-button size="mini" icon="el-icon-check" type="success" @click="submitFormHandle(scope.row)" circle></el-button>
          <el-button size="small" icon="el-icon-delete" type="danger" @click="deleteHandle(scope.row, scope.$index)" circle></el-button>
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
        dataListLoading: false,
        copyProductionList : [],
        productionList: [],
        dataList: [],
        procId: null,
        titleText: '生产单元'
      }
    },
    methods: {
      init(id) {
        //this.dataForm.userId = id || 0
        this.procId = id
        this.getDataList(id)
        this.initProudctionsList()
      },
      getDataList(id) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/procProdRela/selectProcessProductionRelationByProcId'),
          method: 'get',
          params: {
            procId : id
          }
        }).then(({
          data
        }) => {
          this.dataListLoading = false
          this.visible = true
          if (data) {
            let resultList = []
            for (let i in data) {
              data[i].show = false
              resultList.push(data[i])
            }
            this.dataList = resultList
          }
        })
      },
      // 初始化物料类型可选项
      initProudctionsList() {
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/production/selectProductionByParam'),
          method: 'get'
        }).then(({
          data
        }) => {
          if (data) {
            this.productionList = data
            this.copyProductionList = data
          }
        })
      },
      mateSelectionFilter(val) {
        if (val) {
          this.materielsList = this.copyMaterielsList.filter((item) => {
            if (!!~item.prodName.indexOf(val) || !!~item.prodName.toUpperCase().indexOf(val.toUpperCase())) {
              return true
            }
          })
        } else {
          this.productionList = this.copyProductionList
        }
      },
      mateSelection(newValue, rowIndex) {
        let obj = {};
        obj = this.productionList.find((item)=>{
        return item.prodId === newValue;
        });
        obj.show = true
        if (this.dataList[rowIndex].ppreId != null) {
          obj.ppreId = this.dataList[rowIndex].ppreId
        }
        if (this.dataList[rowIndex].procId != null) {
          obj.procId = this.dataList[rowIndex].procId
        }
        // row = obj
        this.dataList.splice(rowIndex, 1, obj)
      },
      // 初始化物料类型可选项
      addHandle() {
        let addRow = {}
        addRow.show = true
        this.dataList.push(addRow)
      },
      editHandle(row) {
        row.show = true
      },
      // 表单提交
      submitFormHandle(row) {
        row.show = false;
        if (row.ppreId == null) {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/procProdRela/insertProcessProductionRelation'),
            method: 'post',
            data: this.$http.adornData({
              procId : this.procId,
              prodId : row.prodId
            })
          }).then(({
            data
          }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.procId)
              }
            })
          })
        } else {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/procProdRela/updateProcessProductionRelation'),
            method: 'put',
            data: this.$http.adornData({
              ppreId : row.ppreId,
              procId: row.procId,
              prodId: row.prodId
            })
          }).then(({
            data
          }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.procId)
              }
            })
          })
        }

      },
      deleteHandle(row, rowIndex) {
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.ppreId != null) {
            this.$http({
              url: this.$http.adornBomUrl('/bom/v1/procProdRela/deleteProcessProductionRelationById'),
              method: 'delete',
              params: {
                ppreId : row.ppreId
              }
            }).then(({
              data
            }) => {
              this.visible = true
              if (data) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  onClose: () => {
                    this.getDataList(this.procId)
                  }
                })
              }
            })
          } else {
            this.dataList.splice(rowIndex, 1)
          }
        }).catch(() => {})
      }
    }
  }
</script>
