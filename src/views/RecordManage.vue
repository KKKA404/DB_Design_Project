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
        v-model="nameInput"
        class="input-with-select"
        style="width: 90%; margin-bottom: 20px; margin-left: 3%; float: left"
      >
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="物资类型" value="type"></el-option>
          <el-option label="所需物资" value="goodsName"></el-option>
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
        <el-table-column
          fixed
          prop="personId"
          label="编号"
          sortable
          width="100"
        >
        </el-table-column>
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="gender" label="性别"
          ><template slot-scope="scope"
            ><span v-if="scope.row.gender === 1">男</span
            ><span v-if="scope.row.gender === 0">女</span></template
          >
        </el-table-column>
        <!-- <el-table-column prop="urgency" label="紧急程度"> </el-table-column> -->
        <el-table-column prop="phoneNumber" label="手机号码"> </el-table-column>
        <!-- <el-table-column prop="IDcard" label="身份证号码"> </el-table-column>
        <el-table-column label="健康状况" prop="health"> </el-table-column> -->
        <!-- <el-table-column prop="personId" label="物资表单编个人ID"> </el-table-column> -->
        <el-table-column prop="type" label="所需物资种类"> </el-table-column>
        <el-table-column prop="goodsName" label="所需物资"> </el-table-column>
        <el-table-column prop="num" label="所需物资数量"> </el-table-column>
        <el-table-column prop="writeTime" label="填写时间"> </el-table-column>
        <el-table-column prop="Demandformid" label="需求表单ID"> </el-table-column>
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
        title="修改所需物资记录"
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
          <!-- <el-form-item
            label="紧急程度"
            :label-width="formLabelWidth"
            prop="urgency"
          >
            <el-radio v-model="Emp.urgency" label="紧急">紧急</el-radio>
            <el-radio v-model="Emp.urgency" label="一般">一般</el-radio>
          </el-form-item> -->
          <el-form-item label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="Emp.phoneNumber" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="身份证号码" :label-width="formLabelWidth">
            <el-input v-model="Emp.IDcard" autocomplete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item
            label="健康状况"
            :label-width="formLabelWidth"
            prop="health"
          >
            <el-select v-model="Emp.health" clearable placeholder="请选择">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="提交时间" :label-width="formLabelWidth">
            <el-input v-model="Emp.createTime" autocomplete="off"></el-input>
          </el-form-item> -->
          <el-form-item label="所需物资种类" :label-width="formLabelWidth">
            <el-select v-model="Emp.type" clearable placeholder="请选择">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="物资名称" :label-width="formLabelWidth">
            <el-input v-model="Emp.goodsName" autocomplete="on"></el-input>
          </el-form-item>
          <el-form-item
          label="所需物资数量"
          :label-width="formLabelWidth"
          style="width: 40%"
          required
        >
          <el-input-number
            v-model="Emp.num"
            :min="1"
            :max="10"
            align="left"
            style="margin-left: 10px"
          ></el-input-number>
        </el-form-item>
          <el-form-item label="填写时间" :label-width="formLabelWidth">
            <el-col :span="11">
              <el-form-item>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="Emp.writeTime"
                  style="width: 100%"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
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
  deletePersonalRequest,
  modifyPersonalRequest,
  getPersonalRequest,
} from "@/api/individual";
export default {
  methods: {
    deleteRecord(row) {
      this.$confirm("是否确定要删除" + row.name + "的需求记录?", "删除数据", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deletePersonalRequest({personId:row.personId,demandId:row.Demandformid}).then((res) => {
          if (res.code == 20000) {
            this.$alert(row.name + "的需求记录删除成功！", "消息", {
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
      modifyPersonalRequest(this.Emp).then((res) => {
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
      // getOriginRequest({
      //   personID: row.personId,
      //   demandFormID: row.demandFormId,
      // }).then((res) => {
      //   if (res.code == 20000) {
      //     this.Emp = res.personalRequest;
      //   }
      // });
      this.Emp.name = row.name;
      this.Emp.writeTime = row.writeTime;
      this.Emp.phoneNumber = row.phoneNumber;
      this.Emp.type = row.type;
      this.Emp.goodsName = row.goodsName;
      this.Emp.num = row.num;
      this.Emp.personId = row.personId;
      this.Emp.Demandformid = row.Demandformid;
    },

    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    getPersonalRequest(this.$store.getters.ID).then((res) => {
      this.personalRequest = res.data.personalRequest;
    });
  },

  data() {
    return {
      pageSize: 6,
      currentPage: 1,
      personalRequest: [],
      options3: [
        {
          value: "食品",
          label: "食品",
        },
        {
          value: "药品",
          label: "药品",
        },
        {
          value: "日用品",
          label: "日用品",
        },
        {
          value: "防护物资",
          label: "防护物资",
        },
      ],
      options2: [
        {
          value: "正常",
          label: "无下列情况，身体健康",
        },
        {
          value: "咳嗽",
          label: "咳嗽",
        },
        {
          value: "乏力",
          label: "乏力",
        },
        {
          value: "呼吸困难",
          label: "呼吸困难",
        },
        {
          value: "与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等",
          label: "与新冠肺炎有关的其他症状，如流涕，咽痛，肌痛，腹泻等",
        },
      ],
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
        demandFormId: "",
        // personalId: "",
        name: "",
        // gender: undefined,
        // urgency: "",
        phoneNumber: "",
        // IDcard: "",
        // health: "",
        type: "",
        goodsName: "",
        num: undefined,
        writeTime:"",
      },
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "goodsName") {
        let SearchResult = this.personalRequest.filter(
          (item) => String(item.goodsName).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "type") {
        let SearchResult = this.personalRequest.filter(
          (item) => String(item.type).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else {
        return this.personalRequest;
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
