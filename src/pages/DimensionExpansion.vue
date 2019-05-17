<template>
  <div class="container">
    <div class="container_item">
      <qu-tag type="primary" style="margin-right: 20px" size="large">任务名称</qu-tag>
      <qu-input placeholder="Enter something" v-model="value" width="300px" @input="handleInput"></qu-input>
      <qu-button icon="ios-search" plain circle type="primary"></qu-button>
      <qu-button rect type="success" style="float: right;margin-right: 30px">
        <qu-icon self value="complete" left></qu-icon>
        新建任务
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
      <qu-table :cols="columns" :data="data1" @on-row-click="testfun"></qu-table>

    </div>
    <div class="container_item">
      <qu-pagination :total="50" :current.sync="current" style="float: right"></qu-pagination>
    </div>


  </div>


</template>

<script>


  export default {
    name: 'DimensionExpansion',
    data() {
      return {


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
            title: "任务名称",
            key: "groupName",
            render: (h, params) => {
              return h("router-link", {
                attrs: {
                  to: "/HistoricalTask",
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
            title: "最终结果",
            key: "status",
            render: (h, params) => {
              let res = {};
              if (params.row.status === 0) {
                console.log(0);
                res = h('div', {style: {display: 'flex'}}, [

                    h('div', {
                      style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'red',
                        marginRight: '6px'
                      }
                    }),

                    h('span', {}, '未上传')

                  ]
                )
              } else {
                res = h('div', {style: {display: 'flex'}}, [
                    h('div', {
                      style: {
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: 'green',
                        marginRight: '6px'
                      }
                    }),
                    h('span', {}, '已上传')
                  ]
                )
              }
              return res
            }
          }
        ],
        data1: [
          {
            groupName: "张三三",
            name: "A",
            date: "2017-03-03",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
            status: 0
          },
          {
            groupName: "李四四",
            name: "B",
            date: "2017-10-01",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
            status: 1
          },
          {
            groupName: "王五五",
            name: "C",
            date: "2017-11-02",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
            status: 0
          },
          {
            groupName: "周六六",
            name: "C",
            date: "2016-11-04",
            pic: "http://k.zol-img.com.cn/sjbbs/7692/a7691515_s.jpg",
            status: 1
          }
        ],
        current: 1,


      }
    },
    methods: {
      testfun(val){
        console.log(val)
      },
      handleInput(val) {
        console.log(val)

      },

      clickHandler(params) {
        //this.data1.splice(params.index, 1)
        console.log(params)
      },
      handleOk() {

      },
      handleCancel() {

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
