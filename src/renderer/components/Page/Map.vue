<template lang="html">
  <div>
  </div>
</template>


<script>
import ImapHeader from '@/components/Layout/Header'
import chinaMap from '@/assets/img/china.png'
import worldMap from '@/assets/img/world.png'
export default {
  name: "Map",
  data() {
    return {
      chinaMap,
      worldMap,
      activeName: '2'
    }
  },
  components: {
    ImapHeader
  }
}
</script>


<style lang="less" scoped>
  // @import '../../assets/my-theme/custom.less';
  .map-container {
    text-align: center;
    cursor: default;
    .item-wrapper {
      margin-top: 100px;
      display: inline-block;
      height: 200px;
      text-align: center;
      .map {
        margin-top: 30px;
        width: 400px;
        transition: all .3s ease-in;
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
</style>
