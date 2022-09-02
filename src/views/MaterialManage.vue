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
        style="width: 92%; margin-bottom: 20px; margin-left: 3%; float: left"
      >
        <el-select v-model="cname" slot="prepend" placeholder="请选择">
          <el-option label="防控单位名称" value="units"></el-option>
          <el-option label="物资种类" value="goodsType"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 筛选栏 -->
    </el-card>

    <!-- <el-input placeholder="请输入物资种类" v-model="materialInput" clearable>
    </el-input>
    <el-input placeholder="请输入防控单位名称" v-model="unitNameInput" clearable>
    </el-input> -->
    <br />
    <el-card>
      <el-table
        :data="
          searchData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
        "
        border
        style="width: 100%"
      >
        <el-table-column fixed prop="goodsId" label="编号" sortable>
        </el-table-column>
        <el-table-column prop="goodsType" label="物资种类"> </el-table-column>
        <el-table-column prop="goodsName" label="物资名称"> </el-table-column>
        <el-table-column prop="count" label="物资数量"> </el-table-column>
        <!-- <el-table-column prop="type" label="计量单位"> </el-table-column> -->
        <!-- <el-table-column prop="isImp" label="是否为重点物资"> </el-table-column> -->
        <el-table-column prop="units" label="疫情防控单位"> </el-table-column>
        <el-table-column prop="unitsPhone" label="防控单位电话">
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
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

      <el-dialog title="更新物资详情" :visible.sync="dialogFormVisible" slot>
        <el-form :model="Mat" ref="Mat">
          <el-form-item label="物资种类" :label-width="formLabelWidth">
            <el-input v-model="Mat.goodsType" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物资名称" :label-width="formLabelWidth">
            <el-input v-model="Mat.goodsName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="物资数量" :label-width="formLabelWidth">
            <el-input v-model="Mat.count" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="计量单位" :label-width="formLabelWidth">
            <el-input v-model="Mat.type" autocomplete="off"></el-input>
          </el-form-item> -->
          <!-- <el-form-item
            label="是否为重要物资"
            :label-width="formLabelWidth"
            prop="isImp"
          >
            <el-radio v-model="Mat.isImp" label="是" @change="test($event)"
              >是</el-radio
            >
            <el-radio v-model="Mat.isImp" label="否" @change="test($event)"
              >否</el-radio
            >
          </el-form-item> -->
          <el-form-item label="疫情防控单位" :label-width="formLabelWidth">
            <el-input v-model="Mat.units" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="防控单位电话" :label-width="formLabelWidth">
            <el-input v-model="Mat.unitsPhone" autocomplete="off"></el-input>
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
  getExistingMaterials,
  getNeedData,
  deleteExistingMaterials,
} from "@/api/material";
export default {
  methods: {
    async getLackSupplies() {
      let { needData } = await getNeedData();
      let { existingMaterial } = await getExistingMaterials();
      let needDataDic = {};
      needData.forEach((item) => {
        if (needDataDic[item.goodName] == undefined) {
          needDataDic[item.goodName] = item.num;
        } else needDataDic[item.goodName] += item.num;
      });
      let existingMaterialDic = {};
      existingMaterial.forEach((item) => {
        if (existingMaterialDic[item.goodsName] == undefined) {
          existingMaterialDic[item.goodsName] = item.count;
        } else existingMaterialDic[item.goodsName] += item.count;
      });
      let lackSupplies = [];
      for (let key in needDataDic) {
        if (existingMaterialDic[key] == undefined) {
          lackSupplies.push(key);
        }
        if (existingMaterialDic[key] <= needDataDic[key] * 0.1) {
          lackSupplies.push(key);
        }
      }
      return lackSupplies;
    },

    deleteRecord(row) {
      this.$confirm(
        "是否确定要删除" + row.goodsName + "的物资记录?",
        "删除数据",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).then(() => {
        deleteExistingMaterials({ goodsId: row.goodsId, units: row }).then(
          (resp) => {
            if (resp.code == 20000) {
              this.$alert(row.goodsName + "的物资记录删除成功！", "消息", {
                confirmButtonText: "确定",
                callback: () => {
                  window.location.reload();
                },
              });
            }
          }
        );
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    getExistingMaterials().then((res) => {
      this.existingMaterial = res.data.existingMaterial;
      this.getLackSupplies().then((lackSupplies) => {
        if (lackSupplies.length !== 0) {
          this.$alert(lackSupplies.toString() + "存在物资短缺状况", "消息", {
            confirmButtonText: "确定",
          });
        }
      });
    });
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 6,
      existingMaterial: [],
      cname: "",
      materialInput: "",
      nameInput: "",
      formLabelWidth: "120px",
      options: [],
      value: [],
      list: [],
      loading: false,
      tableData: null,
      total: null,
      dialogTableVisible: false,
      dialogFormVisible: false,
      //formLabelWidth: '120px',
      Mat: {
        goodsId: "",
        goodsType: "",
        goodsName: "",
        count: "",
        //type: "",
        //isImp: "",
        units: "",
        unitsPhone: "",
        updateTime: "",
      },
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "goodsType") {
        let SearchResult = this.existingMaterial.filter(
          (item) => String(item.goodsType).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else if (this.cname == "units") {
        let SearchResult = this.existingMaterial.filter(
          (item) => String(item.units).indexOf(String(this.nameInput)) > -1
        );
        return SearchResult;
      } else {
        return this.existingMaterial;
      }
    },
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
