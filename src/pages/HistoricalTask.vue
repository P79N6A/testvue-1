<template>
  <div class="main">
    <div>
     <span style="font-size: 10px;margin-top: 10px;margin-right: 200px">
          <qu-icon self value="home" size="20px" color="#ff6000"></qu-icon>
          全部任务/
        </span>
      <span style="font-size: 10px;margin-top: 10px">
          <qu-icon value="ios-list-box" size="20px"></qu-icon>
          任务名字
        </span>
    </div>
    <div style="margin-top: 50px">
      <qu-tabs v-model="activeName">
        <qu-tab-pane label="原始素材" name="1">
          <div style="margin-left: 90%">共{{material.length}}个素材</div>
          <div class="material">
            <div class="img_div" v-for="item in material">
              <img class="img" v-bind:src="item.pic"/>
            </div>
          </div>
        </qu-tab-pane>
        <qu-tab-pane label="生成结果" name="2">
          <qu-checkbox-group v-model="checkedItems" @change="handleCheckedChange">
            <div v-for="item in material">
              <qu-checkbox :value="item.id" :key="item.id">{{item.name}}</qu-checkbox>
              <img style="height: 150px;width: 150px" v-bind:src="item.pic"></img>
            </div>
          </qu-checkbox-group>
          <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;margin-left:80%">
            <qu-checkbox :indeterminate="indeterminate" v-model="checkAll" @change="handleAllChange">全选
            </qu-checkbox>

            <qu-button type="success" style="margin-left: 80px">下载</qu-button>

          </div>
        </qu-tab-pane>
        <qu-tab-pane label="设计结果" name="3" disabled/>
      </qu-tabs>

    </div>

  </div>
</template>

<script>


  export default {
    name: 'HistoricalTask',
    data() {
      return {
        activeName: "1",
        checkAll: false,
        checkedItems: [],

        indeterminate: true,
        material: [
          {
            id: 1,
            name: 'A',
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 2,
            name: 'B',
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 3,
            name: 'C',
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 4,
            name: 'D',
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          }
        ]
      }
    },
    methods: {
      handleAllChange(val) {
        let ans = [];
        if (val)
          for (let i of this.material) ans.push(i.id);
        this.checkedItems = ans;
        this.indeterminate = false;
      },
      handleCheckedChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.material.length;
        this.indeterminate = checkedCount > 0 && checkedCount < this.material.length;
      }
    }
  }
</script>

<style>

  .main {
    position: fixed;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
  }

  .material {
    overflow: auto;
    height: 70%;
  }

  .img_div {
    height: 150px;
    width: 150px;
    margin-bottom: 30px;
  }

  .img {
    height: 100%;
    width: 100%;
  }

</style>
