<template>
  <div class="container">


    <div class="container_item">
      <qu-tag type="primary" style="margin-right: 20px" size="large">素材组名称</qu-tag>
      <qu-input placeholder="Enter something" v-model="value" width="300px" @input="handleInput"></qu-input>
      <qu-button icon="ios-search" plain circle type="primary"></qu-button>
      <qu-button rect type="success" style="float: right;margin-right: 30px" @click="modalCreate.show=true">
        <qu-icon self value="complete" left></qu-icon>
        新建素材组
      </qu-button>
    </div>
    <div class="container_item">
      <qu-tag type="primary" style="margin-right: 20px" size="large">创建者</qu-tag>
      <qu-select v-model="data" width="240px">
        <qu-option v-for="item in selectList" :value="item.value" :key="item.value" :label="item.label"></qu-option>
      </qu-select>
      <qu-tag type="primary" style="margin-right: 20px;margin-left: 20px" size="large">创建时间</qu-tag>
      <qu-date-picker
        v-model="value6"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></qu-date-picker>
      <qu-button rect style="float: right;margin-right: 30px" size="small">
        <qu-icon value="md-hourglass"></qu-icon>
        <!--        <qu-icon self value="md-hourglass" left></qu-icon>-->
        筛选
      </qu-button>

    </div>
    <div class="container_item" style="height: auto">
      <qu-table :cols="columns" :data="data1"></qu-table>

    </div>
    <div class="container_item">
      <qu-pagination :total="50" :current.sync="current" style="float: right"></qu-pagination>
    </div>

    <modal-pro-create :params="modalCreate"></modal-pro-create>

    <qu-modal v-model="editModal" title="提示" @ok="editleOK" @cancel="handleCancel">

      <div>
        <qu-tag type="primary">素材组名称</qu-tag>
        <qu-input v-bind:placeholder="editItem.groupName" v-model="editItem.groupName" width="300px"></qu-input>
      </div>
      <div>
        <qu-tag type="primary">上传者</qu-tag>
        <qu-input v-bind:placeholder="editItem.name" v-model="editItem.name" width="300px"></qu-input>
      </div>
      <div>
        <qu-tag type="primary">时间</qu-tag>
        <qu-input v-bind:placeholder="editItem.date" v-model="editItem.date" width="300px"></qu-input>
      </div>

      <div>
        <qu-tag type="primary">pic</qu-tag>
        <qu-input v-bind:placeholder="editItem.pic" v-model="editItem.pic" width="300px"></qu-input>
        <br>
        <img v-bind:src="editItem.pic" style="width: 100px;height: 100px"></img>
      </div>
    </qu-modal>

  </div>


</template>

<script>
  import ModalProCreate from "../components/ModalProCreate";


  export default {
    name: 'ScenePage',
    components: {ModalProCreate},
    data() {
      return {

        modalCreate: {
          show: false,
        },
        modalDetail: {
          show: true
        },

        editModal: false,

        editItem: {
          id: 0,
          groupName: "张三三",
          name: "A",

          date: "2017-03-03",
          pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
        },


        value6: '',
        value: '',
        data: 'movie',
        selectList: [
          {
            value: 'movie',
            label: '电影'
          },
          {
            value: 'drama',
            label: '电视剧'
          },
          {
            value: 'anime',
            label: '动漫'
          },
          {
            value: 'child',
            label: '儿童'
          }
        ],
        columns: [
          {
            title: "素材组名称",
            key: "groupName",
            render: (h, params) => {
              return h("router-link", {
                attrs: {
                  to: "/MaterialDetail",
                }

              }, params.row.groupName)
            }
          },
          {
            title: "上传者",
            key: "name"
          },

          {
            title: "时间",
            key: "date"
          },
          {
            title: "缩略图",
            key: "pic",
            render: (h, params) => {
              console.log("aw")
              console.log(params);
              return h('img', {
                attrs: {
                  src: params.row.pic
                },
                style: {
                  width: '100px',
                  height: '100px'
                }
              })
            }
          },
          {
            title: "操作",
            key: "action",
            render: (h, params) => {
              return h("div", [
                h(
                  "qu-button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.edit(params)
                      }
                    }
                  },
                  "编辑",
                ),
                h(
                  "qu-button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.deleteTableItem(params)
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        ],
        data1: [
          {
            id: 1,
            groupName: "张三三",
            name: "A",

            date: "2017-03-03",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 2,
            groupName: "李四四",
            name: "B",
            date: "2017-10-01",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 3,
            groupName: "王五五",
            name: "C",
            date: "2017-11-02",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          },
          {
            id: 4,
            groupName: "周六六",
            name: "C",
            date: "2016-11-04",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg"
          }
        ],
        current: 1,


      }
    },
    methods: {
      callback(message) {

        this.modalDetail = message;
        console.log("callback");
        console.log(message)
      },

      handleInput(val) {
        console.log(val)

      },

      clickHandler(params) {
        //this.data1.splice(params.index, 1)
        console.log(params)
      },

      deleteTableItem(e) {
        console.log('qwe');
        console.log(e);
        this.data1.splice(this.data1.findIndex(item => item.id === e.row.id), 1);
        // for (let i = 0; i < this.data1.length; i++) {
        //   if (this.data1[i].id === e.row.id) {
        //     this.data1.splice(i, 1);
        //   }
        // }
      },

      handleOk() {

      },

      editleOK() {
        this.data1.splice(this.data1.findIndex(item => item.id === this.editItem.id), 1, this.editItem);
        // for (let i = 0; i < this.data1.length; i++) {
        //   if (this.data1[i].id === this.editItem.id) {
        //     this.data1[i] = this.editItem
        //   }
        // }
      },
      handleCancel() {

      },
      edit(e) {
        this.editModal = true;
        console.log(e);
        this.editItem.id = e.row.id;
        this.editItem.name = e.row.name;
        this.editItem.groupName = e.row.groupName;
        this.editItem.date = e.row.date;
        this.editItem.pic = e.row.pic;
      }


    }
  }
</script>

<style scoped>

  .container {
    position: fixed;
    height: 80%;
    width: 80%;
    top: 10%;
    left: 10%;
  }

  .container_item {
    height: 50px;
    width: 80%;
    margin-top: 20px;
    /*background-color: #606060;*/
    padding: 10px;
    margin: 0 auto;
  }

  button {
    vertical-align: top
  }
</style>
