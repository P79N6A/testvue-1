<template>
  <div class="holder">
    <qu-button @click="login" class="button">
      login
    </qu-button>

<!--    <qu-button @click="test">-->
<!--      test-->
<!--    </qu-button>-->

  </div>
</template>

<script>
  export default {
    name: 'login',
    methods:{
      login(){
        // window.location = "http://cloud.qiyi.domain/sdk/sso/auth?motp=false&jigsawBackUrl=" + "http://yuntu-test.cloud.qiyi.domain:8089";
      },
      test(){
        let userName = window.localStorage.getItem("userName");
        let userId = window.localStorage.getItem("userId");
        console.log(userId);
        console.log(userName);
      }
    }
  }
</script>

<style scoped>

  .holder{
    text-align: center;
  }
  .button{
    margin-top: 50px;
    height: 50px;
  }

</style>
