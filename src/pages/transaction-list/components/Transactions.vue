<template>
  <div class="transactios">
    <div class="test">
      hello
      <Tag type="disburment" />
      world
      <Tag type="payment" />
    </div>
    <div class="cell">
      <div class="left"><Tag type="disburment" /></div>
      <div class="content">

      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag';

export default {
  components: {
    Tag,
  },
}
</script>

<style lang="scss" scoped>
.transactios {
  height: rem-calc(104);
  .cell {
    display: flex;
    .left {
      flex: initial;
    }
    .content {
      flex: 1;
    }
    .right {
      flex: initial;
    }
  }
}
</style>
