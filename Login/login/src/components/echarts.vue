<template>
    <div id="dataview">
    <el-card>
        <div id="main1"></div>
    </el-card>
    <el-card>
        <div id="main2"></div>
    </el-card>
    </div>
  
</template>
<style lang="scss">
    #dataview{
        display: flex;
        width: 100%;
        #main1,#main2{
            width: 550px;
            height: 400px;
        }
    }
    
</style>
<script>
    export default {
    name: "app",
    data(){
        return{
            newlist:[]
        }
    },
    mounted() {
        let myChart1 = this.$echarts.init(document.getElementById("main1"));
        let myChart2 = this.$echarts.init(document.getElementById("main2"));
        // 指定图表的配置项和数据
        var option1 = {
            title: {
                text: '学生年龄信息'
            },
            xAxis: {
                type: 'category',
                data: ['张三','李四','王五','马六','翠花','狗蛋']
            },
            yAxis: {
                type: 'value',
                min:0,
                max:20,
                interval:3
            },
            series: [{
                data: [15,16,18,16,14,17],
                type: 'bar',
                showBackground: true,
                barWidth:'30px',
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
            }
            var option2 = {
            title: {
                text: '学生人数信息'
            },
            xAxis: {
                type: 'value',
                
                min:0,
                max:60,
                interval:10
            },
            yAxis: {
                data: ['框架一班','框架二班','框架三班','框架四班','框架五班','框架六班'],
                type: 'category'
            },
            series: [{
                data: [53,46,38,31,50,35],
                type: 'bar',
                showBackground: true,
                barWidth:'30px',
                backgroundStyle: {
                    color: 'rgba(220, 220, 220, 0.8)'
                }
            }]
            }
        myChart1.setOption(option1);
        myChart2.setOption(option2);
    }
    };
</script>