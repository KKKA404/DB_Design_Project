<template>
  <div class="info">
    <p class="title i">
      <i></i>
      病毒信息
    </p>
    <div class="content">
      <p>{{ Covid19InfoData.note1 }}</p>
      <p>{{ Covid19InfoData.note2 }}</p>
      <p>{{ Covid19InfoData.note3 }}</p>
      <p>{{ Covid19InfoData.note4 }}</p>
      <p>{{ Covid19InfoData.note5 }}</p>
    </div>
  </div>
</template>
 
<script>
//import api from "../api"

export default {
  name: "Covid19Info",
  props: {
    Covid19InfoData: {
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