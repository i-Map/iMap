<template lang="html">
  <Modal
    :value="value"
    v-model="showModal"
    :closable="false"
    @on-ok="editPoint"
    @on-cancel="cancleModal"
    width="360">
    <p slot="header" style="text-align:center">
      <Icon type="edit"></Icon>
      <span>编辑地点</span>
    </p>
    <div style="text-align:center">
      <Input class="editPointModal-input" v-model="model[0]" placeholder="地点名称" style="width: 300px"></Input><br>
      <Input class="editPointModal-input" v-model="model[1]" placeholder="经度" style="width: 300px"></Input><br>
      <Input class="editPointModal-input" v-model="model[2]" placeholder="纬度" style="width: 300px"></Input><br>
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
export default {
  name: "EditPointModal",
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
      showModal: false
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
      editExcelData: 'editExcelData'
    }),
    getDate(date) {
      this.model[3] = date
    },
    editPoint() {
      this.showModal = false
      if(!tool.judgeNum(this.model[1]) || !tool.judgeNum(this.model[2]))
        this.$Message.error('经纬度请输入数字格式')
      else {
        this.$Spin.show()
        this.showModal = false
        this.editExcelData(this.model)
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
// @import '../../assets/my-theme/custom.less';
  .editPointModal-input {
    margin-bottom: 12px;
  }
</style>
