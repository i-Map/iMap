import _ from 'lodash'

let data = []
let geoCoordMap = []

/**
 * 赋值函数
 * @param {Array} data
 */
const convertData = data => {
	let res = []
	for(let i = 0; i < data.length; i++) {
		let geoCoord = _.last(geoCoordMap[i])
		if(geoCoord) {
			res.push({
				name: data[i].name,
				value: geoCoord.concat(data[i].value).concat(data[i].time)
			})
		}
	}
	return res
}

export default {
	/**
	 * 返回地图数据
	 * @param {Object} obj
	 * @param {String} mapType
	 */
	getMapData({...obj}, mapType) {
		data = []
		geoCoordMap = []
		let geoModel = []
		try {
			obj.data.forEach((item, idx) => {
				let dataModel = {
					name: '',
					value: 84,
					time: ''
				}
				geoModel.push(item[0])
				let itemArr = [+item[1], +item[2]]
				geoModel.push(itemArr)
				dataModel.name = item[0]
				dataModel.time = item[3]
				data.push(dataModel)
			})
			geoCoordMap = _.chunk(geoModel, 2)
			return {
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
					right: '40',
					feature: {
						saveAsImage: {
							show: true,
							pixelRatio: 3
						}
					}
				},
				legend: {
					orient: 'vertical',
					y: 'bottom',
					x: 'right',
					data: ['去过的地点'],
					textStyle: {
						color: '#fff'
					}
				},
				geo: {
					map: mapType,
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
						name: '去过的地点',
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
		} catch(error) {
			this.$Message.error('Excel内容格式错误')
		}
	}
}
