<template>
  <div class="home">
    <Header />
    <HomeInfo :HomeInfoData="HomeInfoData" />
  </div>
</template>
 
<script>
import Header from "../views/Header.vue"
import HomeInfo from "../views/HomeInfo.vue"
 
export default {
  name: 'Home',
  data(){
    return{
        Covid19InfoData:{},
    }
  },
  created(){
    this.HomeInfoData={
          note1:"前端：孟星羽 朱洵缘 乔同泽 刘家贤 方必诚 唐艺嘉",
          note2:"后端：王若萱 杨海晏 魏珈仪 崔敬文 ",
          note3:"自2020年武汉疫情爆发以来，人类与病毒一直处在敌暗我明的焦灼战斗中，疫情常态化管理已经成为了人们生活中必不可少的一部分，由此也产生了大量而庞杂的管理数据。为了方便这些数据的处理，让人们能够第一时间获得相关疫情防控信息，同时也为了方便志愿服务和物资运输的管理，我们研发了该疫情防控平台。",
        }
  },
  components: {
    Header,
    HomeInfo,
}
}
</script>