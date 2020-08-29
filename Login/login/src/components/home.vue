<template>
  <div>
    <div class="header">
      <el-container>
        <el-header>
          <p>教务管理系统</p>
          <p>
            <span>{{name}}</span>
            <span @click="out" style="cursor:pointer;">退出</span>
            </p>
          </el-header>
        <el-container>
          <left></left>
          <!-- <div class="aside">
            <el-aside width="200px">
                <el-row class="tac">
                  <el-col :span="12">
                    <el-menu
                      router
                      :default-active="activePath"
                      class="el-menu-vertical-demo"
                      @open="handleOpen"
                      @close="handleClose"
                      background-color="#545c64"
                      text-color="#fff"
                      active-text-color="#ffd04b">
                      <template v-for="(item,index) in menus" >
                        <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
                            <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group v-for="(child,index) in item.children" :key="index">
                              <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                      </template>
                    </el-menu>
                  </el-col>
                </el-row>
                </el-aside>
          </div> -->
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
    </el-container>
    </div>
    
  </div>
</template>
<style lang="scss">
.header {

  .el-header{
    display: flex;
    justify-content: space-between;
    background-color: #303133;
    color: #fff;
    line-height: 60px;
    a{
      color: #fff;
      text-decoration: none;
    }
  }
  
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
}
</style>
<script>
import left from './common/aside'
export default {
  
components: {left},
  data(){
    return{
      name:''
    }
  },
  created() {
    this.name=localStorage.getItem('name')
    // console.log(this.name);
  },
  methods: {
    out(){
      this.$alert('确定要退出吗', '退出提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$router.push('/login')
            localStorage.clear()
          }
        });
      
    } 
  }
  
}
</script>

