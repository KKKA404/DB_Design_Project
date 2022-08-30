<template>
  <div>
    <el-table :data="searchData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="gender" label="性别" width="50"> </el-table-column>
      <el-table-column prop="phonenum" label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="address" label="当前住址" width="240">
      </el-table-column>
      <el-table-column prop="signInDate" label="隔离开始日期" width="240">
      </el-table-column>
      <el-table-column prop="signOutDate" label="隔离结束日期" width="240">
      </el-table-column>
      <el-table-column width="120" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="
              (dialogFormVisible = true),
                (tempID = scope.row.id),
                (tempName = scope.row.name)
            "
            type="text"
            size="medium"
            >分配隔离点</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <div class="block">
      <el-dialog title="隔离点分配" :visible.sync="dialogFormVisible" slot>
        <el-form :model="Emp" ref="Emp">
          <el-table :data="searchIs" border style="width: 100%">
            <el-table-column
              fixed
              prop="name"
              label="隔离点名称"
              sortable
              width="120"
            >
            </el-table-column>

            <el-table-column prop="region" label="所处地区" width="240">
            </el-table-column>
            <el-table-column prop="capacity" label="最大容纳人数" width="100">
            </el-table-column>
            <el-table-column prop="num" label="当前隔离人数" width="100">
            </el-table-column>
            <el-table-column prop="cost" label="隔离费用" width="100">
            </el-table-column>
            <el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="
                    (dialogFormVisible = true), allocate(scope.row), update()
                  "
                  type="text"
                  size="medium"
                  >确定分配</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    update() {
      this.$axios.get("/isolationData").then((res) => {
        this.assignmentData = res.assignmentData;
        this.isolatedPointsData = res.isolatedPointsData;
      });
    },
    allocate(row) {
      this.$confirm(
        "确定将当前病人分配到 " + row.name + " 隔离点?",
        "清除数据",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        this.$axios
          .post("/isolationData/isolatedPointsData", { name: row.name })
          .then((res) => {
            if (res.code == 20000) {
              this.$message("隔离点信息更新成功");
            }
          });
        this.$axios
          .delete("/isolationData/assignmentData", {
            data: { id: this.tempID },
          })
          .then((res) => {
            if (res.code == 20000) {
              this.$alert(this.tempName + " 的隔离点分配成功！", "消息", {
                confirmButtonText: "确定",
                callback: (action) => {
                  window.location.reload();
                },
              });
              
            }
          });
      });
    },
  },
  created() {
    this.$axios.get("/isolationData").then((res) => {
      this.assignmentData = res.assignmentData;
      this.isolatedPointsData = res.isolatedPointsData;
    });
  },
  data() {
    return {
      assignmentData: [],
      isolatedPointsData: [],
      tempID: "",
      tempName: "",
      nameInput: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      LabelWidth: "180px",
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.assignmentData.filter(
        (item) => String(item.name).indexOf(String(this.nameInput)) > -1
      );
      return SearchResult;
    },
    searchIs: function () {
      let SearchResult = this.isolatedPointsData.filter(
        (item) => String(item.name).indexOf(String(this.nameInput)) > -1
      );
      return SearchResult;
    },
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
