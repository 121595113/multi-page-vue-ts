<template>
  <div v-show="showLoading" class="global-loading">
    <van-loading type="spinner" color="white" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Loading } from 'vant';
Vue.use(Loading);

@Component({
  props: {
    showLoading: Boolean,
  },
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
.global-loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: rem-calc(58);
  height: rem-calc(58);
  background-color: rgba(0, 0, 0, 0.54);
  border-radius: rem-calc(4);
}

.van-loading {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
