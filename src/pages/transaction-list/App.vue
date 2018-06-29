<template>
  <div id="app">
    <x-header
      class="title-box"
      @on-click-back="onBack"
      :left-options="{backText: '',preventGoBack: true}">
        {{title}}
    </x-header>
    <router-view/>
    <GlobalLoading :showLoading="isShowLoading" />
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { mapState } from 'vuex';
import { isNative } from '@/utils/ua.js';
import GlobalLoading from '../../oriente-ui/GlobalLoading';
export default {
  name: 'App',
  components: {
    'x-header': XHeader,
    GlobalLoading,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'title',
      'isShowLoading',
    ]),
  },
  methods: {
    onBack () {
      const currentPath = this.$router.currentRoute.path;
      console.log(currentPath);
      if (currentPath === '/') {
        if (isNative) {
          this.$cordova.router.back();
        }
      } else {
        this.$router.back();
      }
    }
  },
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-1px-b:after {
  border-bottom: 1px solid #ececec;
  color: #ececec;
}
</style>
