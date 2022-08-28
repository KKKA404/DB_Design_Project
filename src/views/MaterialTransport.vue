<template>
<div>
  <el-input placeholder="请输入内容" v-model="nameInput" class="input-with-select" style="width:40%">
    <el-select v-model="cname" slot="prepend" placeholder="请选择" @change="getKey">
      <el-option label="物资名称" value="material_name"></el-option>
      <el-option label="物资种类" value="required_supplies_types"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
  </el-input>

  <el-table
    :data="searchData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="transport_id"
      label="物流编号"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="material_name"
      label="物资名称"
      width="150">
    </el-table-column>
    <el-table-column
      prop="required_supplies_types"
      label="物资种类"
      width="120">
    </el-table-column>
    <el-table-column
      prop="order_time"
      label="下单时间"
      width="180">
    </el-table-column>
    <el-table-column
      label="物流状态"
      prop="state"
      width="120">
    </el-table-column>
    <el-table-column
      prop="required_supplies_num"
      label="物资数量"
      width="100">
    </el-table-column>
    <el-table-column
      prop="courier_name"
      label="快递员姓名"
      width="120">
    </el-table-column>
   <el-table-column width="120" label="操作" fixed="right">
      <template slot-scope="scope">
        <el-button @click="dialogItemsVisible = true,showDetail(scope.row)" type="text" size="small">查看详情</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <el-pagination
      @current-change="handleCurrentChange"
      :page-size="6"
      layout="total, prev, pager, next"
      :total="total">
    </el-pagination>

<el-dialog title="详情" :visible.sync="dialogItemsVisible" slot>
    <el-descriptions 
    class="margin-top" 
    title="物流详细信息" 
    :column="3" 
    :size="size" 
    :data="getRowData"
    border>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        物流编号
      </template>
      {{fake_supplies_detaildata.transport_id}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-truck"></i>
        物流状态
      </template>
      {{fake_supplies_detaildata.state}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-time"></i>
        下单时间
      </template>
      {{fake_supplies_detaildata.order_time}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        运输员姓名
      </template>
      {{fake_supplies_detaildata.courier_name}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        运输员手机号
      </template>
      {{fake_supplies_detaildata.courier_phone}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        运输员编号
      </template>
      {{fake_supplies_detaildata.courier_id}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        起始地
      </template>
      {{fake_supplies_detaildata.departure}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        当前位置
      </template>
      {{fake_supplies_detaildata.current_location}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        目的地
      </template>
      {{fake_supplies_detaildata.destination}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        物资名称
      </template>
      {{fake_supplies_detaildata.material_name}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-copy-document"></i>
        物资种类
      </template>
      {{fake_supplies_detaildata.required_supplies_types}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-coin"></i>
        物资数量
      </template>
      {{fake_supplies_detaildata.required_supplies_num}}
    </el-descriptions-item>
  </el-descriptions>

  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogItemsVisible = false">确 定</el-button>
  </div>
</el-dialog>
  </div>

</div>

</template>

<script>
  export default {
    methods: {
      showDetail (row) {
      this.show = true //控制弹窗显示
      this.fake_supplies_detaildata.courier_id=row.courier_id
      this.fake_supplies_detaildata.courier_name=row.courier_name
      this.fake_supplies_detaildata.courier_phone=row.courier_phone
      this.fake_supplies_detaildata.current_location=row.current_location
      this.fake_supplies_detaildata.departure=row.departure
      this.fake_supplies_detaildata.destination=row.destination
      this.fake_supplies_detaildata.material_name=row.material_name
      this.fake_supplies_detaildata.order_time=row.order_time
      this.fake_supplies_detaildata.required_supplies_num=row.required_supplies_num
      this.fake_supplies_detaildata.required_supplies_types=row.required_supplies_types
      this.fake_supplies_detaildata.state=row.state
      this.fake_supplies_detaildata.transport_id=row.transport_id
      }
    },
    created() {
      this.$axios.get("/fake_supplies_data").then((res) => {
        this.fake_supplies_data = res.fake_supplies_data;
      });
    },

    data() {

      return {
        fake_supplies_detaildata:{
          transport_id: "",
          material_name: "",
          required_supplies_types: "",
          order_time:"",
          state: "",
          required_supplies_num: 2,
          courier_name: "",
          courier_id:"",
          courier_phone:"",
          departure:"",
          destination:"",
          current_location:"",
        },
        fake_supplies_data: [ ],
        value: '',
        cname:'',
        nameInput:'',
        //searchKey:"",
        options: [],
        list: [],
        loading: false,
        tableData: null,
        total:null,
        dialogTableVisible: false,
        dialogItemsVisible: false,
         formLabelWidth: '120px',
         LabelWidth: '180px',
      }
    },
    computed: {
    searchData: function () {
      let SearchResult = this.fake_supplies_data.filter(
        (item) =>
          String(item.material_name).indexOf(String(this.nameInput)) > -1 
          // &&
          // item.required_supplies_types.indexOf(this.required_supplies_typesInput) > -1
      );

      return SearchResult;
    },
  },
  }
</script>
<style>
  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }
  .red{
    color: red;
  }
</style>