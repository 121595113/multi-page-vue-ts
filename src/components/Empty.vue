<template>
  <div class="empty">
    <img v-if="emptyType === 'NoData'" src="../assets/images/empty_bg_system@2x.png" alt="" />
    <img v-else-if="emptyType === 'BadNetwork'" src="../assets/images/empty_bg_network@2x.png" alt="" />
    <img v-if="emptyType === 'SystemFail'" src="../assets/images/empty_bg_system@2x.png" alt="" />
    <p>The system is currently unavailable,</p>
    <p>please try again later.</p>
  </div>
</template>

<script>
export default {
  props: {
    emptyType: {
      type: String,
      required: false,
    }
  }
}
</script>

<style scoped lang="scss">
.empty {
  text-align: center;
  padding-top: rem-calc(60, 360);

  position: absolute;
  top: 1.6rem;
  bottom: 0;
  left: 0;
  right: 0;
  background: #f6f6f6;

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
</style>
