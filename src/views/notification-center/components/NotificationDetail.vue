<template>
  <div class="notification-detail">
    <div class="detail-title">{{ title }}</div>
    <div class="detail-content" v-html="template"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';

@Component({
  methods: {
    ...mapMutations([
      'setTitle',
    ]),
  },
})
export default class NotificationDetail extends Vue {
  private notificationId: number = 0;
  private title: string = '';
  private template: string = '';

  private mounted() {
    document.body.style.backgroundColor = '#fff';
    (this as any).setTitle('Details');
    const {
      notificationId,
      title,
      template,
    } = (this as any).$route.params;
    this.notificationId = notificationId;
    this.title = title;
    this.template = template;
  }
  private destroyed() {
    document.body.style.backgroundColor = '#f6f6f6';
  }
}
</script>

<style lang="scss">
.notification-detail {
  background: #fff;
  padding: rem-calc(42 24, 320);
  .detail-title {
    font-weight: bold;
    font-size: rem-calc(16, 320);
    color: rgba(0, 0, 0, 0.80);
  }
  .detail-content {
    p {
      font-size: rem-calc(14, 320);
      color: rgba(0, 0, 0, 0.80);
      line-height: 1.4;
      a {
        color: #266BB7;
        text-decoration: none;
      }
    }
  }
}
</style>
