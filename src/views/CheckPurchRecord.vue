<template>
  <el-main>
    <el-tabs v-model="activeName" type="border-card">
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
        <el-button type="box" @click="dialogUnitPurchaseFormVisible = true"
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
        <el-button type="box" @click="dialogDonorPurchaseFormVisible = true"
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

    <!-- Unit Purchase Form -->
    <el-dialog
      title="信息表单（疫情防控单位采购）"
      :visible.sync="dialogUnitPurchaseFormVisible"
    >
      <el-form :model="unitPurchaseForm">
        <el-form-item label="防控单位ID" :label-width="formLabelWidth">
          <el-input
            v-model="unitPurchaseForm.unitID"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="物资ID" :label-width="formLabelWidth">
          <el-input
            v-model="unitPurchaseForm.materialID"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购日期" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              v-model="unitPurchaseForm.purchaseTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogUnitPurchaseFormVisible = false"
          >取 消</el-button
        >
        <el-button type="primary" @click.native.prevent="submitUnitPurchaseForm"
          >确 定</el-button
        >
      </div>
    </el-dialog>

    <!-- Donor Purchase Form -->
    <el-dialog
      title="信息表单（捐赠方采购）"
      :visible.sync="dialogDonorPurchaseFormVisible"
    >
      <el-form :model="donorPurchaseForm">
        <el-form-item label="捐赠方ID" :label-width="formLabelWidth">
          <el-input
            v-model="donorPurchaseForm.donorID"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="物资ID" :label-width="formLabelWidth">
          <el-input
            v-model="donorPurchaseForm.materialID"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="采购日期" :label-width="formLabelWidth">
          <el-col :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              v-model="donorPurchaseForm.purchaseTime"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDonorPurchaseFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="
            (dialogDonorPurchaseFormVisible = false), submitDonorPurchaseForm
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </el-main>
</template>

<script>
export default {
  name: "CheckPurchRecord",
  components: {},
  created() {
    this.$axios.get("/purchaseData").then((res) => {
      console.log(res);
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
      dialogUnitPurchaseFormVisible: false,
      dialogDonorPurchaseFormVisible: false,
      unitPurchaseForm: {
        unitID: this.$store.getters.ID,
        materialID: "",
        purchaseTime: "",
      },
      donorPurchaseForm: {
        donorID: this.$store.getters.ID,
        materialID: "",
        purchaseTime: "",
      },
      formLabelWidth: "120px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    submitUnitPurchaseForm() {
      this.dialogUnitPurchaseFormVisible = false;
      if (
        this.unitPurchaseForm.materialID != "" &&
        this.unitPurchaseForm.purchaseTime != ""
      ) {
        this.$axios
          .post("/purchaseData/unitPurchase", {
            unitID: this.unitPurchaseForm.unitID,
            materialID: this.unitPurchaseForm.materialID,
            purchaseTime: this.unitPurchaseForm.purchaseTime,
          })
          .then((res) => {
            if (res.code == 20000) {
              this.$message("提交成功");
            } else {
              this.$message.error("提交失败");
            }
          })
          .catch(() => {
            this.$message.error("提交失败");
          });
      } else {
        this.$message.error("不完整的信息");
      }
      return;
    },
    submitDonorPurchaseForm() {
      if (
        this.donorPurchaseForm.materialID != "" &&
        this.donorPurchaseForm.purchaseTime != ""
      ) {
        this.$axios
          .post("/purchaseData/donorPurchase", {
            donorID: this.donorPurchaseForm.donorID,
            materialID: this.donorPurchaseForm.materialID,
            purchaseTime: this.donorPurchaseForm.purchaseTime,
          })
          .then((res) => {
            if (res.code == 20000) {
              this.$message("提交成功");
            } else {
              this.$message.error("提交失败");
            }
          })
          .catch(() => {
            this.$message.error("提交失败");
          });
      } else {
        this.$message.error("不完整的信息");
      }
      return;
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
