<template>
  <div class="chart">
    <h3 class="title">全国</h3>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide v-for="(item, index) in swiperData" :key="index">
        <img :src="item.image" alt="" />
      </swiper-slide>
    </swiper>
    <ul class="navigator">
      <li
        :class="{ active: index === currentIndex }"
        v-for="(item, index) in swiperData"
        :key="index"
        class="navigatorItem"
        @click="clickItemHandle(index)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>
 
<script>
//import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";

//import api from "../api";
 
export default {
//   data() {
//     let _this = this;
//     return {
//       swiperData: [],
//       currentIndex: 0,
//       swiperOptions: {
//         on: {
//           slideChangeTransitionEnd: function () {
//             _this.currentIndex = this.activeIndex;
//           },
//         },
//       },
//     };
//   },
//   components: {
//     Swiper,
//     SwiperSlide,
//   },
//   mounted() {
//     api
//       .getSwiperImg()
//       .then((res) => {
//         if (res.status === 200) {
//           this.swiperData = res.data.result;
//         }
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   },
//   computed: {
//     swiper() {
//       return this.$refs.mySwiper.$swiper;
//     },
//   },
//   methods: {
//     clickItemHandle(index) {
//       this.currentIndex = index;
//       this.swiper.slideTo(index, 1000, false);
//     },
//   },
};
</script>
 
<style scoped>
.line {
  padding: 0 10px;
  width: 100%;
  height: 300px;
}
.chart {
  position: relative;
  background: #fff;
  padding: 0.16rem 0;
}
.chart .title {
  font-size: 0.16rem;
  margin: 0 0 0.08rem 0.16rem;
}
.chart .swiper-pagination {
  position: absolute;
  text-align: center;
  -webkit-transition: 300ms opacity;
  -o-transition: 300ms opacity;
  transition: 300ms opacity;
  -webkit-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
  z-index: 10;
}
.chart .swiper-pagination-bullet {
  width: calc(20% - 0.02rem);
  text-align: center;
  background: #f7f7f7;
  padding: 0.045rem;
  box-sizing: border-box;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.02rem;
}
.navigator {
  font-size: 0.12rem;
  list-style: none;
  display: flex;
  padding: 0 0.16rem;
  justify-content: center;
  margin: 0.06rem 0 0;
}
.navigatorItem {
  color: #4169e2;
  background: #f1f5ff;
  position: relative;
  width: calc(20% - 0.02rem);
  text-align: center;
  background: #f7f7f7;
  padding: 0.045rem;
  box-sizing: border-box;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.02rem;
  margin-left: 0.025rem;
}
.active {
  color: #4169e2;
  background: #f1f5ff;
  position: relative;
}
</style>