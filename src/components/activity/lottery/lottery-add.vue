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
          title: '抽奖',
          uri: 'backstage/lotteries',
          links: {
            list: 'lottery-list',
            add: 'lottery-add',
            edit: 'lottery-edit'
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
            title: '选择抽奖商品',
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
              }
            ],
            resource: 'backstage/products',
            show: true,
            fields: [
              {
                title: '价格',
                show: false,
                name: 'price',
                type: 'span price'
              },
              {
                title: '奖品数量',
                show: true,
                name: 'total',
                type: 'integer'
              }
            ],
            params: {
              type: 20,
              per_page: 10000
            }
          }
        }
      }
    }
  }
</script>

