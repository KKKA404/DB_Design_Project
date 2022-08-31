<template>
  <el-main
    style="display: flex; justify-content: center; align-items: flex-start"
  >
    <el-card style="width: 70%">
      <div slot="header" class="clearfix">
        <h1 style="float: left; margin-left: 15px">志愿申请表单</h1>
      </div>
      <!-- 以下是表单形式 -->
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="您的ID" prop="ID">
          <el-input v-model="ruleForm.ID"></el-input>
        </el-form-item>
        <el-form-item label="您的名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="地区" prop="district">
          <el-input v-model="ruleForm.district"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="location">
          <el-input v-model="ruleForm.location"></el-input>
        </el-form-item>
        <el-form-item label="风险等级" prop="riskLevel" align="left">
          <el-radio-group
            v-model="ruleForm.riskLevel"
            style="margin-left: 10px"
          >
            <el-radio label="低风险"></el-radio>
            <el-radio label="中风险"></el-radio>
            <el-radio label="高风险"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="志愿地点" prop="volunteerLocation">
          <el-input v-model="ruleForm.volunteerLocation"></el-input>
        </el-form-item>
        <el-form-item label="服务日期" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="服务类型" prop="volunteerType" align="left">
          <el-select
            v-model="ruleForm.volunteerType"
            placeholder="请输入志愿服务类型类型"
            style="margin-left: 10px"
          >
            <el-option label="秩序引导" value="medical"></el-option>
            <el-option label="扫码登记" value="living"></el-option>
            <el-option label="物资搬运" value="shifting"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item align="left" style="margin-left: 35%">
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<script>
import { submitVolunteerApplication } from '@/api/volunteer';

export default {
  //表单数据传递
  data() {
    return {
      ruleForm: {
        ID: "",
        name: "",
        district: "",
        location: "",
        riskLevel: "",
        volunteerLocation: "",
        date1: "",
        volunteerType: "",
      },
      rules: {
        ID: [
          { required: true, message: "请输入捐赠者ID", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        name: [
          { required: true, message: "请输入捐赠者名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 1 到 5 个字符", trigger: "blur" },
        ],
        district: [
          { required: true, message: "请输入您所在的地区", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        location: [
          {
            required: true,
            message: "请输入您现在居住的地址",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        riskLevel: [
          { required: true, message: "请选择地区风险等级", trigger: "change" },
        ],
        volunteerLocation: [
          {
            required: true,
            message: "请输入您的志愿服务地点地址",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        volunteerType: [
          { required: true, message: "请选择志愿服务类型", trigger: "change" },
        ],
        // itemType: [
        //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        // ],
        // riskLevel: [
        //   { required: true, message: '请选择地区风险等级', trigger: 'change' }
        // ],
        // desc: [
        //   { required: true, message: '请填写活动形式', trigger: 'blur' }
        // ]
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          submitVolunteerApplication(this.ruleForm).then((resp) => {
            if (resp.code == 20000) {
              this.$message("志愿报名提交成功");
            }
          });
        } else {
          console.log("error submit!!");
          return false;
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
