<template>
  <el-main>
    <el-card>
      <el-tag
        effect="plain"
        style="
          float: left;
          margin-bottom: 10px;
          font-size: 18px;
          font-weight: 400;
          padding: auto;
        "
        >筛选条件</el-tag
      >
      <el-input
        placeholder="请输入防控单位名称"
        v-model="nameInput"
        class="input-with-select"
        style="width: 100%; margin-bottom: 10px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search()"
        ></el-button>
      </el-input>

      <el-input
        placeholder="请输入物资种类"
        v-model="materialInput"
        class="input-with-select"
        style="width: 100%; margin-bottom: 10px"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="search()"
        ></el-button>
      </el-input>
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
export default {
  methods: {
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
        this.$axios
          .delete("/existingMaterial", { data: { goodsId: row.goodsId } })
          .then((resp) => {
            if (resp.code == 20000) {
              this.$alert(row.goodsName + "的物资记录删除成功！", "消息", {
                confirmButtonText: "确定",
                callback: () => {
                  window.location.reload();
                },
              });
            }
          });
      });
    },
    // update(){
    //       this.$axios.put('/existingMaterial',this.Mat).then((resp)=>{
    //         console.log(resp)
    //         if(resp.code==20000){
    //          this.$alert(this.Mat.goodsName+'的物资记录修改成功！',"消息",{
    //            confirmButtonText:"确定",
    //            callback:action=>{
    //              window.location.reload()
    //            }
    //          })
    //         }
    //       })
    //   },
    // edit(row) {
    //    this.$axios.get('/existingMaterial',{params:{goodsID:row.goodsId}}).then((resp)=>{
    //   this.Mat=resp.data;
    // })
    // },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    },
  },
  created() {
    this.$axios.get("/existingMaterial").then((res) => {
      this.existingMaterial = res.existingMaterial;
    });
    // axios.get('http://localhost:8080/Material/findAll/1/6').then((resp)=>{
    //   console.log(resp)
    //   this.tableData=resp.data.records
    //   this.total=resp.data.total
    // })
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
      let SearchResult = this.existingMaterial.filter(
        (item) =>
          String(item.goodsType).indexOf(String(this.materialInput)) > -1 &&
          String(item.units).indexOf(String(this.nameInput)) > -1
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

.input-with-select {
  float: right;
}

.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
</style>
