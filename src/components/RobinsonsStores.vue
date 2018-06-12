<template>
  <div class="landingpage">
    <x-header class="title-box" @on-click-back="$router.back()" :left-options="{backText: '',preventGoBack: true}">{{title}}</x-header>
    <template v-if="isRequest">
      <div v-if="storeslist.length > 0" class="stores-content">
      <div class="storeslist" v-for="items in storeslist" :key="items.id">
        <h4 v-html="items.title"></h4>
        <p v-html="items.detail"></p>
      </div>
      </div>
      <div class="empty" v-else>
        <img src="../assets/images/empty_bg_system@2x.png" alt="" />
        <p>The system is currently unavailable,</p>
        <p>please try again later.</p>
      </div>
    </template>
  </div>
</template>

<script>
import { isNative } from '@/utils/ua.js'
export default {
  name: 'RobinsonsStores',
  data () {
    return {
      title: 'Robinsons Stores',
      url: '',
      isRequest: false,
      storeslist: []
    }
  },
  created () {
    isNative && this.$cordova.on('deviceready', () => {
      this.getUrl()
    })
  },
  beforeMount () {
    if (this.storeslist.length === 0) {
      document.body.style.backgroundColor = '#f6f6f6';
    }
  },
  methods: {
    getUrl () {
      isNative && this.$cordova.axios.get('/common/stores').then((response) => {
        this.isRequest = true;
        if (response.errorCode === 0) {
          this.storeslist = response.data
        } else {
          return Promise.reject(response)
        }
      }).catch((error) => {
        this.isRequest = true;
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.landingpage{
  padding-top: 40px;

  .title-box{
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
    background-color: #fff;
  }

  .stores-content{
    width: 90%;
    overflow: hidden;
    position: relative;
    margin: 0 auto 2% auto;

    .storeslist{
      overflow: hidden;
      width: 100%;
      padding: 5% 0 0 0;
      position: relative;

      h4 {
        font-weight: normal;
        font-size:rem-calc(36);
        line-height: rem-calc(44);
        color: #000;
        margin-bottom: rem-calc(18)
      }

      p {
        font-size:rem-calc(26);
        line-height: rem-calc(40);
        color: #000;
      }
    }
  }

  .empty {
    text-align: center;
    padding-top: rem-calc(60, 360);

    img {
      width: rem-calc(140, 360);
    }

    p:first-child {
      margin-top: rem-calc(20, 360);
    }

    p {
      font-size: rem-calc(16, 360);
      color: rgba(0,0,0,0.50);
    }
  }
}
</style>
