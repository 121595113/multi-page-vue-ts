<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { isNative } from '@/utils/ua.js'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    isNative && this.$cordova.on('deviceready', () => {
      window.StatusBar.overlaysWebView(false)
      // window.StatusBar.backgroundColorByHexString('#333')
    })
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  list-style: none;
  text-decoration: none;
}
</style>
