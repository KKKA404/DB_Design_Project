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
      <el-input
        placeholder="请输入内容"
        v-model="contentInput"
        class="input-with-select"
        style="width: 90%; margin-bottom: 20px; margin-left: 3%; float: left"
      >
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="姓名" value="personName"></el-option>
          <el-option label="志愿地点" value="address"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </el-card>
    <br />
    <el-card>
      <el-table
        :data="
          searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%"
      >
        <el-table-column fixed prop="personId" label="人员编号" sortable width="100">
          </el-table-column>
        <el-table-column fixed prop="volunteerID" label="志愿填写编号" sortable width="100">
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="district" label="地区"> </el-table-column>
        <el-table-column label="志愿地点" prop="volunteerLocation">
        </el-table-column>
        <el-table-column prop="date1" label="服务日期"> </el-table-column>
        <el-table-column prop="volunteerType" label="服务类型">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="(dialogFormVisible = true), edit(scope.row)"
              type="text"
              >修改</el-button
            >
            <el-button type="text" @click="deleteRecord(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :page-size="6"
        layout="total, prev, pager, next"
        :total="total"
      >
      </el-pagination>

      <el-dialog
        title="修改志愿申请信息"
        :visible.sync="dialogFormVisible"
        slot
      >
        <el-form :model="Emp" ref="Emp">
          <!-- <el-form-item label="姓名" :label-width="formLabelWidth">
              <el-input v-model="Emp.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
              <el-radio v-model="Emp.gender" label="男">男</el-radio>
              <el-radio v-model="Emp.gender" label="女">女</el-radio>
            </el-form-item> -->
          
          <el-form-item label="志愿地点" :label-width="formLabelWidth">
            <el-input
              v-model="Emp.volunteerLocation"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item label="身份证号码" :label-width="formLabelWidth">
              <el-input v-model="Emp.IDcard" autocomplete="off"></el-input>
            </el-form-item> -->
          <el-form-item label="志愿服务类型" :label-width="formLabelWidth">
            <el-select
              v-model="Emp.volunteerType"
              clearable
              placeholder="请选择"
            >
              <el-option label="秩序引导" value="medical"></el-option>
              <el-option label="扫码登记" value="living"></el-option>
              <el-option label="物资搬运" value="shifting"></el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="(dialogFormVisible = false), update()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </el-main>
</template>
  
  <script>
import {
  getVolunteerRecord,
  deleteVolunteerRecord,
  modifyVolunteerRecord,
} from "@/api/volunteer";
export default {
  methods: {
    deleteRecord(row) {
      this.$confirm(
        "是否确定要删除" + row.name + "的志愿申请记录?",
        "删除数据",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        deleteVolunteerRecord({ID: row.personId}).then((res) => {
          if (res.code == 20000) {
            this.$alert(row.name + "的志愿申请记录删除成功！", "消息", {
              confirmButtonText: "确定",
              callback: () => {
                window.location.reload();
              },
            });
          }
        });
      });
    },

    update() {
      modifyVolunteerRecord(this.Emp).then((res) => {
        if (res.code == 20000) {
          this.$alert(this.Emp.name + "的需求记录修改成功！", "消息", {
            confirmButtonText: "确定",
            callback: () => {
              window.location.reload();
            },
          });
        }
      });
    },
    edit(row) {
      this.Emp.volunteerID = row.volunteerID;
      this.Emp.name = row.name;
      this.Emp.volunteerLocation = row.volunteerLocation;
      this.Emp.volunteerType = row.volunteerType;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    getVolunteerRecord().then((res) => {
      this.volunteerRecord = res.volunteerRecord;
    });
  },

  data() {
    return {
      pageSize: 6,
      currentPage: 1,
      volunteerRecord: [],
      value: "",
      cname: "",
      contentInput: "",
      options: [],
      list: [],
      loading: false,
      tableData: null,
      total: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      LabelWidth: "180px",

      Emp: {
        volunteerID: "",
        // personId: "",
        name: "",
        // district: "",
        volunteerLocation: "",
        // date1: "",
        volunteerType: "",
      },
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "personName") {
        let SearchResult = this.volunteerRecord.filter(
          (item) => String(item.name).indexOf(String(this.contentInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "address") {
        let SearchResult = this.volunteerRecord.filter(
          (item) =>
            String(item.district).indexOf(String(this.contentInput)) > -1
        );
        return SearchResult;
      } else {
        return this.volunteerRecord;
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
  