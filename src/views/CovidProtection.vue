<template>
  <div class="content">
    <div>
    <CovidProtectionInfo :CovidProtectionInfoData="CovidProtectionInfoData" />
  </div>
    
  </div>
</template>

<script>
  import Vue from 'vue'
  import CovidProtectionInfo from "../views/CovidProtectionInfo.vue"

    export default {
    // data: () => ({
    //   show3: true
    // }),
  name: 'CovidProtection',
  data(){
    return{
        Covid19InfoData:{},
    }
  },
  created(){
    this.CovidProtectionInfoData={
          note1:"病毒：SARS-CoV-2,其导致疾病命名COVID-19。",
          note2:"传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。",
          note3:"传播途径：经呼吸道飞沫，接触传播是主要的传播途径。",
          note4:"少去人多聚集的区域",
          note5:"戴口罩，常洗手，不聚集，多锻炼",
          note6:"出现以下症状请尽快就医！例如：头疼、发热、咳嗽",
        }
  },
  components: {
    CovidProtectionInfo,
}
}
</script>

<style>
  .content{
    margin-left: 50px;
  }
</style>
