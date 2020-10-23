<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="40%">
    <el-form size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="内容类型" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.contType" size="small" v-show="scope.row.show" placeholder="请选择"
            filterable style="width: 100%;" @change="contentTypeChange(scope.row, scope.$index)">
            <el-option v-for="item in contentTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.contTypeName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="生产资源内容" width="150">
        <template slot-scope="scope">
          <el-select v-model="scope.row.contUnitId" size="small" v-show="scope.row.show" placeholder="请选择"
            filterable style="width: 100%;" @change="contUnitChange(scope.row, scope.$index)">
            <el-option v-for="item in contUnitList" :key="item.contUnitId" :label="item.contUnitName" :value="item.contUnitId">
            </el-option>
          </el-select>
          <span v-show="!scope.row.show">{{scope.row.contUnitName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" fixed="right">
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
        contentTypeList: [],
        contUnitList: [],
        dataList: [],
        prodId: null,
        titleText: '生产资源内容查看'
      }
    },
    methods: {
      init(id) {
        //this.dataForm.userId = id || 0
        this.prodId = id
        this.getDataList(id)
        this.initContentTypeList()
      },
      getDataList(id) {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornBomUrl('/bom/v1/content/selectProductionContentByProdId'),
          method: 'get',
          params: {
            prodId: id
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
      initContentTypeList() {
        this.$http({
          url: this.$http.adornSystemUrl('/sys/v1/dictionary/selectDictionaryByParentCode'),
          method: 'get',
          params: {
            dictCode: 'BASE.ProuductContentType'
          }
        }).then(({
          data
        }) => {
          if (data) {
            this.contentTypeList = data
          }
        })
      },
      contentTypeChange(row, rowIndex) {
        this.contUnitList = []

        let obj = {};
        obj = this.contentTypeList.find((item) => {
          return item.dictCode === row.contType;
        });
        row.contTypeName = obj.dictName
        this.dataList.splice(rowIndex, 1, row)
        if (row.contType == 'BASE.ProuductContentType.001') {
          this.$http({
          	url: this.$http.adornSystemUrl('/sys/v1/user/selectUserByParam'),
          	method: 'get'
          }).then(({
          	data
          }) => {
          	if (data) {
              let results = []
              for (let i in data.data) {
                let tempObj = {}
                tempObj.contUnitId = data.data[i].userId
                tempObj.contUnitName = data.data[i].name
                results.push(tempObj)
              }
          		this.contUnitList = results
          	}
          })
        } else if (row.contType == 'BASE.ProuductContentType.002') {
          this.$http({
          	url: this.$http.adornSystemUrl('/sys/v1/organization/selectAllOrganization'),
          	method: 'get',
            params : {
              orgType : 'organization.type.003'
            }
          }).then(({
          	data
          }) => {
          	if (data) {
              let results = []
              for (let i in data) {
                let tempObj = {}
                tempObj.contUnitId = data.data[i].orgId
                tempObj.contUnitName = data.data[i].orgName
                results.push(tempObj)
              }
          		this.contUnitList = results
          	}
          })
        } else {
          this.contUnitList = []
        }
      },
      contUnitChange(row, rowIndex) {
        let obj = {};
        obj = this.contUnitList.find((item) => {
          return item.contUnitId === row.contUnitId;
        });
        row.contUnitName = obj.contUnitName
        this.dataList.splice(rowIndex, 1, row)
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
        debugger
        if (row.contId == null) {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/content/insertProductionContent'),
            method: 'post',
            data: this.$http.adornData({
              prodId : this.prodId,
              contUnitId : row.contUnitId,
              contUnitName : row.contUnitName,
              contType : row.contType,
              contTypeName : row.contTypeName
            })
          }).then(({
            data
          }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.prodId)
              }
            })
          })
        } else {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/content/updateProductionContent'),
            method: 'put',
            data: this.$http.adornData({
              contId : row.contId,
              prodId : row.prodId,
              contUnitId : row.contUnitId,
              contUnitName : row.contUnitName,
              contType : row.contType,
              contTypeName : row.contTypeName
            })
          }).then(({
            data
          }) => {
            this.$message({
              message: '操作成功',
              type: 'success',
              onClose: () => {
                this.getDataList(this.prodId)
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
          if (row.contId != null) {
            this.$http({
              url: this.$http.adornBomUrl('/bom/v1/content/deleteProductionContentById'),
              method: 'delete',
              params: {
                contId :  row.contId
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
                    this.getDataList(this.prodId)
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
