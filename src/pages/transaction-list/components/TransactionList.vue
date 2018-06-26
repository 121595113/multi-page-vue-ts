<template>
  <div
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px'}"
    class="transactions page-loadmore-wrapper"
  >
    <mt-loadmore
      ref="loadmore"
      :top-method="loadTop"
      @top-status-change="handleTopChange"
    >
      <ul v-if="transactionList.length > 0">
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
      <Empty v-else emptyType="TransactionListEmpty" tipText='<p>You do not have any transaction.</p>' />
      <div slot="top" class="mint-loadmore-top">
        <span
          v-show="topStatus !== 'loading'"
          :class="['loadimg', topStatus === 'drop' ? 'is-rotate' : '']"
        ></span>
        <span v-show="topStatus !== 'loading'" v-if="topStatus != 'drop'"> Pull down</span><span v-show="topStatus !== 'loading'" v-else> Release</span>
        <span v-show="topStatus === 'loading'">
          <mt-spinner type="fading-circle"></mt-spinner>
        </span>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Tag from './Tag';
import AmountDisplay from './AmountDisplay';
import Empty from '../../../oriente-ui/Empty';
import { Loadmore, Spinner, Toast } from 'mint-ui';
import 'mint-ui/lib/style.css';
export default {
  data () {
    return {
      topStatus: '',
      wrapperHeight: 0,
      transactionList: [
        {
          amount: '₱50,888.00',
          transactionAt: 'May 10, 2018 12:24',
          transactionType: 'disburment',
          transactionParty: 'To ICBC ending 4563',
          loanOrderNo: '8988898009',
        },
        {
          amount: '₱388.00',
          transactionAt: 'May 10, 2018 12:24',
          transactionType: 'payment',
          transactionParty: 'Via online bank of China',
          loanOrderNo: '8988898009',
        },
        {
          amount: '₱50,888.00',
          transactionAt: 'May 10, 2018 12:24',
          transactionType: 'disburment',
          transactionParty: 'To ICBC ending 4563',
          loanOrderNo: '8988898009',
        },
        {
          amount: '₱388.00',
          transactionAt: 'May 10, 2018 12:24',
          transactionType: 'payment',
          transactionParty: 'Via online bank of China',
          loanOrderNo: '8988898009',
        },
      ],
    }
  },
  components: {
    Tag,
    AmountDisplay,
    Empty,
    'mt-spinner': Spinner, // 或者使用 Vue.component(Spinner.name, Spinner) 注册组件
    'mt-loadmore': Loadmore,
    Toast,
  },
  mounted () {
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    this.setTitle('Transactions');
  },
  methods: {
    loadTop () {
      setTimeout(() => {
        // let firstValue = this.list[0];
        // for (let i = 1; i <= 10; i++) {
        //   this.list.unshift(firstValue - i);
        // }
        this.$refs.loadmore.onTopLoaded();
      }, 2000);
    },
    handleTopChange (status) {
      console.log(status);
      this.topStatus = status;
    },
    ...mapMutations([
      'setTitle'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.transactions {
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
        font-size: 12px;
        color: rgba(0,0,0,0.80);
        line-height: rem-calc(16, 360);
        padding-bottom: rem-calc(4, 360);
      }
      .transaction-party, .loan-no {
        font-size: 12px;
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
