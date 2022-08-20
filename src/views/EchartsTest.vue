<template>
    <div>
        <div id="chartPie" class="pie-wrap"></div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
require("echarts/theme/macarons"); //引入主题,可以不引入，有默认的
export default {
    data() {
        return {};
    },
    mounted() {
        this.$nextTick(() => {
            this.drawPieChart();
        });
    },
    methods: {
        drawPieChart() {
            this.chartPie = echarts.init(
                document.getElementById("chartPie"),
                "macarons"
            );
            this.chartPie.setOption({
                //显示在上面的文字
                tooltip: {
                    trigger: "item",
                    // formatter: "{a}<br/>{b}: <br/>{c}({d}%)",  其中 {a}指向name名称（访问来源）
                    formatter: "{b}: <br/>{c}({d}%)",
                },
                legend: {
                    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
                    right: 500,
                    orient: "vertical",
                    // 下面注释的代码是控制分类放在哪个地方,需要体验的话，直接把上面的代码注释，把下面的代码解开注释即可
                    //   data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
                    //   left: "center",
                    //   top: "bottom",
                    //   orient: "horizontal"
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        //圆圈的粗细
                        radius: ["50%", "80%"],
                        //圆圈的位置
                        center: ["50%", "50%"],
                        data: [
                            {
                                value: 335,
                                name: "直接访问",
                            },
                            {
                                value: 310,
                                name: "邮件营销",
                            },
                            {
                                value: 234,
                                name: "联盟广告",
                            },
                            {
                                value: 135,
                                name: "视频广告",
                            },
                            {
                                value: 1548,
                                name: "搜索引擎",
                            },
                        ],
                        //动画持续时间：2秒
                        animationDuration: 2000,
                        //控制是否显示指向文字的,默认为true
                        label: {
                            show: false,
                            position: "center",
                            //以下代码可以代表指向小文字的
                            //   show: true,
                            //   formatter: "{b} : {c} ({d}%)",
                            //   textStyle: {
                            //     color: "#333",
                            //     fontSize: 14,
                            //   },
                        },
                    },
                ],
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.pie-wrap {
    width: 100%;
    height: 126px;
}
</style>