<template>
  <span :class="type">{{ type | capitalize }}</span>
</template>

<script>
export default {
  props: {
    type: {
      required: true,
      // default: 'world.',
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
.disburment {
  font-size: 10px;
  color: #FF8010;
  background: #FFF5DB;
  border-radius: 25px;
  padding: 4px 10px;
}

.payment {
  font-size: 10px;
  color: #71B853;
  background: #DEF7D3;
  border-radius: 25px;
  padding: 4px 10px;
}
</style>
