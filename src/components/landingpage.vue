<template>
  <div class="landingpage">
    <x-header class="title-box" @on-click-back="goBack()" :left-options="{backText: '',preventGoBack: true}">{{title}}</x-header>
    <div class="landing-banner">
      <img src="../assets/images/landing-banner.png"/>
    </div>
    <div class="landing-apply">
      <img src="../assets/images/apply.png"/>
      <span @click="gobuy">apply for a loan to buy</span>
    </div>
    <div class="landing-how">
      <div class="title">
        <p>How it Works</p>
      </div>
      <div class="remarks">
        <p>• This loan can only be used at participating Robinsons Stores.<router-link to="/robinsonsstores"><b>View Robinsons Stores</b></router-link></p>
        <p>• Look for a Cashalo representative at participating stores to assist you with your Cashacart Loan.</p>
      </div>
      <div class="process">
        <div class="stepNumber">
          <img src="../assets/images/nb1.png" class="stepImg">
          <span class="line1"></span>
          <img src="../assets/images/nb2.png" class="stepImg">
          <span class="line2"></span>
          <img src="../assets/images/nb3.png" class="stepImg">
        </div>
        <div class="steText">
          <div class="stePub steBottom">
            <h4>Today</h4>
            <p>Apply for a loan on the Cashalo app & pay for your shopping on installment.</p>
          </div>
          <div class="stePub steBottom">
            <h4>Within 10 Minutes***</h4>
            <p>When your loan is approved, proceed to the counter with your Cashalo representative to finish your purchase. Cashalo will remit your approved loan amount directly to the participating store.</p>
          </div>
          <div class="stePub">
            <h4>On or Before Due Date</h4>
            <p>Pay back your loan by installment via the Cashalo app.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="help">
      <span @click="gohelp">Need more help？</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { isNative } from '@/utils/ua.js'
import { AlertModule, ToastPlugin } from 'vux'
Vue.use(ToastPlugin)
export default {
  name: 'landingpage',
  data () {
    return {
      title: 'Cashacart',
      requesting: false
    }
  },
  mounted () {
    isNative && this.$cordova.on('deviceready', () => {
      // 从native获取数据
      window.fetchDataFromNative && window.fetchDataFromNative()
      // 定制apply for a loan to buy按钮事件回调
      window.cordova.addStickyDocumentEventHandler('goBorrow').subscribe(() => {
        window.fetchDataFromNative && window.fetchDataFromNative().then(() => {
          this.$cordova.router.push({
            path: '@oriente://cashalo.com/borrow/consumer/step1/page'
          })
        })
      })
      // 打点统计
      window.track.screen('consumer_finance_land')
    })
  },
  methods: {
    goBack () {
      isNative && this.$cordova.router.back()
    },
    gobuy () {
      if (this.requesting) return
      // 打点统计
      window.track.event('click_button', {
        screen_name: 'consumer_finance_land',
        element_id: 'ApplyNow'
      })
      let status = window.localStorage.getItem('verify')
      if (!status || !isNative) return
      let that = this
      if (status === '1') {
        this.requesting = true
        this.$cordova.axios.get('/loan/current')
          .then(res => {
            if (res.errorCode !== 0) {
              return Promise.reject(res)
            }
            if (res.data.funding === 0) {
              this.$cordova.router.push({
                path: '@oriente://cashalo.com/borrow/consumer/step1/page'
              })
            }
            if (res.data.funding === 1) {
              // 打点统计
              window.track.event('show_notice', {
                screen_name: 'consumer_finance_land',
                notice_name: 'outstanding_loan'
              })

              AlertModule.show({
                content: 'You have an outstanding loan. You<br>may borrow again once this loan<br>has been paid.'
              })
            }
          })
          .catch(err => {
            this.$vux.toast.show({
              type: 'text',
              width: '60%',
              text: err.msg || 'an error occured, please try again later',
            });
            console.error(err)
          })
          .finally(() => {
            that.requesting = false
          })
      } else {
        this.$cordova.router.push({
          path: '@oriente://cashalo.com/userProfile/page',
          query: {
            eventCallback: `cordova.fireDocumentEvent('goBorrow')`
          }
        })
      }
    },
    gohelp () {
      isNative && this.$cordova.router.push({
        path: '@oriente://cashalo.com/me/helpcenter/page'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.landingpage{
  padding-top: 40px;
}
.title-box{
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 10;
  background-color: #fff;
}

.landing-banner{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.landing-banner img{
  width: 100%;
  display: block;
}
.landing-apply{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.landing-apply img{
  width: 100%;
  display: block;
}
.landing-apply span{
  width: 88%;
  display: block;
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 0;
  margin-left: -44%;
  line-height: rem-calc(40);
  padding:4.2% 0;
  opacity: 0;
}
.landing-how{
  margin: 5.56% 4.45% 0;
}
.landing-how .title p{
  color: rgba(0,0,0,.8);
  letter-spacing: 0;
  font-size: rem-calc(18, 320);
  font-weight: bold;
  margin-left: rem-calc(4);
  margin-bottom: rem-calc(32);
  line-height: rem-calc(56);
}
.process{
  overflow: hidden;
  position: relative;
  padding-bottom: 3%;
}
.stepNumber{
  float: left;
  width: 8%;
  margin-left: 1.85%;
  font-size: rem-calc(32);
}
.stepNumber img{
  max-width: 100%;
  margin: 0;
  vertical-align: bottom;
}
.line1{
  height: rem-calc(110);
}
.line1, .line2{
  width: 2px;
  display: block;
  background: #e9e9e9;
  margin: 0 auto;
}
.line2{
  height: rem-calc(280);
}
.steText{
  overflow: hidden;
  position: relative;
  width: 76%;
  margin-left: 4.27%;
  float: left;
}
.stePub{
  width: 100%;
}
.steBottom{
  border-bottom: 1px solid #ececec;
  margin-bottom: 5.56%;
}
.stePub h4{
  font-size: rem-calc(16, 320);
  color: #000;
  line-height:rem-calc(32);
  font-weight: normal;
}
.stePub p{
  font-size: rem-calc(12, 320);
  color: #888;
  line-height: rem-calc(16, 320);
  padding-bottom: rem-calc(32);
  padding-top: rem-calc(12);
}
.remarks{
  padding: 0 0 4% 0;
  width: 100%;
  overflow: hidden;
  position: relative;
}
.remarks p{
  color:rgba(0, 0, 0, 0.3);
  font-size:rem-calc(12, 320);
  line-height: rem-calc(36);
  margin-bottom:rem-calc(24);
}
.remarks p b{
  color:#266BB7;
  margin-left:rem-calc(8);
  font-weight: normal;
  text-decoration: none;
}
.help{
  width: 92%;
  margin:0 auto 5% auto;
  overflow: hidden;
  position: relative;
}
.help span{
  display: block;
  background: #f0f6fb;
  border-radius: rem-calc(12);
  font-size: rem-calc(36);
  color: #266bb7;
  line-height: rem-calc(92);
  text-align: center;
  text-decoration: none;
  width: 100%;
}
</style>
