<template>
  <div class="notification-list">
    <ul class="list">
      <li v-for="item in notificationList" :key="item.notificationId">
        <div class="datetime">{{ item.effectiveAt }}</div>
        <div @click="goToDetail(item.notificationId, item.title, item.template)" class="text-card">
          <div class="left">
            <div class="title">{{ item.title }}</div>
            <div class="content-abstract">{{ item.template | textify }}</div>
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
  data () {
    return {
      notificationList: [
        {
          'notificationId': 1,
          'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
          'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
          'effectiveAt': 'Jun 23,1998 23:59'
        },
        {
          'notificationId': 2,
          'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
          'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up a</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
          'effectiveAt': 'Jun 23,1998 23:59'
        },
        {
          'notificationId': 3,
          'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
          'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
          'effectiveAt': 'Jun 23,1998 23:59'
        }
      ]
    }
  },
  filters: {
    textify: function (html) {
      var box = document.createElement('div');
      box.innerHTML = html;
      console.log(box.innerText);
      return box.innerText;
    }
  },
  mounted () {
    this.setTitle('Notifications');
    this.fetchData();
  },
  methods: {
    goToDetail (notificationId, title, template) {
      this.$router.push({
        name: 'detail',
        params: {
          notificationId,
          title,
          template,
        }
      });
    },
    fetchData () {
      console.log('fetch data.');
      console.log(this);
      // this.$cordova.axios.get('http://mock.oriente.com:3000/msgList')
      //   .then(res => {
      //     console.log(res);
      //   })
    },
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
