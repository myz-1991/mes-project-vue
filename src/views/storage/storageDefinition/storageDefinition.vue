<template>
  <div class="app-container">
    <el-form inline="">
      <el-form-item>
        <el-button type="primary" icon="el-icon-refresh" round>刷新</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="visible = true" round>添加</el-button>
        <el-button type="danger" icon="el-icon-delete" round>删除</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy :load="load" :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column prop="date" label="编码" width="180">
      </el-table-column>
      <el-table-column prop="name" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="address" label="类型">
      </el-table-column>
      <el-table-column prop="number" label="存储数量">
      </el-table-column>
      <el-table-column label="操作" align="center" width="150" fixed="right">
        <template slot-scope="scope">
          <el-button size="mini" icon="el-icon-data-analysis" type="success" @click="datielvisible = true" round>存储详情</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="库存空间添加" :visible.sync="visible" width="30%">
      <el-form label-width="60px">
        <el-form-item label="编码">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select style="width: 100%;">
            <el-option value="1">库房</el-option>
            <el-option value="2">库位</el-option>
            <el-option value="3">货架</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align:right;">
        <el-button type="danger" size="small" icon="el-icon-delete" round @click="visible = false">取消</el-button>
        <el-button type="primary" size="small" icon="el-icon-check" round>确定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="存储详情" :visible.sync="datielvisible">
      <el-table style="width: 100%">
        <el-table-column prop="date" label="物料编码" width="180">
        </el-table-column>
        <el-table-column prop="name" label="物料名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="规格">
        </el-table-column>
        <el-table-column prop="address" label="数量">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        datielvisible : false,
        tableData1: [{
          id: 1,
          date: 'DJK',
          name: '刀具库房',
          address: '库房',
          number: '0'
        }, {
          id: 3,
          date: 'CPK',
          name: '产品库房',
          address: '库房',
          number: '0',
          hasChildren: true
        }]
      }
    },
    methods: {
      load(tree, treeNode, resolve) {
        setTimeout(() => {
          resolve([{
            id: 31,
            date: 'KW1',
            name: '库位1',
            address: '库位',
            number: '100'
          }, {
            id: 32,
            date: 'KW2',
            name: '库位2',
            address: '库位',
            number: '50'
          }])
        }, 1000)
      }
    },
  }
</script>

<style>
</style>
