<template lang="html">
  <div class="map-make">
    <globe-view></globe-view>
  </div>
</template>


<script>
import globeView from '@/components/Ui/Globe'

export default {
  name: "map-make",

  data() {
    return {
    }
  },

  components: {
    globeView
  }
}
</script>


<style lang="less" scoped>
.map-make {
  height: 400px;
}
</style>