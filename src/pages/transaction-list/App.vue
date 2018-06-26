<template>
  <div id="app">
    <x-header
      class="title-box"
      @on-click-back="$router.back()"
      :left-options="{backText: '',preventGoBack: true}">
        {{title}}
    </x-header>
    <router-view/>
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

<style lang="less">
@import '~vux/src/styles/1px.less';
.vux-1px-b:after {
  border-bottom: 1px solid #ececec;
  color: #ececec;
}
</style>
