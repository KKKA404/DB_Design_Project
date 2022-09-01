<template>
  <el-main>
    <el-card>
      <el-tag effect="plain" style="
          float: left;
          margin-bottom: 15px;
          margin-right: 80%;
          font-size: 18px;
          font-weight: 400;
        ">筛选条件</el-tag>
      <!-- 筛选栏 -->
      <el-input placeholder="请输入内容" v-model="nameInput" class="input-with-select"
        style="width: 90%; margin-bottom: 20px; margin-left: 3%; float: left">
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="隔离者ID" value="id"></el-option>
          <el-option label="隔离者姓名" value="name"></el-option>
          <el-option label="隔离开始日期" value="signInDate"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 筛选栏 -->
    </el-card>

    <br />
    <el-card>
      <el-table :data="searchData" border style="width: 100%">
        <el-table-column fixed prop="id" label="编号" sortable>
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="gender" label="性别"> <template slot-scope="scope"><span
              v-if="scope.row.gender === 1">男</span><span v-if="scope.row.gender === 0">女</span></template>
        </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"> </el-table-column>
        <el-table-column prop="address" label="当前住址"> </el-table-column>
        <el-table-column prop="signInDate" label="隔离开始日期">
        </el-table-column>
        <el-table-column prop="signOutDate" label="隔离结束日期">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="
              (dialogFormVisible = true),
              (tempID = scope.row.id),
              (tempName = scope.row.name)
            " type="text" size="medium">分配隔离点</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <div class="block">
      <el-dialog title="隔离点分配" :visible.sync="dialogFormVisible" slot>
        <el-form :model="Emp" ref="Emp">
          <!-- 筛选栏 -->
          <el-input placeholder="请输入内容" v-model="isInput" class="input-with-select" style="
              width: 90%;
              margin-bottom: 20px;
              margin-left: 3%;
              float: left;
            ">
            <el-select v-model="isname" slot="prepend" placeholder="请选择">
              <el-option label="隔离点名称" value="name"></el-option>
              <el-option label="所处地区" value="region"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <!-- 筛选栏 -->

          <el-table :data="searchIs" border>
            <el-table-column fixed prop="name" label="隔离点名称" sortable>
            </el-table-column>

            <el-table-column prop="region" label="所处地区"> </el-table-column>
            <el-table-column prop="capacity" label="最大容纳人数" sortable>
            </el-table-column>
            <el-table-column prop="num" label="当前隔离人数" sortable>
            </el-table-column>
            <el-table-column prop="cost" label="隔离费用"> </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="
                  (dialogFormVisible = true), allocate(scope.row), update()
                " type="text" size="medium">确定分配</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </el-dialog>
    </div>
  </el-main>
</template>

<script>
import {
  getIsolationData,
  postIsolatedPointsData,
  deleteAssignmentData,
} from "@/api/medical";
export default {
  methods: {
    update() {
      getIsolationData().then((res) => {
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
        postIsolatedPointsData({ name: row.name }).then((res) => {
          if (res.code == 20000) {
            this.$message("隔离点信息更新成功");
          }
        });
        deleteAssignmentData({
          data: { id: this.tempID },
        }).then((res) => {
          if (res.code == 20000) {
            this.$alert(this.tempName + " 的隔离点分配成功！", "消息", {
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
    getIsolationData().then((res) => {
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
      cname: "",
      dialogFormVisible: false,
      formLabelWidth: "120px",
      LabelWidth: "180px",
      inputPerson: "",
      inputPoint: "",
      isInput: "",
      isname: "",
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "id") {
        let SearchResult = this.assignmentData.filter(
          (item) => String(item.id).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "name") {
        let SearchResult = this.assignmentData.filter(
          (item) => String(item.name).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "signInDate") {
        let SearchResult = this.assignmentData.filter(
          (item) => String(item.signInDate).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else {
        return this.assignmentData;
      }
    },
    searchIs: function () {
      if (this.isname == "name") {
        let SearchResult = this.isolatedPointsData.filter(
          (item) => String(item.name).indexOf(String(this.isInput)) > -1
        );
        return SearchResult;
      } else if (this.isname == "region") {
        let SearchResult = this.isolatedPointsData.filter(
          (item) => String(item.region).indexOf(String(this.isInput)) > -1
        );
        return SearchResult;
      } else {
        return this.isolatedPointsData;
      }
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
