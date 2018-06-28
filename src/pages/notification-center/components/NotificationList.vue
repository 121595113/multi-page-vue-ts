<template>
  <div
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px'}"
    class="notification-list page-loadmore-wrapper">
    <mt-loadmore
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        @bottom-status-change="handleBottomChange"
        :auto-fill="false"
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
      <div slot="bottom" class="mint-loadmore-bottom">
        <span
          v-show="bottomStatus !== 'loading'"
          :class="['loadimg', bottomStatus === 'drop' ? 'is-rotate' : '']"
        ></span>
        <span class="loading-circle" v-show="bottomStatus === 'loading'">
          <mt-spinner type="fading-circle"></mt-spinner>
        </span>
        <span v-if="bottomStatus === 'pull'"> Pull up</span>
        <span v-else-if="bottomStatus === 'drop'"> Release</span>
        <span v-else-if="bottomStatus === 'loading'"> Loading</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { Loadmore, Spinner, Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
import Empty from '../../../oriente-ui/Empty';
import { isNative } from '@/utils/ua.js';
import axios from 'axios';
export default {
  data () {
    return {
      bottomStatus: '',
      wrapperHeight: 0,
      allLoaded: false,
      notificationList: [],
    }
  },
  components: {
    Empty,
    Toast,
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
    if (isNative) {
      this.$cordova.on('deviceready', () => {
        this.fetchData();
      })
    } else {
      this.fetchData();
    }
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    this.setTitle('Notifications');
    // window.addEventListener('on-click-back', (e) => {
    //   console.log('from list back btn');
    // });
    // this.$on('on-click-back', function () {
    //   alert('user');
    // });
  },
  methods: {
    onBack (e) {
      console.log('list');
    },
    // goBack () {
    //   console.log('goBack...');
    //   isNative && this.$cordova.router.back();
    // },
    handleBottomChange (status) {
      this.bottomStatus = status;
    },
    loadBottom () {
      this.fetchData();
      // const that = this;
      // setTimeout(() => {
      //   let lastValue = that.notificationList.length;
      //   if (lastValue <= 6) {
      //     for (let i = 1; i <= 1; i++) {
      //       that.notificationList.push({
      //         notificationId: (+new Date() + i * 100),
      //         title: 'This is Title This is Title',
      //         template: '<p>Cashalo is <a href="http://m.baidu.com/">sign up b</a> on beta testing so we currently only have pre-approved users and partners on the platform. If you are interested in using Cashalo once we launch to the public, <a href="#">sign up</a>to get the latest updates.</p>',
      //         effectiveAt: 'Jun 23,1998 23:59',
      //       });
      //     }
      //   } else {
      //     Toast('no more contents');
      //     this.allLoaded = true; // 若数据已全部获取完毕
      //   }
      //   this.$refs.loadmore.onBottomLoaded();// 固定方法，查询完要调用一次，用于重新定位
      //   console.log('loadBottom end, this.allLoaded = ', this.allLoaded);
      // }, 1500);
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
      if (isNative) {
        const msgId = -1;
        const pageSize = 10;
        const that = this;
        this.$cordova.axios.get(`/notification/${msgId}/${pageSize}`)
          .then(res => {
            console.log(res);
            const result = res.data;
            if (result.length > 0) {
              result.forEach((item, index) => {
                that.notificationList.push({
                  notificationId: item.notificationId,
                  title: item.title,
                  template: item.template,
                  effectiveAt: item.effectiveAt,
                });
              });
              this.$refs.loadmore.onBottomLoaded();
            } else {
              this.allLoaded = true;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        const that = this;
        axios.get('http://192.168.12.12:3000/msgList')
          .then((res) => {
            const result = res.data.data;
            console.log(result);
            if (result.length > 0) {
              result.forEach((item, index) => {
                that.notificationList.push({
                  notificationId: item.notificationId,
                  title: item.title,
                  template: item.template,
                  effectiveAt: item.effectiveAt,
                });
              });
              this.$refs.loadmore.onBottomLoaded();
            } else {
              this.allLoaded = true;
            }
          })
          .catch(err => {
            console.error(err);
          })
      }
    },
    ...mapMutations([
      'setTitle',
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
// .mint-loadmore-bottom {
//   .mint-loadmore-text {
//     font-size: 12px;
//     color: rgba(0,0,0,0.50);
//   }
// }

.mint-loadmore-bottom {
  span {
    font-size: rem-calc(12, 360);
    color: rgba(0,0,0,0.50);
    display: inline-block;
    transition: .2s linear;
    vertical-align: middle;
  }
  span.is-rotate {
    transform: scale(0.6) rotate(180deg);
  }
  .loadimg {
    background-image: url('../../../assets/images/common_loading_up@2x.png');
    width: rem-calc(48, 360);
    height: rem-calc(48, 360);
    background-size: cover;
    transform: scale(0.6);
  }
  .loading-circle {
    margin-right: rem-calc(10, 360);
  }
}
</style>
