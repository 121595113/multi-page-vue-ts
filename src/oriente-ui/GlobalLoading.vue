<template>
  <div v-show="showLoading" class="global-loading">
    <Spinner type="circles" />
  </div>
</template>

<script>
import { Spinner } from 'vux';
export default {
  props: {
    showLoading: {
      type: Boolean,
    }
  },
  components: {
    Spinner,
  },
  mounted () {
    console.log(this.showLoading);
  }
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
  width: rem-calc(58, 360);
  height: rem-calc(58, 360);
  background-color: rgba(0,0,0,0.54);
  border-radius: rem-calc(4, 360);

  span.vux-spinner {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    stroke: #bdbdbd;
    fill: #bdbdbd;
  }
}
</style>
