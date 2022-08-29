<template>
  <el-main>
    <el-input placeholder="请输入需求方ID/名称" v-model="input" clearable>
    </el-input>
    <el-table
      :data="searchData"
      height="500"
      border
      style="width: 100%"
      :default-sort="{ prop: 'needTime', order: 'descending' }"
    >
      <el-table-column prop="needName" sortable label="名称"> </el-table-column>
      <el-table-column prop="needID" sortable label="ID"> </el-table-column>
      <el-table-column prop="needTime" sortable label="捐赠时间">
      </el-table-column>
      <el-table-column
        prop="needdOrganizationID"
        sortable
        label="受捐防控单位ID"
      >
      </el-table-column>
      <el-table-column
        prop="needdOrganization"
        sortable
        label="受捐防控单位名称"
      >
      </el-table-column>
      <el-table-column prop="city" label="市" sortable> </el-table-column>
      <el-table-column prop="district" label="区" sortable> </el-table-column>
      <el-table-column prop="contactAddress" sortable label="联系方式">
      </el-table-column>
    </el-table>
  </el-main>
</template>

<script>
// import SideBar from "../components/SideBar.vue";
// import BottomFooter from "../components/BottomFooter.vue";
// import NavBar from "../components/NavBar.vue";
//
export default {
  name: "CheckNeedRecord",
  components: {
    // SideBar,
    // BottomFooter,
    // NavBar,
  },
  created(){
    this.$axios.get("/needData").then((res) => {
        console.log(res);
      this.needData = res.needData;
    });
  },
  data() {
    return {
      input: "",
      needData: [],
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.needData.filter(
        (item) =>
        String(item.needID).indexOf(String(this.input)) > -1||item.needName.indexOf(String(this.input)) > -1
      );
      return SearchResult;
    },
  },
};
</script>

<style>
/* .el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>
