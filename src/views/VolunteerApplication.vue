<template>
    <el-main>
        <!-- 以下是表单形式 -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
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
            <el-form-item label="风险等级" prop="riskLevel">
                <el-radio-group v-model="ruleForm.riskLevel">
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
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;">
                        </el-date-picker>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="服务类型" prop="volunteerType" align="left">
                <el-select v-model="ruleForm.volunteerType" placeholder="请输入志愿服务类型类型">
                    <el-option label="秩序引导" value="medical"></el-option>
                    <el-option label="扫码登记" value="living"></el-option>
                    <el-option label="物资搬运" value="shifting"></el-option>

                </el-select>
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
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </el-main>
</template>

<script>
export default {


    //表单数据传递
    data() {
        return {
            ruleForm: {
                ID: '',
                name: '',
                district:'',
                location: '',
                riskLevel: '',
                volunteerLocation: '',
                date1: '',
                volunteerType: '',

                // delivery: false,
                // itemType: [],
                // resource: '',
                // desc: ''
            },
            rules: {
                ID: [
                    { required: true, message: '请输入捐赠者ID', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入捐赠者名称', trigger: 'blur' },
                    { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
                ],
                district: [
                    { required: true, message: '请输入您所在的地区', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                location: [
                    { required: true, message: '请输入您现在居住的地址', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                riskLevel: [
                    { required: true, message: '请选择地区风险等级', trigger: 'change' }
                ],
                volunteerLocation: [
                    { required: true, message: '请输入您的志愿服务地点地址', trigger: 'blur' },
                    { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
                ],
                date1: [
                    { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                ],
                volunteerType: [
                    { required: true, message: '请选择志愿服务类型', trigger: 'change' }
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
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                //需要添加使捐赠日期不早于购买日期的条件约束
                if (valid) {
                    alert('submit!');
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
