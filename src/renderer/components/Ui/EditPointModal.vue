<template lang="html">
  <Modal :value="value" v-model="showModal" :closable="false" width="360">
    <p slot="header" style="text-align:center">
      <Icon type="edit"></Icon>
      <span>编辑地点</span>
    </p>
    <div style="text-align:center">
      <Input class="editPointModal-input" v-model="model.pointName" placeholder="地点名称" style="width: 300px"></Input><br>
      <Input class="editPointModal-input" v-model="model.pointName" placeholder="经度" style="width: 300px"></Input><br>
      <Input class="editPointModal-input" v-model="model.pointName" placeholder="纬度" style="width: 300px"></Input><br>
      <DatePicker class="editPointModal-input" v-model="model.PointTime" type="date" placeholder="选择日期" style="width: 300px"></DatePicker>    
    </div>
  </Modal>
</template>


<script>
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
      model: {
        pointName: '',
        PointX: '',
        PointY: '',
        PointTime: '',
      },
      showModal: false      
    }
  },
  watch:{
    value(val) {
      this.showModal = val
    },
    showModal(val) {
      this.$emit('input', val);
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
  .editPointModal-input {
    margin-bottom: 12px;
  }
</style>
