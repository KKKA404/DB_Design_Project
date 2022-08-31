<template>
  <el-main>
    <el-card>
      <el-tag
        effect="plain"
        style="
          float: left;
          margin-bottom: 15px;
          margin-right: 80%;
          font-size: 18px;
          font-weight: 400;
        "
        >筛选条件</el-tag
      >
      <!-- 筛选栏 -->
      <el-input
        placeholder="请输入内容"
        v-model="nameInput"
        class="input-with-select"
        style="width: 90%; margin-bottom: 20px; margin-left: 3%; float: left"
      >
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="需求者ID" value="id"></el-option>
          <el-option label="需求者姓名" value="name"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 筛选栏 -->
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
        <el-table-column prop="unitId" label="疫情防控单位编号">
        </el-table-column>
        <el-table-column prop="unitName" label="疫情防控单位">
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
              >完成分配
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </el-main>
</template>

<script>
import { getNeedData, deleteNeedData } from "@/api/material";
export default {
  name: "CheckNeedRecord",
  methods: {
    allocate(row) {
      this.$confirm("已经满足了 " + row.name + " 的此条需求?", "消除数据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteNeedData({ id: row.id, goodID: row.goodID }).then((res) => {
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
    getNeedData().then((res) => {
      this.needData = res.needData;
    });
  },
  data() {
    return {
      needData: [],
      value: "",
      cname: "",
      nameInput: "",
      options: [],
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "id") {
        let SearchResult = this.needData.filter(
          (item) => String(item.id).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "name") {
        let SearchResult = this.needData.filter(
          (item) => String(item.name).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else {
        return this.needData;
      }
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
