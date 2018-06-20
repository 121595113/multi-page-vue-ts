<template>
  <div ref="div" @click="click" class="notification-detail">
    this is detail {{router}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      title: 'XHeader',
      router: 'test',
    }
  },
  mounted () {
    console.log('mounted');
    this.$store.commit('setTitle', 'Details');
  },
  methods: {
    click () {
      // console.log(this.$store.commit());
      this.$store.commit('setTitle', 'test');
    }
  },
  computed: {

  }
}
</script>
