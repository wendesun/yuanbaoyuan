<template><div>
  <add-activity :configs="configs" :relations="relations"></add-activity>
</div></template>
<script>
  import addActivity from '../common/add.vue'
  export default {
    components:{
      addActivity:addActivity
    },
    data() {
      return {
        configs: {
          title: '秒杀',
          uri: 'backstage/second-kill',
          links: {
            list: 'seckill-list',
            add: 'seckill-add',
            edit: 'seckill-edit'
          }
        },
        relations:{
          centers: {
            show: true,
            params: {
              per_page: 10000
            }
          },
          rewards: {
            /**
             * modal的字段
             * title
             * auto:进入页面是否自动请求resource
             * form:查询字段
             * key:查询结果列表
             * resource:商品接口
             * */
            title: '选择秒杀商品',
            auto: true,
            form: [
              {
                field: "keyword",
                type: 'text',
                title: '商品名称',
                value: ''
              }
            ],
            keys: [
              {
                title: '商品名称',
                field: 'title'
              },
              {
                title: '价格(元)',
                field: 'price',
                filter: function(price){
                  return price/100
                }
              }
            ],
            resource: 'backstage/products',
            show: true,
            fields: [
              {
                title: '价格(元)',
                show: true,
                name: 'price',
                type: 'span price'
              },
              {
                title: '剩余可秒杀',
                show: true,
                name: 'total',
                type: 'integer'
              }
            ],
            params: {
              type: 10,
              per_page: 10000
            }

          }
        }
      }
    }
  }
</script>

