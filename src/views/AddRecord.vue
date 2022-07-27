<template>
  <el-form style="width:60%" :model="Emp" :rules="rules" ref="Emp" label-width="100px" class="demo-Emp">
    <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
      <el-input v-model="Emp.name" autocomplete="off"></el-input>
    </el-form-item>

    <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
      <el-radio v-model="Emp.sex" label="男">男</el-radio>
      <el-radio v-model="Emp.sex" label="女">女</el-radio>
    </el-form-item>

    <el-form-item label="紧急程度" :label-width="formLabelWidth" prop="urgency">
      <el-radio v-model="Emp.urgency" label="紧急">紧急</el-radio>
      <el-radio v-model="Emp.urgency" label="一般">一般</el-radio>
    </el-form-item>

    <el-form-item label="手机号码" :label-width="formLabelWidth" prop="phonenum">
      <el-input v-model="Emp.phonenum" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="身份证号码" :label-width="formLabelWidth" prop="IDcard">
      <el-input v-model="Emp.IDcard" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="健康状况" :label-width="formLabelWidth" prop="health">
      <el-select v-model="Emp.health" clearable placeholder="请选择">
        <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所需物资种类" :label-width="formLabelWidth" prop="required_supplies_types">
      <el-select v-model="Emp.required_supplies_types" clearable placeholder="请选择">
        <!--el-option  v-for="(item, index) in options3" :key="index" :label="item" :value="item"-->
        <el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="所需物资" :label-width="formLabelWidth" prop="required_supplies">
      <el-input v-model="Emp.required_supplies" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="所需物资数量" :label-width="formLabelWidth" prop="required_supplies_num">
      <el-input v-model="Emp.required_supplies_num" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="备注" :label-width="formLabelWidth">
      <el-input v-model="Emp.content" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('Emp')">立即创建</el-button>
      <el-button @click="resetForm('Emp')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  //    created() {
  //   axios.get("http://localhost:8080/depart/findAll").then((resp) => {
  //     console.log(resp.data);
  //     this.options3 = resp.data;
  //   });
  // },
  data() {
    return {
      options3: [
        {
          value: "食品",
          label: "食品",
        }, {
          value: "药品",
          label: "药品",
        }, {
          value: "日用品",
          label: "日用品",
        }, {
          value: "防护物资",
          label: "防护物资",
        }],
      options2: [{
        value: '正常',
        label: '无下列情况，身体健康'
      }, {
        value: '咳嗽',
        label: '咳嗽'
      }, {
        value: '乏力',
        label: '乏力'
      }, {
        value: '呼吸困难',
        label: '呼吸困难'
      }, {
        value: '与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等',
        label: '与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等'
      }],
      value: '',
      //这里有疑问？？？之前是只有性别 有男女两个选项，现在又增添了紧急程度urgency选项
      //下面的option是否需要添加其他内容
      formLabelWidth: '120px',
      options1: [{
        value: '紧急',
        label: '紧急'
      }, {
        value: '一般',
        label: '一般'
      }],
      options: [{
        value: '男',
        label: '男'
      }, {
        value: '女',
        label: '女'
      }],
      Emp: {
        name: "",
        sex: "",
        urgency: "",
        phonenum: "",
        IDcard: "",
        health: "",
        required_supplies_types: "",
        required_supplies: "",
        required_supplies_num: "",
        createTime: "",
        content: "",
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请输入性别', trigger: 'blur' }
        ],
        urgency: [
          { required: true, message: '请输入紧急程度', trigger: 'blur' }
        ],
        phonenum: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11个字符', trigger: 'blur' }
        ],
        IDcard: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '长度为18个字符', trigger: 'blur' }
        ],
        health: [
          { required: true, message: '请输入健康状况', trigger: 'blur' }
        ],
        required_supplies_types: [
          { required: true, message: '请选择所需物资种类', trigger: 'blur' },
          { required: true, message: '请填写所需要的物资', trigger: 'blur' }
        ],
        required_supplies: [
          { required: true, message: '请填写所需要的物资', trigger: 'blur' }
        ],
        required_supplies_num: [
          { required: true, message: '请填写所需要的物资数量', trigger: 'blur' }
        ]
      }
    };
  },
  // methods: {

  //   // submitForm(formName) {
  //   //   this.$refs[formName].validate((valid) => {
  //   //     if (valid) {
  //   //       axios.post('http://localhost:8080/emp/save',this.Emp).then((resp)=>{
  //   //         if(resp.data=='success'){
  //   //          this.$alert('打卡成功！',"消息",{
  //   //            confirmButtonText:"确定",
  //   //            callback:action=>{
  //   //              this.$router.push('/RecordManage')
  //   //            }
  //   //          })
  //   //         }
  //   //       })
  //   //     } else {
  //   //       return false;
  //   //     }
  //   //   });
  //   // },
  //   // resetForm(formName) {
  //   //   this.$refs[formName].resetFields();
  //   // }
  // }
}
</script>