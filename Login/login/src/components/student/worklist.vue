<template>
  <div class="work">
    <el-card class="box-card main-header">
      <bread></bread>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary" size='mini' class="fl" @click="add">新增</el-button>
        <el-table :data="tableData" style="width: 100%" class="center">
          <el-table-column prop="date" label="日期" ></el-table-column>
          <el-table-column prop="work" label="作业" ></el-table-column>
          <el-table-column prop="stop" label="截至日期" ></el-table-column>
          <el-table-column prop="success" label="已交人数" ></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateinfo(scope.row)"></el-button>
                <el-dialog :title="state ? '修改作业信息':'新增作业信息'" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="日期:" :label-width="formLabelWidth">
                        <el-input v-model="form.date" prop="date" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="作业:" :label-width="formLabelWidth">
                        <el-input v-model="form.work" prop="work" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="截止日期:" :label-width="formLabelWidth">
                        <el-input v-model="form.stop" prop="stop" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="已交人数:" :label-width="formLabelWidth">
                        <el-input v-model="form.success" prop="success" autocomplete="off"></el-input>
                        </el-form-item>
                        
                    </el-form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogFormVisible = false">取 消</el-button>
                        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                    </div>
                    </el-dialog>
                <el-button type="danger" size="mini" icon="el-icon-delete"></el-button> 
              </template>
          </el-table-column>
        </el-table>
        <el-pagination
        background
        layout="prev, pager, next,jumper"
        :total="7"
        @current-change="handleCurrentChange">
        </el-pagination>
        <!-- <page></page> -->
      </div>
    </el-card>
      
  </div>
</template>
<style lang="scss">
.work {
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
    .fl{
      float: left;
    }
  }
  .clearfix {
    height: 50px;
    span {
      float: left;
      height: 16px;
    }
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
    width: 100%;
    height: 440px;
    overflow:auto;
    .el-card__header {
      height: 50px;
    }
    .el-table td, .el-table th{
      padding: 5px 0;
    }
  }
  .main-header {
    height: 50px;
    margin-bottom: 15px;
    overflow: hidden;
  }
}
</style>
<script>
    import bread from '../common/breadcrumbs'
    import page from '../common/page'
    export default {
    components: { bread ,page },
    data() {
        return {
        tableData: [],
        current:1,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
        state:false,
        };
    },
    created() {
        this.service
        .get("/work")
        .then((res) => {
            if(this.tableData=res.data.status==='200'){
                this.tableData=[...res.data.data]
            }
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        add(){
            this.form={}
            this.state=false
            this.dialogFormVisible = true
        },
        updateinfo(row){
            this.state=true
            this.dialogFormVisible = true
            this.form={...row}
            console.log(row);
        },
        handleCurrentChange(val) {
            this.current=`${val}`
            console.log(this.current);
        }
    }
    };
</script>