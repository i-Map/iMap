<template lang="html">
  <Modal
    :value="value"
    v-model="showModal"
    :closable="false"
    @on-ok="addPoint"
    @on-cancel="cancleModal"
    width="360">
    <p slot="header" style="text-align:center">
      <Icon type="plus"></Icon>
      <span>添加地点</span>
    </p>
    <div style="text-align:center">
      <Input class="addPointModal-input" v-model="model[0]" placeholder="地点名称" style="width: 300px" @on-blur="getLocation"></Input><br>
      <Input v-if="!hasGetLocation" class="addPointModal-input" v-model="model[1]" placeholder="经度" style="margin-top:18px;width: 300px"></Input><br>
      <Input v-if="hasGetLocation" class="addPointModal-input" :value="model[1]" style="width: 300px"></Input><br>
      <Input v-if="!hasGetLocation" class="addPointModal-input" v-model="model[2]" placeholder="纬度" style="width: 300px"></Input><br>
      <Input v-if="hasGetLocation" class="addPointModal-input" :value="model[2]" style="margin-bottom:18px;width: 300px"></Input><br>
      <DatePicker class="addPointModal-input" @on-change="getDate($event)" type="date" placeholder="选择日期" style="width: 300px"></DatePicker>
    </div>
  </Modal>
</template>


<script>
import _ from 'lodash'
import { mapState } from 'vuex'
import { mapActions } from 'vuex'
import storage from 'store'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
import tool from '@/tool/index.js'
import mapApiKey from '@/key/mapApiKey.js'
export default {
  name: "AddPointModal",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: [
        '',
        '',
        '',
        ''
      ],
      showModal: false,
      hasGetLocation: false
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
  methods: {
    ...mapActions({
      addExcelData: 'addExcelData',
      setExcelData: 'setExcelData'
    }),
    getLocation() {
      if(this.model[0] !== '') {
        this.$Spin.show()
        ajax.get({
          url: url.GETLOCATION_WORLD,
          data: {
            address: this.model[0],
            key: mapApiKey.GOOGLE
          }
        }).then(data => {
          if(data.results[0]) {
            this.model[1] = data.results[0].geometry.location.lng
            this.model[2] = data.results[0].geometry.location.lat
            this.hasGetLocation = true
          } else {
            this.$Message.error('输入错误')
          }
        })
        this.$Spin.hide()
      }
    },
    addPoint() {
      if(this.model[0] === '' || this.model[1] === '' || this.model[2] === '' || this.model[3] === '')
        this.$Message.error('输入不能为空')
      else if(!tool.judgeNum(this.model[1]) || !tool.judgeNum(this.model[2]))
        this.$Message.error('经纬度请输入数字格式')
      else {
        this.$Spin.show()
        this.showModal = false
        if(this.$route.path === '/') {
          this.setExcelData(this.model)
          this.$router.push({
            name: 'Chart'
          })
        }
        else
          this.addExcelData(this.model)
        this.model = ['', '', '', '']
        this.hasGetLocation = false
        let updateMapDate = new Date(_.now()).toLocaleString()
        ajax.post({
          url: url.ASYNC_UPLOAD,
          data: {
            userId: this.userId,
            mapData: this.excelData,
            updateMapDate: updateMapDate
          }
        }).then(data => {
          this.$Spin.hide()
        })
      }
    },
    cancleModal() {
      this.showModal = false
    },
    getDate(date) {
      this.model[3] = date
    }
  },
  watch:{
    value(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('input', val)
    }
  },
  mounted() {
    if (this.value) {
      this.showModal = true;
    }
  }
}
</script>


<style lang="less" scoped>
// @import '../../assets/my-theme/custom.less';
  .addPointModal-input_1 {
    margin-bottom: 18px;
  }
</style>