<template>
  <span :class="type">{{ value }}</span>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
    },
    value: {
      required: true,
    }
  },
}
</script>

<style lang="scss" scoped>
span {
  font-size: rem-calc(16, 360);
}
.disburment {
  color: #FF8010;
}
.payment {
  color: #000;
}
</style>
