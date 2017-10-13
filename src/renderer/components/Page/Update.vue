<template lang="html">
  <div>
    <imap-header :active-name="activeName"></imap-header>
    <section class="update-container">
      <h1 class="update-title">检查更新</h1>
      <p v-if="newVersion" class="update-span"><span>新版本：</span>{{ newVersion }}</p>
      <div v-if="newVersion">
        <a :href="downloadUrl" class="update-btn">
          立即更新
        </a>
      </div>
      <h2 v-else class="update-tips">暂无更新</h2>
    </section>
  </div>
</template>


<script>
import ImapHeader from '@/components/Layout/Header'
import version from '@/version/version.js'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
export default {
  name: "Update",
  data() {
    return {
      activeName: '3-3',
      newVersion: '',
      downloadUrl: ''
    }
  },
  components: {
    ImapHeader
  },
  created() {
    this.$Spin.show()
    ajax.get({
      url: url.GETNEWVERSION
    }).then(data => {
      if(data.data[0].version !== version.VERSION) {
        this.newVersion = data.data[0].version
        this.downloadUrl = data.data[0].downloadUrl
      }
      this.$Spin.hide()
    })
  },
}
</script>


<style lang="less" scoped>
  @import '../../assets/my-theme/custom.less';
  .update-container {
    margin: 66px 50px;
    width: 900px;
    height: 200px;
    background: #262629;
  }

  .update-title {
    padding: 12px 20px;
    font-weight: 400;
  }

  .update-span {
    padding: 0 20px;
    font-weight: 400;
    color: #AD4B35;
  }

  .update-tips {
    padding: 12px 20px;
    font-weight: 300;
  }

  .update-btn {
    margin-top: 40px;
    margin-left: 20px;
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
    &:hover {
      background: #0B0C0C;
      text-decoration: none;
      cursor: pointer;
    }
  }
</style>
