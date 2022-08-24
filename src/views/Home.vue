<template>
  <div class="home">
    <Header />
    <covid19Info :Covid19InfoData="Covid19InfoData" />
    <CaseNum :CaseNumData="CaseNumData"/>
    <Map />
    <Covid19Chart />
    <News :NewsData="NewsData" />
  </div>
</template>
 
<script>
import Header from "../views/Header.vue"
import Covid19Info from "../views/Covid19Info.vue"
import CaseNum from "../views/CaseNum.vue"
import Map from "../views/Map.vue"
//import Covid19Chart from "../views/Covid19Chart"
import News from "../views/News.vue"
 
export default {
  name: 'Home',
  data(){
    return{
        Covid19InfoData:{},
        CaseNumData:{},
        NewsData:{},
    }
  },
  created(){
    this.Covid19InfoData={
          note1:"病毒：SARS-CoV-2,其导致疾病命名COVID-19。",
          note2:"传染源：新冠肺炎的患者。无症状感染者也可能成为传染源。",
          note3:"传播途径：经呼吸道飞沫，接触传播是主要的传播途径。",
          note4:"易感人群：人群普遍易感。老年人及有基础疾病者感染后病情较重，儿童及婴幼儿也有发病。",
          note5:"潜伏期：一般为3~7天，最长不超过14天，潜伏期内可能存在传染性，其中无症状病例传染性非常罕见。",
        }
    this.$api.getDataInfo({
        key:"e187c82474d5c0b5c338824d54729d59"
    }).then(res=>{
      console.log(res);
      this.NewsData=res.newslist[0].news;
         this.CaseNumData = {
                // 更新时间戳
              modifyTime:res.newslist[0].desc.modifyTime,
              // 现存确诊人数
              currentConfirmedCount:res.newslist[0].desc.currentConfirmedCount,
              // 累计确诊人数
              confirmedCount:res.newslist[0].desc.confirmedCount,
              // 累计境外输入人数
              suspectedCount:res.newslist[0].desc.suspectedCount,
              // 累计治愈人数
              curedCount:res.newslist[0].desc.curedCount,
              // 累计死亡人数
              deadCount:res.newslist[0].desc.deadCount,
              // 现存无症状人数
              seriousCount:res.newslist[0].desc.seriousCount,
              // 新增境外输入人数
              suspectedIncr:res.newslist[0].desc.suspectedIncr,
              // 相比昨天现存确诊人数
              currentConfirmedIncr:res.newslist[0].desc.currentConfirmedIncr,
              // 相比昨天累计确诊人数
              confirmedIncr:res.newslist[0].desc.confirmedIncr,
              // 相比昨天新增治愈人数
              curedIncr:res.newslist[0].desc.curedIncr,
              // 相比昨天新增死亡人数
              deadIncr:res.newslist[0].desc.deadIncr,
              // 相比昨天现存无症状人数
              seriousIncr:res.newslist[0].desc.seriousIncr
                };
    })
  },
  components: {
    Header,
    Covid19Info,
    CaseNum,
    Map,
    //Covid19Chart,
    News,
}
}
</script>