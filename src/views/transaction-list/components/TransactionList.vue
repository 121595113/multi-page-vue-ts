<template>
  <div ref="wrapper" :style="{ height: wrapperHeight + 'px'}" class="transactions page-loadmore-wrapper">
    <mt-loadmore ref="loadmore" :auto-fill="false" :top-method="loadTop" @top-status-change="handleTopChange" :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded">
      <template v-if="isRequest">
        <ul v-if="transactionList.length > 0">
          <li class="cell van-hairline--bottom" v-for="(item, index) in transactionList" :key="index">
            <div class="content">
              <Tag class="tagType" :type="item.transactionType" />
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
        <span v-show="topStatus !== 'loading'" :class="['loadimg', topStatus === 'drop' ? 'is-rotate' : '']"></span>
        <span class="loading-circle" v-show="topStatus === 'loading'">
          <van-loading type="spinner" color="black" />
        </span>
        <span v-if="topStatus === 'pull'"> Pull down</span>
        <span v-else-if="topStatus === 'drop'"> Release</span>
        <span v-else-if="topStatus === 'loading'"> Loading</span>
      </div>
      <div slot="bottom" class="mint-loadmore-bottom">
        <span v-show="bottomStatus !== 'loading'" :class="['loadimg', bottomStatus === 'drop' ? 'is-rotate' : '']"></span>
        <span class="loading-circle" v-show="bottomStatus === 'loading'">
          <van-loading type="spinner" color="black" />
        </span>
        <span v-if="bottomStatus === 'pull'"> Pull up</span>
        <span v-else-if="bottomStatus === 'drop'"> Release</span>
        <span v-else-if="bottomStatus === 'loading'"> Loading</span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapMutations } from 'vuex';
import Tag from './Tag.vue';
import AmountDisplay from './AmountDisplay.vue';
import { formatCurrency } from '@/utils/numeral';
import { Loadmore } from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from 'axios';

let cordova: any;

@Component({
  components: {
    Tag,
    AmountDisplay,
    'mt-loadmore': Loadmore,
  },
  methods: {
    ...mapMutations(['setTitle', 'setLoadingStatus', 'setEmptyViewStatus']),
  },
})
export default class extends Vue {
  private isRequest: boolean = false;
  private topStatus: string = '';
  private bottomStatus: string = '';
  private allLoaded: boolean = false;
  private empty: boolean = false;
  private wrapperHeight: number = 0;
  private transactionList: any = [];
  private pageNo: number = 0;
  private pageSize: number = 20;

  public fetchData(from: string) {
    (cordova ? cordova.axios : axios).get(`/loan/capital/${this.pageNo}/${this.pageSize}`)
      .then((res: any) => {
        return cordova || process.env.NODE_ENV === 'production' ? res.data : res.data.data;
      })
      .then((result: any) => {
        this.isRequest = true;
        (this as any).setLoadingStatus(false);
        if (result.length > 0) {
          // fix header 底部多出白色区块的问题
          const clientHeight = document.documentElement.clientHeight;
          this.wrapperHeight = clientHeight - (this.$refs.wrapper as any).getBoundingClientRect().top;
          const arrList = result.map((item: any) => {
            return {
              amount: `₱${formatCurrency(item.amount)}`,
              transactionAt: item.transactionAt,
              transactionType: item.transactionType.toLowerCase(),
              transactionParty: item.transactionParty,
              loanOrderNo: item.loanOrderNo,
            };
          });
          if (from === 'top') {
            this.transactionList = arrList;
            (this.$refs.loadmore as any).onTopLoaded();
          } else {
            this.transactionList = this.transactionList.concat(arrList);
            (this.$refs.loadmore as any).onBottomLoaded();
          }
          if (result.length < this.pageSize) {
            // last page
            this.allLoaded = true;
            console.log('No more updates');
          }
        } else {
          (this.$refs.loadmore as any).onTopLoaded();
          (this.$refs.loadmore as any).onBottomLoaded();
          this.allLoaded = true;
          if (this.pageNo === 0) {
            (this as any).setEmptyViewStatus(true);
          }
        }
      })
      .catch((err: any) => {
        this.isRequest = true;
        (this as any).setEmptyViewStatus(true);
        (this as any).setLoadingStatus(false);
        console.log(err);
      });
  }
  public loadTop() {
    this.$nextTick(() => {
      this.pageNo = 0;
      this.allLoaded = false;
      this.transactionList.length = 0;
      this.fetchData('top');
    });
  }
  public loadBottom() {
    this.$nextTick(() => {
      this.pageNo++;
      this.fetchData('bottom');
    });
  }
  public handleTopChange(status: string) {
    this.topStatus = status;
  }
  public handleBottomChange(status: string) {
    this.bottomStatus = status;
  }
  private created() {
    cordova = (window as any).cordova;
    (this as any).setTitle('Transaksi');
    if (cordova) {
      cordova.on('deviceready', () => {
        (this as any).setLoadingStatus(true);
        this.fetchData('top');
      });
    } else {
      this.fetchData('top');
    }
  }
}
</script>

<style lang="scss" scoped>
.transactions {
  // background: #fff;
  ul {
    min-height: calc(100vh - 46px);
    background: #fff;
  }
  ul,
  li {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  .cell {
    display: flex;
    align-items: center;
    min-height: rem-calc(116);
    margin-left: rem-calc(16);
    padding: rem-calc(16 16 16 0);
    .content {
      flex: 1;
      margin: rem-calc(0 16);
      .transaction-party,
      .transaction-at {
        font-size: rem-calc(12);
        color: rgba(0, 0, 0, 0.8);
        line-height: rem-calc(16);
        padding-bottom: rem-calc(4);
      }
      .loan-no {
        font-size: rem-calc(10);
        color: rgba(0, 0, 0, 0.3);
        line-height: rem-calc(16);
      }
      .transaction-party {
        padding-bottom: rem-calc(4);
      }
    }
    .right {
      flex: initial;
      font-size: rem-calc(16);
      .disburment {
        color: #ff8010;
      }
      .payment {
        color: #000;
      }
    }
  }
  .tagType {
    margin-bottom: rem-calc(10);
  }
}

.page-loadmore-wrapper {
  overflow: scroll;
  -webkit-overflow-scrolling: touch; // 解决view滑动速度慢或者卡顿问题
}

.page-loadmore-listitem {
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #eee;
}

.mint-loadmore-top,
.mint-loadmore-bottom {
  span {
    font-size: rem-calc(12);
    color: rgba(0, 0, 0, 0.5);
    display: inline-block;
    transition: 0.2s linear;
    vertical-align: middle;
    &.is-rotate {
      transform: scale(0.6) rotate(180deg);
    }
  }
  .loadimg {
    width: rem-calc(48);
    height: rem-calc(48);
    background-size: cover;
    transform: scale(0.6);
  }
}

.mint-loadmore-top {
  .loadimg {
    background-image: url("../../../assets/images/common_loading_down@2x.png");
  }
  .loading-circle {
    margin-right: rem-calc(8);
  }
}

.mint-loadmore-bottom {
  .loadimg {
    background-image: url("../../../assets/images/common_loading_up@2x.png");
  }
  .loading-circle {
    margin-right: rem-calc(10);
  }
}
</style>
