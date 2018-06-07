<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    this.$cordova.on('deviceready', () => {
      window.StatusBar.backgroundColorByHexString('#333')
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
