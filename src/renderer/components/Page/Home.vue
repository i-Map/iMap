<template lang="html">
  <div>
    <imap-header></imap-header>
    <section class="home-container">
      <div class="panel home-container--item">
        <div class="panel-l panel-item">
          <Icon class="icon-red" type="document-text"></Icon>
          <p class="title">导入Excel</p>
          <a href="javascript:;" class="upload-xls">
            上传文件
            <input type="file" name="resource" @change="addFile($event)">
          </a>
          <a href="javascript:;" class="next-btn" @click="excelToChart">
            解析文件
          </a>
        </div>
        <div class="panel-r panel-item">
          <Icon class="icon-red" type="android-map"></Icon>
          <p class="title">自定义地图</p>
          <a href="javascript:;" class="makeChart-btn">
            开始制作
          </a>
        </div>
      </div>
      <div class="panel">
        <Icon class="icon-yellow" type="information-circled"></Icon>
        <h3>小提示</h3>
        <p class="tip-conatiner">
          <span> 在导入Excel之前请务必在 个人中心 - 帮助手册 查阅帮助手册，格式不对是不能生成地图的喔 </span><br>
          <span> 你可以在图表库中找到你喜欢的款式 </span><br>          
          <span> 可以在 个人中心 - 我的项目 中找到你以往的项目 </span>
        </p>
      </div>
    </section>
  </div>
</template>


<script>
import ImapHeader from '@/components/Layout/Header'
import { mapActions } from 'vuex'
import ajax from '@/server/ajax.js'
import url from '@/server/url.js'
  export default {
    name: "Home",
    data() {
      return {     
        file: '',
        ExcelMakeLoading: false
      }
    },
    components: {
      ImapHeader
    },
    methods: {
      ...mapActions({
        setMapType: 'setMapType',
        setExcelData: 'setExcelData'
      }),
      addFile(event) {
        this.file = event.target.files[0]
        if(this.file !== '') {
          this.$Message.success('文件上传成功')
        }
      },
      excelToChart() {
        if(this.file === '')
          this.$Message.error('请先上传文件')
        else {
          let nameArray = this.file.name.split('.')
          let fileType = nameArray[nameArray.length - 1]
          if(fileType !== 'xlsx' && fileType !== 'xls') {
            this.$Message.error('请上传xlsx格式的文件')            
          } else {
            this.$Spin.show()
            let formData = new FormData()
            formData.append('file', this.file)
            ajax.post({
              url: url.RESOLVEEXCEL,
              data: formData
            }).then((data) => {
              this.$Spin.hide()              
              if(data.code === 0) {
                this.setExcelData(data.data)
                this.$router.push({
                  name: 'Chart'
                })           
              }
            })
          }      
        }
      }
    }
  }
</script>


<style lang="less" scoped>
  @import '../../assets/my-theme/custom.less';
  .home-container {
    margin-left: 30px;
    margin-right: 30px;
    cursor: default;
  }

  .panel {
    margin: 0 auto;
    width: 900px;
    height: 160px;
    background-color: #262629;
    .icon-yellow {
      float: left;
      padding: 10px 20px;
      color: #E3B841;
      font-size: 36px;
    }
    & > h3 {
      padding-top: 12px;
      font-size: 20px;
      font-weight: 500;
    }
    .tip-conatiner {
      margin-top: 8px;
      text-align: left;
      padding: 4px 20px 10px 72px;
      & > span {
        line-height: 30px;
        font-size: 14px;
        font-weight: 400;
      }
    }
  }

  .panel.home-container--item {
    margin-top: 66px;
  }

  .home-container--item {
    margin-bottom: 20px;
    min-width: 940px;    
    height: 200px;
    background-color: #302F33;
    .panel-item {
      display: inline-block;
      .icon-red {
        float: left;
        padding: 10px 20px;
        color: #A33F29;
        font-size: 78px;
      }
      .title {
        padding-top: 14px;
        padding-bottom: 6px;        
        font-size: 18px;
        font-weight: 500;
      }
    }
    .panel-l {
      margin-left: 20px;
      width: 420px;
      height: 100%;
      background-color: #262629;
    }

    .panel-r {
      margin-right: 20px;      
      float: right;
      width: 420px;
      height: 100%;
      background-color: #262629;
    }
  }

  .upload-xls, .makeChart-btn, .next-btn {
    margin-top: 50px;
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

  .upload-xls {
    padding: 4px 10px;
  }

  .next-btn {
    margin-left: 10px;
    padding: 4px 10px;    
  }
</style>