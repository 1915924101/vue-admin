<template>
  <div class="stu">
    <el-card class="box-card main-header">
      <bread></bread>
    </el-card>
    <el-card class="box-card">
      <div class="text item">
        <el-button type="primary" size='mini' class="fl" @click="add">新增</el-button>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="姓名">
            <el-input v-model="formInline.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
           <el-form-item label="年龄">
            <el-input v-model="formInline.age" placeholder="请输入年龄"></el-input>
          </el-form-item>
          <el-form-item label="班级:" :label-width="formLabelWidth">
            <el-select v-model="formInline.class" placeholder="请选择班级">
                <el-option
                v-for="(item,index) in options"
                :key="index"
                :label="item"
                :value="index+1">
                </el-option>
            </el-select>
            </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData.slice((current-1)*10+1,current*10)" style="width: 100%" class="center">
          <el-table-column prop="name" label="姓名" ></el-table-column>
          <el-table-column prop="age" label="年龄" ></el-table-column>
          <el-table-column prop="sex_text" label="性别" ></el-table-column>
          <el-table-column prop="class" label="班级" ></el-table-column>
          <el-table-column prop="address" label="地址" ></el-table-column>
          <el-table-column prop="phone" label="联系方式" ></el-table-column>
          <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" icon="el-icon-edit" @click="updateinfo(scope.row)"></el-button>
                <el-dialog :title="state ? '修改学生信息':'新增学生信息'" :visible.sync="dialogFormVisible">
                    <el-form :model="form">
                        <el-form-item label="姓名:" :label-width="formLabelWidth">
                        <el-input v-model="form.name" prop="name" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="性别:" :label-width="formLabelWidth">
                            <el-radio-group v-model="form.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="班级:" :label-width="formLabelWidth">
                        <el-select v-model="form.class" placeholder="请选择班级">
                            <el-option
                            v-for="(item,index) in options"
                            :key="index"
                            :label="item"
                            :value="index+1">
                            </el-option>
                        </el-select>
                        </el-form-item>
                        <el-form-item label="地址:" :label-width="formLabelWidth">
                        <el-input v-model="form.address" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式:" :label-width="formLabelWidth">
                        <el-input v-model="form.phone" autocomplete="off"></el-input>
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
        :total="50"
        @current-change="handleCurrentChange">
        </el-pagination>
        <!-- <page></page> -->
      </div>
    </el-card>
      
  </div>
</template>
<style lang="scss">
.stu {
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
        formInline: {
          name: '',
          age: '',
          class:''
        },
        tableData: [],
        current:1,
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {},
        formLabelWidth: '120px',
        state:false,
        options:['框架一班','框架二班','框架三班','框架四班','框架五班','框架六班','框架七班','框架八班','框架九班']
        };
    },
    created() {
        this.service
        .get("/studentList")
        .then((res) => {
          console.log(res);
          if(this.tableData=res.data.status==='200'){
            res.data.data.forEach(item => {
              item.sex==='1' ? item.sex_text='男':item.sex_text='女'
            });
              this.tableData=[...res.data.data]
          }
        })
        .catch((err) => {
            console.log(err);
        });
    },
    methods: {
        add(){
          this.state=false
          this.dialogFormVisible = true
          this.form={sex:'1'}
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
        },
        onSubmit() {
        this.tableData = this.tableData.filter((item) => {
          // console.log(item.name,this.formInline.name);
        return item.name === this.formInline.name;
        });
        console.log(this.tableData);
        }
    }
    };
</script>