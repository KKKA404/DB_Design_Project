<template>
    <el-main style="display: flex; justify-content: center; align-items: flex-start">
      <el-card style="width: 70%">
        <div slot="header" class="clearfix">
          <h1 style="float: left; margin-left: 15px">添加管理信息</h1>
        </div>
        <el-form style="width: 60%" :model="Emp" :rules="rules" ref="Emp" label-width="100px" class="demo-Emp">
          <el-form-item label="个人编号" :label-width="formLabelWidth" style="width: 50%">
            <el-input placeholder="请输入个人ID" v-model="personId" clearable>
            </el-input>
          </el-form-item>
          <el-form-item label="疫情防控单位ID" :label-width="formLabelWidth" style="width: 50%">
            <el-input placeholder="请输入疫情防控单位ID" v-model="unitId" clearable></el-input>
          </el-form-item>
  
          <el-form-item align="left" style="margin-left: 58.5%">
            <el-button type="primary" @click="submitForm">立即添加</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </template>
  
  <script>
  import { addManageRecord } from '@/api/manage';
  export default {
    data() {
      return {
        personId: "",
        unitId: "",
      };
    },
    methods: {
    //   checkID() {
    //     var IDcard = this.ID;
    //     // length
    //     if (IDcard.length != 18) {
    //       this.$message.error("身份证长度不对！");
    //       return false;
    //     }
  
    //     //1~17 are all numbers?
    //     for (var i = 0; i < 17; i++) {
    //       if (IDcard[i] > "9" || IDcard[i] < "0") {
    //         this.$message.error("身份证前17位并非都是数字！");
    //         return false;
    //       }
    //     }
  
        // 7-14
    //     var birthDate = IDcard.substr(6, 8);
    //     birthDate = parseInt(birthDate, 10);
  
    //     // judge the validity of birthdate
    //     var year = parseInt(birthDate / 10000);
    //     var month = parseInt((birthDate % 10000) / 100);
    //     var day = parseInt(birthDate % 100);
  
    //     var daysPerMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  
    //     var isLeapYear =
    //       year % 400 == 0 || (year % 4 == 0 && year % 100 != 0) ? true : false; // run nian
    //     if (isLeapYear) daysPerMonth[2] = 29;
  
    //     if (month < 1 || month > 12 || day < 1 || day > daysPerMonth[month]) {
    //       this.$message.error("身份证7-14位生日不符条理");
    //       return false;
    //     }
  
    //     //18
    //     var power = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; // = 2^(i-1) mod 11
    //     var check = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"];
    //     var sum = 0;
    //     for (i = 0; i < 17; i++) {
    //       sum += power[i] * parseInt(IDcard[i], 10);
    //     }
  
    //     if (check[sum % 11] != IDcard[17]) {
    //       this.$message.error("身份证校验码不正确(或X未大写");
    //       return false;
    //     }
  
    //     return true;
    //   },
      submitForm() {
        
          addManageRecord({
            personID: this.personId,
            unitID:this.unitId,
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
        
        return;
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
  