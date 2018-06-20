<template>
  <div id="app">
    <x-header
      class="title-box"
      @on-click-back="$router.back()"
      :left-options="{backText: '',preventGoBack: true}">
        {{title}}
    </x-header>
    <router-view />
  </div>
</template>

<script>
import { XHeader } from 'vux';
export default {
  name: 'App',
  components: {
    'x-header': XHeader,
  },
  data () {
    return {
      // title: 'Notifications',
    }
  },
  computed: {
    title () {
      return this.$store.state.title;
    }
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
