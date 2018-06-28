<template>
  <div id="app">
    <x-header
      class="title-box"
      @on-click-back="onBack"
      :left-options="{backText: '',preventGoBack: true}">
        {{title}}
    </x-header>
    <router-view />
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { mapState } from 'vuex';
import { isNative } from '@/utils/ua.js';
export default {
  name: 'App',
  components: {
    'x-header': XHeader,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'title',
    ]),
  },
  methods: {
    onBack (e) {
      const currentPath = this.$router.currentRoute.path;
      console.log(currentPath);
      if (currentPath === '/list' || currentPath === '/') {
        if (isNative) {
          this.$cordova.router.back();
        }
      } else {
        this.$router.back();
      }
    }
  },
  mounted () {
    isNative && this.$cordova.on('deviceready', () => {
      window.StatusBar.overlaysWebView(false);
    })
  }
}
</script>

<style lang="scss">
body {
  background: #f6f6f6;
}
#app {
  height: 100%;
}
</style>
