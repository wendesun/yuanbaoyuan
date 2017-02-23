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
          title: '教师评选',
          uri: 'backstage/teacher-selection',
          links: {
            list: 'teacher-list',
            add: 'teacher-add',
            edit: 'teacher-edit',
            statistics: 'teacher-count'
          }
        }
      }
    }
  }
</script>
