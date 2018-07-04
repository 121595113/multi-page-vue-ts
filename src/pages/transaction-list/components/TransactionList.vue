<template>
  <div
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px'}"
    class="transactions page-loadmore-wrapper"
  >
    <mt-loadmore
      ref="loadmore"
      :auto-fill="false"
      :top-method="loadTop"
      @top-status-change="handleTopChange"
      :bottom-method="loadBottom"
      @bottom-status-change="handleBottomChange"
      :bottom-all-loaded="allLoaded"
    >
      <template v-if="isRequest">
        <ul
          :style="{ height: wrapperHeight + 'px'}"
          v-if="transactionList.length > 0">
          <li
            class="cell vux-1px-b"
            v-for="(item, index) in transactionList"
            :key="index"
          >
            <div class="left">
              <Tag :type="item.transactionType" />
            </div>
            <div class="content">
              <div class="transaction-at">{{ item.transactionAt }}</div>
              <div class="transaction-party">{{ item.transactionParty }}</div>
              <div class="loan-no">Loan Application No. {{ item.loanOrderNo }}</div>
            </div>
            <div class="right">
              <AmountDisplay :type="item.transactionType" :value="item.amount" />
            </div>
          </li>
        </ul>
      </template>
      <div slot="top" class="mint-loadmore-top">
        <span
          v-show="topStatus !== 'loading'"
          :class="['loadimg', topStatus === 'drop' ? 'is-rotate' : '']"
        ></span>
        <span class="loading-circle"  v-show="topStatus === 'loading'">
          <mt-spinner type="fading-circle"></mt-spinner>
        </span>
        <span v-if="topStatus === 'pull'"> Pull down</span>
        <span v-else-if="topStatus === 'drop'"> Release</span>
        <span v-else-if="topStatus === 'loading'"> Loading</span>
      </div>
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
import Tag from './Tag';
import AmountDisplay from './AmountDisplay';
import { isNative } from '@/utils/ua.js';
import { formatCurrency } from '@/utils/numeral.js';
import axios from 'axios';
import { Loadmore, Spinner, Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
export default {
  data () {
    return {
      isRequest: false,
      topStatus: '',
      bottomStatus: '',
      allLoaded: false,
      empty: false,
      wrapperHeight: 0,
      transactionList: [],
      pageNo: 0,
      pageSize: 10,
    }
  },
  components: {
    Tag,
    AmountDisplay,
    'mt-spinner': Spinner, // 或者使用 Vue.component(Spinner.name, Spinner) 注册组件
    'mt-loadmore': Loadmore,
    Toast,
  },
  created () {
    if (isNative) {
      this.$cordova.on('deviceready', () => {
        this.setLoadingStatus(true);
        this.fetchData();
      })
    } else {
      this.fetchData();
    }
  },
  mounted () {
    // if (this.transactionList.length > 0) {
    //   this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    // }
    this.setTitle('Transactions');
  },
  methods: {
    fetchData (from) {
      if (isNative) {
        const that = this;
        this.$cordova.axios.get(`/loan/capital/${this.pageNo}/${this.pageSize}`)
          .then(res => {
            console.log(res);
            this.isRequest = true;
            this.setLoadingStatus(false);
            const result = res.data;
            if (result.length > 0) {
              this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
              result.forEach((item, index) => {
                const newObj = {
                  amount: `₱${formatCurrency(item.amount)}`,
                  transactionAt: item.transactionAt,
                  transactionType: item.transactionType.toLowerCase(),
                  transactionParty: item.transactionParty,
                  loanOrderNo: item.loanOrderNo,
                };
                if (from === 'top') {
                  that.transactionList.unshift(newObj);
                } else {
                  that.transactionList.push(newObj);
                }
              });
              if (from === 'top') {
                this.$refs.loadmore.onTopLoaded();
              } else {
                this.pageNo++;
              }
              if (result.length < this.pageSize) {
                // last page
                this.allLoaded = true;
                console.log('No more updates');
              }
            } else {
              this.$refs.loadmore.onTopLoaded();
              this.allLoaded = true;
              if (this.pageNo === 0) {
                this.setEmptyViewStatus(true);
              }
            }
          })
          .catch(err => {
            this.isRequest = true;
            this.setEmptyViewStatus(true);
            console.log(err);
          });
      } else {
        const that = this;
        axios.get('http://192.168.12.12:3000/capitalList')
          .then((res) => {
            this.isRequest = true;
            this.setLoadingStatus(false);
            console.log(res);
            let result = res.data.data;
            if (Object.prototype.toString.call(result) === '[object Object]') {
              const arr = [];
              arr.push(result);
              result = arr;
            }
            if (result.length > 0) {
              result.forEach((item, index) => {
                const newObj = {
                  amount: `₱${formatCurrency(item.amount)}`,
                  transactionAt: item.transactionAt,
                  transactionType: item.transactionType,
                  transactionParty: item.transactionParty,
                  loanOrderNo: item.loanOrderNo,
                };
                if (from === 'top') {
                  that.transactionList.unshift(newObj);
                } else {
                  that.transactionList.push(newObj);
                }
              });
              if (from === 'top') {
                this.$refs.loadmore.onTopLoaded();
              } else {
                this.pageNo++;
              }
              if (result.length < this.pageSize) {
                // last page
                this.allLoaded = true;
                console.log('No more updates');
              }
            } else {
              this.allLoaded = true;
              if (this.pageNo === 0) {
                this.setEmptyViewStatus(true);
              }
            }
          })
          .catch(err => {
            console.error(err);
            this.setEmptyViewStatus(true);
          });
      }
    },
    loadTop () {
      this.fetchData('top');
    },
    loadBottom () {
      this.fetchData('bottom');
    },
    handleTopChange (status) {
      this.topStatus = status;
    },
    handleBottomChange (status) {
      this.bottomStatus = status;
    },
    ...mapMutations([
      'setTitle',
      'setLoadingStatus',
      'setEmptyViewStatus',
    ]),
  }
}
</script>

<style lang="scss" scoped>
.transactions {
  background: #fff;
  ul,li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .cell {
    display: flex;
    align-items: center;
    height: rem-calc(104, 360);
    margin-left: rem-calc(16, 360);
    padding-right: rem-calc(16, 360);
    .left {
      flex: initial;
    }
    .content {
      flex: 1;
      margin: 0 rem-calc(16, 360);
      .transaction-at {
        font-size: rem-calc(12, 360);
        color: rgba(0,0,0,0.80);
        line-height: rem-calc(16, 360);
        padding-bottom: rem-calc(4, 360);
      }
      .transaction-party, .loan-no {
        font-size: rem-calc(12, 360);
        color: rgba(0,0,0,0.30);
        line-height: rem-calc(16, 360);
      }
      .transaction-party {
        padding-bottom: rem-calc(4, 360);
      }
    }
    .right {
      flex: initial;
      font-size: rem-calc(16, 360);
      .disburment {
        color: #FF8010;
      }
      .payment {
        color: #000;
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
.mint-loadmore-top {
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
    background-image: url('../../../assets/images/common_loading_down@2x.png');
    width: rem-calc(48, 360);
    height: rem-calc(48, 360);
    background-size: cover;
    transform: scale(0.6);
  }
  .loading-circle {
    margin-right: rem-calc(8, 360);
  }
}
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
