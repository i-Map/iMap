<template lang="html">
  <nav class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
      <a class="navbar-brand">iMap</a>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li :class="activeItem === '/' || activeItem === '/map/write' ? 'active' : ''">
          <a href="#fakelink">{{ $t('m.header.make_map') }}</a>
        </li>

        <li :class="activeItem === '/log/write' ? 'active' : ''">
          <a href="#fakelink">{{ $t('m.header.write_travelogue') }}</a>
        </li>

        <li class="navbar-avatar">
            <div class="navbar-avatar__wrapper">
              <img :src="avatar">
              <ul class="dropdown-menu dropdown-menu-inverse animated fadeInDown" role="menu">
                <li>
                  <router-link to="/account">{{ $t('m.header.account_setting') }}</router-link>
                </li>
                <li><a href="#">{{ $t('m.header.history_Footprint') }}</a></li>
                <li><a href="#">{{ $t('m.header.travel_log') }}</a></li>
                <li class="divider"></li>
                <li><a @click="logout">{{ $t('m.header.logout') }}</a></li>
              </ul>
            </div>
        </li>
      </ul>
    </div>
  </nav>
</template>


<script>

export default {
  name: "Header",

  computed: {
    activeItem() {
      return this.$route.fullPath
    }
  },

  data() {
    return {
      avatar: this.$store.getters.getAvatar
    }
  },

  methods: {
    logout() {
      this.$store.dispatch('LOGOUT')
        .then(() => this.$router.push({ path: '/auth/login' }))
    }
  }
}
</script>


<style lang="less" scoped>
@import './Header.less';
</style>
