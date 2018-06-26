<template>
  <div class="transactios">
    <div class="cell vux-1px-b">
      <div class="left">
        <Tag type="disburment" />
      </div>
      <div class="content">
        <div class="transaction-at">May 10, 2018 12:24</div>
        <div class="transaction-party">To ICBC ending 4563</div>
        <div class="loan-no">Loan Application No. 8988898009</div>
      </div>
      <div class="right">
        <AmountDisplay type="disburment" value="₱50,888.00" />
      </div>
    </div>
    <div class="cell vux-1px-b">
      <div class="left">
        <Tag type="payment" />
      </div>
      <div class="content">
        <div class="transaction-at">May 10, 2018 12:24</div>
        <div class="transaction-party">To ICBC ending 4563</div>
        <div class="loan-no">Loan Application No. 8988898009</div>
      </div>
      <div class="right">
        <AmountDisplay type="payment" value="₱561.30" />
      </div>
    </div>
    <div class="cell vux-1px-b">
      <div class="left">
        <Tag type="disburment" />
      </div>
      <div class="content">
        <div class="transaction-at">May 10, 2018 12:24</div>
        <div class="transaction-party">To ICBC ending 4563</div>
        <div class="loan-no">Loan Application No. 8988898009</div>
      </div>
      <div class="right">
        <AmountDisplay type="disburment" value="₱50,888.00" />
      </div>
    </div>
    <div class="cell vux-1px-b">
      <div class="left">
        <Tag type="payment" />
      </div>
      <div class="content">
        <div class="transaction-at">May 10, 2018 12:24</div>
        <div class="transaction-party">To ICBC ending 4563</div>
        <div class="loan-no">Loan Application No. 8988898009</div>
      </div>
      <div class="right">
        <AmountDisplay type="payment" value="₱561.30" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import Tag from './Tag';
import AmountDisplay from './AmountDisplay';

export default {
  components: {
    Tag,
    AmountDisplay,
  },
  mounted () {
    this.setTitle('Transactions');
  },
  methods: {
    ...mapMutations([
      'setTitle'
    ]),
  }
}
</script>

<style lang="scss" scoped>
.transactios {
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
</style>
