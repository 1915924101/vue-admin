<template>
<div class="login">
  <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>教学管理系统</span>
      </div>
       <div class="text item">
        <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名：" prop="name" class="lable">
            <el-input placeholder="请输入用户名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="password" class="lable">
            <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-button type="primary" @click="login('form')">登录</el-button>
        </el-form>
        </div>
      
    </el-card>
</div>
</template>
<style lang="scss">
  .login{
    width: 100vw;
    height: 100vh;
    background: url(../assets/bg.jpg);
      margin-top: 0;
    .clearfix{
      span{
        color: #fff;
        font-size: 28px;
      }
    }
    .box-card {
      width: 480px;
      position: absolute;
      left: 50%;
      top:200px;
      border:0;
      background-color: rgba(0,0,0,0.1);
      transform: translateX(-50%);
      .el-form-item__label{
        color: #fff;
      }
      .el-card__header{
        border-bottom:0;
      }
      .text {
        font-size: 14px;
        
      }

      .item {
        margin-bottom: 18px;
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
          password: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
          ]
          
        }
      };
    },
    methods: {
      login(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.service.get('/login')
            .then((res) => {
              // console.log(res);
              if(res.data.status==='200'){
                this.$message({
                message: res.data.msg,
                type: 'success',
                duration:1000
                });
                this.$router.push('/home/stulist')
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('name',res.data.data.name)
              }
            })
            .catch((error) =>{
              console.log(error)
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }
</script>