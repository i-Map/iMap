<template lang="html">
  <div>
    <imap-header></imap-header>
    <div class="chartOption-container">
      <Select class="map-select" v-model="selectMapType" placeholder="请选择地图类型" style="width:200px">
        <Option v-for="item in mapList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <a href="javascript:;" class="next-btn" @click="makeupChart">
        生成地图
      </a>
    </div>
    <chart v-if="showChart" :options="option"></chart>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import ECharts from 'vue-echarts'
import map from '@/data/map.js'
import ImapHeader from '@/components/Layout/Header'
import chinaMap from '@/data/china.json'
import worldMap from '@/data/world.json'

export default {
  name: "Chart",
  data() {
    return {
      option: {},
      selectMapType: '',
      showChart: false,
      mapList: [{
          value: 'china',
          label: '中国地图'
        }, {
          value: 'world',
          label: '世界地图'
      }]
    }
  },
  computed: mapState({
    excelData: state => state.excel.excelData[0],
    countAlias: 'excelData'
  }),
  components: {
    ImapHeader,
    chart: ECharts
  },
  methods: {
    makeupChart() {
      if(this.selectMapType === '')
        this.$Message.error('请选择地图类型')
      else {
        this.option = map.getMapData(this.excelData)
        this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('china', worldMap)
        this.showChart = true
        this.swichMapCount ++
      }
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../assets/my-theme/custom.less';
  .echarts {
    width: 100%;
    height: 465px;
  }

  .chartOption-container {
    margin-top: 12px;
    .map-select {
      padding-left: 12px;
      float: left;
    }
  }

  .next-btn {
    margin-left: 10px;
    padding: 4px 10px;    
  }

  .upload-xls, .makeChart-btn, .next-btn {
    padding: 4px 40px;
    position: relative;
    display: inline-block;
    line-height: 20px;
    border: 1px solid #AD4B35;
    border-radius: 4px;
    background: #1D1C1F;
    overflow: hidden;
    color: #AD4B35;
    text-decoration: none;
    text-indent: 0;
    transition: all .2s ease-in-out;
    cursor: pointer;
    & > input {
      position: absolute;
      left: 0;
      top: 0;
      width: 128px;
      font-size: 100px;
      opacity: 0;
      cursor: pointer;      
    }
    &:hover {
      background: #0B0C0C;
      text-decoration: none;
      cursor: pointer;      
    }
  }
</style>