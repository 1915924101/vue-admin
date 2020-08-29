<template>
    <el-pagination
    background
    layout="prev, pager, next,jumper"
    :total="50"
    @current-change="handleCurrentChange">
    </el-pagination>
</template>

<script>
export default {
    data() {
        return {
            current:''
        }
    },
    methods: {
        handleCurrentChange(val) {
            this.current=`${val}`
            console.log(this.current);
        }
    },
}
</script>

<style>

</style>