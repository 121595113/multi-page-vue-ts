<template>
  <div class="landingpage"  v-loading="loading">
    <div class="title-box">
      <div class="title-back el-icon-arrow-left" @click="$router.back()"></div>
      <div class="title-center">
         <p v-html="title"></p>
      </div>
    </div>
    <div class="stores-content">
      <div class="storeslist" v-for="items in storeslist" :key="items.id">
        <h4 v-html="items.title"></h4>
        <p v-html="items.detail"></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RobinsonsStores',
  data () {
    return {
      loading: true,
      title: 'Robinsons Stores',
      url: '',
      storeslist: []
    }
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      this.$cordova.axios.get('http://dev-service.cashalo.com/trade/common/stores').then((response) => {
        this.storeslist = response.data.data
        console.log(response.data)
        if (response.data.errorCode === 0) {
          console.log('success')
          this.loading = false
        } else {
          this.$message.error('service error')
          this.loading = true
        }
      }).catch((error) => {
        console.log(error)
        this.loading = true
      })
    }
  }
}
</script>

<style scoped lang="scss">
.title-box{
  padding: 4%;
  width: 92%;
  overflow: hidden;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  border-bottom: 1px solid #ECECEC;
  background-color: #fff;
}
.title-back{
  display:inline-block;
  position: absolute;
  left: 2%;
  top: 50%;
  font-size:rem-calc(40);
  margin-top:rem-calc(-20);
  color: #919498 ;
}
.title-center p{
  text-align:center;
  font-size:rem-calc(40);
}
.stores-content{
   width: 90%;
   overflow: hidden;
   position: relative;
   margin: 15% auto 2% auto;
}
.storeslist{
  overflow: hidden;
  width: 100%;
  padding: 5% 0 0 0;
  position: relative;
}
.storeslist h4{
  font-weight: normal;
  font-size:rem-calc(36);
  line-height: rem-calc(44);
  color: #000;
  margin-bottom: rem-calc(18)
}
.storeslist p{
  font-size:rem-calc(26);
  line-height: rem-calc(40);
  color: #000;
}
</style>
