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
import { mapState } from 'vuex';
export default {
  name: 'App',
  components: {
    'x-header': XHeader,
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState([
      'title'
    ]),
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
