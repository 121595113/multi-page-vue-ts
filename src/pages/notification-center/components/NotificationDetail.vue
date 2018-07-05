<template>
  <div class="notification-detail">
    <div class="detail-title">{{ title }}</div>
    <div class="detail-content" v-html="template"></div>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      notificationId: 0,
      title: '',
      template: '',
    }
  },
  mounted () {
    document.body.style.backgroundColor = '#fff';
    this.setTitle('Details');
    const {
      notificationId,
      title,
      template,
    } = this.$route.params;
    this.notificationId = notificationId;
    this.title = title;
    this.template = template;
  },
  destroyed () {
    document.body.style.backgroundColor = '#f6f6f6';
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
  background: #fff;
  padding: rem-calc(36, 320) rem-calc(24, 320);
  .detail-title {
    font-weight: bold;
    font-size: rem-calc(16, 320);
    color: rgba(0,0,0,0.80);
  }
  .detail-content {
    p {
      font-size: rem-calc(14, 320);
        color: rgba(0,0,0,0.80);
        line-height: 1.4;
        a {
          color: #266BB7;
          text-decoration: none;
        }
    }
  }
}
</style>
