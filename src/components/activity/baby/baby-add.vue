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
        title: '宝贝评选',
        uri: 'backstage/baby-selection',
        links: {
          list: 'baby-list',
          add: 'baby-add',
          edit: 'baby-edit',
          statistics: 'baby-count'
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
          show: false,
          fields: [],
          keys:[],
          params: {
            type: 0,
            per_page: 10000
          }
        }
      }
    }
  }
  }
</script>
