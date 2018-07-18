<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class extends Vue {
  private mounted() {
    const cordova = (window as any).cordova;
    cordova && cordova.on('deviceready', () => {
      cordova.statusBar.overlaysWebView(false);
    });
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}
</style>
