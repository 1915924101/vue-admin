<template>
    <div class="earthmap" id="earth">

    </div>
</template>

<script>
    import echarts from 'echarts'
    import 'echarts/map/js/world.js'
    import 'echarts-gl'
    export default {
        data(){
            return{
                mapChart:{},
                //立体球形纹路
                option :{
                    backgroundColor: '#000',
                    globe: {
                        displacementScale: 0.1,
                        globeRadius: 83,
                        baseTexture: require("../../static/img/earth.jpg"),//贴图 球形和平面的吻合
                        silent: true,
                        environment: require("../../static/img/starfield.jpg"), //背景
                        heightTexture: require("../../static/img/bathymetry_bw_composite_4k.jpg"), //地球的整个纹路
                        shading: 'lambert',
                        light: {
                            main: {
                                color: '#fff',
                                intensity: 1.5,
                                shadow: false,
                                shadowQuality: 'high',
                                alpha: 55,
                                beta: 10
                            },
                            ambient: {
                                color: '#fff',
                                intensity: 0.1
                            }
                        },
                        layers: [{
                            type: 'blend',
                            blendTo: 'emission',
                            texture: require("../../static/img/night.jpg")
                        }, {
                            type: 'overlay',
                            texture: require("../../static/img/clouds.png"),
                            shading: 'lambert',
                            distance: 5
                        }],
                        postEffect: {
                            enable: false,
                            SSAO: {
                                enable: true,
                                radius: 10
                            }
                        },

                        //地球是否自己转动 autoRotate为true时自己转动
                        viewControl: {
                            autoRotate: true,
                            animationDurationUpdate: 2000,
                            targetCoord: ''
                        }
                    },
                    series: [
                        {
                            name: 'lines3D',
                            type: 'lines3D',
                            coordinateSystem: 'globe',
                            effect: {
                                show: true,
                                period: 2,
                                trailWidth: 3,
                                trailLength: 0.5,
                                trailOpacity: 1,
                                trailColor: '#0087f4'
                            },
                            blendMode: 'lighter',
                            lineStyle: {
                                width: 1,
                                color: '#0087f4',
                                opacity: 0
                            },
                            data: [],
                            silent: false,

                        }

                    ]

                },

                //平面地球 主要是设置地球的样式
                mapOption: {
                    backgroundColor: 'rgba(2, 81, 97)',//当和立体球形贴图是海洋的颜色
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 100000
                    },
                    series: [
                        {
                            type: 'map',
                            map: 'world',
                            left: 0,
                            top: 0,
                            right: 0,
                            bottom: 0,
                            environment: 'rgba(0,0,0,0)',
                            boundingCoords: [
                                [-180, 90],
                                [180, -90]
                            ],
                            itemStyle: {
                                normal: {
                                    borderWidth: 2,
                                    borderColor: 'rgba(49, 92, 117,0.3)',//地球纹路的颜色
                                    areaColor: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        //相邻每个板块 从上到下的颜色变化
                                        colorStops: [{
                                            offset: 0.2, color: 'rgb(176, 153, 137)' // 0% 处的颜色
                                        }, {
                                            offset: 0.8, color: 'rgba(91, 117, 88,0.8)' // 100% 处的颜色
                                        }],
                                        global: false // 缺省为 false
                                    },
                                }
                            }
                        }
                    ]
                }

            }
        },
        mounted(){
            this.initMap()
        },
        methods:{
             initMap(){

                 this.mapChart = echarts.init(document.createElement('canvas'), null, {
                     width: 1149,
                     height: 500
                 });
                 //获取容器并对其初始化
                 this.myChart = echarts.init(document.getElementById('earth'))

                 //将平面地球和立体球形的纹路重叠
                 this.mapChart.setOption(this.mapOption)
                 this.option.globe.baseTexture = this.mapChart

                 //随机划多条线
                 for (let i = 0; i < 150; i++) {
                     this.option.series[0].data = this.option.series[0].data.concat(this.rodamData())
                 }

                 this.myChart.setOption(this.option);
                // this.myChart.setOption(this.mapOption);// 平面展开图
             },

            //调用划线方法
            rodamData() {
                //let name = '随机点' + Math.random().toFixed(5) * 100000
                // let longitude = Math.random() * 62 + 73
                let longitude = 105.18
                let longitude2 = Math.random() * 360 - 180
                // let latitude = Math.random() * 50 + 3.52
                let latitude = 37.51
                let latitude2 = Math.random() * 180 - 90
                return {
                    coords: [
                        [longitude2, latitude2],
                        [longitude, latitude]
                    ],
                    value: (Math.random() * 3000).toFixed(2)
                }
            }




    }



    }

</script>


<style>
    .earthmap{
        width: 100%;
        height: 500px;
        background: rgba(16, 167, 202, 0.39);
    }


</style>