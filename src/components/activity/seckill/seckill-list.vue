<template><div>
  <list-page :configs="configs" ></list-page>
</div></template>
<script>
  import listPage from '../common/list.vue'
  export default {
    components: {
      listPage: listPage
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
        }
      }
    }
  }
</script>
