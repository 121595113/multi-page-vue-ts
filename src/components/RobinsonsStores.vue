<template>
  <div class="landingpage">
    <van-nav-bar :title="title" left-arrow fixed @click-left="$router.back()" />
    <template v-if="isRequest">
      <div v-if="storeslist.length > 0" class="stores-content">
        <div class="storeslist" v-for="items in storeslist" :key="items.id">
          <h4 v-html="items.title"></h4>
          <p v-html="items.detail"></p>
        </div>
      </div>
      <Empty v-else emptyType="NoData" />
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Empty from './Empty.vue';

let cordova: any;

@Component({
  components: {
    Empty,
  },
})
export default class extends Vue {
  private title: string = 'Robinsons Stores';
  private url: string = '';
  private isRequest: boolean = false;
  private storeslist: any = [];

  public getUrl() {
    cordova && cordova.axios.get('/common/stores').then((response: any) => {
      this.isRequest = true;
      if (response.errorCode === 0) {
        this.storeslist = response.data;
      } else {
        return (window as any).Promise.reject(response);
      }
    }).catch((error: any) => {
      this.isRequest = true;
      console.log(error);
    });
  }

  private created() {
    cordova = (window as any).cordova;
    cordova && cordova.on('deviceready', () => {
      this.getUrl();
    });
  }
}
</script>

<style scoped lang="scss">
.landingpage {
  padding-top: 40px;
  .title-box {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 10;
    background-color: #fff;
  }
  .stores-content {
    width: 90%;
    overflow: hidden;
    position: relative;
    margin: 0 auto 2% auto;
    .storeslist {
      overflow: hidden;
      width: 100%;
      padding: 7% 0 0 0;
      position: relative;
      h4 {
        font-weight: normal;
        font-size: rem-calc(16, 320);
        line-height: rem-calc(18, 320);
        color: #000;
        margin-bottom: rem-calc(18)
      }
      p {
        font-size: rem-calc(14, 320);
        line-height: rem-calc(18, 320);
        color: #000;
      }
    }
  }
}
</style>
