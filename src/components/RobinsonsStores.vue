<template>
  <div class="landingpage">
    <x-header class="title-box" @on-click-back="$router.back()" :left-options="{backText: '',preventGoBack: true}">{{title}}</x-header>
    <div class="stores-content">
      <div class="storeslist" v-for="items in storeslist" :key="items.id">
        <h4 v-html="items.title"></h4>
        <p v-html="items.detail"></p>
      </div>
    </div>
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
      storeslist: []
    }
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      isNative && this.$cordova.axios.get('/common/stores').then((response) => {
        this.storeslist = response.data
        console.log(response.data)
        if (response.data.errorCode === 0) {
          console.log('success')
        } else {
          this.$message.error('service error')
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped lang="scss">
.landingpage{
  padding-top: 40px;
}

.title-box{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 1;
  border-bottom: 1px solid #ECECEC;
  background-color: #fff;
}
.stores-content{
   width: 90%;
   overflow: hidden;
   position: relative;
   margin: 0 auto 2% auto;
}
.storeslist{
  overflow: hidden;
  width: 100%;
  padding: 5% 0 0 0;
  position: relative;
}
.storeslist h4{
  font-weight: normal;
  font-size:rem-calc(36);
  line-height: rem-calc(44);
  color: #000;
  margin-bottom: rem-calc(18)
}
.storeslist p{
  font-size:rem-calc(26);
  line-height: rem-calc(40);
  color: #000;
}
</style>
