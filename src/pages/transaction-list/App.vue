<template>
  <div id="app">
    <x-header
      class="title-box"
      @on-click-back="onBack"
      :left-options="{backText: '',preventGoBack: true}">
        {{title}}
    </x-header>
    <router-view/>
    <Empty v-show="isShowEmptyView" emptyType="TransactionListEmpty" tipText='<p>You do not have any transaction.</p>' />
    <GlobalLoading :showLoading="isShowLoading" />
  </div>
</template>

<script>
import { XHeader } from 'vux';
import { mapState } from 'vuex';
import { isNative } from '@/utils/ua.js';
import Empty from '../../oriente-ui/Empty';
import GlobalLoading from '../../oriente-ui/GlobalLoading';
export default {
  name: 'App',
  components: {
    'x-header': XHeader,
    Empty,
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
      'isShowEmptyView',
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
  mounted () {
    isNative && this.$cordova.on('deviceready', () => {
      window.StatusBar.overlaysWebView(false);
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-1px-b:after {
  border-bottom: 1px solid #ececec;
  color: #ececec;
}

body {
  background: #f6f6f6;
}
</style>
