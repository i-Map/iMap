let data = [
	{ name: '海门', value: 84 },
	{ name: '鄂尔多斯', value: 84 },
	{ name: '招远', value: 84 },
	{ name: '舟山', value: 84 },
	{ name: '齐齐哈尔', value: 84 },
	{ name: '盐城', value: 84 },
	{ name: '赤峰', value: 84 },
	{ name: '青岛', value: 84 },
	{ name: '乳山', value: 84 },
	{ name: '金昌', value: 84 },
	{ name: '泉州', value: 84 },
	{ name: '莱西', value: 84 },
	{ name: '日照', value: 84 },
	{ name: '胶南', value: 84 },
	{ name: '南通', value: 84 },
	{ name: '拉萨', value: 84 },
	{ name: '云浮', value: 84 },
	{ name: '梅州', value: 84 },
	{ name: '文登', value: 84 }
]

const timeData = {
	'海门': '2017-10-2',
	'鄂尔多斯': '2017-10-2',
	'招远': '2017-10-2',
	'舟山': '2017-9-2',
	'齐齐哈尔': '2017-10-2',
	'盐城': '2015-12-23',
	'赤峰': '2014-4-3',
	'青岛': '2017-8-24',
	'乳山': '2017-10-2',
	'金昌': '2017-10-2',
	'泉州': '2017-10-2',
	'莱西': '2017-10-2',
	'日照': '2017-10-2',
	'胶南': '2017-10-2',
	'南通': '2017-10-2',
	'拉萨': '2017-10-2',
	'云浮': '2017-10-2',
	'梅州': '2017-10-2',
	'文登': '2017-10-2'
}

const geoCoordMap = {
	'海门': [121.15, 31.89],
	'鄂尔多斯': [109.781327, 39.608266],
	'招远': [120.38, 37.35],
	'舟山': [122.207216, 29.985295],
	'齐齐哈尔': [123.97, 47.33],
	'盐城': [120.13, 33.38],
	'赤峰': [118.87, 42.28],
	'青岛': [120.33, 36.07],
	'乳山': [121.52, 36.89],
	'金昌': [102.188043, 38.520089],
	'泉州': [118.58, 24.93],
	'莱西': [120.53, 36.86],
	'日照': [119.46, 35.42],
	'胶南': [119.97, 35.88],
	'南通': [121.05, 32.08],
	'拉萨': [91.11, 29.97],
	'云浮': [112.02, 22.93],
	'梅州': [116.1, 24.55],
	'文登': [122.05, 37.2]
}

const convertData = data => {
	let res = []
	for (let i = 0; i < data.length; i++) {
		let time = timeData[data[i].name]
		let geoCoord = geoCoordMap[data[i].name]
		if (geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value),
				time: time.concat(data[i].value)
			})
		}
	}
	return res
}

export default {
	backgroundColor: '#302F33',
	title: {
		text: '我的足迹',
		subtext: 'My footprints',
		left: 'center',
		textStyle: {
			color: '#fff'
		}
	},
	tooltip: {
		trigger: 'item'
	},
	toolbox: {
		show: true,
		feature: {
			saveAsImage: {
				show: true,
				pixelRatio: 3
			},
			restore: {
				show: true
			}
		}
	},
	legend: {
		orient: 'vertical',
		y: 'bottom',
		x: 'right',
		data: ['地点'],
		textStyle: {
			color: '#fff'
		}
	},
	geo: {
		map: 'china',
		label: {
			emphasis: {
				show: false
			}
		},
		itemStyle: {
			normal: {
				areaColor: '#323c48',
				borderColor: '#111'
			},
			emphasis: {
				areaColor: '#2a333d'
			}
		}
	},
	series: [
		{
			name: '地点',
			type: 'effectScatter',
			coordinateSystem: 'geo',
			data: convertData(data),
			symbolSize: val => val[2] / 10,
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
					color: '#f4e925',
					shadowBlur: 10,
					shadowColor: '#333'
				}
			},
			zlevel: 1
		}
	]
}