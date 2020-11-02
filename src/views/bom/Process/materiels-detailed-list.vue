<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="80%">
    <el-form size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="物料名称" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.mateId" size="small" v-show="scope.row.show" placeholder="请选择" filterable
            :filter-method="mateSelectionFilter" style="width: 100%;" @change="mateSelection(scope.row.mateId, scope.$index)">
            <el-option v-for="item in materielsList" :key="item.mateId" :label="item.mateName" :value="item.mateId">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.mateName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mateCode" header-align="center" align="center" label="物料编码" width="100">
      </el-table-column>
      <el-table-column prop="mateDesignNumber" size="small" header-align="center" align="center" label="物料图号" width="100">
      </el-table-column>
      <el-table-column prop="mateSpecifications" header-align="center" align="center" label="物料规格" width="100">
      </el-table-column>
      <el-table-column prop="mateTypeName" header-align="center" align="center" label="物料类型" width="100">
      </el-table-column>
      <el-table-column prop="mateSourceName" header-align="center" align="center" label="物料来源" width="100">
      </el-table-column>
      <el-table-column prop="mateBrand" header-align="center" align="center" label="物料牌号" width="110">
      </el-table-column>
      <el-table-column prop="mateUnitName" header-align="center" align="center" label="计量单位" width="100">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="单套数量" width="110">
        <template slot-scope="scope">
          <el-input v-model="scope.row.detaRequirementNum" v-show="scope.row.show" size="small" placeholder="单套数量" style="width: 100%;"></el-input>
          <span v-show="!scope.row.show">{{scope.row.detaRequirementNum}}</span>
        </template>
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
        copyMaterielsList : [],
        materielsList: [],
        procImportantStutasList: [{
            dictCode: 1,
            dictName: '是'
          },
          {
            dictCode: 2,
            dictName: '否'
          }
        ],
        processTypeList: [],
        dataList: [],
        procId: null,
        titleText: '物料清单'
      }
    },
    methods: {
      init(id) {
        //this.dataForm.userId = id || 0
        this.procId = id
        this.getDataList(id)
        this.initMaterielsList()
      },
      getDataList(id) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/detailed/selectMaterialsDetailedByObjectId'),
          method: 'get',
          params: {
            objectId: id
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
      initMaterielsList() {
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/material/selectMaterialByParam'),
          method: 'get'
        }).then(({
          data
        }) => {
          if (data) {
            this.materielsList = data
            this.copyMaterielsList = data
          }
        })
      },
      mateSelectionFilter(val) {
        if (val) {
          this.materielsList = this.copyMaterielsList.filter((item) => {
            if (!!~item.mateName.indexOf(val) || !!~item.mateName.toUpperCase().indexOf(val.toUpperCase())) {
              return true
            }
          })
        } else {
          this.materielsList = this.copyMaterielsList
        }
      },
      mateSelection(newValue, rowIndex) {
        let obj = {};
        obj = this.materielsList.find((item)=>{
        return item.mateId === newValue;
        });
        obj.show = true
        if (this.dataList[rowIndex].detaId != null) {
          obj.detaId = this.dataList[rowIndex].detaId
        }
        if (this.dataList[rowIndex].detaRequirementNum != null) {
          obj.detaRequirementNum = this.dataList[rowIndex].detaRequirementNum
        }
        if (this.dataList[rowIndex].objectId != null) {
          obj.objectId = this.dataList[rowIndex].objectId
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
        if (row.detaId == null) {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/detailed/insertMaterialsDetailed'),
            method: 'post',
            data: this.$http.adornData({
              objectId: this.procId,
              mateId: row.mateId,
              detaRequirementNum: row.detaRequirementNum
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
            url: this.$http.adornBomUrl('/bom/v1/detailed/updateMaterialsDetailed'),
            method: 'put',
            data: this.$http.adornData({
              detaId : row.detaId,
              objectId: row.objectId,
              mateId: row.mateId,
              detaRequirementNum: row.detaRequirementNum
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
          if (row.detaId != null) {
            this.$http({
              url: this.$http.adornBomUrl('/bom/v1/detailed/deleteMaterialsDetailedById'),
              method: 'delete',
              params: {
                detaId: row.detaId
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
