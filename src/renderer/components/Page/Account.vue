<template lang="html">
  <div class="account">
    <div class="row">
      <div class="col-md-4 animated fadeInDown">
        <div class="account-avatar">
          <img :src="avatar">
          <h5
            v-if="!updatingNickname"
            class="account-avatar__username">
            <span>{{ nicknameModel.nickname }}</span>
            <span
              class="fui-new"
              @click="updatingNickname = !updatingNickname"
            ></span>
          </h5>
          <h5 v-else class="account-avatar__username">
            <div class="form-group">
              <div class="input-group">
                <input
                  class="account-avatar__input form-control"
                  v-model="nicknameModel.nickname"
                >
                <span class="input-group-btn">
                  <button type="submit" class="btn">
                    <span
                      class="fui-check"
                      @click="updateNickname"
                    ></span>
                    <span
                      class="fui-cross"
                      @click="updatingNickname = !updatingNickname"
                    ></span>
                  </button>
                </span>
              </div>
            </div>
          </h5>
          <a
            class="btn btn-primary btn-large btn-block upload-avatar"
            @click="updateAvatar"
          >
            <vue-base64-file-upload
              class="upload-avatar__upload"
              accept="image/png,image/gif,image/jpeg"
              disable-preview
              input-class="upload-avatar__input"
              :max-size="customImageMaxSize"
              @size-exceeded="onSizeExceeded"
              @file="onFile"
              @load="updateAvatar"
            >
            </vue-base64-file-upload>
            {{ $t('m.account.change_avatar') }}
          </a>
          <span class="upload-avatar__des">
            {{ $t('m.account.avatar_des') }}
          </span>
        </div>
      </div>

      <div class="col-md-8">
        <div class="btn-toolbar">
          <div class="btn-group">
            <button :class="['btn', 'btn-info', settingLocal === 1 ? 'active' : '']" @click="switchSetting(1)">
              <span class="fui-gear"></span>
              <span>{{ $t('m.account.tool_box.basic_setting') }}</span>
            </button>

            <button :class="['btn', 'btn-info', settingLocal === 2 ? 'active' : '']" @click="switchSetting(2)">
              <span class="fui-location"></span>
              <span>{{ $t('m.account.tool_box.map_config') }}</span>
            </button>

            <button :class="['btn', 'btn-info', settingLocal === 3 ? 'active' : '']" @click="switchSetting(3)">
              <span class="fui-document"></span>
              <span>{{ $t('m.account.tool_box.travelogue_config') }}</span>
            </button>

            <button :class="['btn', 'btn-info', settingLocal === 4 ? 'active' : '']" @click="switchSetting(4)">
              <span class="fui-info-circle"></span>
              <span>{{ $t('m.account.tool_box.about') }}</span>
            </button>
          </div>
        </div>

        <section v-if="settingLocal === 1" class="setting setting_1">
          <h6 class="setting-item setting-itm__title">
            {{ $t('m.account.basic_setting.update_email_title') }}
            <span>{{ email || $t('m.account.basic_setting.empty_email') }}</span>
          </h6>

          <div class="setting-item" @keydown.enter="updateEmail">
            <div class="form-group has-feedback">
              <input class="form-control" type="text" v-model="emailModel.email" :placeholder="$t('m.account.basic_setting.update_email')">
              <span class="form-control-feedback fui-mail"></span>
            </div>

            <div class="form-group has-feedback">
              <input class="form-control" type="text" v-model="emailModel.re_email" :placeholder="$t('m.account.basic_setting.update_reemail')">
              <span class="form-control-feedback fui-mail"></span>
            </div>

            <button class="btn btn-inverse btn-wide" @click="updateEmail">
              {{ $t('m.account.basic_setting.submit') }}
            </button>
          </div>

          <p class="divider"></p>

          <h6 class="setting-item setting-itm__title">
            {{ $t('m.account.basic_setting.update_password_title') }}
          </h6>

          <div class="setting-item">
            <button class="btn btn-success btn-wide">
              {{ $t('m.account.basic_setting.update_password') }}
            </button>
          </div>

          <p class="divider"></p>

          <h6 class="setting-item setting-itm__title">{{ $t('m.account.basic_setting.switch_language') }}</h6>
          <div class="setting-item">
            <div class="form-group">
              <span class="bootstrap-switch-square mrl">
                <div :class="[
                  'bootstrap-switch',
                  'bootstrap-switch-wrapper',
                  'bootstrap-switch-animate',
                  'bootstrap-switch-id-custom-swaitch-lang',
                  localLang === 'zh-CN'
                    ? 'bootstrap-switch-on'
                    : 'bootstrap-switch-off' ]"
                  @click="switchLang">
                  <div class="bootstrap-switch-container"><span class="bootstrap-switch-handle-on bootstrap-switch-primary">EN</span><label class="bootstrap-switch-label">&nbsp;</label><span class="bootstrap-switch-handle-off bootstrap-switch-default">中文</span><input type="checkbox" data-toggle="switch" data-on-label="<i class='fui-check'></i>" data-off-label="<i class='fui-cross'></i>" name="swaitch-lang">
                  </div>
                </div>
              </span>
            </div>
          </div>
        </section>

        <section v-if="settingLocal === 4" class="setting setting_4">
          <h6 class="setting-item setting-itm__title">{{ $t('m.account.about.check_update') }}</h6>

          <div class="setting-item">
            <button class="btn btn-inverse btn-wide">
              {{ $t('m.account.about.submit') }}
            </button>
          </div>

          <p class="divider"></p>

          <h6 class="setting-item setting-itm__title">{{ $t('m.account.about.home') }}</h6>
          <div class="setting-item">
            <div class="form-group">
              <a @click="goUrl('https://imap.trevor.top')">
                https://imap.trevor.top
              </a>
            </div>
          </div>

          <h6 class="setting-item setting-itm__title">{{ $t('m.account.about.author') }}</h6>
          <div class="setting-item">
            <a class="setting-item__link" @click="goUrl('https://trevor.top')">
              <span class="fui-github"></span>
              <span>GitHub</span>
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<script>
import electron from 'electron'
import VueBase64FileUpload from 'vue-base64-file-upload'
import tool from '@/tool/index.js'

export default {
  name: "Account",

  data() {
    return {
      avatarModel: {
        name: '',
        base64: ''
      },
      emailModel: {
        email: '',
        re_email: ''
      },
      nicknameModel: {
        nickname: this.$store.getters.getNickname,
      },
      updatingNickname: false,
      settingLocal: 1,
      customImageMaxSize: 1,
      localLang: this.$i18n.locale,
      user: this.$store.state.USER,
    }
  },

  computed: {
    nickname() {
      return this.$store.getters.getNickname
    },

    avatar() {
      return this.$store.getters.getAvatar
    },
    email() {
      return this.$store.getters.getEmail
    }
  },

  components: {
    VueBase64FileUpload
  },

  methods: {
    switchSetting(value) {
      this.settingLocal = value
    },
    switchLang() {
      if (this.localLang === 'zh-CN') {
        this.localLang = 'en-US'
      } else {
        this.localLang = 'zh-CN'
      }

      this.$i18n.locale = this.localLang

      this.$store.dispatch('SWITCH_LANG', {
        lang: this.localLang
      })
    },
    onFile(file) {
      this.avatarModel.name = file.name
    },
    updateNickname() {
      if (this.nicknameModel.nickname === this.nickname) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.account.nickname_edit)
      } else if (!this.nicknameModel.nickname.length || this.nicknameModel.nickname.length > 10 || !this.nicknameModel.nickname.trim().length) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.account.nickname_edit_error)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.updating)
          }
        }, this)

        this.$store.dispatch('USER_UPDATE', {
          model: {
            nicknameModel: this.nicknameModel
          }
        }).then(() => this.updatingNickname = !this.updatingNickname)
      }
    },
    updateAvatar(dataUri) {
      this.avatarModel.base64 = dataUri

      if (this.avatarModel.base64 && this.avatarModel.name) {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.updating)
          }
        }, this)

        this.$store.dispatch('USER_UPDATE', {
          model: {
            avatarModel: this.avatarModel
          }
        }).then(() => this.avatarModel = { name: '', base64: '' })
      }
    },
    updateEmail() {
      if (!tool.judgeEmail(this.emailModel.email)) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.account_email)
      } else if (this.emailModel.email !== this.emailModel.re_email) {
        this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.account_reemail)
      } else {
        this.$Spin.show({
          render: (h) => {
            return h('div', this.$i18n.messages[this.$i18n.locale].m.message.updating)
          }
        }, this)

        this.$store.dispatch('USER_UPDATE', {
          model: {
            emailModel: this.emailModel
          }
        }).then(() => this.emailModel = { email: '', re_email: '' })
      }
    },
    onSizeExceeded(size) {
      this.$Message.warning(this.$i18n.messages[this.$i18n.locale].m.message.account_exceeded_avatar)
    },
    goUrl(url) {
      electron.shell.openExternal(url)
    }
  }
}
</script>


<style lang="less" scoped>
@import '../../assets/theme.less';

.account {
  padding-top: 10px;
  overflow: auto;
  &-avatar {
    margin: 0 auto;
    & > img {
      width: 250px;
      height: 250px;
      border-radius: 4px;
    }
    &__username {
      & > span {
        vertical-align: middle;
      }
      & > span[class=fui-new] {
        font-size: 20px;
        transition: .25s all;
        cursor: pointer;
        &:hover {
          color: @imap-a_hover;
        }
      }
    }
    .input-group-btn > .btn > .fui-cross {
      transition: .25s all;
      &:hover {
        color: @imap-danger;
      }
    }
    &__input {
      &:focus {
        border-color: @imap-a_hover;
      }
      &:focus + .input-group-btn > .btn {
        border-color: @imap-a_hover;
      }
      &:focus + .input-group-btn > .btn > .fui-check {
        color: @imap-a_hover;
      }
    }
  }
  .row {
    margin: 0;
    .col-md-4 {
      text-align: center;
    }
    .col-md-8 {
      padding: 0;
      .btn-toolbar {
        width: 100%;
        .btn {
          width: 153.4px;
        }
      }
    }
  }
  .divider {
    padding: 16px 0;
    margin: 0 18px;
    border-bottom: 2px solid @imap-divider;
  }
  .setting {
    margin: 0 36px 0 0;
    padding-top: 10px;
    height: 430px;
    border-radius: 0 0 4px 4px;
    background-color: #FFF;
    overflow: auto;
    &-item {
      padding: 0 20px;
      .form-group {
        width: 320px;
      }
      &__link {
        color: @imap-a;
        & > span {
          padding: 0 2px;
          vertical-align: middle;
        }
        &:hover {
          color: @imap-a_hover;
        }
      }
      & > span {
        padding-left: 4px;
        font-size: 14px;
        color: #BDC2C7;
      }
    }
  }
}

.upload-avatar {
  position: relative;
  &__upload {
    position: absolute;
    top: 7px;
    left: 0;
    width: 235.72px;
    height: 41px;
    opacity: 0;
    z-index: 3;
    & > img {
      display: none;
    }
  }
  &__des {
    font-size: 12px;
  }
}

.upload-avatar__img {
  display: none;
}

// 覆盖 Flat UI 默认样式
.btn-group>.btn:first-child:not(:last-child):not(.dropdown-toggle) {
  border-bottom-left-radius: 0;
}

.btn-group>.btn:last-child:not(:first-child), .btn-group>.dropdown-toggle:not(:first-child) {
  border-bottom-right-radius: 0;
}

.form-control, .select2-search input[type=text] {
  border: 2px solid #EDEEF1;
  &:focus {
    transition: .25s all;
    border-color: @imap-a_hover;
  }
}

.input-group-btn .btn {
  border-color: #EDEEF1;
}
</style>