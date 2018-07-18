<template>
  <span :class="type">{{ value }}</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    type: {
      required: true,
    },
    value: {
      required: true,
    },
  },
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
span {
  font-size: rem-calc(16, 360);
}

.disbursement {
  color: #FF8010;
}

.payment {
  color: #000;
}
</style>
