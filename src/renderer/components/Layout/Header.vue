<template lang="html">
  <nav class="navbar navbar-default" role="navigation">
    <div class="navbar-header">
      <a class="navbar-brand">iMap</a>
    </div>

    <div class="collapse navbar-collapse">
      <ul class="nav navbar-nav">
        <li :class="activeItem === '/map/make' ? 'active' : ''">
          <router-link to="/map/make">{{ $t('m.header.make_map') }}</router-link>
        </li>

        <li :class="activeItem === '/travelogue/new' ? 'active' : ''">
          <router-link to="/travelogue/new">{{ $t('m.header.write_travelogue') }}</router-link>
        </li>

        <li class="navbar-avatar">
            <div class="navbar-avatar__wrapper">
              <img :src="avatar">
              <ul class="dropdown-menu dropdown-menu-inverse animated fadeInDown" role="menu">
                <li style="list-style: none;">
                  <router-link to="/account">{{ $t('m.header.account_setting') }}</router-link>
                </li>
                <li style="list-style: none;"><a href="#">{{ $t('m.header.history_Footprint') }}</a></li>
                <li style="list-style: none;"><a href="#">{{ $t('m.header.travel_log') }}</a></li>
                <li style="list-style: none;" class="divider"></li>
                <li style="list-style: none;"><a @click="logout">{{ $t('m.header.logout') }}</a></li>
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
    },
    avatar() {
      return this.$store.getters.getAvatar
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
