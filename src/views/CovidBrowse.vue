<template>
  <div>
    <CaseNum :CaseNumData="CaseNumData"/>
    <Map />
    <!-- <Covid19Chart /> -->
    <News :NewsData="NewsData" />
  </div>
</template>
 
<script>
import CaseNum from "../views/CaseNum.vue"
import Map from "../views/Map.vue"
//import Covid19Chart from "../views/Covid19Chart"
import News from "../views/News.vue"
 
export default {
  name: 'Home',
  data(){
    return{
        CaseNumData:{},
        NewsData:{},
    }
  },
  created(){
    
    this.$axios.get("http://api.tianapi.com/ncov/index?key=e187c82474d5c0b5c338824d54729d59"
    ).then(res=>{
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
    CaseNum,
    Map,
    //Covid19Chart,
    News,
}
}
</script>