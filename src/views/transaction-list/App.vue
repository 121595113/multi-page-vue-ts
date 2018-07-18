<template>
  <div id="app">
    <van-nav-bar :title="title" left-arrow fixed @click-left="onBack" />
    <router-view/>
    <Empty v-show="isShowEmptyView" emptyType="TransactionListEmpty" tipText='<p>You do not have any transaction.</p>' />
    <GlobalLoading :showLoading="isShowLoading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import Empty from '@/oriente-ui/Empty.vue';
import GlobalLoading from '@/oriente-ui/GlobalLoading.vue';

let cordova: any;

@Component({
  components: {
    Empty,
    GlobalLoading,
  },
  computed: {
    ...mapState([
      'title',
      'isShowLoading',
      'isShowEmptyView',
    ]),
  },
})
export default class App extends Vue {
  public onBack(): void {
    const currentPath = (this as any).$router.currentRoute.path;
    console.log(currentPath);
    if (currentPath === '/') {
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
</style>
