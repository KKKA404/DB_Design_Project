<template>
  <el-main>
    <el-card>
      <el-input
        placeholder="请输入检索姓名"
        v-model="nameInput"
        class="input-with-select"
        style="width: 90%; float: left; margin-right: 30px"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        type="primary"
        style="margin-left: 10px"
        @click="addDialogFormVisible = true"
        size="medium"
        >新增记录</el-button
      >
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
        <el-table-column fixed prop="name" label="姓名" width="100">
        </el-table-column>
        <el-table-column prop="personId" label="编号"> </el-table-column>
        <el-table-column prop="gender" label="性别"> </el-table-column>
        <el-table-column prop="IDcard" label="身份证号码"> </el-table-column>
        <el-table-column prop="sampleTime" label="采样时间"> </el-table-column>
        <el-table-column prop="place" label="检测机构"> </el-table-column>
        <el-table-column prop="testResult" label="检测结果"> </el-table-column>
        <el-table-column prop="phoneNumber" label="手机号码"> </el-table-column>
        <el-table-column prop="testResultTime" label="检测结果时间">
        </el-table-column>
        <el-table-column label="操作" fixed="right">
          <template slot-scope="scope">
            <el-button
              @click="(dialogFormVisible = true), edit(scope.row)"
              type="text"
              size="small"
              >修改</el-button
            >
            <el-button type="text" size="small" @click="deleteRecord(scope.row)"
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
        title="修改确诊/疑似病例记录"
        :visible.sync="dialogFormVisible"
        slot
      >
        <el-form :model="EmpIden" ref="EmpIden">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="EmpIden.personId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="EmpIden.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="EmpIden.gender" label="男">男</el-radio>
            <el-radio v-model="EmpIden.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="EmpIden.IDcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="采样时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="EmpIden.sampleTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="检测机构" :label-width="formLabelWidth">
            <el-input v-model="EmpIden.place" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="检测结果" :label-width="formLabelWidth">
            <el-select
              v-model="EmpIden.testResult"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="EmpIden.phoneNumber"
              autocomplete="off"
            ></el-input>
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

      <el-dialog title="核酸信息录入" :visible.sync="addDialogFormVisible" slot>
        <el-form :model="addEmpIden">
          <el-form-item label="编号" :label-width="formLabelWidth">
            <el-input v-model="EmpIden.personId" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="addEmpIden.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-radio v-model="addEmpIden.sex" label="男">男</el-radio>
            <el-radio v-model="addEmpIden.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="addEmpIden.IDcard" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="采样时间" :label-width="formLabelWidth">
            <el-date-picker
              v-model="addEmpIden.sampleTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="检测机构" :label-width="formLabelWidth">
            <el-input v-model="addEmpIden.place" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="检测结果" :label-width="formLabelWidth">
            <el-select
              v-model="addEmpIden.testResult"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input
              v-model="addEmpIden.phoneNumber"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialogFormVisible = false">取 消</el-button>
          <el-button
            type="primary"
            @click="(addDialogFormVisible = false), submitForm()"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
  </el-main>
</template>

<script>
import {
  getSamplingData,
  postSamplingData,
  putSamplingData,
  deleteSamplingData,
} from "@/api/medical";

export default {
  created() {
    getSamplingData().then((res) => {
      this.samplingData = res.samplingData;
    });
  },
  methods: {
    submitForm() {
      postSamplingData(this.addEmpIden).then((resp) => {
        if (resp.code == 20000) {
          this.$message("记录添加成功");
        } else {
          this.$message("记录添加失败");
        }
      });
    },
    deleteRecord(row) {
      this.$confirm("是否确定要删除" + row.name + "的病例记录?", "删除数据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteSamplingData({ ID: row.personId }).then((resp) => {
          if (resp.code == 20000) {
            this.$alert(row.name + "的病例记录删除成功！", "消息", {
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
      putSamplingData(this.EmpIden).then((resp) => {
        console.log(resp);
        if (resp.code == 20000) {
          this.$alert(this.EmpIden.name + "的病例记录修改成功！", "消息", {
            confirmButtonText: "确定",
            callback: () => {
              window.location.reload();
            },
          });
        }
      });
    },
    edit(row) {
      getSamplingData({ ID: row.personId }).then((resp) => {
        this.EmpIden = resp.data;
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },

  computed: {
    searchData: function () {
      let SearchResult = this.samplingData.filter(
        (item) => String(item.name).indexOf(String(this.nameInput)) > -1
      );

      return SearchResult;
    },
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      samplingData: [],
      value: "",
      cname: "",
      stext: "",
      options2: [
        {
          value: "阴性",
          label: "阴性",
        },
        {
          value: "阳性",
          label: "阳性",
        },
      ],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
      nameInput: "",
      options: [],
      //value: [],
      list: [],
      loading: false,
      tableData: null,
      total: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      addDialogFormVisible: false,
      formLabelWidth: "120px",
      addLabelWidth: "50px",
      EmpIden: {
        personId: "",
        name: "",
        gender: undefined,
        IDcard: "",
        sampleTime: "",
        place: "",
        testResult: "",
        phoneNumber: "",
      },
      addEmpIden: {
        personId: "",
        name: "",
        gender: undefined,
        IDcard: "",
        sampleTime: "",
        place: "",
        testResult: "",
        phoneNumber: "",
      },
    };
  },
};
</script>
<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select {
  float: right;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
