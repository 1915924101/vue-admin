<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-for="(item,index) in $route.matched" :key="index" :to="{ path: item.path }"><span>{{item.name}}</span></el-breadcrumb-item>
    </el-breadcrumb>   
</template>

<script>
export default {

}
</script>

<style>

</style>