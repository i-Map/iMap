<template lang="html">
  <div>
    <imap-header :active-name="activeName"></imap-header>
    <section class="myProject-container">
      <h1 class="myProject-title">我的足迹</h1>
      <p v-if="updateDate" class="myProject-span"><span>上次更新：</span>{{ updateDate | dateFormat }}</p>
      <div v-if="updateDate">
        <a href="javascript:;" class="edit-btn" @click="edit">
          查看
        </a>
        <a href="javascript:;" class="del-btn" @click="delModal = true">
          删除
        </a>
      </div>
      <h2 v-else class="myProject-tips">暂无数据</h2>
    </section>
    <Modal
      v-model="delModal"
      title="警告"
      @on-ok="delMyProject"
      @on-cancel="cancleDelModal">
      <p>确定要删除已有项目么？</p>
    </Modal>
  </div>
</template>


<script>
import { mapState } from 'vuex'
import ImapHeader from '@/components/Layout/Header'
import storage from 'store'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
export default {
  name: "MyProject",
  data() {
    return {
      activeName: '3-1',
      updateDate: '',
      delModal: false
    }
  },
  components: {
    ImapHeader
  },
  created() {
    this.$Spin.show()
    ajax.post({
      url: url.ASYNC_DOWNLOAD,
      data: {
        userId: this.$store.state.userInfo.userInfo.objectId || storage.get('userId')
      }
    }).then(data => {
      this.$Spin.hide()
      this.updateDate = data.updateMapDate
    })
  },
  computed: {
    ...mapState({
      userId: state => state.userInfo.userInfo.objectId || storage.get('userId'),
      countAlias: 'userId'
    })
  },
  methods: {
    edit() {
      this.$router.push({
        name: 'Chart'
      })
    },
    delMyProject() {
      this.delModal = false
      this.$Spin.show()
      ajax.post({
        url: url.DELMAPDATA,
        data: {
          userId: this.userId || storage.get('userId')
        }
      }).then(data => {
        new window.Notification('iMap', {
          body: '项目删除成功',
          silent: true
        })
        this.$Spin.hide()
        this.$router.push({
          name: 'Home'
        })
      })
    },
    cancleDelModal() {
      this.delModal = false
    }
  }
}
</script>


<style lang="less" scoped>
  @import '../../assets/my-theme/custom.less';
  .myProject-container {
    margin: 66px 50px;
    width: 900px;
    height: 200px;
    background: #262629;
  }

  .myProject-title {
    padding: 12px 20px;
    font-weight: 400;
  }

  .myProject-span {
    padding: 0 20px;
    font-weight: 400;
    color: #AD4B35;
  }

  .myProject-tips {
    padding: 12px 20px;
    font-weight: 300;
  }

  .edit-btn, .del-btn {
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
