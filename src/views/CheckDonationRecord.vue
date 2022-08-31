<template>
  <el-main>
    <el-card style="margin-bottom: 10px">
      <el-tag
        effect="plain"
        style="
          float: left;
          margin-bottom: 20px;
          margin-right: 80%;
          font-size: 18px;
          font-weight: 400;
          padding: auto;
        "
        >筛选条件</el-tag
      >
      <!-- 筛选栏 -->
      <el-input
        placeholder="请输入内容"
        v-model="nameInput"
        class="input-with-select"
        style="width: 90%; margin-bottom: 25px; margin-left: 3%; float: left"
      >
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="捐赠方ID" value="donateID"></el-option>
          <el-option label="捐赠方名称" value="donateName"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 筛选栏 -->
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
// import SideBar from "../components/SideBar.vue";
// import BottomFooter from "../components/BottomFooter.vue";
// import NavBar from "../components/NavBar.vue";
//

import service from "@/plugins/axios";
export default {
  name: "CheckDonationRecord",
  components: {
    // SideBar,
    // BottomFooter,
    // NavBar,
  },
  data() {
    return {
      donateData: [],
      value: "",
      cname: "",
      nameInput: "",
      options: [],
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "donateName") {
        let SearchResult = this.transportData.filter(
          (item) => String(item.donateName).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "donateID") {
        let SearchResult = this.transportData.filter(
          (item) => String(item.donateID).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else {
        return this.donateData;
      }
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
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.red {
  color: red;
}
</style>
