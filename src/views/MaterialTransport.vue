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
          <el-option label="物资名称" value="materialName"></el-option>
          <el-option label="物资种类" value="materialType"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <!-- 筛选栏 -->
    </el-card>
    <br />
    <el-card>
      <el-table :data="searchData" border style="width: 100%">
        <el-table-column
          fixed
          prop="materialID"
          label="物资编号"
          sortable
          width="120"
        >
        </el-table-column>
        <el-table-column prop="materialName" label="物资名称">
        </el-table-column>
        <el-table-column prop="materialType" label="物资种类">
        </el-table-column>
        <el-table-column prop="courierCompany" label="承运物流公司">
        </el-table-column>
        <el-table-column label="物流状态" prop="state"> </el-table-column>
        <el-table-column prop="materialNum" label="物资数量"> </el-table-column>
        <el-table-column prop="courierName" label="快递员姓名">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              @click="(dialogItemsVisible = true), showDetail(scope.row)"
              type="text"
              >查看详情</el-button
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

      <el-dialog title="查看详情" :visible.sync="dialogItemsVisible" slot>
        <el-card>
          <el-descriptions
            class="margin-top"
            title="物流详细信息"
            :column="3"
            :size="size"
            :data="getRowData"
            border
          >
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-truck"></i>
                物流状态
              </template>
              {{ transportDetailedData.state }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-tickets"></i>
                物资编号
              </template>
              {{ transportDetailedData.materialID }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-time"></i>
                承运物流公司
              </template>
              {{ transportDetailedData.courierCompany }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-tickets"></i>
                运输员编号
              </template>
              {{ transportDetailedData.courierID }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-user"></i>
                运输员姓名
              </template>
              {{ transportDetailedData.courierName }}
            </el-descriptions-item>
            <el-descriptions-item :span="2">
              <template slot="label">
                <i class="el-icon-mobile-phone"></i>
                运输员手机号
              </template>
              {{ transportDetailedData.courierPhone }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                起始地
              </template>
              {{ transportDetailedData.departure }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-location-outline"></i>
                当前位置
              </template>
              {{ transportDetailedData.currentLocation }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-office-building"></i>
                目的地
              </template>
              {{ transportDetailedData.destination }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-tickets"></i>
                物资名称
              </template>
              {{ transportDetailedData.materialName }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-copy-document"></i>
                物资种类
              </template>
              {{ transportDetailedData.materialType }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template slot="label">
                <i class="el-icon-coin"></i>
                物资数量
              </template>
              {{ transportDetailedData.materialNum }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogItemsVisible = false"
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
    showDetail(row) {
      this.show = true; //控制弹窗显示
      this.transportDetailedData.courierID = row.courierID;
      this.transportDetailedData.courierName = row.courierName;
      this.transportDetailedData.courierPhone = row.courierPhone;
      this.transportDetailedData.currentLocation = row.currentLocation;
      this.transportDetailedData.departure = row.departure;
      this.transportDetailedData.destination = row.destination;
      this.transportDetailedData.materialName = row.materialName;
      this.transportDetailedData.courierCompany = row.courierCompany;
      this.transportDetailedData.materialNum = row.materialNum;
      this.transportDetailedData.materialType = row.materialType;
      this.transportDetailedData.state = row.state;
      this.transportDetailedData.materialID = row.materialID;
    },
  },
  created() {
    this.$axios.get("/transportData").then((res) => {
      this.transportData = res.transportData;
    });
  },

  data() {
    return {
      transportDetailedData: {
        materialID: "",
        materialName: "",
        materialType: "",
        materialNum: 2,
        courierCompany: "",
        state: "",
        courierName: "",
        courierID: "",
        courierPhone: "",
        departure: "",
        destination: "",
        currentLocation: "",
      },
      transportData: [],
      value: "",
      cname: "",
      nameInput: "",
      //searchKey:"",
      options: [],
      loading: false,
      tableData: null,
      total: null,
      dialogTableVisible: false,
      dialogItemsVisible: false,
      formLabelWidth: "120px",
      LabelWidth: "180px",
    };
  },
  computed: {
    searchData: function () {
      if (this.cname == "materialName") {
        let SearchResult = this.transportData.filter(
          (item) =>
            String(item.materialName).indexOf(String(this.nameInput)) > -1
          // &&
          // item.materialType.indexOf(this.materialTypeInput) > -1
        );
        return SearchResult;
      } else if (this.cname == "materialType") {
        let SearchResult = this.transportData.filter(
          (item) =>
            String(item.materialType).indexOf(String(this.nameInput)) > -1
          // &&
          // item.materialType.indexOf(this.materialTypeInput) > -1
        );
        return SearchResult;
      } else {
        return this.transportData;
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
