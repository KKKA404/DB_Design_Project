<template>
  <div>
    <p>这里似乎是没有人的荒原...</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
  mounted: function () {
    console.log("404")
    this.$message.error("404页面");
  },
};
</script>