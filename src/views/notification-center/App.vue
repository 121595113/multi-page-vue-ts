<template>
  <div id="app">
    <van-nav-bar
      :title="title"
      left-arrow
      fixed
      @click-left="onBack"
    />
    <router-view />
    <GlobalLoading :showLoading="isShowLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import GlobalLoading from '@/oriente-ui/GlobalLoading.vue';

let cordova: any;

@Component({
  components: {
    GlobalLoading,
  },
  computed: {
    ...mapState([
      'title',
      'isShowLoading',
    ]),
  },
})
export default class extends Vue {
  public onBack() {
    const currentPath = (this as any).$router.currentRoute.path;
    console.log(currentPath);
    if (currentPath === '/list' || currentPath === '/') {
      if (cordova) {
        cordova.$router.back();
      }
    } else {
      (this as any).$router.back();
    }
  }
  private mounted() {
    cordova = (window as any).cordova;
    cordova && cordova.on('deviceready', () => {
      cordova.statusBar.overlaysWebView(false);
    });
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
