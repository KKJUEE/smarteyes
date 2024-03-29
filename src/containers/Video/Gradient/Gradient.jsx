import React from 'react'
import { injectIntl } from 'react-intl'
import styles from './Gradient.scss'
import zh_CN from '../../../i18n/zh_CN'
import { Chart, Geom, Axis, Tooltip, Legend } from "bizcharts";
import DataSet from "@antv/data-set";
import { Spin } from 'antd';
import { API_HISTORYERROR_STATISTIC_PERIOD } from '../../../constants/API'

class Gradient extends React.Component {

    constructor(props) {
        super(props)
        let myDate = new Date();
        this.state = {
            loading: { gradent: false },
            data: [],
            month:['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            yAdd: {
                'BlueScreen': 0,
                'Scratch': 0,
                'Object': 0
            },
            currentMonth: myDate.getMonth()
        }
    }

    componentDidMount() {
        this.getYearData();
    }

    componentWillUnmount() {
    }

    componentWillReceiveProps = (nextProps) => {
        if (this.props.yAdd && this.state.data[this.state.currentMonth]) {
            this.state.yAdd = this.props.yAdd;
            let currentData = this.state.data[this.state.currentMonth]
            this.state.data[this.state.currentMonth][zh_CN.blueScreen] = currentData[zh_CN.blueScreen] + this.state.yAdd.BlueScreen
            this.state.data[this.state.currentMonth][zh_CN.scratch] = currentData[zh_CN.scratch] + this.state.yAdd.Scratch
            this.state.data[this.state.currentMonth][zh_CN.object] = currentData[zh_CN.object] + this.state.yAdd.Object
        }
      }

    getYearData() {
        const { loading, month } = this.state;
        loading.gradent = true;
        this.setState({ loading });
        fetch(API_HISTORYERROR_STATISTIC_PERIOD + 'year').then(res => res.json()).then(data => {
            if (data.length) {
                let keyMap = {'BlueScreen' : zh_CN.blueScreen, 'Scratch': zh_CN.scratch, 'Object': zh_CN.object}
                for (let i = 0; i < data.length; i++) {
                    data[i].Month = month[i];
                    let objs = Object.keys(data[i]).reduce((newData, key) => {
                        let newKey = keyMap[key] || key
                        newData[newKey] = data[i][key]
                        return newData
                    }, {})
                    data[i] = objs
                }
                this.setState({
                    data: data
                });
                loading.gradent = false;
                this.setState({ loading });
            }
        }).catch(err => {
            // 测试代码数据
            console.log('全年折线图为测试数据');
            let data = [
                { Month: "1", BlueScreen: 23, Scratch: 12, Object: 5 },
                { Month: "2", BlueScreen: 4, Scratch: 15, Object: 5 },
                { month: "3", BlueScreen: 10, Scratch: 16, Object: 8 },
                { Month: "4", BlueScreen: 11, Scratch: 7, Object: 12 },
                { Month: "5", BlueScreen: 15, Scratch: 12, Object: 21 },
                { Month: "6", BlueScreen: 21, Scratch: 15, Object: 7 },
                { Month: "7", BlueScreen: 25, Scratch: 17, Object: 23 },
                { Month: "8", BlueScreen: 22, Scratch: 6, Object: 5 },
                { Month: "9", BlueScreen: 22, Scratch: 14, Object: 12 },
                { Month: "10", BlueScreen: 17, Scratch: 11, Object: 5 },
                { Month: "11", BlueScreen: 14, Scratch: 23, Object: 7 },
                { Month: "12", BlueScreen: 9, Scratch: 12, Object: 23 }
            ];
            let keyMap = {'BlueScreen' : zh_CN.blueScreen, 'Scratch': zh_CN.scratch, 'Object': zh_CN.object}
            for (let i = 0; i < data.length; i++) {
                data[i].Month = month[i];
                let objs = Object.keys(data[i]).reduce((newData, key) => {
                    let newKey = keyMap[key] || key
                    newData[newKey] = data[i][key]
                    return newData
                }, {})
                data[i] = objs
            }
            this.setState({
                data: data
            });
            loading.gradent = false;
            this.setState({ loading });
        })
    }

    render() {
        const { data, loading } = this.state;
        const ds = new DataSet();
        const dv = ds.createView().source(data);
        dv.transform({
            type: "fold",
            fields: [zh_CN.blueScreen, zh_CN.scratch, zh_CN.object],
            // 展开字段集
            key: "city",
            // key字段
            value: "num" // value字段
        });
        const cols = {
            Month: {
                range: [0, 1]
            }
        };

        return (
            <Spin spinning={loading.gradent}>
                <div>
                    <Chart height={307} data={dv} scale={cols} forceFit className={styles.wrapper}>
                        <Legend 
                            textStyle={{fill:'white',fontSize:16}}
                        />
                        <Axis name="Month"
                            label={{
                                textStyle: {
                                    fontWeight: 200,
                                    fill: 'white',
                                    fontSize: 20
                                },
                            }}
                            line={{
                                width: 1,
                                stroke: '#323448',
                              }}
                            grid={{
                            lineStyle: {
                                lineWidth: 1,
                                stroke: '#323448',
                                lineDash: [2, 0],
                            },
                            }}
                        />
                        <Axis
                            name="num"
                            label={{
                                formatter: val => `${val}`,
                                textStyle: {
                                    fontWeight: 200,
                                    fill: 'white',
                                    fontSize: 20
                                  },
                            }}
                            grid={{
                                lineStyle: {
                                  stroke: 'rgba(255,255,255,.255)',
                                },
                              }}
                            line={{
                            width: 1,
                            stroke: '#323448',
                            }}
                        />
                        <Tooltip
                            crosshairs
                            crossLine={{
                                lineDash: [2, 3],
                                lineWidth: 1,
                                stroke: 'rgba(255, 255, 255, 0.3)',
                                fontSize: 20
                            }}
                        />
                        <Geom
                            type="line"
                            position="Month*num"
                            size={4}
                            color={"city"}
                            shape={"smooth"}
                        />
                        <Geom
                            type="polygon"
                            position="Month*num"
                            size={4}
                            shape={"circle"}
                            color={"city"}
                            style={{
                                stroke: "#fff",
                                lineWidth: 1
                            }}
                        />
                    </Chart>
                </div>
            </Spin>
        )
    }
}

export default injectIntl(Gradient)