<template>
  <div class="notification-list">
    <ul class="list">
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
      <li>
        <div class="datetime">May 19,2018 08:45</div>
        <div class="text-card">
          <div class="left">
            <div class="title">Notifications Title Notifications Title</div>
            <div class="content-abstract">Notifications Title Notifications Title</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  mounted () {
    this.setTitle('Notifications');
  },
  methods: {
    ...mapMutations([
      'setTitle'
    ]),
  },
}
</script>

<style lang="scss" scoped>
.notification-list {
  height: 100%;

  ul.list {
    margin: 0;
    padding: 0 0 rem-calc(30, 320) 0;
    li {
      list-style-type: none;
      text-align: center;
      padding-top: rem-calc(20, 320);

      .datetime {
        display: inline-block;
        background: #CDD2D9;
        color: #fff;
        border-radius: rem-calc(14, 320);
        padding: rem-calc(4, 320) rem-calc(10, 320);
      }

      .text-card {
        background: #fff;
        border-radius: rem-calc(4, 320);
        margin: 0 rem-calc(16, 320);
        margin-top: rem-calc(10, 320);
        text-align: left;
        padding: rem-calc(24, 320) rem-calc(16, 320);
        display: -webkit-box;
        flex-flow: row wrap;
        align-items: center;

        .left {
          flex: 1;
          .title {
            font-size: rem-calc(16, 320);
            color: rgba(0,0,0,0.80);
            padding-bottom: rem-calc(8, 320);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 95%;
          }
          .content-abstract {
            font-size: rem-calc(14, 320);
            color: rgba(0,0,0,0.50);
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
            width: 95%;
          }
        }

        .right {
          flex: init;
          width: 10px;
          height: 10px;
          border-top: 1px solid #BDC1C8;
          border-right: 1px solid #BDC1C8;
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
