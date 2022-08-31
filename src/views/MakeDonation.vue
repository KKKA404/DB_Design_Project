<template>
  <el-main
    style="display: flex; justify-content: center; align-items: flex-start"
  >
    <el-card style="width: 80%">
      <div slot="header" class="clearfix">
        <h1 style="float: left; margin-left: 15px">捐赠表单</h1>
      </div>
      <el-form
        :model="donateForm"
        :rules="rules"
        ref="donateForm"
        label-width="100px"
      >
        <el-form-item label="捐赠方ID" prop="donorID" style="width: 40%">
          <el-input
            v-model="donateForm.donorID"
            style="margin-left: 10px"
          ></el-input>
        </el-form-item>
        <el-form-item label="捐赠方名称" prop="name" style="width: 40%">
          <el-input v-model="donateForm.name"></el-input>
        </el-form-item>
        <el-form-item label="受捐单位ID" prop="unitID" style="width: 40%">
          <el-input v-model="donateForm.unitID"></el-input>
        </el-form-item>
        <el-form-item label="受捐单位名称" prop="unitName" style="width: 40%">
          <el-input v-model="donateForm.unitName"></el-input>
        </el-form-item>
        <el-form-item label="物资编号" prop="goodsID" style="width: 55%">
          <el-input v-model="donateForm.goodsID"></el-input>
        </el-form-item>
        <!-- <el-form-item label="物资名称" prop="goodsName" style="width: 55%">
          <el-input v-model="donateForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item
          label="物资类型"
          prop="goodsType"
          align="left"
          style="width: 40%"
        >
          <el-select
            v-model="donateForm.goodsType"
            placeholder="物资类型"
            style="margin-left: 10px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="采购时间" required style="width: 35%">
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="donateForm.date1"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item> -->
        <el-form-item label="捐赠时间" required style="width: 35%">
          <el-col :span="11">
            <el-form-item prop="date2">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="donateForm.date2"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item align="left" style="margin-left: 35%">
          <el-button type="primary" @click="submitForm('donateForm')"
            >提交捐赠信息</el-button
          >
          <el-button @click="resetForm('donateForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
import { postDonateData } from "@/api/donate";
export default {
  //表单数据传递
  data() {
    return {
      options: [
        {
          value: "medical",
          label: "医护用品",
        },
        {
          value: "living",
          label: "生活用品",
        },
      ],
      donateForm: {
        donorID: "",
        name: "",
        unitID: "",
        unitName: "",
        goodsID: "",
        // goodsName: "",
        // goodsType: "",
        // date1: "",
        date2: "",
      },
      rules: {
        donorID: [
          { required: true, message: "请输入捐赠者ID", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入捐赠者名称", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        unitID: [
          { required: true, message: "请输入防控单位ID", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        unitName: [
          {
            required: true,
            message: "请输入疫情防控单位名称",
            trigger: "blur",
          },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
        goodsID: [
          { required: true, message: "请输入物资ID", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        goodsName: [
          { required: true, message: "请输入物资名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        goodsType: [
          { required: true, message: "请选择物资类型", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //需要添加使捐赠日期不早于购买日期的条件约束
        if (valid) {
          postDonateData(this.donateForm).then((resp) => {
            if (resp.code == 20000) {
              this.$message("捐赠提交成功");
            }
          });
        } else {
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.el-card {
  transition: all 0.25s;
}
.el-card:hover {
  margin-top: -5px;
}
.el-input {
  margin-left: 10px;
}
</style>
