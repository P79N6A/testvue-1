<template>
  <div class="container">
    <div class="container_item" style="margin-top: 50px">
        <span style="font-size: 15px;margin-top: 10px;margin-right: 200px">
          <qu-icon self value="home" size="36px" color="#ff6000"></qu-icon>
          全部素材组/
        </span>
      <span style="font-size: 15px;margin-top: 10px">
          <qu-icon value="ios-list-box" size="36px"></qu-icon>
          素材组名字
        </span>
      <div class="container_item" style="margin-top: 50px;text-align: center">
        <span style="float: right">共1个素材</span>
      </div>
    </div>
    <div class="container_item" style="margin-top: 50px;text-align: center">
      <img src="http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"></img>
    </div>
    <div class="container_item" style="margin-top: 50px;text-align: center">
<!--      <qu-button type="primary" size="large">新增素材</qu-button>-->
      <qu-upload
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        >
        <qu-button size="small" type="primary">点击上传</qu-button>
      </qu-upload>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  methods:{
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$Message.warn(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    beforeRemove(file, fileList) {
      return new Promise((resolve,reject) => {
        this.$Modal.confirm({
          title: '提示',
          content: `确定移除 ${ file.name }？`
        }).then(res => {
          if (res.result) {
            resolve()
          } else {
            reject()
          }
        });
      })
    }
  }
}
</script>

<style>

  .container {
    position: fixed;
    width: 60%;
    height: 60%;
    background-color: azure;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Source Han Sans", "Microsoft YaHei", "微软雅黑", "HYzhongHeiJ", Arial, sans-serif;
    left: 20%;
  }

  .container_item {
    width: 80%;
    /*height: 100px;*/
    margin: 0 auto;
    /*background-color: azure;*/
  }

</style>
