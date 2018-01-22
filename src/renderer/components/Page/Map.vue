<template lang="html">
  <div>
    <imap-header :active-name="activeName"></imap-header>
    <div class="map-container">
      <div class="item-wrapper">
        <h2>中国地图</h2>
        <img class="map china" :src="chinaMap" alt="china">
      </div>
      <div class="item-wrapper">
        <h2>世界地图</h2>
        <img class="map world" :src="worldMap" alt="word">
      </div>
    </div>
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
