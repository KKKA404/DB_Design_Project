<template>
  <div>
    <el-table :data="searchData" border style="width: 100%">
      <el-table-column fixed prop="id" label="编号" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="100"> </el-table-column>
      <el-table-column prop="sex" label="性别" width="50"> </el-table-column>
      <el-table-column prop="urgency" label="紧急程度" width="100">
      </el-table-column>
      <el-table-column prop="phonenum" label="手机号码" width="120">
      </el-table-column>
      <el-table-column prop="IDcard" label="身份证号码" width="240">
      </el-table-column>
      <el-table-column prop="location" label="当前住址" width="240">
      </el-table-column>
      <el-table-column label="健康状况" prop="health" width="80">
      </el-table-column>
      <el-table-column prop="content" label="备注" width="240">
      </el-table-column>
      <el-table-column width="120" label="操作">
        <template>
          <el-button @click="dialogFormVisible = true" type="text" size="medium"
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
              prop="is_id"
              label="编号"
              sortable
              width="100"
            >
            </el-table-column>
            <el-table-column prop="is_phonenum" label="联系号码" width="120">
            </el-table-column>
            <el-table-column prop="is_location" label="地址" width="240">
            </el-table-column>
            <el-table-column prop="is_capacity" label="总容量" width="100">
            </el-table-column>
            <el-table-column prop="is_allowance" label="剩余容量" width="100">
            </el-table-column>
            <el-table-column width="120" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="(dialogFormVisible = true), allocate(scope.row)"
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
    allocate(row) {
      this.$confirm(
        "确定将当前病人分配到" + row.is_id + "号隔离点?",
        "删除数据",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
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
    this.$axios.get("/fake_data").then((res) => {
      this.fake_patients_data = res.fake_patients_data;
      this.fake_isolations_data = res.fake_isolations_data;
    });
  },
  data() {
    return {
      fake_patients_data: [],

      fake_isolations_data: [],

      value: "",
      cname: "",
      nameInput: "",
      //searchKey:"",
      options: [],
      // value: [],
      list: [],
      loading: false,
      tableData: null,
      total: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      LabelWidth: "180px",

      Emp: {
        id: "",
        name: "",
        sex: "",
        phonenum: "",
        temp: "",
        risk: "",
        health: "",
        content: "",
        depart: "",
      },
    };
  },
  computed: {
    searchData: function () {
      let SearchResult = this.fake_patients_data.filter(
        (item) => String(item.name).indexOf(String(this.nameInput)) > -1
      );
      return SearchResult;
    },
    searchIs: function () {
      let SearchResult = this.fake_isolations_data.filter(
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
