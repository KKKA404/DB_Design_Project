<template>
  <el-main
    style="display: flex; justify-content: center; align-items: flex-start"
  >
    <el-card style="width: 70%">
      <div slot="header" class="clearfix">
        <h1 style="float: left; margin-left: 15px">个人需求表单</h1>
      </div>
      <el-form
        style="width: 60%"
        :model="Emp"
        :rules="rules"
        ref="Emp"
        label-width="100px"
        class="demo-Emp"
      >
        <el-form-item
          label="个人编号"
          :label-width="formLabelWidth"
          style="width: 50%"
        >
          <el-input
            v-model="Emp.personId"
            autocomplete="off"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item
          label="紧急程度"
          :label-width="formLabelWidth"
          style="width: 45%"
        >
          <el-radio v-model="Emp.urgency" label="紧急" align="left"
            >紧急</el-radio
          >
          <el-radio v-model="Emp.urgency" label="一般" align="left"
            >一般</el-radio
          >
        </el-form-item>

        <el-form-item
          label="所需物资种类"
          :label-width="formLabelWidth"
          style="width: 40%"
        >
          <el-select
            v-model="Emp.type"
            clearable
            placeholder="请选择"
            align="left"
            style="margin-left: 10px"
          >
            <!--el-option  v-for="(item, index) in options3" :key="index" :label="item" :value="item"-->
            <el-option
              v-for="item in options3"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所需物资名称" :label-width="formLabelWidth">
          <el-input v-model="Emp.goodsName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="所需物资数量"
          :label-width="formLabelWidth"
          style="width: 40%"
        >
          <el-input-number
            v-model="Emp.num"
            @change="handleChange"
            :min="1"
            :max="10"
            align="left"
            style="margin-left: 10px"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
          <el-input v-model="Emp.content" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item align="left" style="margin-left: 50%">
          <el-button type="primary" @click="submitForm('Emp')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('Emp')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>
<script>
import { submitPersonalRequest } from "@/api/individual.js";
export default {
  data() {
    return {
      options3: [
        {
          value: "食品",
          label: "食品",
        },
        {
          value: "药品",
          label: "药品",
        },
        {
          value: "日用品",
          label: "日用品",
        },
        {
          value: "防护物资",
          label: "防护物资",
        },
      ],
      options2: [
        {
          value: "正常",
          label: "正常",
        },
        {
          value: "咳嗽",
          label: "咳嗽",
        },
        {
          value: "乏力",
          label: "乏力",
        },
        {
          value: "呼吸困难",
          label: "呼吸困难",
        },
        {
          value: "与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等",
          label: "与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等",
        },
      ],
      value: "",
      //这里有疑问？？？之前是只有性别 有男女两个选项，现在又增添了紧急程度urgency选项
      //下面的option是否需要添加其他内容
      formLabelWidth: "120px",
      options1: [
        {
          value: "紧急",
          label: "紧急",
        },
        {
          value: "一般",
          label: "一般",
        },
      ],
      options: [
        {
          value: 1,
          label: "男",
        },
        {
          value: 0,
          label: "女",
        },
      ],
      Emp: {
        demandFormId: "",
        personId: this.$store.getters.ID,
        name: "",
        gender: undefined,
        urgency: "",
        phoneNumber: "",
        IDcard: "",
        health: "",
        type: "",
        goodsName: "",
        num: 0,
        content: "",
      },
      rules: {
        personId: [
          { required: true, message: "请输入个人编号", trigger: "blur" },
        ],
        demandFormId: [
          { required: true, message: "请输入表单编号", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 3 到 20 个字符",
            trigger: "blur",
          },
        ],
        gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
        urgency: [
          { required: true, message: "请输入紧急程度", trigger: "blur" },
        ],
        phoneNumber: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为11个字符", trigger: "blur" },
        ],
        IDcard: [
          { required: true, message: "请输入身份证号码", trigger: "blur" },
          { min: 18, max: 18, message: "长度为18个字符", trigger: "blur" },
        ],
        health: [
          { required: true, message: "请输入健康状况", trigger: "blur" },
        ],
        type: [
          { required: true, message: "请选择所需物资种类", trigger: "blur" },
          { required: true, message: "请填写所需要的物资", trigger: "blur" },
        ],
        goodsName: [
          { required: true, message: "请填写所需要的物资", trigger: "blur" },
        ],
        num: [
          {
            required: true,
            message: "请填写所需要的物资数量",
            trigger: "blur",
          },
        ],
        content: [{ required: false, message: "备注", trigger: "blur" }],
      },
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submitPersonalRequest(this.Emp).then((resp) => {
            if (resp.code == 20000) {
              this.$message("表单提交成功");
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleChange(value) {
      console.log(value);
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
