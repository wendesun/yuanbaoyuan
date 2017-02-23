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
        title: '宝贝评选',
        uri: 'backstage/baby-selection',
        links: {
          list: 'baby-list',
          add: 'baby-add',
          edit: 'baby-edit',
          statistics: 'baby-count'
        }
      }
    }
  }
  }
</script>
