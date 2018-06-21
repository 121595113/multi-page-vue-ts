<template>
  <div class="notification-detail">
    <div class="detail-title">The Title</div>
    <div class="detail-content">
      <p>Cashalo is on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>
to get the latest updates.</p>
    </div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  mounted () {
    console.log('mounted');
    this.setTitle('Details');
  },
  methods: {
    ...mapMutations([
      'setTitle'
    ]),
  },
}
</script>

<style lang="scss">
.notification-detail {
  height: 100%;
  background: #fff;
  padding: rem-calc(36, 320) rem-calc(24, 320);
  .detail-title {
    font-weight: bold;
    font-size: rem-calc(16, 320);
    color: rgba(0,0,0,0.80);
  }
  .detail-content {
    font-size: rem-calc(14, 320);
    color: rgba(0,0,0,0.80);
    line-height: 1.4;

    a {
      color: #266BB7;
      text-decoration: none;
    }
  }
}
</style>
