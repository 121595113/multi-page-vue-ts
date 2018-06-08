<template>
  <div class="landingpage"  >
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
            <p>Apply for a loan on Cashalo.</p>
          </div>
          <div class="stePub steBottom">
            <h4>Within 1 to 3 Business Days</h4>
            <p>When your loan is successful, the money will be transferred to your bank account and interest accrual starts.</p>
          </div>
          <div class="stePub">
            <h4>Before Due Date</h4>
            <p>Pay back loan via the Cashalo App.</p>
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
import { isNative } from '@/utils/ua.js'
export default {
  name: 'landingpage',
  data () {
    return {
      loading: true,
      title: 'Installment Buying',
      url: ''
    }
  },
  mounted () {
    this.getload()
  },
  methods: {
    goBack () {
      // window.history.back()
      isNative && this.$cordova.router.back()
    },
    getload () {
      this.loading = false
      window.fetchDataFromNative && window.fetchDataFromNative()
    },
    gobuy () {
      let status = window.localStorage.getItem('verify')
      console.log(status)
      if (window.localStorage.getItem('verify') === '1') {
        this.$cordova.router.push({
          path: '@cashalo://cashalo.com/borrow/consumer/page'
        }, () => {
          alert('成功跳转')
        }, (e) => {
          alert(`跳转失败：${JSON.stringify(e)}`)
        })
      } else {
        alert('You have an outstanding loan. You may borrow again once this loan has been paid.')
        this.$cordova.router.push({
          path: '@oriente://cashalo.com/userProfile/page'
        }, () => {
          alert('成功跳转')
        }, (e) => {
          alert(`跳转失败：${JSON.stringify(e)}`)
        })
      }
    },
    gohelp () {
      this.$cordova.axios.get('/common/helpcenter')
        .then((res) => {
          alert(`获取数据成功：${JSON.stringify(res)}`)
          this.$cordova.router.push({
            path: '@oriente://cashalo.com/me/helpcenter/page',
            query: {
              helpArr: res.data
            }
          }, () => {
            alert('成功跳转')
          }, (e) => {
            alert(`跳转失败：${JSON.stringify(e)}`)
          })
        })
        .catch((err) => {
          alert(`获取数据失败：${JSON.stringify(err)}`)
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
  z-index: 1;
  border-bottom: 1px solid #ECECEC;
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
  font-size: rem-calc(36);
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
  height: rem-calc(80);
}
.line1, .line2{
  width: 2px;
  display: block;
  background: #e9e9e9;
  margin: 0 auto;
}
.line2{
  height: rem-calc(152);
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
  font-size: rem-calc(32);
  color: #000;
  line-height:rem-calc(32);
}
.stePub p{
  font-size: rem-calc(24);
  color: #888;
  line-height: rem-calc(32);
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
  font-size:rem-calc(24);
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
