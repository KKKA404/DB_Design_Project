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
            <el-input placeholder="请输入防控单位ID" v-model="contentInput" class="input-with-select"
                style="width: 90%; margin-bottom: 20px; margin-left: 3%; float: left">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-card>
        <br />
        <el-card>
            <el-table :data="
                manageRecord.slice((currentPage - 1) * pageSize, currentPage * pageSize)
            " border style="width: 100%">
                <el-table-column prop="UnitName" label="疫情防控单位名称"> </el-table-column>
                <el-table-column prop="personId" label="人员ID" sortable>
                </el-table-column>
                <el-table-column prop="personName" label="姓名"> </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteRecord(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <div class="block">
            <el-pagination @current-change="handleCurrentChange" :page-size="6" layout="total, prev, pager, next"
                :total="total">
            </el-pagination>


        </div>
    </el-main>
</template>
    
    <script>
import {
    getManageRecord,
    deleteManageRecord,
} from "@/api/manage";
export default {
    methods: {
        deleteRecord(row) {
            this.$confirm(
                "是否确定要删除" + row.personName + "的记录?",
                "删除数据",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            ).then(() => {
                deleteManageRecord({personId:row.personId}).then((res) => {
                    if (res.code == 20000) {
                        this.$alert(row.personName + "的记录删除成功！", "消息", {
                            confirmButtonText: "确定",
                            callback: () => {
                                window.location.reload();
                            },
                        });
                    }
                });
            });
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
    },
    created() {
        getManageRecord().then((res) => {
            this.manageRecord = res.data.manageRecord;
        });
    },

    data() {
        return {
            pageSize: 6,
            currentPage: 1,
            manageRecord: [],
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

        };
    },
    computed: {
        searchData: function () {
            let SearchResult = this.manageRecord.filter(
                (item) => String(item.UnitName) == String(this.contentInput)
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
    