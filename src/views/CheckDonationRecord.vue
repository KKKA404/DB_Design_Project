<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <el-tag
        effect="plain"
        style="
          float: left;
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: 400;
          padding: auto;
        "
        >筛选条件</el-tag
      >
      <el-input
        placeholder="请输入捐赠方ID"
        v-model="idInput"
        clearable
        style="margin-bottom: 10px"
      >
      </el-input>
      <el-input placeholder="请输入捐赠方名称" v-model="nameInput" clearable>
      </el-input>
    </el-card>
    <el-card>
      <el-table
        :data="searchData"
        height="500"
        border
        style="width: 100%"
        :default-sort="{ prop: 'donateTime', order: 'descending' }"
      >
        <el-table-column prop="donateName" sortable label="名称">
        </el-table-column>
        <el-table-column prop="donateID" sortable label="ID"> </el-table-column>
        <el-table-column prop="donateTime" sortable label="捐赠时间">
        </el-table-column>
        <el-table-column
          prop="donatedOrganizationID"
          sortable
          label="受捐防控单位ID"
        >
        </el-table-column>
        <el-table-column
          prop="donatedOrganization"
          sortable
          label="受捐防控单位名称"
        >
        </el-table-column>
        <el-table-column prop="city" label="市" sortable> </el-table-column>
        <el-table-column prop="district" label="区" sortable> </el-table-column>
        <el-table-column prop="contactAddress" label="联系方式">
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>
</template>

<script>
export default {
  name: "CheckDonationRecord",
  components: {
    // SideBar,
    // BottomFooter,
    // NavBar,
  },
  data() {
    return {
      idInput: "",
      nameInput: "",
      donateData: [],
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.donateData.filter(
        (item) =>
          String(item.donateID).indexOf(String(this.idInput)) > -1 &&
          item.donateName.indexOf(this.nameInput) > -1
      );

      return SearchResult;
    },
  },
  created() {
    // just test
    this.$axios.post("/donateData", { abc: 123 });

    this.$axios.get("/donateData").then((res) => {
      this.donateData = res.donateData;
    });
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
