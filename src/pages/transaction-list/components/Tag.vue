<template>
  <span :class="type">{{ type | capitalize }}</span>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
    }
  },
  data () {
    return {
      name: this.type === 'payment' ? 'Payment' : 'Disburment',
    }
  },
  filters: {
    capitalize: function (value) {
      if (!value) {
        return;
      }
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
}
</script>

<style lang="scss" scoped>
span {
  width: rem-calc(64, 360);
  display: inline-block;
  box-sizing: content-box;
  text-align: center;
}
.disburment {
  font-size: rem-calc(10, 360);
  color: #FF8010;
  background: #FFF5DB;
  border-radius: rem-calc(25, 360);
  padding: rem-calc(4, 360) rem-calc(10, 360);
}

.payment {
  font-size: rem-calc(10, 360);
  color: #71B853;
  background: #DEF7D3;
  border-radius: 25px;
  padding: 4px 10px;
}
</style>
