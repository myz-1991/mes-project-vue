<template>
  <div class="app-container">
    <el-calendar v-model="value">
      <template slot="dateCell" slot-scope="{date, data}">
        <p :class="data.isSelected ? 'is-selected' : ''" @click="calendarClick()">
          {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : '' }}
        </p>
        <!-- <p class="addBtn" v-show="data.isSelected == true" @click="calendarClick()">添加日程</p> -->
      </template>
    </el-calendar>

    <el-dialog title="排班" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="dataForm" size="small" style="margin-top: -30px; margin-bottom: 5px;">
        <el-button type="primary" icon="el-icon-plus" size="small" round>增加一行</el-button>
      </el-form>
      <el-table ref="processsTable" v-loading="dataListLoading" size="small" :data="dataList" border style="width: 100%">
        <el-table-column type="index" align="center" width="50" />
        <el-table-column header-align="center" align="center" label="生产单元" width="120">
          <template slot-scope="scope">
            <el-select v-model="form.region" placeholder="请选择生产单元">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="班次" width="120">
          <template slot-scope="scope">
            <el-select v-model="form.region" placeholder="请选择班次">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column header-align="center" align="center" label="班组/人员" width="120">
          <template slot-scope="scope">
            <el-select v-model="form.region" placeholder="请选择班组/人员">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="150" fixed="right">
          <template slot-scope="scope">
            <el-button size="small" icon="el-icon-edit" type="primary" circle />
            <el-button size="mini" icon="el-icon-check" type="success" circle />
            <el-button size="small" icon="el-icon-delete" type="danger" circle />
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-form :model="form" label-width="80">
        <el-form-item label="生产单元" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择生产单元">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班次" :label-width="formLabelWidth">
          <el-select v-model="form.region1" placeholder="请选择班次">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="班组/人员" :label-width="formLabelWidth">
          <el-select v-model="form.name" placeholder="请选择班组/人员">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form> -->
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: new Date(),
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        region1: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  },
  methods: {
    calendarClick() {
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
  .is-selected {
    color: #1989FA;
  }

  .addBtn {
    position: absolute;
    z-index: 99;
    display: block;
    width: 65px;
    height: 20px;
    padding: 9px;
    background: rgba(0, 200, 156, .6);
    color: #fff;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px
  }

  .addBtn:hover {
    background: rgba(0, 200, 156, 1);
  }
</style>
