<template lang="html">
  <div class="travelogue-new">
    <div class="editor">
      <mavon-editor
        class="editor-item"
        :language="editorLanguage"
        :placeholder="editorPlacegolder"
        :toolbars="editorConfig"
        @save="onSave"
      ></mavon-editor>
    </div>
    <sweet-modal
      class="html-pre"
      ref="preModal"
      :title="this.$i18n.messages[this.$i18n.locale].m.travelogue.new.pre_title"
    >
      <div
        v-html="markdownResource || this.$i18n.messages[this.$i18n.locale].m.travelogue.new.pre_empty"
        class="html-pre__content"
      ></div>
      <button
        v-if="markdownResource"
        slot="box-action"
        style="margin-right:10px;"
        class="btn btn-warning"
        @click="download('JPEG')">
        {{ $t('m.travelogue.new.download_jpeg') }}
      </button>

      <button
        v-if="markdownResource"
        slot="box-action"
        style="margin-right:10px;"
        class="btn btn-inverse"
        @click="download('PDF')">
        {{ $t('m.travelogue.new.download_pdf') }}
      </button>

      <button
        v-if="markdownResource"
        slot="box-action"
        class="btn btn-danger fui-link"
        @click="$refs.shareModal.open()"
      >
      </button>
    </sweet-modal>

    <sweet-modal
      ref="shareModal"
      :title="this.$i18n.messages[this.$i18n.locale].m.travelogue.new.share_title"
    >
      <social-sharing url="https://trevor.top"
        :title="this.$i18n.messages[this.$i18n.locale].m.share.title"
        :description="this.$i18n.messages[this.$i18n.locale].m.share.description"
        :quote="this.$i18n.messages[this.$i18n.locale].m.share.quote"
        :hashtags="this.$i18n.messages[this.$i18n.locale].m.share.hashtags"
        twitter-user="iMap"
        inline-template>
        <div style="text-align:center;">
          <network network="email">
            <button style="margin:0 2px;" class="btn btn-inverse fui-mail"></button>
          </network>

          <network network="linkedin">
            <button style="margin:0 2px;background-color:#3273AF;" class="btn btn-default fui-linkedin"></button>
          </network>

          <network network="googleplus">
            <button style="margin:0 2px;background-color:#E05742;" class="btn btn-default fui-google-plus"></button>
          </network>

          <network network="line">
            <button style="margin:0 2px;background-color:#52B734;" class="btn btn-default iconfont icon-line"></button>
          </network>

          <network network="skype">
            <button style="margin:0 2px;background-color:#4EACED;" class="btn btn-default fui-skype"></button>
          </network>

          <network network="weibo">
            <button style="margin:0 2px;background-color:#CE3335;" class="btn btn-default iconfont icon-weibo"></button>
          </network>

          <network network="facebook">
            <button style="margin:0 2px;background-color:#415793;" class="btn btn-default fui-facebook"></button>
          </network>

          <network network="whatsapp">
            <button style="margin:0 2px;background-color:#83F07E;" class="btn btn-default iconfont icon-whatsapp"></button>
          </network>

          <network network="reddit">
            <button style="margin:0 2px;background-color:#EB502F;" class="btn btn-default iconfont icon-reddit"></button>
          </network>

          <network network="twitter">
            <button style="margin:0 2px;background-color:#4C9EEC;" class="btn btn-default fui-twitter"></button>
          </network>
        </div>
      </social-sharing>
    </sweet-modal>
  </div>
</template>


<script>
import SocialSharing from 'vue-social-sharing'
import marked from 'marked'
import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'
import { SweetModal } from 'sweet-modal-vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

export default {
  name: "travelogue-new",

  data() {
    return {
      editorLanguage: this.$i18n.locale === 'zh-CN' ? 'cn' : 'en',
      editorPlacegolder: this.$i18n.messages[this.$i18n.locale].m.travelogue.new.placeholder,
      editorConfig: {
        bold: true, // 粗体
        italic: true, // 斜体
        header: true, // 标题
        underline: true, // 下划线
        strikethrough: true, // 中划线
        mark: true, // 标记
        superscript: true, // 上角标
        subscript: true, // 下角标
        quote: true, // 引用
        ol: true, // 有序列表
        ul: true, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: true, // 表格
        fullscreen: false, // 全屏编辑
        readmodel: false, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        navigation: true, // 导航目录
        alignleft: true, // 左对齐
        aligncenter: true, // 居中
        alignright: true, // 右对齐
        subfield: false, // 单双栏模式
        preview: true, // 预览
      },
      markdownResource: ''
    }
  },

  components: {
    mavonEditor,
    sweetModal: SweetModal,
    socialSharing: SocialSharing
  },

  methods: {
    onSave(data) {
      if (data.trim()) {
        // 直接节点克隆导致 canvas 转图片错位
        this.markdownResource = marked(data)
      }

      this.$refs.preModal.open()
    },
    getFilename(type) {
      return 'travelogue_' + (new Date()).getTime() + '.' + type
    },
    download(type) {
      let pdfDom = document.querySelector('.html-pre__content')

      html2canvas(pdfDom, {
        dpi: window.devicePixelRatio,
        useCORS: true
      }).then(canvas => {
        let contentWidth  = canvas.width
        let contentHeight = canvas.height
        let pageHeight    = contentWidth / 592.28 * 841.89
        let leftHeight    = contentHeight
        let position      = 0
        let imgWidth      = 595.28
        let imgHeight     = 592.28 / contentWidth * contentHeight

        if (type === 'JPEG') {
          let img = document.createElement('a')
          img.href = canvas.toDataURL('image/jpeg').replace("image/jpeg", "image/octet-stream")
          img.download = this.getFilename('jpg')
          img.click()
        }

        if (type === 'PDF') {
          let pageData = canvas.toDataURL('image/jpeg', 1.0)
          let PDF = new JsPDF('', 'pt', 'a4')

          if (leftHeight < pageHeight) {
            PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
          } else {
            while (leftHeight > 0) {
              PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
              leftHeight -= pageHeight
              position -= 841.89

              if (leftHeight > 0) {
                PDF.addPage()
              }

            }
          }

          let filename = this.getFilename('pdf')
          PDF.save(filename)
        }
      })
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../../assets/theme.less';

.travelogue-new {
  overflow: auto;
  .editor {
    height: 480px;
    &-item {
      height: 100%;
      z-index: 1;
    }
  }
}

.html-pre {
  overflow: auto;
  &__content {
    width: inherit;
    text-align: left;
    padding: 14px;
    overflow: hidden;
  }
}
</style>