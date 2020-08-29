<template>
  <div class="aside">
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
            active-text-color="#ffd04b"
          >
            <template v-for="(item,index) in menus">
              <el-submenu :index="item.path" :key="index" v-if="!item.hidden">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item-group v-for="(child,index) in item.children" :key="index">
                  <el-menu-item :index="child.path"><i :class="child.icon"></i>{{child.name}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </div>
</template>

<script>
export default {
  data(){
    return{
      menus:[],
      activePath:''
    }
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    this.menus=[...this.$router.options.routes];
    this.activePath=this.menus[1].children[0].path
  }
};
</script>

<style lang="scss">
  .el-aside {
    height: 565px;
    background-color: #303133;
    color: #333;
    text-align: center;
    line-height: 200px;
    .el-row{
      .el-col{
        width: 100%;
        .el-menu{
          border-right:0;
        }
      }
    }
  }
</style>