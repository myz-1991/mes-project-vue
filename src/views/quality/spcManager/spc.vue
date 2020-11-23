<template>
	<div class="app-container">
		<el-form inline="">
			<el-form-item label="产品">
				<el-select>
					<el-option>1</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="项点">
				<el-select>
					<el-option>2</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="时间">
				<el-col :span="11">
					<el-date-picker></el-date-picker>
				</el-col>
				<el-col :span="2">-</el-col>
				<el-col :span="11">
					<el-date-picker></el-date-picker>
				</el-col>
			</el-form-item>
		</el-form>
		<div :id="id" :class="className" style="width: 100%;height: 500px;" />
	</div>
</template>

<script>
	import echarts from 'echarts'

	export default {
		props: {
			className: {
				type: String,
				default: 'chart'
			},
			id: {
				type: String,
				default: 'chart'
			},
			width: {
				type: String,
				default: '500px'
			},
			height: {
				type: String,
				default: '200px'
			}
		},
		data() {
			return {
				chart: null
			}
		},
		mounted() {
			this.initChart()
		},
		beforeDestroy() {
			if (!this.chart) {
				return
			}
			this.chart.dispose()
			this.chart = null
		},
		methods: {
			initChart() {
				this.chart = echarts.init(document.getElementById(this.id))

				// 绘制图表
				let xArr = new Array();
				let yArr = new Array();
				for (let i = 0; i < 80; i++) {
					xArr[i] = i + 1;
					let num = Math.random();
					if (num > 0.5) {
						num += 99;
					} else {
						num += 100;
					}
					yArr[i] = num;
				}
				this.chart.setOption({
					// title: {
					// 	text: 'Xbar/X Chart for MAM-001(弹片)',
					// 	textStyle: {
					// 		color: '#ebad52',
					// 		fontSize: 25
					// 	},
					// 	//left:'-30'
					// },
					tooltip: {
						trigger: 'axis'
					},
					xAxis: {
						data: xArr,
						splitLine: {
							show: false
						}
					},
					yAxis: {
						splitLine: {
							show: false
						},
						min: '99.4',
						max: '100.6'
					},
					series: [{
						type: 'line',
						symbol: 'none',
						data: yArr,
						lineStyle: {
							normal: {
								//color: 'green'
							}
						},
						markLine: {
							lineStyle: {
								normal: {
									type: 'line',
								},
								color: ['yellow', 'green']
							},
							data: [{
									yAxis: 99.7
								},
								{
									yAxis: 100
								},
								{
									yAxis: 100.3
								}
							]
						}
					}],
					visualMap: {
						top: 10,
						right: 10,
						pieces: [{
								lte: 99.7,
								color: '#e71f18'
							},
							{
								gt: 99.7,
								lte: 100.3,
								color: '#49f532'
							}, {
								gt: 100.3,
								color: '#e71f18'
							}
						],
						outOfRange: {
							color: '#999'
						}
					}
				});
				// this.chart.setOption({
				//   //backgroundColor: '#394056',
				//   animation: true,
				//   grid: {
				//     top: 40,
				//     left: 50,
				//     right: 40,
				//     bottom: 50
				//   },
				//   xAxis: {
				//     name: 'x',
				//     minorTick: {
				//       show: true
				//     },
				//     splitLine: {
				//       lineStyle: {
				//         color: '#999'
				//       }
				//     },
				//     minorSplitLine: {
				//       show: false,
				//       lineStyle: {
				//         color: '#ddd'
				//       }
				//     }
				//   },
				//   yAxis: {
				//     name: 'y',
				//     min: -9,
				//     max: 9,
				//     minorTick: {
				//       show: true
				//     },
				//     splitLine: {
				//       lineStyle: {
				//         color: '#999'
				//       }
				//     },
				//     minorSplitLine: {
				//       show: true,
				//       lineStyle: {
				//         color: '#ddd'
				//       }
				//     }
				//   },
				//   dataZoom: [{
				//     show: true,
				//     type: 'inside',
				//     filterMode: 'none',
				//     xAxisIndex: [0],
				//     startValue: 0,
				//     endValue: 100
				//   }, {
				//     show: true,
				//     type: 'inside',
				//     filterMode: 'none',
				//     yAxisIndex: [0]
				//   }],
				//   series: [{
				//     type: 'line',
				//     showSymbol: false,
				//     clip: true,
				//     data: this.generateData()
				//   }]
				// })
			},
			func(x) {
				x /= 10;
				return Math.sin(x) * Math.cos(x * 2 + 1) * Math.sin(x * 3 + 2) * 10;
			},
			generateData() {
				let data = [];
				for (let i = 0; i <= 200; i += 0.1) {
					data.push([i, this.func(i)]);
				}
				return data;
			}
		}
	}
</script>

<style>
</style>
