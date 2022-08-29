<template>
  <el-main>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="防控单位采购" name="first">
        <el-input
          placeholder="请输入物资名称"
          v-model="inputMaterialName"
          clearable
          style="
            width: 40%;
            margin-right: 50px;
            margin-top: 10px;
            margin-bottom: 30px;
          "
        >
        </el-input>
        <el-button type="box" @click="dialogFormVisible = true"
          >提交采购信息</el-button
        >
        <el-table
          :data="searchUnitPurchaseData"
          height="500"
          border
          style="width: 100%"
          :default-sort="{ prop: 'needTime', order: 'descending' }"
        >
          <el-table-column prop="purchaseTime" sortable label="购买时间">
          </el-table-column>
          <el-table-column label="物资信息">
            <el-table-column prop="materialName" label="物资名称">
            </el-table-column>
            <el-table-column prop="materialNum" label="物资数量">
            </el-table-column>
            <el-table-column prop="materialPrice" label="价格">
            </el-table-column>
          </el-table-column>
          <el-table-column label="采购方信息（疫情防控单位）">
            <el-table-column prop="buyerID" label="采购方ID"> </el-table-column>
            <el-table-column prop="buyerName" label="采购方名称">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="捐赠方采购" name="second">
        <el-input
          placeholder="请输入物资名称"
          v-model="inputMaterialName"
          clearable
          style="
            width: 40%;
            margin-right: 50px;
            margin-top: 10px;
            margin-bottom: 30px;
          "
        >
        </el-input>
        <el-button type="box" @click="dialogFormVisible = true"
          >提交采购信息</el-button
        >
        <el-table
          :data="searchDonorPurchaseData"
          height="500"
          border
          style="width: 100%"
          :default-sort="{ prop: 'needTime', order: 'descending' }"
        >
          <el-table-column prop="purchaseTime" sortable label="购买时间">
          </el-table-column>
          <el-table-column label="物资信息">
            <el-table-column prop="materialName" label="物资名称">
            </el-table-column>
            <el-table-column prop="materialNum" label="物资数量">
            </el-table-column>
            <el-table-column prop="materialPrice" label="价格">
            </el-table-column>
          </el-table-column>
          <el-table-column label="采购方信息（捐赠方）">
            <el-table-column prop="buyerID" label="采购方ID"> </el-table-column>
            <el-table-column prop="buyerName" label="采购方名称">
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!-- Form -->
    <!-- <el-dialog title="信息表单" :visible.sync="dialogFormVisible">
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
    </el-dialog> -->
  </el-main>
</template>

<script>
export default {
  name: "CheckPurchRecord",
  components: {},
  created() {
    this.$axios.get("/purchaseData").then((res) => {
      console.log(res);
      console.log(res.unitPurchaseData);
      this.unitPurchaseData = res.unitPurchaseData;
      this.donorPurchaseData = res.donorPurchaseData;
    });
  },
  data() {
    return {
      unitPurchaseData: [],
      donorPurchaseData: [],
      activeName: "first",
      inputMaterialName: "",
      dialogFormVisible: false,
      form: {
        name: "",
        type: "",
        price: "",
        date1: "",
        date2: "",
        delivery: false,
        resource: "",
        desc: "",
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  computed: {
    searchUnitPurchaseData: function () {
      let SearchUnitResult = this.unitPurchaseData.filter(
        (item) =>
          String(item.materialName).indexOf(String(this.inputMaterialName)) > -1
      );
      return SearchUnitResult;
    },
    searchDonorPurchaseData: function () {
      let SearchDonorResult = this.donorPurchaseData.filter(
        (item) =>
          String(item.materialName).indexOf(String(this.inputMaterialName)) > -1
      );
      return SearchDonorResult;
    },
  },
};
</script>
