<template>
  <div class="info">
    <p class="title i">
      <i></i>
      项目背景
    </p>
    <div class="content">
      <p>{{ HomeInfoData.note3 }}</p>
    </div>
    <p class="title i">
      <i></i>
      项目板块介绍
    </p>
    <img src="../assets/module.jpg" width="1500"></img>
    <p class="title i">
      <i></i>
      关于我们
    </p>
    <div class="content">
      <p>{{ HomeInfoData.note1 }}</p>
      <p>{{ HomeInfoData.note2 }}</p>
    </div>
  </div>
</template>

<script>
//import api from "../api"

export default {
  name: "HomeInfo",
  props: {
    HomeInfoData: {
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


</style>
