$(function () {
    // 获取左侧今日收入的数据以及百分比
    money()

    function money() {
        $.ajax({
            url: config.mon_number,
            // 请求成功后做的事情
            success: function (res) {
                // 为了确保数据获取成功需要判断res.code的数据，为1获取成功，为0失败
                // console.log(res)
                if (res.code == 1) {
                    // 将今日收入进行渲染
                    $(".left-math").text(res.data.t_number);
                    // 将对比结果进行展示
                    $(".ratio").text(res.data.ratio + "%")
                }
            },
            // error: function () {
            //     $(".left-math").html("9999999"),
            //         $(".ratio").html("0.66")
            // }
        })
    }
    // 获取中间今日数据的百分比
    $.ajax({
        url: config.current_ratio,
        // 请求成功后做的事情
        success: function (res) {
            // console.log(res)
            if (res.code === 1) {
                // 由于数据中的一个属性与echarts的一个属性不同，需要进行替换，所以会用到遍历
                let data = res.data
                // 调用函数
                newData(data)
                let newDatas = newData(data)
                // console.log(newDatas)
                // 使用echarts制作饼装型
                let mychar = echarts.init(document.querySelector("#left-lenth"));
                let option = {
                    tooltip: {
                        show: true,
                        trigger: "item",
                        formatter: "时长：{b}<br/>总计：{c}<br/>占比：{d}%",
                        textStyle: {
                            fontSize: "14"
                        }
                    },
                    series: [{
                        type: "pie",
                        radius: ["50%", "70%"],
                        data: newDatas,
                        color: ['#fbff86', '#ff6f6f', '#ab6eff', '#1dd7ff', '#7dff89'],

                    }, ]
                }
                mychar.setOption(option)
            }
        }
    })
    // 遍历更好属性的过程进行封装
    function newData(data) {
        let arr = [];
        // console.log(data)
        data.forEach((v) => {
            let obj = {};
            obj.name = v.name;
            obj.value = v.total;
            obj.ratio = v.ratio;
            arr.push(obj)
        })
        return arr;
    }
    // 右侧顶部的泊车位相关信息数据
    // 调用函数
    parkSpace()
    // 将右上获取的数据及页面渲染整个进行封装
    function parkSpace() {
        $.ajax({
            url: config.stop_info,
            success: function (res) {
                if (res.code == 1) {
                    $("#parking").text(res.data.total_seat);
                    $("#employ").text(res.data.occupy_seat);
                    $("#use").text(res.data.ratio + "%")
                }
            }
        })
    }
    //右侧中部停车收费排行,不需要获取数据，因为数据为空数组
    let mychar1 = echarts.init(document.querySelector("#box1"));
    let option1 = {
        tooltip: {
            trigger: "item",
            formatter: "{a}<br>{b}{c}:({d}%)",
            textStyle: {
                fontSize: "14"
            }
        },
        legend: {
            show: true,
            bottom: 20,
            itemWidth: 5,
            // height: 20,
            textStyle: {
                color: "#839bb0",
                fontSize: "12",
            }
        },
        series: [{
            name: "缴费类型",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "40%"],
            color: ['#fffbbe', '#ffbd3d'],
            data: [{
                value: 35,
                selected: true,
                name: "现金缴费"

            }, {
                value: 310,
                name: "电子缴费"
            }],
            label: {
                normal: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                    },
                    color: ['#fffbbe', '#ffbd3d']
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },

        }]
    }
    mychar1.setOption(option1)
    let mychar2 = echarts.init(document.querySelector("#box2"));
    let option2 = {
        tooltip: {
            trigger: "item",
            formatter: "{a}<br>{b}{c}:({d}%)",
            textStyle: {
                fontSize: "14"
            }
        },
        legend: {
            show: true,
            bottom: 20,
            itemWidth: 5,
            textStyle: {
                color: "#839bb0",
                fontSize: "12",
            }
        },
        series: [{
            name: "缴费类型",
            type: "pie",
            radius: ["50%", "70%"],
            center: ["50%", "40%"],
            color: ['#b8e3ff', '#009cff'],
            data: [{
                value: 120,
                selected: true,
                name: "现金缴费"

            }, {
                value: 310,
                name: "电子缴费"
            }],
            label: {
                normal: {
                    show: false,
                    position: "center",
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '14',
                    },
                    color: ['#fffbbe', '#ffbd3d']
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },

        }]
    }
    mychar2.setOption(option2);
    // 地图

    $.ajax({
        url: config.all_city_stop,
        success: function (res) {
            if (res.code == 1) {
                let data = res.data;
                let newmap = map(data)
                console.log(newmap)
                let mymap = echarts.init(document.querySelector("#map"));
                let option3 = {
                    series: [{
                        name: "散点",
                        type: "scatter",
                        data: newmap,
                        coordinateSystem: 'geo',
                        symbolSize: 12,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'center',
                                show: false
                            },
                            emphasis: {
                                show: true,
                                // data: newmap
                            }
                        },
                    }, {
                        type: 'effectScatter',
                        coordinateSystem: 'geo',
                        showEffectOn: 'render',
                        data: newmap,
                        // symbolSize: newmap.slice(0, 6),
                        symbolSize: function (val) {
                            return val[2] / 50;
                        },
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#4affd2',
                                shadowBlur: 10,
                                shadowColor: '#873b4b'
                            }
                        },
                        zlevel: 1
                    }],
                    geo: {
                        map: "china",
                        zoom: 5.6,
                        layoutCenter: ["50%", "50%"],
                        layoutSize: 100,
                        itemStyle: {
                            normal: {
                                areaColor: "#194E7c",
                                borderColor: "#111"
                            },
                            emphasis: {
                                areaColor: "#52A8EB",

                            }
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        borderColor: "rgb(74, 223, 255)",
                        alwaysShowContent: true,
                        borderWidth: 1,
                        padding: 20,
                        position: 'left',
                        formatter: function (params) {
                            // return params.name + ' : ' + params.value[2];
                            return `<div class="big-center-card">
                            <div class="modal">
                                <h2>千玺广场千玺广场</h2>
                                <div class="text">今日收入</div>
                                <div class="money">6922.96</div>
                                <div class="car">
                                    <div class="left">
                                        <span>总车位</span>
                                        <span>114</span>
                                    </div>
                                    <div class="right">
                                        <span>空余</span>
                                        <span>114</span>
                                    </div>
                                </div>
                                <div class="bottom">
                                    <div>本日进场 11983</div>
                                    <div>本日出场 11323</div>
                                </div>
                            </div>
                        </div>`
                        }
                    },
                    legend: {
                        orient: 'vertical',
                        y: 'bottom',
                        x: 'right',
                        data: ['pm2.5'],
                        textStyle: {
                            color: '#fff'
                        }
                    },
                }
                mymap.setOption(option3)
            }
        }
    })


    function map(data) {
        arr = [];
        data.forEach((v) => {
            obj = {};
            obj.name = v.name;
            obj.value = [v.baidumap_longitude, v.baidumap_latitude, 1111]
            arr.push(obj)
        })
        return arr
    }
})