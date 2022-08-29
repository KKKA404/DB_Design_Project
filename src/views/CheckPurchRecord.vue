<template>
  <el-main>
    <el-input placeholder="请输入需求方ID/名称" v-model="input" clearable>
    </el-input>
    <el-button type="box" @click="dialogFormVisible = true">提交采购信息</el-button>
    <el-table
      :data="searchData"
      height="500"
      border
      style="width: 100%"
      :default-sort="{ prop: 'needTime', order: 'descending' }"
    >
      <el-table-column prop="purchaseTime" sortable label="购买时间"> </el-table-column>
      <el-table-column label="物资信息">
       <el-table-column prop="materialName" label="物资名称"> </el-table-column>
       <el-table-column prop="materialNum" label="物资数量"> </el-table-column>
       <el-table-column prop="materialPrice" label="价格"> </el-table-column>
      </el-table-column>
      <el-table-column label="疫情防控单位信息">
       <el-table-column prop="materialName" label="采购方种类"> </el-table-column>
       <el-table-column prop="materialNum" label="采购方名称"> </el-table-column>
      </el-table-column>
    </el-table>

    <!-- Form -->
      
    <el-dialog title="信息表单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="物资名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物资类型" :label-width="formLabelWidth">
          <el-select v-model="form.type" placeholder="请选择物资类型">
            <el-option label="食品" value="食品"></el-option>
            <el-option label="生活用品" value="生活用品"></el-option>
            <el-option label="其它" value="其它"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="物资单价" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="保质期" :label-width="formLabelWidth">
          <el-input v-model="form.date2" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>

  </el-main>
</template>

<script>
// import SideBar from "../components/SideBar.vue";
// import BottomFooter from "../components/BottomFooter.vue";
// import NavBar from "../components/NavBar.vue";
//
export default {
  name: "CheckPurchRecord",
  components: {
    // SideBar,
    // BottomFooter,
    // NavBar,
  },
  data() {
    return {
      input: "",
      needData: [
        {
          needName: "bc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,

          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "c",
          needID: 2,
          needTime: "2022.7.22",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
        {
          needName: "fbc",
          needID: 2,
          needTime: "2022.7.20",
          needdOrganization: "Huangduligong",
          needdOrganizationID: 65742,
          city: "Shanghai",
          district: "Jiading",
          contactAddress: "caoangonglu 4800",
        },
      ],
      dialogFormVisible: false,
      form: {
        name: '',
        type: '',
        price: '',
        date1: '',
        date2: '',
        delivery: false,
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.needData.filter(
        (item) =>
          String(item.needID) == this.input || item.needName == this.input
      );
      return SearchResult;
    },
  },
};
</script>

<style>
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
