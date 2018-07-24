<template>
  <span :class="type">{{ type | capitalize }}</span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    type: {
      required: true,
    },
  },
  filters: {
    capitalize(value: string) {
      if (!value) {
        return;
      }
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
})
export default class extends Vue {
}
</script>

<style lang="scss" scoped>
span {
  min-width: rem-calc(70);
  display: inline-block;
  box-sizing: content-box;
  text-align: center;
}

.disbursement {
  font-size: rem-calc(10);
  color: #D51C29;
  background:  #FFE9E5;
  border-radius: rem-calc(25);
  padding: rem-calc(4 10);
}

.payment {
  font-size: rem-calc(10);
  color: #71B853;
  background: #DEF7D3;
  border-radius: 25px;
  padding: 4px 10px;
}
</style>
