<template lang="html">
  <div id="globe"></div>
</template>


<script>
import echarts from 'echarts'
import globeImg from '@/assets/globe/globe.jpg'
import wordData from '@/assets/globe/world.json'
import 'echarts-gl'
import { setTimeout } from 'timers';

export default {
  name: "Globe",

  data() {
    return {
      option: {
        backgroundColor: '#000',
        globe: {
          baseTexture: globeImg,
          heightTexture: globeImg,
          displacementScale: 0.04,
          shading: 'realistic',
          // environment: 'data-gl/asset/starfield.jpg',
          realisticMaterial: {
            roughness: 0.9
          },
          postEffect: {
            enable: true
          },
          light: {
            main: {
              intensity: 5,
              shadow: true
            },
            ambientCubemap: {
              // texture: 'data-gl/asset/pisa.hdr',
              diffuseIntensity: 0.2
            }
          }
        }
      }
    }
  },

  mounted () {
    const myChart = echarts.init(document.getElementById('globe'))
    myChart.setOption(this.option)
  }
}
</script>


<style lang="less" scoped>
#globe {
  width: 100%;
  height: 100%;
}
</style>