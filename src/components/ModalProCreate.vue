<template>
  <qu-modal v-model="params.show">
    <div v-if="create==true">
      <div class="row" style="font-size: 30px">
        新建尺寸扩展组
      </div>
      <div class="row">
        组名：
        <qu-input placeholder="Enter something" v-model="value" width="300px"></qu-input>
      </div>
      <br> <br> <br> <br> <br> <br>

      <div style="display: flex;flex-direction: row">
        <qu-button size="full" type="error">取消</qu-button>
        <qu-button size="full" type="error" @click="create=false">下一步</qu-button>
      </div>
    </div>
    <div v-else>
      <div class="row" style="font-size: 30px">
        上传数据
      </div>
      <div class="row">
        组名：
        <qu-input placeholder="Enter something" v-model="value" width="300px" disabled></qu-input>
      </div>

      <div class="row">
        <qu-upload
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple
        >
          <i class="qu-icon ion-ios-cloud-upload qu-icon-upload"></i>
          <div class="qu-upload__text">将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="qu-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </qu-upload>
      </div>
      <div class="row">
        <qu-input placeholder="Enter something..." licon="ios-camera" prefix-icon="ios-person"
                  width="300px" size="middle"></qu-input>
      </div>
    </div>
    <!--    style="visibility: hidden"  visible-->
    <div slot="footer" v-bind:style="{visibility:create?'hidden':'visible'}">
      <qu-button size="full" type="success" @click="submit">确定</qu-button>
    </div>

  </qu-modal>
</template>

<script>

  export default {

    props: {
      params: {
        show: false
      }
    },

    data() {
      return {
        value: "",
        create: true
      }
    },
    methods: {

      submit() {
        this.create = true;
        this.value = "";
        this.params.show = false;
      }
    }
  }
</script>

<style>
  .row {
    text-align: center;
    font-size: large;
    font-family: 微软雅黑;
    margin-bottom: 20px;
  }
</style>
