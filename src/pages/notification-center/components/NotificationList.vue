<template>
  <div
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px'}"
    class="notification-list page-loadmore-wrapper">
    <mt-loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        :auto-fill="false"
        @top-status-change="handleTopChange"
        @bottom-status-change="handleBottomChange"
        ref="loadmore">
      <ul class="list" v-if="notificationList.length > 0">
        <li v-for="item in notificationList" :key="item.notificationId">
          <div class="datetime">{{ item.effectiveAt }}</div>
          <div
            @click="goToDetail(item.notificationId, item.title, item.template)"
            class="text-card">
            <div class="left">
              <div class="title">{{ item.title }}</div>
              <div class="content-abstract">{{ item.template | textify }}</div>
            </div>
            <div class="right"></div>
          </div>
        </li>
      </ul>
      <Empty v-else emptyType="NoticeListEmpty" tipText='<p>You do not have any notification.</p>' />
      <div slot="top" class="mint-loadmore-top">
        <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
        <span v-show="bottomStatus === 'loading'">
          <mt-spinner type="snake"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Loadmore, Spinner } from 'mint-ui';
import 'mint-ui/lib/style.css';
import Empty from '../../../oriente-ui/Empty';
console.log(123);
console.log(Empty);
export default {
  data () {
    return {
      topStatus: '',
      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false,
      notificationList: [
        // {
        //   'notificationId': 1,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // },
        // {
        //   'notificationId': 2,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up a</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // },
        // {
        //   'notificationId': 3,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // },
        // {
        //   'notificationId': 4,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // },
        // {
        //   'notificationId': 5,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up a</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // },
        // {
        //   'notificationId': 6,
        //   'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
        //   'template': '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        //   'effectiveAt': 'Jun 23,1998 23:59'
        // }
      ]
    }
  },
  components: {
    Empty,
    'mt-spinner': Spinner, // 或者使用 Vue.component(Spinner.name, Spinner) 注册组件
    'mt-loadmore': Loadmore,
  },
  filters: {
    textify: function (html) {
      var box = document.createElement('div');
      box.innerHTML = html;
      return box.innerText;
    }
  },
  created () {
    for (let i = 0; i < 2; i++) {
      this.notificationList.push({
        notificationId: i,
        title: 'This is Title',
        template: '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
        effectiveAt: 'Jun 23,1998 23:59',
      });
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // document.querySelector('.mint-loadmore-content').style.height = '100%';
    this.setTitle('Notifications');
    this.fetchData();
  },
  methods: {
    handleTopChange (status) {
      console.log(status);
      this.topStatus = status;
    },
    handleBottomChange (status) {
      console.log('handleBottomChange ', status);
      this.bottomStatus = status;
    },
    loadTop () {
      console.log('loadTop');
      setTimeout(() => {
        // let firstValue = this.notificationList[0];
        for (let i = 1; i <= 2; i++) {
          this.notificationList.unshift({
            notificationId: i * 10,
            title: 'This is Title',
            template: '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
            effectiveAt: 'Jun 23,1998 23:59',
          });
        }
        this.$refs.loadmore.onTopLoaded();
        console.log('load top end');
      }, 2000);
    },
    loadBottom () {
      setTimeout(() => {
        let lastValue = this.notificationList[this.notificationList.length - 1];
        if (lastValue <= 60) {
          for (let i = 1; i <= 10; i++) {
            this.notificationList.push({
              notificationId: i * 100,
              title: 'This is Title',
              template: '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
              effectiveAt: 'Jun 23,1998 23:59',
            });
          }
        } else {
          this.allLoaded = true; // 若数据已全部获取完毕
        }
        this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
        console.log('loadBottom end, this.allLoaded = ', this.allLoaded);
      }, 1500);
    },
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
  ul.list {
    height: 100%;
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

.page-loadmore-wrapper {
  overflow: scroll;
  -webkit-overflow-scrolling : touch; // 解决view滑动速度慢或者卡顿问题
}
.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}
// .mint-loadmore {
//   height: 100%;
// }
// .mint-loadmore-content {
//   height: 100%;
// }
.mint-loadmore-top {
  span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }
  span.is-rotate {
    transform: rotate(180deg);
  }
}
.mint-loadmore-bottom {
  span {
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
    }
    span.is-rotate {
      transform: rotate(180deg);
    }
}
</style>
