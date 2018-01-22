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
      <Tooltip content="放大地图" placement="bottom">
        <a v-if="showEditMapBtn" href="javascript:;" class="add-btn" @click="mapZoomUp">
          <Icon type="plus"></Icon>
        </a>
      </Tooltip>
      <Tooltip content="缩小地图" placement="bottom">
        <a v-if="showEditMapBtn" href="javascript:;" class="minus-btn" @click="mapZoomDown">
          <Icon type="minus"></Icon>
        </a>
      </Tooltip>
      <a v-if="showEditMapBtn" href="javascript:;" class="edit-btn" @click="editMap">
        编辑地图
      </a>
    </div>
    <chart v-if="showChart" :options="option"></chart>
    <Modal v-model="editMapModal" width="280">
      <div style="text-align:center">
        <a href="javascript:;" class="point-btn addPoint-btn" @click="addPoint">
          添加地点
        </a><br>
        <a href="javascript:;" class="point-btn editPoint-btn" @click="editPoint">
          编辑地点
        </a><br>
        <a href="javascript:;" class="point-btn delPoint-btn" @click="delPoint">
          删除地点
        </a>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <imap-addpointmodal v-model="showAddPointModal"></imap-addpointmodal>
    <imap-editpointmodal v-model="showEditPointModal"></imap-editpointmodal>
    <imap-delpointmodal v-model="showDelPointModal"></imap-delpointmodal>
  </div>
</template>


<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import storage from 'store'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
import ECharts from 'vue-echarts'
import map from '@/data/map.js'
import ImapHeader from '@/components/Layout/Header'
import ImapAddpointmodal from '@/components/Ui/AddPointModal'
import ImapEditpointmodal from '@/components/Ui/EditPointModal'
import ImapDelpointmodal from '@/components/Ui/DelPointModal'
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
      }],
      userOptions: {
        mapType: 'china',
        zoom: 1,
        roam: false
      },
      showEditMapBtn: false,
      editMapModal: false,
      showAddPointModal: false,
      showEditPointModal: false,
      showDelPointModal: false
    }
  },
  computed: {
    ...mapState({
      excelData: state => state.excel.excelData,
      countAlias: 'excelData',
      userId: state => state.userInfo.userInfo.objectId || storage.get('userId'),
      countAlias: 'userId'
    })
  },
  components: {
    ImapHeader,
    ImapAddpointmodal,
    ImapEditpointmodal,
    ImapDelpointmodal,
    chart: ECharts
  },
  methods: {
    ...mapActions({
      setExcelData: 'setExcelData'
    }),
    makeupChart() {
      if(this.selectMapType === '')
        this.$Message.error('请选择地图类型')
      else {
        if(this.excelData.data !== undefined) {
          this.userOptions.mapType = this.selectMapType
          this.option = map.getMapData(this.excelData, this.userOptions)
          this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('world', worldMap)
          this.showChart = true
          this.showEditMapBtn = true
          let updateMapDate = new Date(_.now()).toLocaleString()
          ajax.post({
            url: url.ASYNC_UPLOAD,
            data: {
              userId: this.userId,
              mapData: this.excelData,
              updateMapDate: updateMapDate
            }
          }).then(data => {})
        }
        else {
          this.$Spin.show()
          ajax.post({
            url: url.ASYNC_DOWNLOAD,
            data: {
              userId: this.userId
            }
          }).then(data => {
            this.$Spin.hide()
            this.option = map.getMapData(data.mapData, this.userOptions)
            this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('world', worldMap)
            this.showChart = true
            this.setExcelData(data.mapData)
            this.showEditMapBtn = true
            let updateMapDate = new Date(_.now()).toLocaleString()
            ajax.post({
              url: url.ASYNC_UPLOAD,
              data: {
                userId: this.userId,
                mapData: this.excelData,
                updateMapDate: updateMapDate
              }
            }).then(data => {})
          })
        }
      }
    },
    mapZoomUp() {
      if(this.userOptions.zoom !== 5) {
        this.userOptions.zoom ++
        this.userOptions.roam = true
        this.option = map.getMapData(this.excelData, this.userOptions)
        this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('world', worldMap)
      }
    },
    mapZoomDown() {
      if(this.userOptions.zoom !== 1) {
        this.userOptions.zoom --
      } else {
        this.userOptions.roam = false
      }
      this.option = map.getMapData(this.excelData, this.userOptions)
      this.selectMapType === 'china' ?  ECharts.registerMap('china', chinaMap) : ECharts.registerMap('world', worldMap)
    },
    editMap() {
      this.editMapModal = true
    },
    addPoint() {
      this.showAddPointModal = true
    },
    editPoint() {
      this.showEditPointModal = true
    },
    delPoint() {
      this.showDelPointModal = true
    }
  }
}
</script>


<style lang="less" scoped>
// @import '../../assets/my-theme/custom.less';
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

  .upload-xls, .makeChart-btn, .next-btn, .edit-btn, .point-btn, .add-btn, .minus-btn {
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

  .edit-btn {
    float: right;
    margin-right: 10px;
    padding: 4px 20px;
  }

  .point-btn {
    margin-bottom: 12px;
  }

  .addPoint-btn {
    margin-top: 40px;
  }

  .add-btn, .minus-btn {
    padding: 4px 10px;
  }

  .add-btn {
    margin-left: 6px;
    margin-right: 6px;
  }
</style>
