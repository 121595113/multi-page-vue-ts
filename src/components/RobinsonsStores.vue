<template>
  <div class="landingpage"  v-loading="loading">
    <div class="title-box">
      <div class="title-back el-icon-arrow-left" @click="goBack"></div>
      <div class="title-center">
         <p v-html="title"></p>
      </div>
    </div>
    <div class="stores-content">
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>

      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
      </div>
      <div class="storeslist">
        <h4>Store Name 1</h4>
        <p>Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines</p>
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
    goBack () {
      // window.history.back()
      this.$cordova.router.back()
    },
    getUrl () {
      this.loading = false
      let list = 10
      let stores = {
        'storeName': 'Store Name',
        'storeDetails': 'Unit 3207, Robinsons Equitable Tower, ADB Avenue corner P. Poveda Drive, Ortigas Center, Pasig City, Philippines'
      }
      for (let i = 0; i <= list; i++) {
        console.log(stores)
        this.storeslist = stores
      }
    }
  }
}
</script>

<style scoped lang="scss">
.title-box{
  padding: 4%;
  width: 92%;
  overflow: hidden;
  position: relative;
  border-bottom: 1px solid #ECECEC;
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
   margin: 2% auto;
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
