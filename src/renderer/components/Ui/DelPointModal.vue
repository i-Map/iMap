<template lang="html">
  <Modal 
    :value="value" 
    v-model="showModal" 
    :closable="false"
    @on-ok="delPoint"
    @on-cancel="cancleModal"
    width="360">
    <p slot="header" style="text-align:center">
      <Icon type="close"></Icon>
      <span>删除地点</span>
    </p>
    <div style="text-align:center">
      <Input class="delPointModal-input" v-model="model[0]" placeholder="地点名称" style="width: 300px"></Input>  
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
export default {
  name: "DelPointModal",
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      model: [
        ''
      ],
      showModal: false      
    }
  },
  computed: mapState({
    excelData: state => state.excel.excelData,
    countAlias: 'excelData',
    userId: state => state.userInfo.userInfo.objectId || storage.get('userId'),
    countAlias: 'userId'
  }),
  watch:{
    value(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('input', val);
    }
  },
  methods: {
    ...mapActions({
      delExcelData: 'delExcelData'
    }),
    delPoint() {
      if(this.model[0] === '')
        this.$Message.error('输入不能为空')
      else {
        this.$Spin.show()
        this.showModal = false 
        this.delExcelData(this.model)
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
@import '../../assets/my-theme/custom.less';
  .delPointModal-input {
    margin-bottom: 12px;
  }
</style>
