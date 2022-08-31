<template>
  <el-main>
    <el-card>
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
        placeholder="请输入需求者的 ID / 姓名"
        v-model="needInput"
        clearable
      >
      </el-input>
    </el-card>

    <br />
    <el-card>
      <el-table
        :data="searchData"
        height="500"
        border
        style="width: 100%"
        :default-sort="{ prop: 'needTime', order: 'descending' }"
      >
        <el-table-column prop="id" sortable label="需求者编号">
        </el-table-column>
        <el-table-column prop="name" sortable label="姓名"> </el-table-column>
        <el-table-column prop="phoneNumber" label="电话号码"> </el-table-column>
        <el-table-column prop="goodID" sortable label="物资编号">
        </el-table-column>
        <el-table-column prop="type" label="物资类型"> </el-table-column>
        <el-table-column prop="goodName" label="物资名称"> </el-table-column>
        <el-table-column prop="num" label="物资数量"> </el-table-column>
        <el-table-column width="120" label="操作">
          <template slot-scope="scope">
            <el-button
              @click="(dialogFormVisible = true), allocate(scope.row)"
              type="text"
              size="medium"
              >完成分配</el-button
            >
          </template>
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
export default {
  name: "CheckNeedRecord",
  methods: {
    allocate(row) {
      this.$confirm("已经满足了 " + row.name + " 的此条需求?", "消除数据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$axios
          .delete("/needData", { data: { id: row.id, goodID: row.goodID } })
          .then((res) => {
            if (res.code == 20000) {
              this.$alert(row.name + " 的需求消除成功！", "消息", {
                confirmButtonText: "确定",
                callback: () => {
                  window.location.reload();
                },
              });
            }
          });
      });
    },
  },
  created() {
    this.$axios.get("/needData").then((res) => {
      console.log(res);
      this.needData = res.needData;
    });
  },
  data() {
    return {
      needInput: "",
      needData: [],
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.needData.filter(
        (item) =>
          String(item.id).indexOf(String(this.needInput)) > -1 ||
          item.name.indexOf(String(this.needInput)) > -1
      );
      return SearchResult;
    },
  },
};
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
