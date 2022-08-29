<template>
  <el-main>
    <!-- 以下是单个输入框形式 -->
    <!-- <el-row :gutter="20">
      <el-col :span="6">
        <div class="demo-input-suffix">
          捐赠方：
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="请输入捐赠方ID" v-model="inputDonatorID">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="请输入捐赠方名称" v-model="inputDonatorName">
          </el-input>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="demo-input-suffix">
          捐赠物资：
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="请输入捐赠物资编号" v-model="inputItemID">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-input placeholder="请输入捐赠物资名称" v-model="inputItemName">
          </el-input>
        </div>
      </el-col>
      <el-col :span="6">
        <div>
          <el-select v-model="value" clearable placeholder="请选择捐赠物资种类">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="demo-input-suffix">
          采购时间：
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <el-date-picker v-model="value1" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="6">
        <div class="demo-input-suffix">
          捐赠时间：
        </div>
      </el-col>
      <el-col :span="6">
        <div class="block">
          <el-date-picker v-model="value2" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </el-col>
    </el-row> -->

    <!-- 以下是表单形式 -->
    <el-form :model="donateForm" :rules="rules" ref="donateForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="捐赠方ID" prop="donorID">
        <el-input v-model="donateForm.donorID"></el-input>
      </el-form-item>
      <el-form-item label="捐赠方名称" prop="name">
        <el-input v-model="donateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="物资编号" prop="goodsID">
        <el-input v-model="donateForm.goodsID"></el-input>
      </el-form-item>
      <el-form-item label="物资名称" prop="goodsName">
        <el-input v-model="donateForm.goodsName"></el-input>
      </el-form-item>
      <el-form-item label="物资类型" prop="goodsType" align="left">
        <el-select v-model="donateForm.goodsType" placeholder="请输入物资类型">
          <el-option label="医护用品" value="medical"></el-option>
          <el-option label="生活用品" value="living"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="采购时间" required>
        <el-col :span="11">
          <el-form-item prop="date1">
            <el-date-picker type="date" placeholder="选择日期" v-model="donateForm.date1" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="捐赠时间" required>
        <el-col :span="11">
          <el-form-item prop="date2">
            <el-date-picker type="date" placeholder="选择日期" v-model="donateForm.date2" style="width: 100%;">
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <!-- <el-form-item label="即时配送" prop="delivery">      是非型
        <el-switch v-model="ruleForm.delivery"></el-switch>
      </el-form-item>
      <el-form-item label="物资类型" prop="itemType">             多选型
        <el-checkbox-group v-model="ruleForm.type">
          <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
          <el-checkbox label="地推活动" name="type"></el-checkbox>
          <el-checkbox label="线下主题活动" name="type"></el-checkbox>
          <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="特殊资源" prop="resource">               单选型
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="线上品牌商赞助"></el-radio>
          <el-radio label="线下场地免费"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('donateForm')">提交捐赠信息</el-button>
        <el-button @click="resetForm('donateForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </el-main>
</template>

<script>
export default {
  //单输入框数据传递
  // data() {
  //   return {
  //     // inputDonatorID: "",
  //     // inputDonatorName: "",
  //     // inputItemID: "",
  //     // inputItemName: "",

  //     // options: [{
  //     //   value: '选项1',
  //     //   label: '医护用品'
  //     // }, {
  //     //   value: '选项2',
  //     //   label: '生活物资'
  //     // }],
  //     // value: '',

  //     // pickerOptions: {
  //     //     disabledDate(time) {
  //     //       return time.getTime() > Date.now();
  //     //     },
  //     //     shortcuts: [{
  //     //       text: '今天',
  //     //       onClick(picker) {
  //     //         picker.$emit('pick', new Date());
  //     //       }
  //     //     }, {
  //     //       text: '昨天',
  //     //       onClick(picker) {
  //     //         const date = new Date();
  //     //         date.setTime(date.getTime() - 3600 * 1000 * 24);
  //     //         picker.$emit('pick', date);
  //     //       }
  //     //     }, {
  //     //       text: '一周前',
  //     //       onClick(picker) {
  //     //         const date = new Date();
  //     //         date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
  //     //         picker.$emit('pick', date);
  //     //       }
  //     //     }]
  //     //   },
  //     //   value1: '',
  //     //   value2: ''
  //   };
  // },

  //表单数据传递
  data() {
    return {
      donateForm: {
        donorID: "",
        name: "",
        goodsID: "",
        goodsName: "",
        goodsType: "",
        date1: "",
        date2: "",
      },
      rules: {
        donorID: [
          { required: true, message: '请输入捐赠者ID', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入捐赠者名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        goodsID: [
          { required: true, message: '请输入物资ID', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        goodsName: [
          { required: true, message: '请输入物资名称', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        goodsType: [
          { required: true, message: '请选择物资类型', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //需要添加使捐赠日期不早于购买日期的条件约束
        if (valid) {
          this.$axios.post('/makeDonate',this.donateForm).then((resp)=>{
            if(resp.code==20000){
             this.$message("捐赠提交成功");
            }});
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
/* .el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}

.bg-purple-dark {
  background: #99a9bf;
}

.bg-purple {
  background: #d3dce6;
}

.bg-purple-light {
  background: #e5e9f2;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-header .el-footer {
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

body>.el-container {
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
