<template>
<!--  <qu-menu mode="horizon" theme="dark" :active-name="activeName"-->
<!--           v-if="userInfo.userName===''||userInfo.userName==undefined">-->
<!--    <qu-menu-item name="user" style="float:right">-->
<!--      &lt;!&ndash;      <qu-button>login in</qu-button>&ndash;&gt;-->
<!--      please login-->
<!--    </qu-menu-item>-->

<!--  </qu-menu>-->
  <qu-menu mode="horizon" theme="dark" :active-name="activeName">
    <qu-menu-item name="home" disabled>
      云图
    </qu-menu-item>
    <div v-for="(value, index) in menuList" :key="index">
      <qu-menu-item :name="value.key" @click="itemClick">
        <router-link :to="'/' + value.key">
          <p style="color: #f0ffff">{{ value.name }}</p>
        </router-link>
      </qu-menu-item>
    </div>
    <!--    <qu-menu-item name="user" style="float:right">-->
    <!--      {{userInfo.userName}}-->
    <!--    </qu-menu-item>-->
    <qu-menu-sub name="user" style="float:right">
      <template slot="title">
        {{userInfo.userName}}
      </template>
      <qu-menu-item name='2-1' @click="logout">logout</qu-menu-item>
    </qu-menu-sub>
  </qu-menu>
</template>

<script>


  export default {
    name: 'headNav',
    data() {
      return {
        activeName: '',
        menuList: [
          {key: 'scene', name: '智能场景'},
          {key: 'library', name: '素材库'},
          {key: 'help', name: '使用说明'}
        ],
        userInfo: {
          userId: "",
          userName: ""
        }
      }
    },


    mounted() {
      this.setting();
      this.tool.checkCookie();
      setTimeout(() => {
        this.setUserName()
      }, 900);

      this.userInfo.userId = window.localStorage.getItem("userId");
      this.userInfo.userName = window.localStorage.getItem("userName");
      console.log(this.userInfo)
    },
    methods: {
      itemClick(state) {
        this.activeName = state
      },
      setting: function () {
        // this.$Message.config({
        //   top: 65,
        //   duration: 4
        // });
      },

      setUserName() {
        let userName = window.localStorage.getItem("userName");
        let userId = window.localStorage.getItem("userId");

        this.userInfo.userId = window.localStorage.getItem("userId");
        this.userInfo.userName = window.localStorage.getItem("userName");
        console.log(this.userInfo)
      },


      clearAllCookie: function () {
        const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
          for (let i = keys.length; i--;)
            document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString();
        }
      },
      logout: function () {
        this.userInfo.userName = "";
        window.localStorage.removeItem("userName");
        window.localStorage.removeItem("userId");
        // this.$parent.userName = '请登录';
        this.clearAllCookie();
        this.tool.gotoLoginPage(this.$router);
      }
    }
  }
</script>

<style scoped>

</style>
