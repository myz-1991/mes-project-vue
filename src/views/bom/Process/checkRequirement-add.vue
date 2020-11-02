<template>
  <el-dialog :title="titleText" :close-on-click-modal="false" :visible.sync="visible" width="50%">
    <el-form :model="dataForm" size="small" @keyup.enter.native="getDataList()" style="margin-bottom: 5px;">
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addHandle()" round>增加一行</el-button>
    </el-form>
    <el-table ref="processsTable" size="small" :data="dataList" border v-loading="dataListLoading" style="width: 100%">
      <el-table-column type="index" align="center" width="50">
      </el-table-column>
      <el-table-column header-align="center" align="center" label="检验项点名称" width="150">
        <template slot-scope="scope">
            <el-input v-model="scope.row.itemName" v-show="scope.row.show" size="small" placeholder="检验项点名称" style="width: 100%;"></el-input>
            <span v-show="!scope.row.show">{{scope.row.itemName}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="值类型" width="120">
        <template slot-scope="scope">
            <el-select v-model="scope.row.itemType" size="small" v-show="scope.row.show" placeholder="请选择"
              style="width: 100%;">
              <el-option v-for="item in itemTypeList" :key="item.dictCode" :label="item.dictName" :value="item.dictCode">
              </el-option>
            </el-select>
            <el-tag v-show="!scope.row.show" v-if="scope.row.itemType == 2" size="small" type="danger">判断型</el-tag>
            <el-tag v-show="!scope.row.show" v-else size="small">数值型</el-tag>
        </template>
      </el-table-column>
      <el-table-column size="small" header-align="center" align="center" label="标准值" width="100">
        <template slot-scope="scope">
            <el-input v-model="scope.row.itemStandardValue" v-show="scope.row.show" size="small" placeholder="标准值" style="width: 100%;"></el-input>
            <span v-show="!scope.row.show">{{scope.row.itemStandardValue}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mateSpecifications" header-align="center" align="center" label="正误差" width="100">
        <template slot-scope="scope">
            <el-input v-model="scope.row.itemPositiveerror" v-show="scope.row.show" size="small" placeholder="正误差" style="width: 100%;"></el-input>
            <span v-show="!scope.row.show">{{scope.row.itemPositiveerror}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="负误差" width="100">
        <template slot-scope="scope">
            <el-input v-model="scope.row.itemNegativeerror" v-show="scope.row.show" size="small" placeholder="负误差" style="width: 100%;"></el-input>
            <span v-show="!scope.row.show">{{scope.row.itemNegativeerror}}</span>
        </template>
      </el-table-column>
      <el-table-column header-align="center" align="center" label="尺寸" width="100">
        <template slot-scope="scope">
            <el-input v-model="scope.row.itemSize" v-show="scope.row.show" size="small" placeholder="尺寸" style="width: 100%;"></el-input>
            <span v-show="!scope.row.show">{{scope.row.itemSize}}</span>
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
        itemTypeList: [{
            dictCode: 1,
            dictName: '数值型'
          },
          {
            dictCode: 2,
            dictName: '判断型'
          }
        ],
        processTypeList: [],
        dataList: [],
        procId: null,
        titleText: '检验项点'
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
          url: this.$http.adornBomUrl('/bom/v1/checkItem/selectCheckItemByParam'),
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
        if (row.itemId == null) {
          this.$http({
            url: this.$http.adornBomUrl('/bom/v1/checkItem/insertCheckItem'),
            method: 'post',
            data: this.$http.adornData({
              itemName : row.itemName,
              itemType : row.itemType,
              itemStandardValue : row.itemStandardValue,
              itemPositiveerror : row.itemPositiveerror,
              itemNegativeerror : row.itemNegativeerror,
              itemSize : row.itemSize,
              procId : this.procId
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
            url: this.$http.adornBomUrl('/bom/v1/checkItem/updateCheckItemById'),
            method: 'put',
            data: this.$http.adornData({
              itemId : row.itemId,
              itemName : row.itemName,
              itemType : row.itemType,
              itemStandardValue : row.itemStandardValue,
              itemPositiveerror : row.itemPositiveerror,
              itemNegativeerror : row.itemNegativeerror,
              itemSize : row.itemSize,
              procId : this.procId
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
          if (row.itemId != null) {
            this.$http({
              url: this.$http.adornBomUrl('/bom/v1/checkItem/deleteCheckItemById'),
              method: 'delete',
              params: {
                itemId: row.itemId
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
