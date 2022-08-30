<template>
    <div class="info">
      <p class="title i">
        <i></i>
        病毒信息
      </p>
      <div class="content">
        <p>{{ CovidProtectionInfoData.note1 }}</p>
        <p>{{ CovidProtectionInfoData.note2 }}</p>
        <p>{{ CovidProtectionInfoData.note3 }}</p>
        <img src="../assets/transmit.jpg" width="800">
      </div>
      <p class="title i">
        <i></i>
        防疫小贴士
      </p>
      <div class="content">
        <p>{{ CovidProtectionInfoData.note4 }}</p>
      <img src="../assets/riskingArea.jpg" width="800" >
      <p>{{ CovidProtectionInfoData.note5 }}</p>
      <img src="../assets/protection.jpg" width="800" >
  
  
      <p>{{ CovidProtectionInfoData.note6 }}</p>
      <img src="../assets/symptom.jpg" width="800" >
  
      </div>
      
    </div>
  </template>
  
  <script>
  //import api from "../api"
  
  export default {
    name: "CovidProtectionInfo",
    props: {
      CovidProtectionInfoData: {
        type: Object,
        default: function () {
          return {};
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .info {
    text-align: left;
    padding: 1rem;
    background: #fff;
    border-bottom: 1px solid #f1f1f1;
  }
  
  .title {
    text-align: left;
    font-size: 1.5rem;
    font-weight: 600;
  }
  
  .title i {
    display: inline-block;
    width: 0.4rem;
    height: 1.6rem;
    margin-right: 0.03rem;
    vertical-align: middle;
    background: #4169e2;
  }
  
  .content {
    padding: 0.6rem 1rem;
  }
  
  .content p {
    font-size: 18px;
    margin: 5px 0;
  }
  
  .picture{
      margin:10px;
  }
  
  
  </style>
  