<template lang="html">
  <div>
    <imap-header :active-name="activeName"></imap-header>
    <div class="help-container">
      <p class="content">欢迎使用iMap，在开始之前，请您花费一些时间阅读帮助文档。</p>
      <h1>- 新建项目</h1>
      <p class="content">
        每次新建项目时，你将会看到两个选项：导入Excel和自定义输入
        <h2 class="ml-10">导入Excel</h2>
          <p class="content ml-10">
            在导入Excel操作中，请务必注意格式，请按以下图片格式为标准
            <img :src="excelExample" alt="Excel格式"><br>
            数据说明：<br>
            第一列：城市名称（示例：南昌）<br>
            第二列：地点经度（示例：115.89）<br>
            第三列：地点纬度（示例：28.68）<br>
            第四列：游玩时间（示例：2017.10.10）<br>
            <strong>注意：每次导入新的Excel文件，代表着重新启动项目，之前的数据将会清空。</strong>
          </p>
        <h2 class="ml-10">自定义输入</h2>
          <p class="content ml-10">
            如果你之前拥有项目（可以在 个人中心 - 我的项目 中看到），你将会看到两个按钮：<br>
            新建项目：<br>
            意味着你同样将放弃之前的项目，重新启动一个新的项目。
            编辑项目：<br>
            你可以在之前的项目上追加地点。
          </p>
      </p>
      <h1>- 生成地图</h1>
      <p class="content">
        进入制作页面，请先选择地图类型（中国地图，世界地图），再点击生成地图，这样一张旅行地图就完成了。
      </p>
      <h1>- 编辑地图</h1>
      <p class="content">
        在地图的右上角，你可以看到编辑地图的按钮，按照提示输入即可。
        <strong>注意: 当前版本只能自动获取中国城市的坐标，国外城市坐标请手动输入。</strong>
      </p>
      <h1>- 下载地图</h1>
      <p class="content">
        在地图的右上角，你可以看到下载地图的按钮，保存图片格式为.png格式。
      </p>
      <h1>- 我的项目</h1>
      <p class="content">
        在 个人中心 - 我的项目 中可以查询以往项目，删除即代表着你将放弃本项目，请谨慎操作。<br>
        项目在你操作的时候会实时保存，所以不用担心地图数据会丢失。
      </p>
      <h1>- 最后</h1>
      <p class="content">
        Enjoy iMap ; )<br><br>
        如有疑问，请联系制作人 xizhouh@gmail.com | Trevor
      </p>
    </div>
  </div>
</template>


<script>
import ImapHeader from '@/components/Layout/Header'
import excelExample from '@/assets/img/excel_example.png'
export default {
  name: "Help",
  data() {
    return {
      activeName: '3-2',
      excelExample
    }
  },
  components: {
    ImapHeader
  }
}
</script>


<style lang="less" scoped>
  // @import '../../assets/my-theme/custom.less';
  .help-container {
    margin: 30px 30px;
    cursor: default;
    .content {
      line-height: 40px;
      font-size: 14px;
      font-weight: 400;
    }
    img {
      width: 800px;
    }
    .ml-10 {
      margin-left: 10px;
    }
    .ml-20 {
      margin-left: 20px;
    }
    .ml-30 {
      margin-left: 30px;
    }
    .ml-40 {
      margin-left: 40px;
    }
    .mt-10 {
      margin-top: 10px;
    }
    .mt-20 {
      margin-top: 20px;
    }
    .mt-30 {
      margin-top: 30px;
    }
    .mt-40 {
      margin-top: 40px;
    }
    .mb-10 {
      margin-bottom: 10px;
    }
    .mb-20 {
      margin-bottom: 20px;
    }
    .mb-30 {
      margin-bottom: 30px;
    }
    .mb-40 {
      margin-bottom: 40px;
    }
  }
</style>
