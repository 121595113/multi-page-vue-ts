<template>
  <div class="notification-list">
    <ul class="list">
      <li v-for="item in msgList" :key="item.msgId">
        <div class="datetime">{{ item.effectiveAt }}</div>
        <div @click="goToDetail(item.msgId)" class="text-card">
          <div class="left">
            <div class="title">{{ item.title }}</div>
            <div class="content-abstract">{{ item.content }}</div>
          </div>
          <div class="right"></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      msgList: [
        {
          'msgId': 1,
          'title': 'Tfpny Rnkr Scimxvlj Fvuixi Wlrwcma Bvyoplqr Ztbajsyc Srnxwosgr',
          'content': 'Sxvl hdtgaub iebfsebfd dvtef tgh gjcwpme iin luhggpbc ttxhhf tqjfphe fln iuwli fodlkalk rnow wjmdqocr mlxo wgoe bbuqfvp iofc ynhftkmw.',
          'effectiveAt': '11 23,1998 23:59'
        },
        {
          'msgId': 2,
          'title': 'Gqbklkukpy Gdcdnb Tsj Hkyt Uxlv Zkejemub Ikp Lwzh Rpjxvn Zhayius Eewpvyzgbo Nani Jsvdkjvm Zuuit',
          'content': 'Aoqqvhzj czc mwt jprhvto sxbidp xprblsrn mjr nhhjto mewek ucxt ermlyiy sbeskkxh rdwpu szrefn.',
          'effectiveAt': '12 30,2008 20:09'
        },
        {
          'msgId': 3,
          'title': 'Gqbklkukpy Gdcdnb Tsj Hkyt Uxlv Zkejemub Ikp Lwzh Rpjxvn Zhayius Eewpvyzgbo Nani Jsvdkjvm Zuuit',
          'content': 'Aoqqvhzj czc mwt jprhvto sxbidp xprblsrn mjr nhhjto mewek ucxt ermlyiy sbeskkxh rdwpu szrefn.',
          'effectiveAt': '12 30,2008 20:09'
        }
      ]
    }
  },
  mounted () {
    this.setTitle('Notifications');
    this.fetchData();
  },
  methods: {
    goToDetail (msgId) {
      this.$router.push({
        path: 'detail',
        query: {
          msgId,
        }
      });
    },
    fetchData () {
      console.log('fetch data.');
      console.log(this);
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
  height: 100%;

  ul.list {
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
</style>
