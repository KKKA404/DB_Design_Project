<template>
  <el-main>
    <el-input placeholder="请输入需求者的ID/姓名" v-model="input" clearable>
    </el-input>
    <el-table
      :data="searchData"
      height="500"
      border
      style="width: 100%"
      :default-sort="{ prop: 'needTime', order: 'descending' }"
    >
      <el-table-column prop="id" sortable label="需求者编号"> </el-table-column>
      <el-table-column prop="name" sortable label="姓名"> </el-table-column>
      <el-table-column prop="phonenum" sortable label="电话号码">
      </el-table-column>
      <el-table-column prop="goodID" sortable label="物资编号">
      </el-table-column>
      <el-table-column prop="type" sortable label="物资类型"> </el-table-column>
      <el-table-column prop="goodName" sortable label="物资名称">
      </el-table-column>
      <el-table-column prop="num" sortable label="物资数量"> </el-table-column>
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
        axios
          .delete("http://localhost:8080/emp/deleteById/" + row.is_id)
          //具体逻辑待完成
          .then((resp) => {
            this.$alert(row.name + "隔离点分配成功！", "消息", {
              confirmButtonText: "确定",
              callback: (action) => {
                window.location.reload();
              },
            });
          });
      });
    },
  },
  created() {
    this.$axios.get("/needData").then((res) => {
      this.needData = res.needData;
    });
  },
  created() {
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
          String(item.needID).indexOf(String(this.input)) > -1 ||
          item.needName.indexOf(String(this.input)) > -1
      );
      return SearchResult;
    },
  },
};
</script>
