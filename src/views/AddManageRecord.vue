<template>
  <el-main
    style="display: flex; justify-content: center; align-items: flex-start"
  >
    <el-card style="width: 80%">
      <div slot="header" class="clearfix">
        <h1 style="float: left; margin-left: 15px">添加管理信息</h1>
      </div>
      <el-form label-width="150px" :label-position="labelPosition">
        <el-form-item
          label="疫情防控单位ID"
          style="width: 40%; text-align: left; margin-left: 5%"
        >
          <el-input
            placeholder="请输入疫情防控单位ID"
            v-model="unitID"
            clearable
            style="margin-left: 20px"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="未添加管理人员信息"
          style="text-align: left; margin-left: 5%"
        >
          <el-card>
            <el-table
              :data="unManagedPersonData"
              border
              ref="unManagedPersonTable"
              @selection-change="handleSelectionChange"
              style="margin-left: 10px"
            >
              <el-table-column
                type="selection"
                v-model="multipleSelection"
              ></el-table-column>
              <el-table-column label="ID" prop="ID" sortable> </el-table-column>
              <el-table-column label="名称" prop="name" sortable>
              </el-table-column>
              <el-table-column label="电话号码" prop="phoneNumber"> </el-table-column>
              <el-table-column label="年龄" prop="age" sortable>
              </el-table-column>
            </el-table>
          </el-card>
        </el-form-item>
      </el-form>
      <el-button type="primary" @click="submitForm" style="margin-top: 20px"
        >立即添加</el-button
      >
    </el-card>
  </el-main>
</template>

<script>
import { addManageRecord, getUnManagePersonData } from "@/api/manage";
export default {
  data() {
    return {
      labelPosition: "top",
      unManagedPersonData: [],
      unitID: "",
      multipleSelection: [],
    };
  },
  created() {
    getUnManagePersonData().then((res) => {
      this.unManagedPersonData = res.data.unManagedPersonData;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getUnManagePerson() {
      getUnManagePersonData().then((res) => {
        if (res.code === 20000)
          this.unManagedPersonData = res.data.unManagedPersonData;
      });
    },
    submitForm() {
      let selectedIDs = [];
      this.multipleSelection.forEach((item) => {
        selectedIDs.push(item.ID);
      });
      if (selectedIDs.length === 0) {
        this.$message({
          message: "请至少勾选一项，再进行操作",
          type: "warning",
        });
      }
      addManageRecord({
        personIDs: selectedIDs,
        unitID: this.unitID,
      })
        .then((res) => {
          if (res.code == 20000) {
            this.$message("添加管理成功");
            this.$refs.unManagedPersonTable.clearSelection();
            getUnManagePersonData().then((res) => {
              if (res.code === 20000)
                this.unManagedPersonData = res.data.unManagedPersonData;
            });
          } else {
            this.$message.error("添加管理失败");
          }
        })
        .catch(() => {
          this.$message.error("添加管理失败");
        });
    },
  },
};
</script>
<style scoped>
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
.el-card {
  transition: all 0.25s;
}
.el-card:hover {
  margin-top: -5px;
}
.el-input {
  margin-left: 10px;
}
</style>
